// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
const prompt = require('prompt-sync')();

class Script {

    newGame() {
        let player = []
        console.log("Welcome to the Decor Bowling Alley")
        while (true) {
            let newPlayerRequest = prompt("Enter player name: ")
            player.push(newPlayerRequest)
            console.log(`${player.join(", ")}, Are all players present?`)

            if(player.length == 4) {
                break
            }
        }
        
        return playerCountRequest
    }

}

module.exports = Script