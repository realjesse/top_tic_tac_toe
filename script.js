(function ticTactoeGame() {
    gameFlow().startGame();

    function gameFlow() {
        function startGame() {
            playerData().createPlayers();
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

        return { createPlayers };
    }
})();