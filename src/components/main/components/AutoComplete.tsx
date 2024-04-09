import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface AutoTableProps {
  suggestions: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const AutoComplete: React.FC<AutoTableProps> = ({ suggestions, placeholder = "", onChange, className = "" }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(userInput);
    if (onChange) {
      onChange(userInput);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
    if (onChange) {
      onChange(e.currentTarget.innerText);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
      if (onChange) {
        onChange(filteredSuggestions[activeSuggestion]);
      }
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;
  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md">
          {filteredSuggestions.map((suggestion, index) => {
            let className = "";
            if (index === activeSuggestion) {
              className = "bg-gray-200";
            }
            return (
              <li className={`py-2 px-4 cursor-pointer hover:bg-gray-200 ${className}`} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md">
          <div className="py-2 px-4">
            <em>No suggestions available.</em>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        value={userInput}
        className={className}
      />
      {suggestionsListComponent}
    </div>
  );
};

export default AutoComplete;
