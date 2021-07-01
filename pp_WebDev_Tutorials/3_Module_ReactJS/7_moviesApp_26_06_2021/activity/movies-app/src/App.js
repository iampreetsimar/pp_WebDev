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

        {/* won't work if props are passed */}
        {/* <Route path='/about' component={AboutComponent} isAuth={true} /> */}
        {/* to pass a prop from route */}
        {/* props are router props being passed and we're adding isAuth to props list */}
        <Route path='/about' render={(props) => (
          <AboutComponent {...props} isAuth={true} />
        )} />
      </Switch>
    </Router>
  );
}

export default App;
