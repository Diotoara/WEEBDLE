"use client"

import words from "@/list.json"
import { useEffect, useRef, useState } from "react"
import Grid from "./(components)/Grid"
import Keyboard from "./(components)/Keyboard" // Ensure this path is correct

export type Status = "correct" | "present" | "absent" | "none";

export default function Home() {
  const [finalword, setFinalword] = useState("");
  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setFinalword(randomWord.toLowerCase());
  }, []);

  const [usedLetters, setUsedLetters] = useState<Record<string, Status>>({});
  const [currentWord, setCurrentWord] = useState<string>("");
  const [row, setRow] = useState<number>(0)
  const [allGuesses, setAllGuesses] = useState<string[]>([])
  const [allResult, setAllResult] = useState<Status[][]>([])
  const [dialogBox, setDialogBox] = useState<boolean>(false)
  const [conclusion, setConclusion] = useState<string>("")

  function checkCommon(word: string) {
    const list: Status[] = []
    const newUsedLetters = { ...usedLetters };

    for (let i = 0; i < 5; i++) {
      let score: Status = "absent"
      for (let j = 0; j < 5; j++) {
        if (i == j && word[i] === finalword[j]) score = "correct";
        if (word[i] === finalword[j] && score !== "correct") score = "present";
      }
      list.push(score);
      
      const char = word[i].toLowerCase();
      const currentBest = newUsedLetters[char];

      if (currentBest !== "correct") {
        if (score === "correct" || (score === "present" && currentBest !== "present") || !currentBest) {
          newUsedLetters[char] = score;
        }
      }
    }
    setAllResult(prev => [...prev, list]);
    setUsedLetters(newUsedLetters);
  }

  const handleInput = (key: string) => {
    const upperKey = key.toUpperCase();

    if (upperKey === "ENTER") {
      console.log(finalword)
      if (currentWord.length === 5) {
        checkCommon(currentWord.toLowerCase());
        setAllGuesses(prev => [...prev, currentWord.toLowerCase()]);
        if(currentWord === finalword){
          setDialogBox(true)
          setConclusion("WINNER 🏆")
        }
        setRow(prev => prev + 1);
        if(row >= 5){
          setDialogBox(true)
          setConclusion("The word was : " + finalword)

        }
        setCurrentWord("");
        
      }
    } else if (upperKey === "DELETE" || upperKey === "BACKSPACE") {
      setCurrentWord(prev => prev.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && currentWord.length < 5) {
      setCurrentWord(prev => prev + key.toLowerCase());
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleInput(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWord, row, finalword, dialogBox, conclusion]);

  return (
    <div className="bg-gray-950 h-screen flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col gap-2">
        {/* <div className="text-white" >{finalword}</div> */}
      <div>
        {dialogBox ? 
        <div className="text-red-400 font-bold flex justify-center text-2xl p-2">{conclusion}</div> 
        : <div className=" opacity-0 text-2xl p-2">d</div>}
      </div>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid
            key={index}
            guess={index === row ? currentWord.toUpperCase() : allGuesses[index]?.toUpperCase() || ""}
            status={allResult[index]}
          />
        ))}
      </div>

      <Keyboard usedLetters={usedLetters} onKey={handleInput} />

    </div>
  )
}