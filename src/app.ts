/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board: number[], turn: number, winner: boolean, tie: boolean

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')

const messageEl = document.getElementById('message')!

const resetBtnEl = document.querySelector<HTMLButtonElement>('#reset')

const boardEl = document.querySelector<HTMLElement>('.board')!

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)

resetBtnEl?.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

init()
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    turn = 1
    winner = false
    tie = false
    render()
}

function render(): void {
    updateBoard()
    updateMessage()
}

function updateBoard(): void {
    board.forEach((element, idx) => {
        if (element === 1) {
            squareEls[idx].textContent = 'x'
        } else if (element === -1) {
            squareEls[idx].textContent = 'o'
        } else {
            squareEls[idx].textContent = ''
        }
    })
}

function updateMessage(): void {
    if (winner === false && tie === false) {
        messageEl.textContent = (turn === 1 ? 'Player X turn.' : 'Player O turn.')
    } else if (winner === false && tie === true) {
        messageEl.textContent = "You Tied!"
    } else {
        messageEl.textContent = (turn === 1 ? 'Player X Wins!' : 'Player O Wins!')
    }
}

function handleClick(evt: MouseEvent): void {
    if(!(evt.target instanceof HTMLElement)) return

    let sqIdx = +evt.target.id.replace('sq', '')
    if (board[sqIdx] !== null) {
        return
    } else if (winner === true) {
        return
    }

    placePiece(sqIdx)
    checkForTie()
    checkForWinner()
    switchPlayerTurn()
    render()
}

function placePiece(idx: number) {
    board[idx] = turn
}

function checkForTie(): void {
    if (board.includes(0)) return
    tie = true
    // const hasNull = board.some(function(element) {
    //     if (element === null) {
    //         tie = false
    //     } else {
    //         tie = true
    //     }
    // })
}

function checkForWinner(): void {
    winningCombos.forEach(function(arr) {
        let sum = 0
        arr.forEach(function(idx) {
            sum += board[idx]
        })
        if (sum === 3 || sum === -3) {
            winner = true
        }
    })
}

function switchPlayerTurn(): void {
    if (!winner) turn *= -1
    // if (winner === true) {
    //     return
    // } else {
    //     turn = turn * -1
    // }
}
