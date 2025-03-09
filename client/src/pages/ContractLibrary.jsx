import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ContractList from "../components/ContractList";
import ContractCode from "../components/ContractCode";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import URL from "../../constants";

function ContractLibrary() {
  const contracts = [
    {
      key: "nft",
      label: "MintNFT",
      value: "NFT",
      parameters: {
        onchain: [
          { name: "Token Name", key: "tokenname" },
          { name: "Script Name", key: "scriptName" },
        ],
        offchain: [],
      },
    },
    {
      key: "vest",
      label: "Vesting",
      value: "Vesting",
      parameters: {
        onchain: [
          { name: "PubKey Hash", key: "PubKeyHash" },
          { name: "POSIX Time", key: "POSIXTime" },
          { name: "Script Name", key: "scriptName" },
        ],
        offchain: [{ name: "Amount", key: "amount" }],
      },
    },
    {
      key: "burn",
      label: "Burn",
      value: "Burn",
      parameters: {
        onchain: [
          { name: "Error", key: "error" },
          { name: "Script Name", key: "scriptName" },
        ],
        offchain: [{ name: "Amount", key: "amount" }],
      },
    },
    {
      key: "gift",
      label: "Gift",
      value: "Gift",
      parameters: {
        onchain: [{ name: "Script Name", key: "scriptName" }],
        offchain: [{ name: "Amount", key: "amount" }],
      },
    },
  ];

  const [selectedContract, setSelectedContract] = useState("NFT");
  const [selectedOption, setSelectedOption] = useState("onchain");
  const [code, setCode] = useState("");
  const [socket, setSocket] = useState(null);
  const [parameters, setParameters] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleContractChange = (value) => {
    setSelectedContract(value);
    setParameters({});
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setParameters({});
  };

  useEffect(() => {
    const newSocket = io(URL, {
      transports: ["websocket"],
      withCredentials: false,
    });
    setSocket(newSocket);

    newSocket.on("initial", (data) => {
      setCode(data);
    });

    // Listen for code updates from the server
    newSocket.on("codeUpdate", (updatedCode) => {
      setCode(updatedCode); // Update the code state with the new data
    });

    // Listen for error events
    newSocket.on("error", (error) => {
      console.error("Error received:", error);
      setErrorMessage("Error Occured Please Refresh"); // Store error message in state
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      let data;

      if (selectedContract === 'NFT' && selectedOption === 'offchain') {
        data = {
          contract: selectedContract,
          type: selectedOption,
          metadata: parameters,
        };
      } else {
        data = {
          contract: selectedContract,
          type: selectedOption,
          ...parameters,
        };
      }

      socket.emit("codeUpdate", data);
    }
  }, [socket, selectedContract, selectedOption, parameters]);

  return (
    <>
      <NavBar />
      <main className="mt-16 px-0 sm:px-28 pb-8 w-full">
        {/* Display error message if exists */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            ⚠️ {errorMessage}
          </div>
        )}
        <ContractList
          contracts={contracts}
          handleContractChange={handleContractChange}
          selectedContract={selectedContract}
        />
        <ContractCode
          contracts={contracts}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
          selectedContract={selectedContract}
          code={code}
          setParameters={setParameters}
          parameters={parameters}
        />
      </main>
      <Footer />
    </>
  );
}

export default ContractLibrary;
