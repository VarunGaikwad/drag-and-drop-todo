import { useState } from "react";
import ToDoList from "./components/ToDoList";

export default function App() {
  const [todos, setTodos] = useState([
      { id: 1, text: "Buy milk", status: "to-do" },
      { id: 2, text: "Wash bike", status: "in-progress" },
      { id: 3, text: "Do the budget", status: "done" },
      { id: 4, text: "Call Jane", status: "to-do" },
      { id: 5, text: "Clean the house", status: "in-progress" },
      { id: 6, text: "Finish report", status: "done" },
      { id: 7, text: "Book appointment", status: "to-do" },
      { id: 8, text: "Read a book", status: "in-progress" },
      { id: 9, text: "Plan vacation", status: "done" },
      { id: 10, text: "Go for a run", status: "to-do" },
    ]),
    [inputValue, setInputValue] = useState(""),
    submitHandler = () => {
      const newTodo = {
        id: todos.at(-1).id + 1,
        text: inputValue,
        status: "to-do",
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    };

  return (
    <div>
      <ToDoList
        inputValue={inputValue}
        setInputValue={setInputValue}
        submitHandler={submitHandler}
        todos={todos}
      />
    </div>
  );
}
