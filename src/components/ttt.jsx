import { useState } from 'react';

const Square = ({ value, onSquareClick }) => {
    return (
        <button
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // Return "X" or "O"
        }
    }
    return null;
}
const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));

    const [xIsNext, setXIsNext] = useState(true);

    const winner = calculateWinner(squares); // Check winner

    const handleClick = (index) => {
        if (squares[index] || winner) return;
        const newSquares = squares.slice();
        newSquares[index] = xIsNext ? "X" : "O";
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }

    function resetGame() {
        if (window.confirm("Do you really want to restart")) {
            setSquares(Array(9).fill(null));
            setXIsNext(true);
        }
    }

    return (
        <>
            <p>
                {winner
                    ? `Winner: ${winner}`
                    : squares.every(square => square !== null)
                        ? "It's a draw!"
                        : `Next player: ${xIsNext ? "X" : "O"}`
                }
            </p>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <button className='reset' onClick={resetGame}>Restart</button>
        </>
    );
}
export default Board
