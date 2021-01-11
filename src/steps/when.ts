import { expect } from "chai";
import { When } from "cucumber";
import TodoAppPage from "../pageobjects/TodoApp.page";
import JSONPlaceholder, { TodoTask } from "../api/JSONPlaceholder";
/*THIS IS THE NEW STUFF */

When(/^I add "([^"]*)" as a task$/, function (todoElement: string) {
  TodoAppPage.addTask({ text: todoElement, status: "active" });
});

When(/^there are only "([^"]*)" "([^"]*)" random tasks$/, function (count, status) {
  count = parseInt(count);
  TodoAppPage.showAllTasks();
  TodoAppPage.deleteAllTasks();

  for (const i of [...Array(count).keys()]) {
    TodoAppPage.addRandomTask(status);
  }
  expect(TodoAppPage.getAllTasks().length).to.equal(count);
});

When("I add {int} random todo using JSON Placeholder", function (int) {
  const todos = [];
  for (const i of [...Array(int).keys()]) {
    todos.push(JSONPlaceholder.getRandomTodo());
  }
  Promise.all(todos).then((todos: Array<TodoTask>) => {
    for (const [i, todo] of Object.entries(todos)) {
      TodoAppPage.addTask({ text: todo.title, status: todo.completed ? "completed" : "active" });
      expect(TodoAppPage.getAllTasks().length + parseInt(i)).to.equal(2 + i + 1);
    }
  });
});

const globalAny: any = global;
When("I list a batch of posts", async () => {
  const posts = await JSONPlaceholder.getPosts();
  expect(posts).to.be.an("array");
  expect(typeof posts.length).to.equal(100);
  expect(typeof posts[0].body).to.equal("string");
  expect(typeof posts[0].title).to.equal("string");
  expect(typeof posts[0].id).to.equal("number");
  expect(typeof posts[0].userId).to.equal("number");
  globalAny.posts = posts;
  console.log(globalAny.posts);
});
