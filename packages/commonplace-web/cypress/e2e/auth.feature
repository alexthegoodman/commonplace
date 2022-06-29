Feature: Auth - Sign In and Sign Up
    Scenario: Sign In Correctly
        When I visit "/sign-in/"
        Then I should see an input named "email"
        Then I should see an input named "password"
        When I enter "alexthegoodman@gmail.com" into "email"
        When I enter "testing" into "password"
        When I click "GO" button
        Then I should be on "/queue"

    Scenario: Sign In With Incorrect Email  
        When I visit "/sign-in/"
        Then I should see an input named "email"
        Then I should see an input named "password"
        When I enter "alexthegoodman-123@gmail.com" into "email"
        When I enter "testing" into "password"
        When I click "GO" button
        Then I should see an error containing "Cannot find user"

    Scenario: Sign In With Incorrect Password
        When I visit "/sign-in/"
        Then I should see an input named "email"
        Then I should see an input named "password"
        When I enter "alexthegoodman@gmail.com" into "email"
        When I enter "testing-123" into "password"
        When I click "GO" button
        Then I should see an error containing "Incorrect password"

    Scenario: Sign Up Correctly
        When I visit "/sign-up/"
        Then I should see an input named "email"
        Then I should see an input named "password"
        When I enter random email into "email"
        When I enter "testing" into "password"
        When I click "GO" button
        Then I should be on "/queue"

    Scenario: Sign Up With In-Use Email  
        When I visit "/sign-up/"
        Then I should see an input named "email"
        Then I should see an input named "password"
        When I enter "alexthegoodman@gmail.com" into "email"
        When I enter "testing" into "password"
        When I click "GO" button
        Then I should see an error containing "A user with this email already exists"