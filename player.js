const Scorecard = require("./scorecard")

class Player {

    constructor(name) {
        this.name = name
        this.scorecard = new Scorecard()
    }

    get getName() {
        return this.name
    }

    get getScoreCard() {
        return this.scorecard
    }

    get getRecord() {
        return this.scorecard.getRecord
    }

    getPlayerScore() {
        return this.scorecard.calculateScore()
    }

    rollPlayerFrame(roll_one, roll_two, roll_three) {
        if (roll_three == undefined) {
            this.scorecard.frame(roll_one, roll_two)
        } else {
            this.scorecard.frame(roll_one, roll_two, roll_three)
        }
    }
}

module.exports = Player