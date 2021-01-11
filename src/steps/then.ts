import { expect } from "chai";
import { Then } from "cucumber";
import { sample } from "lodash";
import JSONPlaceholder, { Post } from "../api/JSONPlaceholder";
import TodoAppPage from "../pageobjects/TodoApp.page";

Then(/^I should see the "([^"]*)" task appear at the end of the list$/, function (task: string) {
  const tasks = TodoAppPage.getAllTasks();
  expect(tasks[tasks.length - 1].text)
    .to.be.an("string")
    .that.equal(task);
  expect(tasks[tasks.length - 1].status).to.equal("active");
});

Then(/^I should see "([^"]*)" items left$/, function (count) {
  expect(TodoAppPage.todoCount.getText())
    .to.be.an("string")
    .that.equal(count + " items left");
});

Then(/^I edit a "([^"]*)" task$/, function (status) {
  let tasks = TodoAppPage.getAllTasks().filter((t) => t.status == status);
  const task = sample(tasks);
  const newText = " Edited: " + Date.now();
  TodoAppPage.editTask(task.text, newText, "enter");

  tasks = TodoAppPage.getAllTasks().filter((t) => (t.status = status));
  const editedTask = tasks.filter((t) => t.text == task.text + newText)[0];
  expect(editedTask.status).to.equal(status);
});

Then("I click the toggle all button", function () {
  if (TodoAppPage.isTaskListPresent) {
    TodoAppPage.toggleAllTasks();
  }
});

Then("I click the clear completed button", function () {
  if (TodoAppPage.isTaskListPresent) TodoAppPage.clearCompletedButton.click();
});

Then(
  /^I should see "([^"]*)" "([^"]*)" tasks and "([^"]*)" "([^"]*)" tasks$/,
  function (count1, status1, count2, status2) {
    const params = [
      {
        status: status1,
        count: parseInt(count1),
      },
      {
        status: status2,
        count: parseInt(count2),
      },
    ];

    const tasks = TodoAppPage.getAllTasks();
    for (const pair of params) {
      switch (pair.status) {
        case "active":
          expect(tasks.filter((t) => t.status == "active").length).to.equal(pair.count);
          break;
        case "completed":
          expect(tasks.filter((t) => t.status == "completed").length).to.equal(pair.count);
          break;
      }
    }
    expect(tasks.length).to.equal(params[0].count + params[1].count);
  }
);

Then(/^I should see "([^"]*)" "([^"]*)" tasks if I filter for these tasks$/, function (count, status) {
  count = parseInt(count);
  switch (status) {
    case "active":
      expect(TodoAppPage.getActiveTasks().filter((t) => t.status == "active").length).to.equal(count);
      break;
    case "completed":
      expect(TodoAppPage.getCompletedTasks().filter((t) => t.status == "completed").length).to.equal(count);
      break;
  }
});

Then(/^I delete "([^"]*)" "([^"]*)" tasks$/, function (count, status) {
  count = parseInt(count);
  let tasks = TodoAppPage.getAllTasks().filter((task) => task.status === status);
  const selectedTasks = [];
  for (const i of [...Array(count).keys()]) {
    const sampleTask = sample(tasks);
    TodoAppPage.deleteTask(sampleTask);
    selectedTasks.push(sampleTask.text);
    tasks = tasks.filter((t) => t.text !== sampleTask.text);
  }

  const tasksAfterAction = TodoAppPage.getAllTasks()
    .filter((task) => task.status === status)
    .map((r) => r.text);
  selectedTasks.forEach((selectedTask) => {
    expect(tasksAfterAction).to.be.an("array").that.not.contain(selectedTask);
  });
});

Then(/^I mark "([^"]*)" tasks as "([^"]*)"$/, function (count, status) {
  count = parseInt(count);
  const selectedTasks = [];
  for (const i of [...Array(count).keys()]) {
    const tasks = TodoAppPage.getAllTasks().filter((task) => task.status !== status);
    const sampleTask = sample(tasks);
    TodoAppPage.toggleTask(sampleTask.text);
    selectedTasks.push(sampleTask.text);
  }

  const tasksAfterAction = TodoAppPage.getAllTasks()
    .filter((task) => task.status === status)
    .map((r) => r.text);
  selectedTasks.forEach((selectedTask) => {
    expect(tasksAfterAction).to.be.an("array").that.contains(selectedTask);
  });
});

const globalAny: any = global;
Then("I can update and delete a random post from the list", async () => {
  const randomPost: Post = sample(globalAny.posts);
  const newPost = { ...randomPost, title: "Edited" };
  const updatedPost: Post = await JSONPlaceholder.patchPost(newPost);
  expect(updatedPost.id).to.equal(newPost.id);
  expect(updatedPost.userId).to.equal(newPost.userId);
  expect(updatedPost.title).to.equal(newPost.title);
  expect(updatedPost.body).to.equal(newPost.body);

  const newPost2 = { ...randomPost, title: "Edited2" };
  const updatedPost2: Post = await JSONPlaceholder.putPost(newPost);
  expect(updatedPost2.id).to.equal(newPost2.id);
  expect(updatedPost2.userId).to.equal(newPost2.userId);
  expect(updatedPost2.title).to.equal(newPost2.title);
  expect(updatedPost2.body).to.equal(newPost2.body);

  const deleteResponse = JSONPlaceholder.deletePost(randomPost.id);
  expect({}).to.equal(deleteResponse);
});
