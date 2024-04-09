import React, { useState, InputHTMLAttributes } from "react";
import AutoTable from "./autotable";
import { Input } from "./input";

interface AutocompleteInputProps extends InputHTMLAttributes<HTMLInputElement> {
  suggestions: string[];
  onInputChange?: (value: string) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ suggestions, onInputChange, ...inputProps }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        {...inputProps} 
        className="p-2 border rounded"
      />
      <AutoTable suggestions={suggestions} inputValue={inputValue} onSelect={handleInputChange} />
    </div>
  );
};

export default AutocompleteInput;
