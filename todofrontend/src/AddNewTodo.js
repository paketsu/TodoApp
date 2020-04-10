import React, {useState} from 'react';
import Axios from 'axios';

const AddNewTodo = () => {
    const [formState, setFormState] = useState({
        title: "",
        completed: false
    });

    const updateFormState = (event) => {
        console.log(formState)
        setFormState(event.target.value)
    }

    const submitForm = (event) => {
        event.preventDefault()
        Axios.post("/api/todos", formState).then((response) => {
            console.log(response)    
            window.location.reload();
        }).catch((error) => {
          console.log(error)
        })
    }

    return (
        <form onSubmit={submitForm}>
            <input type="text" value={formState.title} name="title" onChange={updateFormState}/>
            <input type="radio" name="completed" value={formState.completed}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default AddNewTodo;