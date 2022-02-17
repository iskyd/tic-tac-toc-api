const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const app = express();
const bodyParser = require('body-parser');
const db = new sqlite3.Database('./db.sqlite');

app.use(bodyParser.json());

db.run("create table if not exists game ( \
        id integer primary key autoincrement, \
        board text \
    )"
);

const PORT = process.env.PORT || 3000;

function validateMove(board, player, position) {
    // Position is out of board
    if(position[0] < 0 || position[0] > 2 || position[1] < 0 || position[1] > 2) {
        return false;
    }

    // One player is moving twice in a row
    flat = board.flat();
    moves_p1 = flat.filter(x => x == 1);
    moves_p2 = flat.filter(x => x == 2);
    if((player == 1 && moves_p1.length > moves_p2.length) || (player == 2 && moves_p2.length > moves_p1.length)) {
        return false;
    }

    // Position is already taken
    if(board[position[0]][position[1]] !== 0) {
        return false;
    }

    return true;
}

function checkWin(board, player, position) {
    let row = position[0];
    let col = position[1];

    // Check Row
    if(board[row].toString() == [player, player, player].toString()) {
        return true;
    }

    // Check Col
    if(board.map(function(value,index) { return value[col]; }).toString() == [player, player, player].toString()) {
       return true;
    }

    // if move is on diagonal then check diagonal and antidiagonal otherwise skip
    if(position.toString() == [0,0].toString() || position.toString() == [1,1].toString() || position.toString() == [2,2].toString() || position.toString() == [0,2].toString() || position.toString() == [2,0].toString()) {
        // Check diagonal
        if(board[0][0] == player && board[1][1] == player && board[2][2] == player) {
            return true;
        }

        // Check antidiagonal
        if(board[0][2] == player && board[1][1] == player && board[2][0] == player) {
            return true;
        }
    }

    return false;
}

app.post("/start", (req, res) => {
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    db.run("insert into game (board) values (?)", [JSON.stringify(board)], function(err) {
        if(err) {
            res.status(500).send("Error");
        } else {
            res.send(JSON.stringify({'id': this.lastID}));
        }
    });
});

app.post("/play/:game", (req, res) => {
    let game_id = req.params.game;
    let player = req.body.player;
    let position = req.body.position;

    db.get("select board from game where id = ?", [game_id], function(err, row) {
        if(err) {
            res.status(500).send("Error");
        } else {
            let board = JSON.parse(row.board);
            let valid = validateMove(board, player, position);
            if(!valid) {
                return res.status(400).send("Invalid move");
            }

            board[position[0]][position[1]] = player;

            db.run("update game set board = ? where id = ?", [JSON.stringify(board), game_id], function(err) {
                if(err) {
                    return res.status(500).send("Error");
                } else {
                    return res.send(JSON.stringify({"board": board, "winner": checkWin(board, player, position) ? player : 0}));
                }
            });
        }
    });
});

app.listen(PORT, (err) => {
    console.log("Listening")
});