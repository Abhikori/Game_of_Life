import React, { useState, useEffect, useRef } from "react";
import Controls from "./Controls";
import Canvas from "./Canvas";
import "./App.css";

const App = () => {
  const [paused, setPaused] = useState(true);
  const [grid, setGrid] = useState([]);
  const [cellSide] = useState(10);
  const [rows] = useState(30);
  const [cols] = useState(30);
  const canvasRef = useRef(null);

  // Initialize grid on component mount
  useEffect(() => {
    const initialGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ isAlive: 0 }))
    );
    setGrid(initialGrid);
  }, [rows, cols]);

  // Toggle game pause/play
  const togglePause = () => {
    setPaused(!paused);
  };

  // Clear the grid (set all cells to dead)
  const clearGrid = () => {
    const clearedGrid = grid.map(row =>
      row.map(cell => ({ ...cell, isAlive: 0 }))
    );
    setGrid(clearedGrid);
  };

  // Generate a random initial grid state
  const drawRandom = () => {
    const randomGrid = grid.map(row =>
      row.map(cell => ({
        ...cell,
        isAlive: Math.random() > 0.8 ? 1 : 0 // Adjust probability as needed
      }))
    );
    console.log(randomGrid)
    setGrid(randomGrid);
  };

  // Draw a specific pattern on the grid at coordinates (x, y)
  const drawPattern = (x, y) => {
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    
    newGrid[y][x].isAlive = newGrid[y][x].isAlive ? 0 : 1;

    setGrid(newGrid);
  };

  // Update grid state based on game rules
  const updateGrid = () => {
    if (paused) return;

    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

    const getAliveNeighbors = (y, x) => {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1],
      ];
      return directions.reduce((aliveCount, [dy, dx]) => {
        const newY = y + dy;
        const newX = x + dx;
        if (newY >= 0 && newY < rows && newX >= 0 && newX < cols) {
          return aliveCount + grid[newY][newX].isAlive;
        }
        return aliveCount;
      }, 0);
    };

    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const aliveNeighbors = getAliveNeighbors(y, x);
        if (cell.isAlive) {
          newGrid[y][x].isAlive = aliveNeighbors === 2 || aliveNeighbors === 3 ? 1 : 0;
        } else {
          newGrid[y][x].isAlive = aliveNeighbors === 3 ? 1 : 0;
        }
      });
    });

    setGrid(newGrid);
  };

  // Set up interval to update grid periodically
  useEffect(() => {
    const interval = setInterval(updateGrid, 100);
    return () => clearInterval(interval);
  }, [paused, grid]);

  return (
    <div className=" h-dvh bg-gray-700 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-white">Conway's Game of Life</h1>
      <Controls
        paused={paused}
        togglePause={togglePause}
        clearGrid={clearGrid}
        drawRandom={drawRandom}
      />
      <Canvas
        canvasRef={canvasRef}
        grid={grid}
        cellSide={cellSide}
        drawPattern={drawPattern}
      />
    </div>
  );
};

export default App;
