/* eslint-disable react/prop-types */
import { Button, Input } from "@nextui-org/react";
import { IoMdCheckboxOutline } from "react-icons/io";
import MetadatTable from "./MetadatTable";
import { useState } from "react";

function Parameters({
  contracts,
  selectedContract,
  selectedOption,
  setParameters,
  allparameters,
}) {
  // Find the currently selected contract
  const contract = contracts.find((c) => c.value === selectedContract);
  const parameters = contract ? contract.parameters[selectedOption] : [];

  const handleParameterChange = (key, value) => {
    setParameters((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  };

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleKey = (key) => {
    setKey(key);
  };

  const handleValue = (value) => {
    setValue(value);
  };

  const handleoffchainNft = (key, value) => {
    const currentParams = Array.isArray(allparameters) ? allparameters : [];
    setParameters([...currentParams, { key: key, value: value }]);
  };

  const handleRemove = (indexToRemove) => {
    setParameters((prevParams) =>
      prevParams.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleEdit = (index, updatedMetadata) => {
    setParameters((prevParams) =>
      prevParams.map((param, i) => (i === index ? updatedMetadata : param))
    );
  };

  return (
    <div className="pb-8 mt-8">
      <div className="flex flex-row items-center gap-2 pb-4">
        {selectedContract === "NFT" && selectedOption === "offchain" ? (
          <p className="text-lg sm:text-xl font-bold">Metadata</p>
        ) : (
          <p className="text-lg sm:text-xl font-bold">Parameters</p>
        )}
        <IoMdCheckboxOutline />
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-12">
        {selectedContract === "NFT" && selectedOption === "offchain" ? (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-14 justify-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Input
                label="key"
                key="key"
                className="w-full sm:w-52"
                variant="bordered"
                onChange={(e) => handleKey(e.target.value)}
              />
              <Input
                label="value"
                key="value"
                className="w-full sm:w-52"
                variant="bordered"
                onChange={(e) => handleValue(e.target.value)}
              />
              <Button
                onClick={() => handleoffchainNft(key, value)}
                className="bg-customPrimary"
              >
                Add
              </Button>
            </div>
            <div className="w-full">
              <MetadatTable
                metadatas={allparameters}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
              />
            </div>
          </div>
        ) : (
          parameters.map((item) => (
            <Input
              label={item.name}
              key={item.key}
              className="w-full sm:w-52"
              variant="bordered"
              onChange={(e) => handleParameterChange(item.key, e.target.value)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Parameters;
