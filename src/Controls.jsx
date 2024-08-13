import React from "react";

const Controls = ({ paused, togglePause, clearGrid, drawRandom }) => {
    return (
      <div className="w-1/4  mb-4 p-4 border border-green-800 bg-white rounded overflow-hidden">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={togglePause}
        >
          {paused ? "Play" : "Pause"}
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
          onClick={clearGrid}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={drawRandom}
        >
          Random
        </button>
      </div>
    );
  };

export default Controls;
