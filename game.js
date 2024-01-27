const Player = require("./player")
const Script = require("./script")

class Game {

    constructor() {
        this.players = []
        this.playerCount = 0
        this.script = new Script()
    }

    addPlayer(...players) {
        players.map((player) => this.players.push(new Player(player)))
        this.playerCount += players.length
        
    }

    get getPlayers() {
        return this.players
    }

    get getPlayerCount() {
        return this.playerCount
    }


    runGame() {
        this.script.newGame()
    }

    runFrame(...rolls) {
        for (let i = 0; i < this.playerCount; i++) {
            this.players[i].rollPlayerFrame(rolls[i][0], rolls[i][1])
        }
    }

    runFinalFrame(...rolls) {
        for (let i = 0; i < this.playerCount; i++) {
            this.players[i].rollPlayerFrame(rolls[i][0], rolls[i][1], rolls[i][2])
        }
    }

    displayScores() {
        let scoreboard = ""
        // let playerScore = ""
        
        this.players.map((player) => {
            let record = []
            player.getRecord.map((frame) => {
                if (frame[1] == undefined) {
                    record.push(`(${frame[0]})`)
                } else if (frame[2] == undefined) {
                    record.push(`(${frame[0]}, ${frame[1]})`)
                } else {
                    record.push(`(${frame[0]}, ${frame[1]}, ${frame[2]})`)
                }
            })

            scoreboard += `${player.getName}\n${record.join(", ")}\nScore: ${player.getPlayerScore()}\n\n`
        })
        return scoreboard
    }

    getTotals() {
        const totals = []
        let scorecard = undefined

        for (let i = 0; i < this.playerCount; i++) {

            scorecard = this.players[i].getPlayerScore()
            totals.push(scorecard)
        }

        return totals
    }

}

module.exports = Game