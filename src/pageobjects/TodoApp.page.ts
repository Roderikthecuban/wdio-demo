import Page from "./page";
import { getSentence } from "../utilities/loremIpsum";
interface Task {
  text: string;
  status: string;
}

const URL = "http://todomvc.com/examples/react/#/";
class TodoAppPage extends Page {
  get inputField(): WebdriverIO.Element {
    return $(".new-todo");
  }
  get filterAll(): WebdriverIO.Element {
    return $("body > section > div > footer > ul > li:nth-child(1) > a");
  }
  get filterActive(): WebdriverIO.Element {
    return $("body > section > div > footer > ul > li:nth-child(3) > a");
  }
  get filterCompleted(): WebdriverIO.Element {
    return $("body > section > div > footer > ul > li:nth-child(5) > a");
  }

  get taskList(): WebdriverIO.Element {
    return $("body > section > div > section > ul");
  }

  get isTaskListPresent(): boolean {
    return $(".main").isExisting() ? true : false;
  }

  get toggleAllButton(): WebdriverIO.Element {
    return $("body > section > div > section > label");
  }

  get clearCompletedButton(): WebdriverIO.Element {
    return $(".clear-completed");
  }

  get todoCount(): WebdriverIO.Element {
    return $(".todo-count");
  }

  open(): void {
    super.open(URL);
    browser.pause(2000);
  }

  waitForLandingPageToLoad(): void {
    if (!this.inputField.isDisplayed()) {
      this.inputField.waitForDisplayed(5000);
    }
  }

  showAllTasks(): void {
    if (this.isTaskListPresent) this.filterAll.click();
  }

  showCompletedTasks(): void {
    if (this.isTaskListPresent) this.filterCompleted.click();
  }

  showActiveTasks(): void {
    if (this.isTaskListPresent) this.filterActive.click();
  }

  getAllTasks(): Array<Task> {
    this.showAllTasks();
    let tasks = this.getCurrentShownTasks();
    tasks = tasks ? tasks : [];
    return tasks;
  }

  getCompletedTasks(): Array<Task> {
    this.showCompletedTasks();
    const tasks = this.getCurrentShownTasks();
    return tasks;
  }

  getActiveTasks(): Array<Task> {
    this.showActiveTasks();
    const tasks = this.getCurrentShownTasks();
    return tasks;
  }

  toggleAllTasks(): void {
    this.toggleAllButton.click();
  }

  addTask(task: Task): void {
    this.inputField.clearValue();
    this.inputField.setValue(task.text);
    browser.pause(1000);
    browser.keys("Enter");
    if (task.status == "completed") this.toggleTask(task.text);
  }

  toggleTask(t: string): void {
    const tasks = this.taskList.$$("li");
    for (const row of tasks) {
      if (row.getText() === t) row.$(".toggle").click();
    }
  }

  editTask(oldText: string, newText: string, doneAction: string): void {
    const tasks = this.taskList.$$("li");
    for (const row of tasks) {
      if (row.getText() === oldText) {
        row.doubleClick();
        browser.keys(newText);
        switch (doneAction) {
          case "enter":
            browser.keys("Enter");
            break;
          case "click":
            $(".info").click();
            break;
        }
      }
    }
  }

  deleteTask(task: Task): void {
    if (this.isTaskListPresent) {
      const tasks = this.taskList.$$("li");
      for (const row of tasks) {
        if (row.getText() === task.text) {
          row.scrollIntoView();
          row.moveTo();
          browser.pause(500);
          row.$(".destroy").click();
        }
      }
    }
  }

  deleteAllTasks(): void {
    if (this.isTaskListPresent) {
      const tasks = this.taskList.$$("li");
      if (tasks.length)
        for (const row of tasks) {
          row.scrollIntoView();
          row.moveTo();
          browser.pause(500);
          row.$(".destroy").click();
        }
    }
  }

  addRandomTask(status: string): void {
    const text = getSentence();
    this.addTask({ text: text, status: "active" });
    if (status === "completed") {
      this.toggleTask(this.getTask(text).text);
    }
  }

  getTask(t: string): Task {
    const tasks = this.getCurrentShownTasks();
    const task = tasks.filter((task) => task.text === t)[0];
    return task;
  }

  getCurrentShownTasks(): Array<Task> {
    if (this.isTaskListPresent) {
      const rows = this.taskList.$$("li");
      const tasks: Array<Task> = [];
      if (Array.isArray(rows) && rows.length > 0) {
        for (const r of rows) {
          tasks.push({
            status: "active",
            text: r.getText(),
          });
        }

        //completed className is set on {li} elements which are marked as done
        for (const r of this.taskList.$$(".completed")) {
          for (const task of tasks) {
            if (task.text === r.getText()) task.status = "completed";
          }
        }
      }
      return tasks;
    }
    return [];
  }
}

export default new TodoAppPage();
