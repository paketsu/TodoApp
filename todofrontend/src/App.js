import React, { useState, useEffect} from 'react';
import * as axios from "axios";
import AddNewTodo from "./AddNewTodo"

import './App.scss';

const App = () => {
  const [todos, setTodos] = useState();
  const [addNew, setAddNew] = useState(false);
  useEffect(() => {
    if (todos === undefined) {
      axios.get("/api/todos").then((response) => {
        setTodos(response.data.todos);
      }).catch((error) => {
        console.log(error);
      })
    }
    }, [todos])

const markAsCompleted = (id, completed) => {
  axios.patch("/api/todos/" + id, {completed: !!completed ? "false" : "true"}).then((response) => {
    window.location.reload();
  }).catch((error) => {
    console.log(error)
  })
}

const deleteTodo = (id) => {
  axios.delete("/api/todos/" + id).then((response) => {
    window.location.reload();
  }).catch((error) => {
    console.log(error)
  })
}

const showAddNew = () => {
  setAddNew(!addNew)
}

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        {/*!!todos on sama kuin todos === true */}
        <div>
          <button onClick={showAddNew}>Lisää uusi tehtävä</button>
        </div>
        {!!todos && todos.map((todo) => {
          return(
            <div>
              <h1>{todo.title}</h1>
              <p>{new Date(todo.createdAt).toLocaleDateString("fi")}</p>
              <button onClick={() => markAsCompleted(todo._id, todo.completed)}>{!todo.completed ? "Merkitse suoritetuksi" : "Merkitse suorittamattomaksi"}</button>
              <button onClick={() => deleteTodo(todo._id)}>Poista</button>
            </div>
        )})}
        {!!addNew && <AddNewTodo></AddNewTodo>}
      </main>
    </div>
  );
}

export default App;
