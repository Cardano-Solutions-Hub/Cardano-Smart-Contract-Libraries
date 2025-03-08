import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Code from "../components/Code";
import ContractImage from "../assets/contract-white.png";
import { Button, Image } from "@nextui-org/react";
import Result from "../components/Result";
import { FiPlayCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import URL from "../../constants";

function Documentation() {
  const [code, setCode] = useState([]);

  useEffect(() => {
    const newSocket = io(URL, {
      transports: ["websocket"],
      withCredentials: false,
    });

    newSocket.on("initial", () => {
      //
    });

    newSocket.on("codeSnippit", (message) => {
      console.log("Received code snippets:", message);
      setCode(message); // Update state with received code snippets
    });

    newSocket.emit("codeSnippit");
  }, []);
  return (
    <>
      <NavBar />
      <main className="mt-12 px-4 sm:px-16 md:px-28 pb-8">
        <p className="text-center font-bold text-xl sm:text-2xl">
          Documentation
        </p>
        <p className="text-center mt-2 sm:mt-4 text-xs sm:text-sm text-slate-500 px-4 sm:px-0">
          This section will allow users to interact with our existing smart
          contract through offchain code snippets. You can execute sample
          scripts and test real-world scenarios. With detailed examples and
          ready-to-run snippets, you will easily learn how to query, transact,
          and customize smart contracts behavior without modifying the
          underlying code.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="w-full overflow-hidden">
            <div>
              {code.length > 0 ? (
                <Code code={code[0]["code"]} style={"h-56 w-full"} />
              ) : (
                <Code code={""} style={"h-60 w-full"} /> // Fallback if no code is available
              )}
            </div>
            <div>
              <Button
                className="mt-4 bg-customPrimary text-lg font-semibold"
                endContent={<FiPlayCircle />}
              >
                RUN CODE SNIPPET
              </Button>
            </div>
            <Result />
          </div>

          <div className="w-full sm:w-9/12 md:w-7/12 flex flex-col items-center mt-6">
            <div>
              <Image src={ContractImage} width={50} />
            </div>
            <p className="text-center font-bold text-lg sm:text-xl md:text-2xl">
              Off-Chain Sample code NFT
            </p>
            <p className="text-sm mt-4 text-slate-500 text-center">
              Our off-chain sample code for NFTs demonstrates how to interact
              with non -fungible tokens (NFTs) on the Cardano blockchain
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="w-full overflow-hidden">
            {code.length > 0 ? (
              <Code code={code[1]["code"]} style={"h-56 w-full"} />
            ) : (
              <Code code={""} style={"h-60 w-full"} /> // Fallback if no code is available
            )}
            <div>
              <Button
                className="mt-4 bg-customPrimary text-lg font-semibold"
                endContent={<FiPlayCircle />}
              >
                RUN CODE SNIPPET
              </Button>
            </div>
          </div>

          <div className="w-full sm:w-9/12 md:w-7/12 flex flex-col items-center mt-6">
            <div>
              <Image src={ContractImage} width={50} />
            </div>
            <p className="text-center font-bold text-lg sm:text-xl md:text-2xl">
              Off-Chain Sample code Vesting
            </p>
            <p className="text-sm mt-4 text-slate-500 text-center">
              Our off-chain sample code for Vesting demonstrates how to manage
              time-locked token releases using Cardano&apos;s smart contracts
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="w-full overflow-hidden">
            {code.length > 0 ? (
              <Code code={code[2]["code"]} style={"h-56 w-full"} />
            ) : (
              <Code code={""} style={"h-60 w-full"} /> // Fallback if no code is available
            )}
            <div>
              <Button
                className="mt-4 bg-customPrimary text-lg"
                endContent={<FiPlayCircle />}
              >
                RUN CODE SNIPPET
              </Button>
            </div>
          </div>

          <div className="w-full sm:w-9/12 md:w-7/12 flex flex-col items-center mt-6">
            <div>
              <Image src={ContractImage} width={50} />
            </div>
            <p className="text-center font-bold text-lg sm:text-xl md:text-2xl">
              Off-Chain Sample code Burn
            </p>
            <p className="text-sm mt-4 text-slate-500 text-center">
              Our off-chain sample code for burning token showcases how to
              remove remove token from circulation
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="w-full oveflow-hidden">
            {code.length > 0 ? (
              <Code code={code[3]["code"]} style={"h-56 w-full"} />
            ) : (
              <Code code={""} style={"h-60 w-full"} /> // Fallback if no code is available
            )}
            <div>
              <Button
                className="mt-4 bg-customPrimary text-lg"
                endContent={<FiPlayCircle />}
              >
                RUN CODE SNIPPET
              </Button>
            </div>
          </div>

          <div className="w-full sm:w-9/12 md:w-7/12 flex flex-col items-center mt-6">
            <div>
              <Image src={ContractImage} width={50} />
            </div>
            <p className="text-center font-bold text-lg sm:text-xl md:text-2xl">
              Off-Chain Sample code Gift
            </p>
            <p className="text-sm mt-4 text-slate-500 text-center">
              Our off-chain sample code for gift contracts demonstrates how to
              tranfer token or ADA designated recipient using a smart contract
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Documentation;
