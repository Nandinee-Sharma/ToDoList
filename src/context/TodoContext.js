import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [  //variable
        {
            id: 1,
            todo: "Todo msg",
            completed: false   //default model for a todo, all the todos are stored in an array
        }
    ],
    addTodo: (todo) => {}, //when a todo is going to add, this function is called, its functionality is decided in the App.jsx
    updateTodo: (id, todo) => {},
    deleteTodo: (id)=> {},
    toggleComplete: (id) => {}
});

export const useTodo = ()=> {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;
