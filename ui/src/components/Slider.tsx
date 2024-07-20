import React from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <input
        type="range"
        min="10"
        max="1000"
        step="25"
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
        id="myRange"
      />
      <p className="mt-2 text-center text-lg">
        Minimas Cartas Donadas: {value}
      </p>
    </div>
  );
};

export default Slider;
