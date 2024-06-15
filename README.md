# Frontend Mentor - Hangman game

## The challenge

Your challenge is to build out this Hangman game and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

We provide the data in a local `data.json` file for you to use for word selections.

Your users should be able to:

- Learn how to play Hangman from the main menu.
- Start a game and choose a category.
- Play Hangman with a random word selected from that category.
- See their current health decrease based on incorrect letter guesses.
- Win the game if they complete the whole word.
- Lose the game if they make eight wrong guesses.
- Pause the game and choose to continue, pick a new category, or quit.
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.
- Navigate the entire game only using their keyboard.

### Expected behaviour

- You can make the default screen the main menu or the in-game board. Note that we're using the in-game design for the design screenshot, so if you choose the main menu, it won't match up in the design comparison slider. This isn't a big deal, but it is something worth considering. We recommend using the in-game page as the default for solution submission so that the screenshot matches and then switching your code to make the main menu the default screen for new players.
- Pick a random word from the chosen category to start a game. You'll need to work out the spacing for words and when to break to a new line, as some names/titles are (intentionally) long.
- If the player guesses a letter correctly, fill in all relevant spaces and disable the letter on the keyboard.
- If the player guesses incorrectly, disable the letter on the keyboard and reduce the health meter. The health meter should empty after eight wrong guesses. The player loses at this point, and the menu appears.
- Selecting "play again" on the menu starts a new game with the same category. Selecting "new category" navigates to the "pick a category" screen. Quitting navigates back to the main menu.
- Players should never be shown the same name/title multiple times if they play more than one game in a visit. The JSON data has a "selected" boolean to help you filter already played options.
- Clicking the hamburger menu during a game should show the "paused" menu.

## Submitting your solution

Submit your solution on the platform for the rest of the community to see. Follow our ["Complete guide to submitting solutions"](https://medium.com/frontend-mentor/a-complete-guide-to-submitting-solutions-on-frontend-mentor-ac6384162248) for tips on how to do this.

Remember, if you're looking for feedback on your solution, be sure to ask questions when submitting it. The more specific and detailed you are with your questions, the higher the chance you'll get valuable feedback from the community.

## Sharing your solution

There are multiple places you can share your solution:

1. Share your solution page in the **#finished-projects** channel of our [community](https://www.frontendmentor.io/community).
2. Tweet [@frontendmentor](https://twitter.com/frontendmentor) and mention **@frontendmentor**, including the repo and live URLs in the tweet. We'd love to take a look at what you've built and help share it around.
3. Share your solution on other social channels like LinkedIn.
4. Blog about your experience building your project. Writing about your workflow, technical choices, and talking through your code is a brilliant way to reinforce what you've learned. Great platforms to write on are [dev.to](https://dev.to/), [Hashnode](https://hashnode.com/), and [CodeNewbie](https://community.codenewbie.org/).

We provide templates to help you share your solution once you've submitted it on the platform. Please do edit them and include specific questions when you're looking for feedback.

The more specific you are with your questions the more likely it is that another member of the community will give you feedback.
