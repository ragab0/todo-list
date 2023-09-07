"use client";
import Image from 'next/image'
import { useState } from 'react';
import { imgs } from "@/assets/imgs";
const { arrow } = imgs;


export default function Select({list=[], img}) {
  const [current, setCurrent] = useState(list[0]);
  const [isOpen, setOpen] = useState(false)


  return (
    <div className='mb-4'>
      <div className='current p-3 rounded-2xl bg-white flex gap-2 items-center justify-between'>
        <span value={current.name} className='flex items-center gap-2 capitalize cursor-default'>
            {
              img && <Image alt={"img"} src={img} className='w-5 h-5' /> 
            } 
            {current.name}
        </span>
        <button onClick={() => setOpen(o => !o)}  className={`p-3 hover:scale-125 rotate-180 cursor-pointer transition-all ${isOpen ? "rotate-0" : ""}`}>
          <Image src={arrow} alt="arrow" className="w-[10px] h-[10px]" />
        </button>
      </div>
      <div className={`p-3 animate-slideDown ${isOpen ? "" : "hidden"}`}>
        {
          list.map((current, i) => (
            <button key={i} value={current.name} className='flex gap-2 capitalize' onClick={() => setCurrent(current) || setOpen(false)}>
              {current.iconSrc && <Image alt={current.name} src={current.iconSrc} className='w-5 h-5' />} {current.name}
            </button>
          ))
        }
      </div>
    </div>
  )
}
