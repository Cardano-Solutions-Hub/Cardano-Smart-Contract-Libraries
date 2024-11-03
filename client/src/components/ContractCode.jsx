/* eslint-disable react/prop-types */
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import Code from "./Code";
import Parameters from "./Parameters";
import { MdDownloadForOffline } from "react-icons/md";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-customPrimary bg-customPrimary hover:bg-customPrimary-500 hover:border-customPrimary-500",
        content: "text-black-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

function ContractCode({
  contracts,
  selectedOption,
  handleOptionChange,
  selectedContract,
  code,
  setParameters,
  parameters,
}) {
  const {
    isFocusVisible: isFocusVisibleOnChain,
    getBaseProps: getBasePropsOnChain,
    getLabelProps: getLabelPropsOnChain,
    getInputProps: getInputPropsOnChain,
  } = useCheckbox({
    isSelected: selectedOption === "onchain",
  });

  const {
    isFocusVisible: isFocusVisibleOffChain,
    getBaseProps: getBasePropsOffChain,
    getLabelProps: getLabelPropsOffChain,
    getInputProps: getInputPropsOffChain,
  } = useCheckbox({
    isSelected: selectedOption === "offchain", // Change to "offchain"
  });

  const stylesOnChain = checkbox({
    isSelected: selectedOption === "onchain",
    isFocusVisible: isFocusVisibleOnChain,
  });
  const stylesOffChain = checkbox({
    isSelected: selectedOption === "offchain",
    isFocusVisible: isFocusVisibleOffChain,
  });

  // Function to handle downloading the code as a file
  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const fileType = selectedOption == "onchain" ? "hs" : "ts";
    a.download = `${selectedContract}.${fileType}`; // Specify the file name
    document.body.appendChild(a); // Append anchor to body
    a.click(); // Trigger the download
    document.body.removeChild(a); // Remove the anchor from body
    URL.revokeObjectURL(url); // Release the blob URL
  };
  return (
    <div className="shadow-code shadow-lg mt-8 px-4 sm:px-12 py-4 sm:py-8 rounded-2xl relative">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <label
          {...getBasePropsOnChain()}
          onClick={() => handleOptionChange("onchain")}
        >
          <VisuallyHidden>
            <input {...getInputPropsOnChain()} />
          </VisuallyHidden>
          <Chip
            classNames={{
              base: stylesOnChain.base(),
              content: stylesOnChain.content(),
            }}
            color="primary"
            size="lg"
            startContent={selectedOption === "onchain"}
            variant="faded"
            style={{ paddingTop: "16px", paddingBottom: "16px" }} // Adjust padding
            {...getLabelPropsOnChain()}
          >
            <p className="text-lg sm:text-xl font-semibold">ON-Chain</p>{" "}
            {/* Adjust font size */}
          </Chip>
        </label>

        <label
          {...getBasePropsOffChain()}
          onClick={() => handleOptionChange("offchain")}
        >
          <VisuallyHidden>
            <input {...getInputPropsOffChain()} />
          </VisuallyHidden>
          <Chip
            classNames={{
              base: stylesOffChain.base(),
              content: stylesOffChain.content(),
            }}
            size="lg"
            color="primary"
            startContent={selectedOption === "offchain"}
            variant="faded"
            style={{ paddingTop: "16px", paddingBottom: "16px" }} // Adjust padding
            {...getLabelPropsOffChain()}
          >
            <p className="text-lg sm:text-xl font-semibold">Off-Chain</p>{" "}
            {/* Adjust font size */}
          </Chip>
        </label>
      </div>

      <button
        className="absolute top-4 right-4 bg-black text-sm rounded-full border-0 p-0 m-0"
        onClick={() => handleDownload()}
      >
        <MdDownloadForOffline color="var(--primary)" size={"3em"} />
      </button>
      <Code code={code} style={"h-96"} />
      <Parameters
        contracts={contracts}
        selectedContract={selectedContract}
        selectedOption={selectedOption}
        setParameters={setParameters}
        allparameters={parameters}
      />
    </div>
  );
}

export default ContractCode;
