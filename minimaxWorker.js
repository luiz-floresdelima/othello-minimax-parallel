const getPoints = (player, board) => {
    return board.flat(1).filter(el => el === player).length
}

const evaluate = (board) => {
    const enemyPoints = getPoints(2, board);
    const playerPoints = getPoints(1, board);
    return enemyPoints - playerPoints
}

const getFlipCellsOnMove = (board, idx,maximizingPlayer,player) => {
    // const codigo = maximizingPlayer ? 2 : 1;
    let count = 0;
    const x = idx[0]
    const y = idx[1]
    if (board[x][y] !== null) {
        return count;
    }
    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        for (let deltaX = -1; deltaX <= 1; deltaX++) {
            for (let distance = 1; ; distance++) {
                const posX = x + (distance * deltaX);
                const posY = y + (distance * deltaY);
                if (posX < 0 || posX >= 8 || posY < 0 || posY >= 8) {
                    break;
                }
                if (board[posX][posY] === null) {
                    break;
                }

                if (board[posX][posY] === player) {
                    count += distance - 1;
                    break;
                }
            }
        }
    }
    return count
}

const checkPossibleMoves = (board,maximizingPlayer,player) => {

    const possibleMoves = []

    const boardSize = 8;
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            if (getFlipCellsOnMove(board, [x, y],maximizingPlayer,player) > 0) {
                possibleMoves.push([x, y]);
            }
        }
    }

    return possibleMoves
}

const generateCopyBoard = (board) => {
    const auxBoard = board.map((arr) => [...arr])
    return [...auxBoard]
}

const makeMove = (board, idxs, isMinimax, player) => {
    const x = idxs[0];
    const y = idxs[1];
    const auxBoard = [...board];
    auxBoard[x][y] = player.codigo;

    for (let deltaY = -1; deltaY <= 1; deltaY++) {
        for (let deltaX = -1; deltaX <= 1; deltaX++) {
            for (let distance = 1; ; distance++) {
                let posX = x + (distance * deltaX);
                let posY = y + (distance * deltaY);

                if (posX < 0 || posX >= 8 || posY < 0 || posY >= 8) {
                    break;
                }

                if (auxBoard[posX][posY] === null) {
                    break;
                }

                if (auxBoard[posX][posY] === player.codigo) {
                    for (distance -= 1; distance > 0; distance--) {
                        posX = x + (distance * deltaX);
                        posY = y + (distance * deltaY);
                        auxBoard[posX][posY] = player.codigo;
                    }
                    break;
                }
            }
        }
    }
}

const minimax = (board, depth, maximizingPlayer, player) => {

    if (depth === 0) {
        return evaluate(board);
    }

    const possibleMoves = checkPossibleMoves(board,maximizingPlayer,player);

    if (maximizingPlayer) {
        let maxScore = -Infinity;

        for (const move of possibleMoves) {
            const aux = generateCopyBoard(board)
            makeMove(aux, move, true, {
                "codigo": 1,
                "color": "black"
            })
            const newBoard = [...aux];

            // Recursively call minimax with the new board and the opponent as the maximizing player
            const score = minimax(newBoard, depth - 1, false,player);

            // Update the maxScore if a higher score is found
            maxScore = Math.max(maxScore, score);
        }

        return maxScore;
    } else {
        let minScore = Infinity;

        for (const move of possibleMoves) {
            const aux = generateCopyBoard(board)
            makeMove(aux, move, true, {
                "codigo": 2,
                "color": "white"
            })
            const newBoard = [...aux];

            // Recursively call minimax with the new board and the opponent as the maximizing player
            const score = minimax(newBoard, depth - 1, true,player);

            // Update the minScore if a lower score is found
            minScore = Math.min(minScore, score);
        }

        return minScore;
    }
}

self.onmessage = function (event) {
    const { newBoard, depth, maximizingPlayer, move, player } = event.data;

    const score = minimax([...newBoard], depth-1, maximizingPlayer, player);

    self.postMessage({score,move});
};