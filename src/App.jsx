import { useState, useEffect } from 'react'
import {TodoProvider} from './context/TodoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'


function App() {

  const [todos, setTodos] = useState([]); //by default, empty array( no todos)

  const addTodo = (todo)=> {
    //setTodos(todo): this will delete all the previous values and only keep the current todo, so we need the access of the previous state
    setTodos((previous) => [{id: Date.now(), ...todo},...previous])  //we are getting the random id values for todos, and we are adding the new todo object at first, then keeping the previous todos after using '...'
  }

  const updateTodo = (id, todo)=> {
    //take previous array of todos, by using the 'map' method for looping, which gives us all todos, try comparing each todo's id with the 'id' passed in update todo
    //, if it matches then update the todo with new 'todo' passed in 'updateTodo' method, else keep the previous todo as it is.
    setTodos((previous) => previous.map((eachTodo) => (eachTodo.id === id ? todo : eachTodo))) //eachTodo is a Todo object
  }

  const deleteTodo = (id) => {

    //we are taking the previous array, and create a new array using filter method where if the 'id provided in the deleteTodo' is matching, then don't add it into the new array, otherwise do it
    setTodos((previous) => previous.filter((todo) => todo.id!==id))
  }

  const toggleComplete = (id) => {
    setTodos( (previous) => 
      previous.map( (eachTodo) => 
        eachTodo.id===id ? {...eachTodo, completed: !eachTodo.completed} : eachTodo))
        //if the id given matches with the any todo in the array, keep all the properties of that todo object as it as using '...eachTodo',
        //and then change the completed part, if false, then make it true or vice versa,
        //if they dont match, then keep the 'eachTodo' as it as.
  }

  //localStorage: is of browser, can be accessed using js, react, vite, etc. Go to README.md

  //to load all the previous values on our browser, whenever we open it next:
  useEffect( ()=> {
    const todos = JSON.parse(localStorage.getItem("todos")) //converting string data into json format
    if (todos && todos.length>0){
      setTodos(todos);
    }
  }, [])


  //store the new todos on the localStorage by converting our json array into string format.
  useEffect( ()=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])  //anytime, a new todo is added, then update the arrays


  return (
      <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>  {/*these are the values defined in context */}
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App;
