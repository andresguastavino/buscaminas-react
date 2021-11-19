import { useState, useEffect } from 'react';
import Cell from './components/Cell';
import './App.css'

function App() {

    const [gridX, setGridX] = useState(5);
    const [gridY, setGridY] = useState(5);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [updateGrid, setUpdateGrid] = useState(false);
    const [cells, setCells] = useState(['']);
    const [cellsData, setCellsData] = useState([]);

    useEffect(() => {
        initCellsData();
    }, []);

    useEffect(() => {
        initGrid();
        setUpdateGrid(false);
    }, [cellsData, updateGrid]);

    const reveal = (cellData) => {
        if(!cellData.revealed && !gameOver) {
            revealHandler(cellData);
        }
    }

    const revealHandler = (cellData) => {
        cellData.value === 0 && revealZero(cellData);
        cellData.value !== 0 && revealDiffThanZero(cellData);
        cellData.isBomb && revealBomb(cellData);
    }

    const revealZero = (cellData) => {
        let cellsToCheck = [];
        cellsToCheck.push(cellData);

        let checkedCells = [];
        for(let i = 0; i < gridX; i++) {
            checkedCells[i] = [];

            for(let j = 0; j < gridY; j++) {
                checkedCells[i][j] = false;
            }
        }

        while(cellsToCheck.length > 0) {
            let currentCell = cellsToCheck.shift();
            let { x, y, revealed } = currentCell;

            if(!revealed) {
                checkedCells[x][y] = true;

                let xMin = x - 1 > 0 ? x - 1 : 0;
                let xMax = x + 1 < gridX ? x + 1 : gridX - 1;
                let yMin = y - 1 > 0 ? y - 1 : 0;
                let yMax = y + 1 < gridY ? y + 1 : gridY - 1;

                if(currentCell.value === 0) {
                    for(let i = xMin; i <= xMax; i++) {
                        for(let j = yMin; j <= yMax; j++) {
                            if(!checkedCells[i][j]) {
                                cellsToCheck.push(cellsData[i][j]);
                            }
                        }
                    }
                }

                if(!currentCell.isBomb) {
                    revealDiffThanZero(currentCell);
                }
            }
        }
    }

    const revealDiffThanZero = (cellData) => {
        let { value } = cellData;
        setScore(prevScore => prevScore + value);
        showValue(cellData);
    }

    const revealBomb = (cellData) => {
        showValue(cellData);
        setGameOver(true);
    }

    const showValue = (cellData) => {
        let { x, y } = cellData;
        setCellsData(prevCellsData => {
            prevCellsData[x][y].revealed = true;
            return prevCellsData;
        });
        setUpdateGrid(true);
    }

    const initCellsData = () => {
        for(let i = 0; i < gridX; i++) {
            cellsData[i] = [];

            for(let j = 0; j < gridY; j++) {
                let randomInt = Math.floor(Math.random() * (6 - -1)) + -1;

                let cellData = {
                    x: i,
                    y: j,
                    value: randomInt >= 0 ? randomInt : null,
                    revealed: false,
                    isBomb: randomInt < 0
                };

                cellsData[i][j] = cellData;
            }
        }

        setCellsData(cellsData);
    }

    const initGrid = () => {
        if(cellsData.length === 0) {
            return;
        }

        let cells = [];

        for(let i = 0; i < gridX; i++) {
            cells[i] = [];

            for(let j = 0; j < gridY; j++) {
                let cellData = cellsData[i][j];
                cells[i][j] = <Cell key={`${i}-${j}`} {...cellData} reveal={reveal} />;
            }
        }

        setCells(cells);
    }
    

    const showGrid = () => {
        let grid = [];

        for(let i = 0; i < gridX; i++) {
            let row = [];

            for(let j = 0; j < gridY; j++) {
                row.push(cells[i][j]);
            }

            grid.push(<div key={i} className="Row">{row}</div>);
        }

        return grid;
    }

    return (
        <div className="App">
            {
                gameOver
                ? (
                    <div className="GameOverContainer">
                        <div className="GameOver">
                            <p>
                                Game Over! :(
                            </p>
                            <p>
                                Final score: {score}
                            </p>
                        </div>
                    </div>
                ) 
                : null
            }
            <div className="Score">
                Score: {score}
            </div>
            <div className="Grid">            
                {cells.length > 0 && cellsData.length > 0 && showGrid()}
            </div>
        </div>
    );
}

export default App;
