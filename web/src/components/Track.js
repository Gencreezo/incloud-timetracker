import React, { useState } from "react";
import TaskService from "../services/TaskService";

function Tracking() {
  const [description, setDescription] = useState("");

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    TaskService.postTask({ description })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="Input-Label" value="New Task:">
          <input
            className="Textfield"
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <input className="Submit-Button" type="submit" value="Create" />
      </form>
    </div>
  );
}

export default Tracking;
