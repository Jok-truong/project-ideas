import AsyncSelect from "react-select/async";

type Props = {
  defaultValue: any;
  loadOptions: (inputValue: string) => void;
  onChange: any;
};

const MultiSelectTagDropdown = ({
  defaultValue = [],
  loadOptions,
  onChange,
}: Props) => {
  return (
    <AsyncSelect
      defaultValue={defaultValue}
      defaultOptions
      isMulti
      loadOptions={loadOptions}
      className="relative z-20"
      onChange={onChange}
    />
  );
};

export default MultiSelectTagDropdown;
