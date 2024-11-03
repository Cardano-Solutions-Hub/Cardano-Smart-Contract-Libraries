import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { IoMdCheckboxOutline } from "react-icons/io";

// eslint-disable-next-line react/prop-types
function ContractList({ contracts, handleContractChange, selectedContract }) {
  return (
    <div className="flex flex-col gap-8">
      <CheckboxGroup orientation="horizontal" value={[selectedContract]}>
        {
          // eslint-disable-next-line react/prop-types
          contracts.map((contract) => (
            <Checkbox
              className="ml-4"
              key={contract.key}
              value={contract.value}
              icon={<IoMdCheckboxOutline size={'2em'}/>}
              isSelected={selectedContract === contract.value}
              onChange={() => handleContractChange(contract.value)}
              radius="sm"
              color="default"
              size="lg"
            >
              <p className="text-lg sm:text-xl font-medium sm:font-semibold">{contract.label}</p>
            </Checkbox>
          ))
        }
      </CheckboxGroup>
    </div>
  );
}

export default ContractList;
