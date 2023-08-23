"use client";
import Task from "@/components/Task";
import fetchTasks from "@/utils/fetchTasks";
import { useState, useEffect } from "react";


export default function Home() {
  const initialState = {
    name: "",
    desc: "",
  }

  const [isWaiting, setWaiting] = useState(null);
  const [formData, setFormData] = useState(
    (typeof window !== "undefined") && (JSON.parse(localStorage.getItem("formData")) ?? initialState)
  )


  useEffect(function() {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData])


  function valueHandler(e) {
    const { name, value:newValue } = e.target;
    setFormData(old => ({...old, [name]: newValue}));
  }

  async function submitHandler(e) {
    e.preventDefault();
    setWaiting(true);
    const res = await axios('/api/tasks/', {
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).finally(function() {
      setWaiting(false);
    })
    
    if (!res.ok) {
      // return newToast("failed", "Opps, mail failed to sent !");
    }
    setFormData(initialState);
    const data = await res.json();
    // return newToast("success", "Congrats, mail has sent");
  }

  const fetchedTasks = fetchTasks();

  return (
    <main>
      <form className='px-12 py-8 bg-white grid gap-4 max-w-lg mx-auto rounded-md shadow-md hover:shadow-lg'>
        <h3 className=' text-3xl mb-6 capitalize text-center'>task manager</h3>
        <label>
          <span>Name of task</span>
          <input  name="name" 
                  value={formData.name} 
                  onChange={valueHandler} 
                  placeholder='e.g. wash dishes' />
        </label>
        <label>
          <span>More information</span>
          <textarea name="desc" 
                    value={formData.desc} 
                    onChange={valueHandler} 
                    placeholder='write more description about wash dishes' rows={4} />
        </label>
        <button onClick={submitHandler} disabled={isWaiting}>{isWaiting ? "Loading..." : "Save task"}</button>
      </form>
      <div>
        { 
          fetchedTasks && fetchTasks.map((task, i) => (
            <Task key={i} task={task} />
          )) 
        }
      </div>
    </main>
  )
}
