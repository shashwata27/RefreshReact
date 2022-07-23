import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";
import { useState } from "react";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const tasksNoun = tasks.length !== 1 ? "tasks" : "task";
  const headingText = `${tasks.length} ${tasksNoun} remaining`;

  const addTask = (name) => {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
    console.log(tasks);
  };

  const toggleTaskComleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        console.log(task);
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const remainingTask = tasks.filter((task) => id !== task.id);
    setTasks(remainingTask);
  };

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasks.map((task) => {
          return (
            <Todo
              id={task.id}
              name={task.name}
              completed={task.completed}
              key={task.id}
              toggleTaskComleted={toggleTaskComleted}
              deleteTask={deleteTask}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
