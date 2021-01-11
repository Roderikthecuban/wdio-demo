import { expect } from "chai";
import fetch from "node-fetch";

export interface TodoTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const URL = "https://jsonplaceholder.typicode.com/todos";
const NUMBER_OF_TODOS = 200;

class JSONPlaceholder {
  get randomId(): number {
    return Math.floor(Math.random() * NUMBER_OF_TODOS) + 1;
  }

  getRandomTodo = async (): Promise<TodoTask> => {
    const response = await fetch(`${URL}/${this.randomId}`);
    expect(response.status).to.equal(200);

    const task: TodoTask = await response.json();
    expect(typeof task.id).to.equal("number");
    expect(typeof task.userId).to.equal("number");
    expect(typeof task.title).to.equal("string");
    expect(typeof task.completed).to.equal("boolean");
    return task;
  };
}

export default new JSONPlaceholder();
