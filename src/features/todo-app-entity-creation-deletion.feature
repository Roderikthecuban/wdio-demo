Feature: Todo App entity (task) manipulation. Creation, Deletion, Modification.
    Background:
        Given Given I am on the Example Todo App main page

    Scenario Outline: Add 5 tasks to the application and refresh the page between each task
        When I add <todoElement> as a task
        Then I should see the <todoElement> task appear at the end of the list

        Examples:
            | todoElement                                               |
            | "Lorem ipsum dolor sit amet, consectetur adipiscing elit" |
            | "Quisque fringilla ultricies arcu"                        |
            | "Pellentesque ullamcorper ultrices nulla sit amet varius" |
            | "Ullamcorper tesque varius tar itamet"                    |
            | "Roptrierre amesiters liodorol quisiturare lampssekilte"  |

    Scenario: Add 7 random tasks, mark 3 as complete and delete 2 completed tasks
        When there are only "7" "active" random tasks
        Then I mark "3" tasks as "completed"
        Then I delete "2" "completed" tasks
        Then I delete "1" "active" tasks
        Then I should see "3" "active" tasks and "1" "completed" tasks

    Scenario: Add a random task and edit it
        When there are only "2" "active" random tasks
        Then I edit a "active" task

    Scenario: Add a random completed task and edit it
        When there are only "3" "active" random tasks
        Then I mark "1" tasks as "completed"
        Then I edit a "completed" task
