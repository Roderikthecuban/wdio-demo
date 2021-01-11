Feature: Todo App filtering

    Background:
        Given Given I am on the Example Todo App main page


    Scenario: Add 10 random tasks, mark 4 as completed and test filtering functionality and counter
        When there are only "10" "active" random tasks
        Then I mark "4" tasks as "completed"
        Then I should see "6" "active" tasks and "4" "completed" tasks
        * I should see "6" "active" tasks if I filter for these tasks
        * I should see "4" "completed" tasks if I filter for these tasks
        * I should see "6" items left

    Scenario: Testing the functionality of the toggle all button using 5 tasks
        When there are only "5" "active" random tasks
        Then I click the toggle all button
        Then I should see "5" "completed" tasks and "0" "active" tasks
        Then I click the toggle all button
        Then I should see "5" "active" tasks and "0" "completed" tasks
        Then I click the toggle all button
        Then I click the clear completed button
        Then I should see "0" "active" tasks and "0" "completed" tasks
