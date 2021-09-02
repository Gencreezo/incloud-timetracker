import { useState } from "react";
import TaskService from "../services/TaskService";

function Booking() {
  const [description, setDescription] = useState();
  const [startedAtDate, setStartedAtDate] = useState();
  const [startedAtTime, setStartedAtTime] = useState();
  const [finishedAtDate, setFinishedAtDate] = useState();
  const [finishedAtTime, setFinishedAtTime] = useState();

  function handleSubmit(e) {
    const startedAt = new Date(startedAtDate + "T" + startedAtTime);
    const finishedAt = new Date(finishedAtDate + "T" + finishedAtTime);
    const time = finishedAt - startedAt;
    console.log(startedAt, finishedAt);
    TaskService.postTask({ description, startedAt, finishedAt, time })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleStartedDateChange(e) {
    console.log(e.target.value);
    setStartedAtDate(e.target.value);
  }

  function handleStartedTimeChange(e) {
    console.log(e.target.value);
    setStartedAtTime(e.target.value);
  }

  function handleFinishedDateChange(e) {
    console.log(e.target.value);
    setFinishedAtDate(e.target.value);
  }

  function handleFinishedTimeChange(e) {
    console.log(e.target.value);
    setFinishedAtTime(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <br />
        <label>
          Started At:
          <input
            type="date"
            name="startedDate"
            value={startedAtDate}
            onChange={handleStartedDateChange}
          />
          <input
            type="time"
            name="startedTime"
            value={startedAtTime}
            onChange={handleStartedTimeChange}
          />
        </label>
        <br />
        <label>
          Finished At:
          <input
            type="date"
            name="finishedDate"
            value={finishedAtDate}
            onChange={handleFinishedDateChange}
          />
          <input
            type="time"
            name="finishedTime"
            value={finishedAtTime}
            onChange={handleFinishedTimeChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Booking;
