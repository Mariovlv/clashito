import React, { useState } from "react";

const InputComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Processed Value:", inputValue);
    handleInput(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleInput = (value: string) => {
    console.log("Input received, starting fetching:", value);
  };

  return (
    <div className="flex items-center space-x-2 w-[100%]">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="px-4 py-2 border border-gray-300 border-b-2 rounded-md focus:outline-none focus:ring-2"
        placeholder="Enter the Clan Tag"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2"
      >
        Generar tabla
      </button>
    </div>
  );
};

export default InputComponent;
