import { useDispatch, useSelector } from "react-redux";
import { Todo } from "./Todo";
import { changeTodoText, createTodo, getTodos } from "./store";
import { useEffect } from "react";

export default function TodoList() {
  const dispatch = useDispatch();
  const todoText = useSelector((state) => state.todosReducer.todoText);
  const { todos } = useSelector((state) => state.todosReducer);

  if (todos) {
    useEffect(() => {
      return dispatch(getTodos());
    });
    const onClickAddTodo = () => {
      dispatch(createTodo(todoText));
      dispatch(changeTodoText(""));
    };
    return (
      <div>
        <div>
          <input
            style={{ marginRight: "1rem" }}
            value={todoText}
            onChange={(e) => dispatch(changeTodoText(e.target.value))}
          />
          <button onClick={onClickAddTodo}>Add</button>
        </div>

        <div>
          {todos.map((i, idx) => (
            <Todo key={idx} {...i} />
          ))}
        </div>
      </div>
    );
  }
  return null;
}
