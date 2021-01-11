import { Given } from "cucumber";
import TodoAppPage from "../pageobjects/TodoApp.page";

Given(`Given I am on the Example Todo App main page`, function () {
  // Write code here that turns the phrase above into concrete actions
  TodoAppPage.open(); // navigating to login page
});
