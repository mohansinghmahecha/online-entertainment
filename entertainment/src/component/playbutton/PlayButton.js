import React from "react";
import "./playbutton.css";
import { IoIosPlay } from "react-icons/io";

export default function PlayButton() {
  return (
    <div className="play-button-container">
      <div className="flex play-button gap-2  text-white">
        <IoIosPlay className="mt-1"/> <span> &nbsp;Play</span>
      </div>
    </div>
  );
}
