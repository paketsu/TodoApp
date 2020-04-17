import React from 'react'
import "./assets/scss/App.scss"

const Todo = ({title, createdAt, completed, markAsCompleted}) => {
    return(
        <div className={!completed ? "todoNotCompleted" : "todoCompleted"}>
                <div className="todoContainer">
                    <div className="createdContainer">
                        <p>Lisätty {createdAt}</p>
                    </div>
                    <h2>{title}</h2>
                    <button onClick={markAsCompleted}>Merkitse suoritetuksi</button>
                </div>
            </div>
    )
}

export default Todo