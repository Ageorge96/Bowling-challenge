const Scorecard = require("../scorecard")
const Game = require("../game");
const Player = require("../player");


describe("Game", () => {
    test("When game starts player list is empty", () => {
        const game = new Game();
        expect(game.getPlayers).toEqual([])
    })

    test("When game starts player count is 0", () => {
        const game = new Game();
        expect(game.getPlayerCount).toBe(0)
    })

    test("When player is added to game, they are added to the player list", () => {
        const game = new Game();
        game.addPlayer('player1')
        expect(game.getPlayers[0].getName).toEqual('player1')
    })

    test("When player is added to game, player count is updated", () => {
        const game = new Game();
        game.addPlayer('player1')
        expect(game.getPlayerCount).toEqual(1)
    })

    test("When multiple players are added to game, the player count is updated", () => {
        const game = new Game();
        game.addPlayer('player1')
        game.addPlayer('player2')
        game.addPlayer('player3')
        expect(game.getPlayers[2].name).toEqual("player3")
    })

    test("When multiple players are added to game, the player list is updated", () => {
        const game = new Game();
        game.addPlayer('player1')
        game.addPlayer('player1')
        game.addPlayer('player1')
        expect(game.getPlayerCount).toEqual(3)
    })

    test("When multiple players are added to game in single add player call", () => {
        const game = new Game();
        game.addPlayer('player1', 'player2', 'player3')
        expect(game.getPlayers[2].name).toEqual("player3")
    })

    test("When multiple players are added to game in single add player call", () => {
        const game = new Game();
        game.addPlayer('player1', 'player2', 'player3')
        expect(game.getPlayerCount).toEqual(3)
    })

    test("When a player is add they a given a scorecard", () => {
        const game = new Game()
        game.addPlayer('player1')
        const playerScorecard = game.getPlayers[0].scorecard.getRecord
        expect(playerScorecard).toEqual([])
    })

    test("When a frame is complete in a single player game, the score is recorded", () => {
        const game = new Game()
        game.addPlayer('player1')
        game.runFrame([2, 4])
        const playerScorecard = game.getPlayers[0].scorecard.getRecord
        expect(playerScorecard).toEqual([[2, 4]])
    })

    it("Displays the player's score after the first frame", () => {
        const game = new Game()
        game.addPlayer('player1')
        game.runFrame([2, 4])
        expect(game.displayScores()).toEqual("player1\n(2, 4)\nScore: 6\n\n")
    })

    it("Displays the players' score after the first frame", () => {
        const game = new Game()
        game.addPlayer('player1', 'player2', 'player3')
        game.runFrame([2, 4], [3, 4], [1, 8])
        expect(game.displayScores()).toEqual("player1\n(2, 4)\nScore: 6\n\nplayer2\n(3, 4)\nScore: 7\n\nplayer3\n(1, 8)\nScore: 9\n\n")
    })

    

    it("Displays a single player's score after a few frame", () => {
        const game = new Game()
        game.addPlayer('player1')
        game.runFrame([2, 4])
        game.runFrame([2, 4])
        game.runFrame([2, 4])
        game.runFrame([2, 4])
        expect(game.displayScores()).toEqual("player1\n(2, 4), (2, 4), (2, 4), (2, 4)\nScore: 24\n\n")
    })

    it("Displays player's score after a few frame", () => {
        const game = new Game()
        game.addPlayer('player1', "player2", "player3")
        game.runFrame([2, 4], [3, 4], [1, 8])
        game.runFrame([2, 2], [4, 2], [8, 1])
        game.runFrame([6, 0], [2, 7], [0, 0])
        expect(game.displayScores()).toEqual("player1\n(2, 4), (2, 2), (6, 0)\nScore: 16\n\n" +
        "player2\n(3, 4), (4, 2), (2, 7)\nScore: 22\n\n" +
        "player3\n(1, 8), (8, 1), (0, 0)\nScore: 18\n\n"
        )
    })

    test("When a single player game is complete the score is totaled", () => {
        const game = new Game()
        game.addPlayer('player1')
        for (let i = 0; i < 9; i++) {
            game.runFrame([1, '/']);
        }
        game.runFinalFrame(['X', 3, '/']);
        expect(game.getTotals()[0]).toBe(128);
    })

    test("When a single player game is complete the score is displayed", () => {
        const game = new Game()
        game.addPlayer('player1')
        for (let i = 0; i < 9; i++) {
            game.runFrame([1, '/']);
        }
        game.runFinalFrame(['X', 3, '/']);
        expect(game.displayScores()).toBe("player1\n(1, /), (1, /), (1, /), (1, /), (1, /), " +
        "(1, /), (1, /), (1, /), (1, /), (X, 3, /)\nScore: 128\n\n");
    })

    test("When a three player game is complete all scores iare displayed", () => {
        const game = new Game()
        game.addPlayer('player1', 'player2', 'player3')
        for (let i = 0; i < 9; i++) {
            game.runFrame([1, '/'], ['X'], [2, 2]);
        }
        game.runFinalFrame(['X', 3, '/'], ['X', 'X', 'X'], [2, 2]);
        expect(game.displayScores()).toBe("player1\n(1, /), (1, /), (1, /), (1, /), (1, /), " +
        "(1, /), (1, /), (1, /), (1, /), (X, 3, /)\nScore: 128\n\n" +
        "player2\n(X), (X), (X), (X), (X), " +
        "(X), (X), (X), (X), (X, X, X)\nScore: 300\n\n" +
        "player3\n(2, 2), (2, 2), (2, 2), (2, 2), (2, 2), " +
        "(2, 2), (2, 2), (2, 2), (2, 2), (2, 2)\nScore: 40\n\n"
        );
    })







    //############ OBSELETE TESTS ###############
    test.skip("When a frame is complete in a three player game, all scores are recorded", () => {
        const game = new Game()
        game.addPlayer('player1', "player2", "player3")
        game.runFrame([2, 4], [3, 4], [1, 8])
        expect(game.getScoreCards).toEqual({
            "player1" :[[2, 4]], 
            "player2": [[3, 4]], 
            "player3":[[1, 8]]})
    })

    test.skip("When a three frames are complete in a three player game, all scores are recorded", () => {
        const game = new Game()
        game.addPlayer('player1', "player2", "player3")
        game.runFrame([2, 4], [3, 4], [1, 8])
        game.runFrame([2, 2], [4, 2], [8, 1])
        game.runFrame([6, 0], [2, 7], [0, 0])
        expect(game.getScoreCards).toEqual({
            "player1" :[[2, 4], [2, 2], [6, 0]], 
            "player2": [[3, 4], [4, 2], [2, 7]], 
            "player3":[[1, 8], [8, 1], [0, 0]]
        })
    })
})