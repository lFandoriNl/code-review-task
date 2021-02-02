import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../../api";

export const setTodos = (todos) => {
  return {
    type: "SET_TODOS",
    todos,
  };
};

export const getTodos = () => {
  return {
    type: "GET_TODOS",
  };
};

export const createTodo = (payload) => {
  return {
    type: "CREATE_TODO",
    payload,
  };
};

export const changeTodoText = (payload) => ({
  type: "CHANGE_TODO_TEXT",
  payload,
});

function* getTodosSaga() {
  try {
    const res = yield call(fetch, "/api/todos");
    const data = yield res.json();
    yield put(setTodos(data.todos));
  } catch (e) {}
}

function* createTodoSaga({ payload }) {
  try {
    yield api.createTodo({ id: Date.now(), text: payload, complete: false });
    yield put(getTodos());
  } catch (e) {
    console.log(e);
  }
}

export function* todoListSaga() {
  yield takeEvery("GET_TODOS", getTodosSaga);
  yield takeEvery("CREATE_TODO", createTodoSaga);
}

export default (
  state = {
    todoText: "",
    todos: null,
  },
  action
) => {
  switch (action.type) {
    case "CHANGE_TODO_TEXT":
      return { ...state, todoText: action.payload };
    case "SET_TODOS":
      return { ...state, todos: action.todos };
    default:
      return state;
  }
};
