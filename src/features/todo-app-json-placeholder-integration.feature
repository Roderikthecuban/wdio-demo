Feature: Todo App webdriverio test integration with 3rd party API - POC
    Background:
        Given Given I am on the Example Todo App main page

    Scenario: Add 5 random tasks using JSON Placeholder
        When there are only "3" "active" random tasks
        * I add 5 random todo using JSON Placeholder
