"use client"

import { useEffect, useRef, useState } from "react"
import Grid from "./(components)/Grid"
const allGuess:string[] = [];

export default function Home(){
  const finalword = "aryan"
  const [currentWord, setCurrentWord] = useState<string>("");
  const[row,setRow] = useState<number>(0)
  const currentWordRef = useRef(currentWord)

  useEffect(() => {
    currentWordRef.current = currentWord
  }, [currentWord])

  useEffect(()=>{
    const handleKeys = (e:KeyboardEvent) => {
      const word = currentWordRef.current

      if(e.key=== "Enter" && word.length===5){
        if (word.toUpperCase() === finalword.toUpperCase()) {
          console.log("winner")
        }
        else {
          setRow(prev => prev + 1);
          allGuess.push(word)
          setCurrentWord("")
          return
        }
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
        <Grid key={index}  guess={index===row ? currentWord.toUpperCase() : allGuess[index] ? allGuess[index].toUpperCase() : "" } />
        ))}
      </div>

    </div>
  )
}
