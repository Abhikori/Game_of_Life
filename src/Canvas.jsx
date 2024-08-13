import React, { useEffect } from "react";

const Canvas = ({ canvasRef, grid, cellSide, drawPattern }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grid.forEach((row, i) => {
        row.forEach((cell, j) => {
          ctx.fillStyle = cell.isAlive ? "white" : "black";
          ctx.fillRect(j * cellSide, i * cellSide, cellSide - 1, cellSide - 1);
        });
      });
    };

    drawGrid();
  }, [grid, cellSide, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="border border-white overflow-hidden"
      onClick={(e) => {
        const rect = e.target.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / cellSide);
        const y = Math.floor((e.clientY - rect.top) / cellSide);
        drawPattern(x, y);
      }}
    />
  );
};

export default Canvas;
