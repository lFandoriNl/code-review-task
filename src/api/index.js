export const api = {
  async createTodo(todo) {
    return fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
    }).then((res) => res.json());
  },
};
