Feature: Todo App additional features.

    Background:
        Given Given I am on the Example Todo App main page

    Scenario: Testing the functionality of the toggle all button using 5 tasks
        When there are only "5" "active" random tasks
        Then I click the toggle all button
        Then I should see "5" "completed" tasks and "0" "active" tasks
        Then I click the toggle all button
        Then I should see "5" "active" tasks and "0" "completed" tasks
        Then I click the toggle all button
        Then I click the clear completed button
        Then I should see "0" "active" tasks and "0" "completed" tasks
