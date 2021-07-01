import MoviesComponent from "./Components/MoviesComponent";
import HomeComponent from "./Components/HomeComponent";
import AboutComponent from "./Components/AboutComponent";
import NavComponent from "./NavComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavComponent />
      <Switch>
        <Route path='/' exact component={HomeComponent} />
        <Route path='/movies' component={MoviesComponent} />
        <Route path='/about' component={AboutComponent} />
      </Switch>
    </Router>
  );
}

export default App;
