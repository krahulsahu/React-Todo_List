import React, { useEffect } from 'react'
import Create from './Create'
import { useState } from 'react'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

const Home = () => {
    const [todos, setTodos]= useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/get")
      .then(result => setTodos(result.data))
    .catch(err =>console.log(err))
  }, [])
  
  const handalCheckbox = (id) => {
    axios.put("http://localhost:8000/update/"+id)
      .then(result => {
        location.reload()
    })
    .catch(err =>console.log(err))
  }
  
  const handleDelete = (id) => {
     axios.delete("http://localhost:8000/delete/"+id)
      .then(result => {
        location.reload()
    })
    .catch(err =>console.log(err))
  }
  return (
    <div className='home'>
          <h1>Todo List</h1>
          <Create />
          {
              todos.length === 0
                  ?
                  <div>
                      <h2>No Record</h2>
                  </div>
                  :
                todos.map(todo => {
                  return (
                    <div className='task'>
                      <div className="checkbox" onClick={() => handalCheckbox(todo._id)}>
                        {todo.done ?
                          <BsFillCheckCircleFill className='icon' />
                          : <BsCircleFill className='icon' />
                        }
                        <p className={todo.done ? "line_through" : "notes"}>{ todo.task}</p>
                      </div>
                        <div>
                          <span>
                            <BsFillTrashFill className="icon" onClick={() =>handleDelete(todo._id)}/>
                          </span>
                        </div>
                    </div>
                  )
                })
                            
         }
    </div>
  )
}

export default Home
