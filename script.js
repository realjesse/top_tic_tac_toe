(function ticTactoeGame() {
    gameFlow().startGame();

    function gameFlow() {
        const { createPlayers, playerArray } = playerData();
        const { gameboardArray, updateGameboard, isCellEligible } = gameboard();
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
            let validMove = false;
            let row, column;
            let currentPlayer = playerArray[currentPlayerIndex];
            alert(`${currentPlayer.name}'s turn!`)

            do {
                row = Number(prompt("Please enter a row to put piece in."));
                column = Number(prompt("Please enter a column to put piece in."));
                validMove = isCellEligible(row, column);
                if (!validMove) {
                    alert("Not a valid cell! Please try again.");
                }
            } while (!validMove)
            
            updateGameboard(row, column, currentPlayer.token);
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

        function isCellEligible(row, column) {
            // Check if row and column are in bounds of board
            if (row < 0 || row > 2 || column < 0 || column > 2) {
                return false;
            }
            return gameboardArray[row][column] === "?";
        }
        
        // Check if cell is "?", meaning it is unclaimed
        return { gameboardArray, updateGameboard, isCellEligible };
    }

})();