# Run
This will run the server on port 3000, if you need to change it just env variable PORT
```sh
npm install
npm start
```

# Game play (row win)
Player 1 win in the first row

```sh
curl -XPOST http://localhost:3000/start
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 1, "position": [0,0]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 2, "position": [2,2]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 1, "position": [0,1]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 2, "position": [1,1]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 1, "position": [0,2]}'
```

Game play (column win)
Player 1 win in the middle column

```sh
curl -XPOST http://localhost:3000/start
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 1, "position": [1,1]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 2, "position": [0,0]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 1, "position": [0,1]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 2, "position": [2,2]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 1, "position": [2,1]}'
```

Game play (diagonal win)
Player 1 win in diagonal

```sh
curl -XPOST http://localhost:3000/start
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 1, "position": [0,0]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 2, "position": [0,1]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 1, "position": [1,1]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 2, "position": [0,2]}'
curl -XPOST localhost:3000/play/<id>  -H 'Content-Type: application/json' -d '{"player": 1, "position": [2,2]}'
```

