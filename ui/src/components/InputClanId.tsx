import React, { useState } from "react";

const InputComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const processedValue = inputValue.match(/^#/)
      ? inputValue
      : `#${inputValue}`;
    console.log("Processed Value:", processedValue);
    handleInput(processedValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleInput = (value: string) => {
    // Function to be called with the processed value
    console.log("Input received:", value);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
        placeholder="Enter a value"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2"
      >
        Submit
      </button>
    </div>
  );
};

export default InputComponent;
