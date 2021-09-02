import { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import Timer from "../components/Timer";
import { formatTime } from "../utils";

function TaskList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    TaskService.getTasks()
      .then((response) => response.data)
      .then(
        (result) => {
          setIsLoaded(true);
          setTasks(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="Container">
        {tasks.map((task) => (
          <div className="Card" key={task.id}>
            <div className="Card-Header">
              <p className="Card-Label">{task.description}</p>
              <p className="Card-Sublabel">
                {new Date(task.time).toISOString().substr(11, 8)}
              </p>
            </div>
            <div>
              <Timer task={task} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default TaskList;
