(function ticTactoeGame() {
    const { createPlayers, playerArray } = playerData();
    const { updatePlayerName } = handleUI();
    let currentPlayerIndex = 0;
    gameFlow().startGame();

    function gameFlow() {
        // const { createPlayers, playerArray } = playerData();
        const { gameboardArray, updateGameboard, isCellEligible } = gameboard();
        let continueGame = true;

        function startGame() {
            createPlayers();
            // while (continueGame) {
            //     handleTurn();
            //     if (prompt("End?") === "y") {
            //         continueGame = false;
            //     }
            // }
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
            if (checkWin()) alert("YOU WIN!");
            console.log( gameboardArray );
            currentPlayerIndex = 1 - currentPlayerIndex;
        }

        function checkWin() {
            function checkThreeTokens(tokenArray) {
                return tokenArray[0] !== "?" && tokenArray.every(token => token === tokenArray[0]);
            }

            function checkRows() {
                for (const row of gameboardArray) {
                    if (checkThreeTokens(row)) {
                        return row[0];
                    }
                }
                return null;
            }

            function checkColumns() {
                for (let i = 0; i < 3; i++) {
                    let columnArray = [gameboardArray[0][i], gameboardArray[1][i], gameboardArray[2][i]]
                    if (checkThreeTokens(columnArray)) {
                        return columnArray[0];
                    }
                }
                return null;
            }

            function checkDiagonals() {
                // check positive sloped diagonal
                let positiveSlopedDiagonal = [gameboardArray[2][0], gameboardArray[1][1], gameboardArray[0][2]];
                if (checkThreeTokens(positiveSlopedDiagonal)) {
                    return positiveSlopedDiagonal[0];
                }
                // Check negative sloped diagonal
                let negativeSLopedDiagonal = [gameboardArray[0][0], gameboardArray[1][1], gameboardArray[2][2]];
                console.log(negativeSLopedDiagonal);
                if (checkThreeTokens(negativeSLopedDiagonal)) {
                    return negativeSLopedDiagonal[0];
                }
                // Else, return null
                return null;
            }

            return checkRows() || checkColumns() || checkDiagonals() || false;
        }

        return { startGame };
    }

    function playerData() {
        let playerArray = [
            {name: null, token: "x"},
            {name: null, token: "o"}
        ];

        function createPlayers() {
            const nameFormNode = document.querySelector(".name-form");
            const nameDialogNode = document.querySelector(".name-dialog");
            const firstNameNode = document.querySelector("#firstName");
            const secondNameNode = document.querySelector("#secondName");

            nameDialogNode.showModal();

            nameFormNode.addEventListener("submit", e => {
                e.preventDefault();

                // Assign values
                playerArray[0]["name"] = firstNameNode.value;
                playerArray[1]["name"] = secondNameNode.value;

                // Clear values
                firstNameNode.value = "";
                secondNameNode.value = "";
                updatePlayerName(currentPlayerIndex);

                nameDialogNode.close();
            })
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
            if (!Number.isInteger(row) || 
                !Number.isInteger(column) || 
                row < 0 || 
                row > 2 || 
                column < 0 || 
                column > 2
                ) {
                return false;
            }
            return gameboardArray[row][column] === "?";
        }
        
        // Check if cell is "?", meaning it is unclaimed
        return { gameboardArray, updateGameboard, isCellEligible };
    }

    function handleUI() {

        function updatePlayerName(playerIndex) {
            const playerNameParagraph = document.querySelector(".player-turn");

            if (playerIndex === 0) {
                playerNameParagraph.textContent = `${playerArray[0]["name"]}'s turn!`;
            }
            else {
                playerNameParagraph.textContent = `${playerArray[1]["name"]}'s turn!`;
            }
        }

        return { updatePlayerName };
    }

})();