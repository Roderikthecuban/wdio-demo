Feature: Todo App entity (task) manipulation. Modification.
    Background:
        Given Given I am on the Example Todo App main page

    Scenario: Add a random task and edit it
        When there are only "2" "active" random tasks
        Then I edit a "active" task

    Scenario: Add a random completed task and edit it
        When there are only "3" "active" random tasks
        Then I mark "1" tasks as "completed"
        Then I edit a "completed" task
