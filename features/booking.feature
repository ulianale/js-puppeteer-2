Feature: Booking tests
    Scenario: Booking one free ticket
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose date
        When user choose time of movie
        When user choose avalible place
        When user click button
        When user click button to get booking code 
        Then user get the code and text "Электронный билет"

    Scenario: Booking two free tickets
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose date
        When user choose time of movie
        When user choose the first avalible place
        When user choose the second avalible place
        When user click button
        When user click button to get booking code 
        Then user get the code and text "Электронный билет"

    Scenario: Try to book busy place 
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user choose date has been choosen earlier
        When user choose time of movie has been choosen earlier
        When user choose a busy place
        When user click button
        Then button is inactive "true"