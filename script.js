(function ticTactoeGame() {
    gameFlow().startGame();

    function gameFlow() {
        const { createPlayers, playerArray } = playerData();
        const { gameboardArray, updateGameboard } = gameboard();
        let currentPlayerIndex = 0;
        let continueGame = true;

        function startGame() {
            createPlayers();
            while (continueGame) {
                handleTurn();
                if (prompt("End?") === "y") {
                    continueGame = false;
                }
            }
        }

        function handleTurn() {
            let currentPlayer = playerArray[currentPlayerIndex];
            console.log(`${currentPlayer.name}'s turn!`)
            const row = Number(prompt("Please enter a row to put piece in."));
            const column = Number(prompt("Please enter a column to put piece in."));
            updateGameboard(row, column, currentPlayer.token);

            console.log("NEW BOARD")
            console.log( gameboardArray );
            currentPlayerIndex = 1 - currentPlayerIndex;
        }

        return { startGame };
    }

    function playerData() {
        let playerArray = [
            {name: null, token: "x"},
            {name: null, token: "o"}
        ];

        function createPlayers() {
            playerArray.forEach((player, index) => {
                const name = prompt(`Please enter the name for player ${index + 1}, who has token ${player.token}: `)
                player.name = name;
            })
            console.log(playerArray);
        }

        return { createPlayers, playerArray };
    }

    function gameboard() {
        let gameboardArray = [
            ["?", "?", "?"],
            ["?", "?", "?"],
            ["?", "?", "?"],
        ]

        function updateGameboard(row, column, token) {
            gameboardArray[row][column] = token;
        }

        return { gameboardArray, updateGameboard };
    }

})();