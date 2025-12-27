import { motion } from "framer-motion";
import { Status } from '../page'

const Grid = ({guess, status}:{guess:string, status?:Status[]}) => {

  const getBgColor = (index:number) => {
    if(!status) return "bg-white";
    const currentStatus = status[index];
    if(currentStatus==='absent') return "bg-gray-600"
    if(currentStatus==='present') return "bg-amber-800"
    if(currentStatus==='correct') return "bg-green-600"
    return "bg-white"
  }

  return (
    <div className='flex gap-2' >
        {Array.from({length:5}).map((_,index) => (
            <motion.div
            key={index}
            initial={false}
            animate={guess[index] ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`${getBgColor(index)} h-15 w-15 rounded-md flex justify-center items-center text-4xl font-bold `}>
              <motion.span
              key={status ? "revealed" : "hidden"}
              initial={status ? { rotateX: -90 } : { rotateX: 0 }}
              animate={{ rotateX: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {guess[index] || ""}
              </motion.span>
            </motion.div>
        ))}
    </div>
  )
}

export default Grid