import "./App.css";
import { Route, Switch } from "react-router-dom";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";

function App() {
  const btnText = {
    btn1: "Go To Page 2",
    btn2: "Go To Page 1",
  };
  return (
    <div className="App">
      <h1>Welcome to FrontEnd-Task</h1>
      <Switch>
        <Route exact path="/">
          <Page1 btnText={btnText} />
        </Route>
        <Route exact path="/info">
          <Page2 btnText={btnText} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
