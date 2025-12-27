"use client"

import { useEffect, useRef, useState } from "react"
import Grid from "./(components)/Grid"
// const allGuess:string[] = [];

export type Status = "correct" | "present" | "absent" | "none";

export default function Home(){
  const finalword = "brown"
  const [currentWord, setCurrentWord] = useState<string>("");
  const[row,setRow] = useState<number>(0)
  const [allGuesses, setAllGuesses] = useState<string[]>([])
  const [allResult, setAllResult] = useState<Status[][]>([])
  const currentWordRef = useRef(currentWord)

  function checkCommon (word:string) {
    const list:Status[] = []
    for(let i=0;i<5;i++){
      let x = word[i]
      let score:Status = "absent"
      for(let j=0;j<5;j++){
        if( i==j && word[i] === finalword[j]) score = "correct";
        if(word[i] === finalword[j] && score !== "correct") score = "present";
      }
      list.push(score);
    }
    setAllResult(prev => [...prev, list])
  }
  
  useEffect(() => {
    currentWordRef.current = currentWord
  }, [currentWord])

  useEffect(()=>{
    const handleKeys = (e:KeyboardEvent) => {
      const word = currentWordRef.current

      if(e.key=== "Enter" && word.length===5){
        checkCommon(word)
        setRow(prev => prev + 1);
        setAllGuesses(prev => [...prev, word])
        setCurrentWord("")
        return
      }
      if(e.key === "Backspace") {
        setCurrentWord(prev => prev.slice(0,-1))
        return
      }
      if(/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey ){
        setCurrentWord(prev => {
          if(prev.length==5) return prev
          return prev + e.key
        })
      }
    }
    window.addEventListener("keydown", handleKeys)
    return ()=> window.removeEventListener("keydown",handleKeys)
  },[])

  return(
    <div className="bg-gray-950 h-screen">

      <div className="flex flex-col gap-2 justify-center items-center h-screen ">
        {Array.from ({length:6}).map((_,index)=>(
        <Grid 
        key={index}  
        guess={index===row ? currentWord.toUpperCase() : allGuesses[index] ? allGuesses[index].toUpperCase() : "" }
        status = {allResult[index] ? allResult[index] : undefined}
        />
        ))}
      </div>

    </div>
  )
}
