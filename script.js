'use strict';

(function () {
    const gameButtons = document.querySelector('[data-game-buttons]');
    gameButtons.addEventListener('click', handleClick);

    const resultDisplay = document.querySelector('[data-game-result]');
    const choices = document.querySelectorAll('[data-game-button]');

    const winnerGif = document.querySelector('[data-winner-gif]');

    const gamesChoices = {
        rock: {beats: ["scissors", "lizard"]},
        paper: {beats: ["rock", "spock"]},
        scissors: {beats: ["paper", "lizard"]},
        lizard: {beats: ["paper", "spock"]},
        spock: {beats: ["rock", "scissors"]}
    };

    function handleClick(e) {
        const playersChoiceAction = e.target.closest('[data-game-button]')?.dataset.gameButton;
        if(!playersChoiceAction) {
            return;
        }

        const computersChoice = getComputersChoice();
        const result = calculateResult(playersChoiceAction, computersChoice);

        setWinnerPrize(result);
        
        resultDisplay.textContent = displayWinner(result, playersChoiceAction, computersChoice);
    }

    function calculateResult(playersChoiceAction, computersChoice) {
        if (playersChoiceAction === computersChoice) {
            return "tie";
        }
        if (gamesChoices[playersChoiceAction].beats.includes(computersChoice)) {
            return "youWon";
        }
        return "computerWon";
    }

    function displayWinner(result, playersChoiceAction, computersChoice) {
        switch (result) {
            case "tie" :
                return "It's a tie. Both players won.";
            case "youWon" :
                return `Bravo, you won! ${playersChoiceAction} beats ${computersChoice}.`;
            case "computerWon" :
                return `Sorry, the computer won! ${computersChoice} beats ${playersChoiceAction}.`;
            default:
                return "Unknown result";
        }
    }

    function getComputersChoice() {
        const computersChoices = [];
        
        for (const choice of choices) {
            computersChoices.push(choice.dataset.gameButton);
        }

        const randomIndex = Math.floor(Math.random() * computersChoices.length);
        const computersChoice = computersChoices[randomIndex];

        return computersChoice;
    }

    function setWinnerPrize(result) {
        if (winnerGif.classList.contains("show")) {
            winnerGif.classList.remove("show");
        }
        if (result === "youWon") {
            winnerGif.classList.add("show");
        }
    }
})();



