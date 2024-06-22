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
    <div className="h-screen w-screen bg-black text-white p-4 flex flex-col">
      <div className="text-7xl font-bold tracking-wide">TO DO LIST</div>
      <div className="flex gap-4 mt-4">
        <input
          value={inputValue}
          onChange={(oEvent) => setInputValue(oEvent.target.value)}
          className="text-3xl bg-white bg-opacity-15 p-2 rounded-2xl"
        />
        <button
          onClick={submitHandler}
          className="text-3xl bg-white bg-opacity-15 p-2 rounded-2xl transition-all duration-500 ease-in-out hover:bg-opacity-100 hover:text-black"
        >
          Add Task
        </button>
      </div>
      <div className="mt-4 flex-grow flex gap-4">
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
      className="flex border-2 w-1/3 h-full rounded-lg flex-col"
    >
      <div className="p-4 text-4xl font-semibold">{title}</div>
      <div className="flex-1 overflow-y-scroll">
        {list.map((item) => (
          <div
            onDragStart={(oEvent) => {
              oEvent.dataTransfer.setData("id", item.id);
            }}
            draggable
            key={item.id}
            className="p-4 text-2xl"
          >
            {item.text}
          </div>
        ))}
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
