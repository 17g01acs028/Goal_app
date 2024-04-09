import React, { useState } from "react";

interface AutoTableProps {
  suggestions: string[];
  inputValue: string;
  onSelect: (value: string) => void;
}

const AutoTable: React.FC<AutoTableProps> = ({ suggestions, inputValue, onSelect }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Filter suggestions based on user input
  const filterSuggestions = (input: string) => {
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  // Handle selection of a suggestion
  const handleSelect = (value: string) => {
    onSelect(value);
    // Clear filtered suggestions after a delay
    setTimeout(() => {
      setFilteredSuggestions([]);
    }, 100); // Adjust the delay as needed
  };

  // Filter suggestions when input value changes
  React.useEffect(() => {
    if (inputValue.trim() !== "") {
      filterSuggestions(inputValue);
    } else {
      setFilteredSuggestions([]);
    }
  }, [inputValue]);

  // Render AutoTable only if there are filtered suggestions
  if (filteredSuggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-10 mt-1 bg-inherit w-full">
      <table  className="w-full border-collapse border bg-popover border-gray-300 rounded-md shadow-md">
        <tbody>
          {filteredSuggestions.map((suggestion, index) => (
            <tr key={index} className="cursor-pointer hover:bg-gray-100" onClick={() => handleSelect(suggestion)}>
              <td className="p-2">{suggestion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutoTable;
