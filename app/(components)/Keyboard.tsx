"use client"
import React from 'react'
import { Status } from '../page'

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
];

interface KeyboardProps {
  usedLetters: Record<string, Status>;
  onKey: (key: string) => void;
}

const Keyboard = ({ usedLetters, onKey }: KeyboardProps) => {
  
  const getKeyStyle = (key: string) => {
    const status = usedLetters[key.toLowerCase()];
    
    let colorClass = "bg-gray-500 hover:bg-gray-400 text-white"; // Default
    
    if (status === "correct") colorClass = "bg-green-600 text-white";
    else if (status === "present") colorClass = "bg-yellow-500 text-white";
    else if (status === "absent") colorClass = "bg-gray-800 text-gray-400"; // Dimmed for used/wrong
    
    const width = (key === "ENTER" || key === "DELETE") ? "px-4 sm:px-6 text-xs" : "flex-1 text-sm sm:text-base";
    
    return `flex items-center justify-center h-14 rounded font-bold transition-all uppercase active:scale-90 ${width} ${colorClass}`;
  };

  return (
    <div className="w-full max-w-180 flex flex-col gap-2">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5 w-full">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKey(key)}
              className={getKeyStyle(key)}
            >
              {key === "DELETE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard