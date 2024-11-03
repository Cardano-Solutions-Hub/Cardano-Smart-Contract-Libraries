import { FiCopy } from "react-icons/fi";
import { useState } from "react";

function formatStringForReact(input) {
  // Escape backslashes first to avoid double escaping
  let formattedString = input.replace(/\\/g, "\\\\");
  // Escape backticks
  formattedString = formattedString.replace(/`/g, "\\`");

  return formattedString;
}

// eslint-disable-next-line react/prop-types
function Code({ code, style }) {
  const [copySuccess, setCopySuccess] = useState("");

  code = formatStringForReact(code);

  // Function to copy code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    } catch (err) {
      console.log(err);
      setCopySuccess("Failed to copy");
    }
  };

  code = formatStringForReact(code);
  return (
    <div className={`bg-code mt-8 rounded-lg overflow-auto relative ${style}`}>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-transparent text-white px-2 py-1 text-xs sm:text-sm rounded hover:bg-gray-600"
      >
        {copySuccess || <FiCopy size={"1.5em"} color="var(--primary)" />}
      </button>
      <code className="text-white text-xs sm:text-sm px-2 sm:px-4">
        <pre className="px-4 sm:px-8">{code}</pre>
      </code>
    </div>
  );
}

export default Code;
