import PropTypes from "prop-types";

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  itemDrop: PropTypes.func.isRequired,
};

export default function ToDoList({
  todos,
  inputValue,
  setInputValue,
  submitHandler,
  itemDrop,
}) {
  const [todoList, inProgressList, doneList] = useSeperateState(todos);

  return (
    <div className="select-none min-h-screen w-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white p-4 md:p-8 flex flex-col items-center">
      <div className="text-4xl md:text-6xl font-bold tracking-wider mb-4 md:mb-8 drop-shadow-lg">
        TO DO LIST
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-8 w-full max-w-3xl">
        <input
          value={inputValue}
          onChange={(oEvent) => setInputValue(oEvent.target.value)}
          className="flex-grow text-lg md:text-2xl bg-white bg-opacity-15 p-3 md:p-4 rounded-2xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          placeholder="Enter a task..."
        />
        <button
          onClick={submitHandler}
          className="text-lg md:text-2xl bg-purple-600 text-white p-3 md:p-4 rounded-2xl shadow-lg transition-all duration-500 ease-in-out hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 w-full max-w-7xl">
        <TypeList title={"To Do"} list={todoList} itemDrop={itemDrop} />
        <TypeList
          title={"In Progress"}
          list={inProgressList}
          itemDrop={itemDrop}
        />
        <TypeList title={"Done"} list={doneList} itemDrop={itemDrop} />
      </div>
    </div>
  );
}

function useSeperateState(todos) {
  const todoList = [],
    inProgressList = [],
    doneList = [];
  todos.forEach((todo) => {
    if (todo.status === "to-do") {
      todoList.push(todo);
    } else if (todo.status === "in-progress") {
      inProgressList.push(todo);
    } else if (todo.status === "done") {
      doneList.push(todo);
    }
  });
  return [todoList, inProgressList, doneList];
}

TypeList.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  itemDrop: PropTypes.func.isRequired,
};

function TypeList({ title, list, itemDrop }) {
  return (
    <div
      onDragOver={(oEvent) => oEvent.preventDefault()}
      onDrop={(oEvent) => {
        itemDrop(oEvent.dataTransfer.getData("id"), title);
      }}
      className="flex border-2 border-gray-700 w-full md:w-1/3 rounded-lg flex-col bg-gray-800 shadow-lg"
    >
      <div className="p-4 text-2xl md:text-3xl font-semibold text-center border-b border-gray-700">
        {title}
      </div>
      <div className="flex-grow overflow-y-auto h-48 md:h-96 p-2">
        {list.map((item) => (
          <div
            onDragStart={(oEvent) => {
              oEvent.dataTransfer.setData("id", item.id);
            }}
            draggable
            key={item.id}
            className="p-4 text-lg md:text-xl bg-gray-700 rounded-lg mb-2 cursor-move hover:bg-gray-600 transition-all shadow-sm"
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
