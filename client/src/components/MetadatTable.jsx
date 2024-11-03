import { MdEdit, MdDelete, MdCheck } from "react-icons/md";
import { useState } from "react";

/* eslint-disable react/prop-types */
function MetadatTable({ metadatas, handleRemove, handleEdit }) {
  const metadataArray = Array.isArray(metadatas) ? metadatas : [];
  const [editIndex, setEditIndex] = useState(null);
  const [editKey, setEditKey] = useState("");
  const [editValue, setEditValue] = useState("");

  const startEditing = (index) => {
    setEditIndex(index);
    setEditKey(metadataArray[index].key);
    setEditValue(metadataArray[index].value);
  };

  const saveEdit = () => {
    handleEdit(editIndex, { key: editKey, value: editValue });
    setEditIndex(null);
    setEditKey("");
    setEditValue("");
  };

  return (
    <div className="overflow-x-auto h-24">
      <table className="w-72 border-collapse border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 border border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Key
            </th>
            <th className="px-2 py-3 border border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
            <th className="px-2 py-3 border border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {metadataArray.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                className="px-2 py-4 border border-gray-200 text-center text-sm text-gray-500"
              >
                No metadata available
              </td>
            </tr>
          ) : (
            metadataArray.map((metadata, index) => (
              <tr key={index}>
                <td className="px-2 py-4 border border-gray-200 whitespace-nowrap text-sm text-gray-900">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editKey}
                      onChange={(e) => setEditKey(e.target.value)}
                      className="border border-gray-300 p-1 w-20"
                    />
                  ) : (
                    metadata.key
                  )}
                </td>
                <td className="px-2 py-4 border border-gray-200 whitespace-nowrap text-sm text-gray-900">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border border-gray-300 p-1 w-20"
                    />
                  ) : (
                    metadata.value
                  )}
                </td>
                <td className="px-2 py-4 border border-gray-200 whitespace-nowrap text-sm text-gray-900">
                  {editIndex === index ? (
                    <button onClick={saveEdit} className="p-0 mr-4">
                      <MdCheck />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(index)}
                        className="p-0 mr-4"
                      >
                        <MdEdit />
                      </button>
                      <button onClick={() => handleRemove(index)} className="p-0">
                        <MdDelete />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MetadatTable;
