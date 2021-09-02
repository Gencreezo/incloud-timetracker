import { useState, useRef } from "react";
import TaskService from "../services/TaskService";

import useTimer from "../hooks/useTimer";
import { formatTime } from "../utils";

import Icon from "@mdi/react";
import {
  mdiPlayCircle,
  mdiPauseCircle,
  mdiContentSave,
  mdiCached,
} from "@mdi/js";

function Timer(props) {
  const {
    timer,
    isActive,
    isPaused,
    startedAt,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useTimer(0);

  const [task, setTask] = useState(props.task);

  const handleSave = () => {
    const time = formatTime(timer);
    const finishedAt = new Date();
    console.log(time);
    TaskService.patchTask(task.id, { startedAt, finishedAt, time })
      .then((response) => {
        console.log(response.log);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="stopwatch-card">
      <p>{formatTime(timer)}</p>
      <div className="buttons">
        {!isActive && !isPaused ? (
          <button className="Control-Btn" onClick={handleStart}>
            <Icon path={mdiPlayCircle} size={3} color="hsl(193, 95%, 68%)" />
          </button>
        ) : isPaused ? (
          <button className="Control-Btn" onClick={handlePause}>
            <Icon path={mdiPauseCircle} size={3} color="hsl(193, 95%, 68%)" />
          </button>
        ) : (
          <div>
            <button className="Control-Btn" onClick={handleResume}>
              <Icon path={mdiPlayCircle} size={3} color="hsl(193, 95%, 68%)" />
            </button>
            <button className="Control-Btn" onClick={handleSave}>
              <Icon path={mdiContentSave} size={3} color="hsl(193, 95%, 68%)" />
            </button>
          </div>
        )}
        <button
          className="Control-Btn"
          onClick={handleReset}
          disabled={!isActive}
        >
          <Icon path={mdiCached} size={3} color="hsl(193, 95%, 68%)" />
        </button>
      </div>
    </div>
  );
}

export default Timer;
