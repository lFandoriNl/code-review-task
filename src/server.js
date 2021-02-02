import { createServer, Model } from "miragejs";

export default function () {
  createServer({
    models: {
      todo: Model,
    },

    routes() {
      this.get("/api/todos", (schema) => {
        return schema.todos.all();
      });

      this.post("/api/todos", (schema, request) => {
        console.log(request.requestBody);
        const todo = JSON.parse(request.requestBody);

        return schema.todos.create(todo);
      });
    },
  });
}
