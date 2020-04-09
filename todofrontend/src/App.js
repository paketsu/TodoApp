import React, { useState, useEffect} from 'react';
import * as axios from "axios";

import './App.scss';

const App = () => {
  const [todos, setTodos] = useState();
  useEffect(() => {
    if (todos === undefined) {
      axios.get("/todos").then((response) => {
        setTodos(response.data.todos);
      }).catch((error) => {
        console.log(error);
      })
    }
    }, [todos])

const markAsCompleted = (id, completed) => {
  axios.patch("/todos/" + id, {completed: !!completed ? "false" : "true"}).then((response) => {
    window.location.reload();
  }).catch((error) => {
    console.log(error)
  })
}

const deleteTodo = (id) => {
  axios.delete("/todos/" + id).then((response) => {
    window.location.reload();
  }).catch((error) => {
    console.log(error)
  })
}

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        {/*!!todos on sama kuin todos === true */
        console.log(todos)}
        {!!todos && todos.map((todo) => {
          return(
            <div>
              <h1>{todo.title}</h1>
              <p>{new Date(todo.createdAt).toLocaleDateString("fi")}</p>
              <button onClick={() => markAsCompleted(todo._id, todo.completed)}>{!!todo.completed ? "Merkitse suoritetuksi" : "Merkitse suorittamattomaksi"}</button>
              <button onClick={() => deleteTodo(todo._id)}>Poista</button>
            </div>
        )})}
      </main>
    </div>
  );
}

export default App;
