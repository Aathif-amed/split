import React, { useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import "./splitbox.css";

function SplitBox() {
  const [boxes, setBoxes] = useState([{ x: 0, y: 0, size: 500 }]);
  const [previousBox, setPreviousBox] = useState([]);

  function splitBox(index) {
    const box = boxes[index];
    const newBoxes = [
      { x: box.x, y: box.y, size: box.size / 2 },
      { x: box.x + box.size / 2, y: box.y, size: box.size / 2 },
      { x: box.x, y: box.y + box.size / 2, size: box.size / 2 },
      { x: box.x + box.size / 2, y: box.y + box.size / 2, size: box.size / 2 },
    ];
    setPreviousBox([...boxes]);
    setBoxes([
      ...boxes.slice(0, index),
      ...newBoxes,
      ...boxes.slice(index + 1),
    ]);
  }

  function undo() {
    setBoxes([...previousBox]);
    setPreviousBox([]);
  }

  return (
    <>
      <h3 className="title"> Split Box</h3>

      <div className="resetButton">
        <div>
          <button
            className="btn btn-warning resetButton"
            onClick={() => {
              setBoxes([{ x: 0, y: 0, size: 500 }]);
            }}
          >
            <IoReloadOutline
              className="buttonIcon"
              style={{ fontSize: "20px" }}
            />{" "}
            Reset
          </button>
        </div>
        <div>
          <button
            className="btn btn-info resetButton"
            disabled={previousBox.length === 0 ? true : false}
            onClick={() => {
              undo();
            }}
          >
            <IoReloadOutline
              className="buttonIcon"
              style={{ fontSize: "20px" }}
            />{" "}
            Undo
          </button>
        </div>
      </div>

      <div className="box" style={{ width: boxes[0].size }}>
        {boxes.map((box, index) => (
          <div
            key={index}
            className="box-child"
            style={{
              width: box.size,
              height: box.size,
              top: box.y,
              left: box.x,
            }}
            onClick={() => splitBox(index)}
          />
        ))}
        {console.log(boxes)}
      </div>
    </>
  );
}

export default SplitBox;
