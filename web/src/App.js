import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Track from "./components/Track";
import Book from "./components/Book";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <nav className="Navigation">
              <Link to="/tracking">
                <button className="NavigationButton left">
                  <h1>Track</h1>
                </button>
              </Link>
              <Link to="/booking">
                <button className="NavigationButton right">
                  <h1>Book</h1>
                </button>
              </Link>
            </nav>
            <Switch>
              <Route path="/tracking">
                <Track />
                <TaskList />
              </Route>
              <Route path="/booking">
                <Book />
                <TaskList />
              </Route>
              <Route path="/">
                <Track />
                <TaskList />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
