import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [todo,setTodo] = useState('');
  const [todoList,setTodoList] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/api').then(res => {
      setTodoList(res.data);
    })
  },[todoList])
  const addTodo = () =>{
    Axios.post('http://localhost:3001/insert',{
       userInput:todo
    })  
  }
  const deleteTodo = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }
  return (
    <div className="App">
     <h1>Todo List</h1>
     <div>
       <input type = 'text' name = "userInput" onChange = {(e)=>setTodo(e.target.value)}/>
       <button onClick = {addTodo}>add Todo</button>
     </div>
     <div>{todoList.map(item =>(
       <div key = {item.id}>
          <h1>{item.text}</h1>
          <button onClick = {()=>{deleteTodo(item.id)}}>delete</button>
       </div>
     ))}</div>
    </div>
  );
}

export default App;
