Feature: Queue
    Background: Create Fresh User
        When I visit "/sign-up/"
        When I enter random email into "email"
        When I enter "testing" into "password"
        When I click "GO" button
        Then I should be on "/queue"

    Scenario: Give Impression
        When I visit "/queue/"
        Then I should see user content
        Then I should see related information
        Then I should see "0 Credits" in credit indicator
        When I select "Classy" Impression
        When I wait "2" seconds
        Then I should see new user content
        Then I should see new related information
        Then I should see "1 Credits" in credit indicator

    Scenario: Select Interest
        When I visit "/queue/"
        When I click the interests button
        Then I should see the interests modal
        Then I should see "No Interest Selected" in interest preview
        Then I should see categories and interests
        Then I should see the first category selected
        When I select the second category
        Then I should see new interests display
        When I select the first interest
        Then I should see the first interest in interest preview
        When I click the "Confirm" button
        Then I should see the queue
        Then I should see the first interest in the interests button

    Scenario: Use Impression Toolbar

    Scenario: Visit Creator Profile

    Scenario: Visit Upload

    Scenario: Visit Profile

    Scenario: Visit Updates