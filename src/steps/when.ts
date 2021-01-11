import { expect } from "chai";
import { When } from "cucumber";
import TodoAppPage from "../pageobjects/TodoApp.page";
/*THIS IS THE NEW STUFF */

When(/^I add "([^"]*)" as a task$/, function (todoElement) {
  TodoAppPage.addTask(todoElement);
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
