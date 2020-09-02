import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import pageNotFound from "./pages/404";

const useStyles = makeStyles({
  root: {
    marginTop: 80,
  }
})

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <CssBaseLine />
      <Navbar />
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pokemon" component={Home} />
          <Route exact path="/pokemon/:query" component={PokemonDetail} />
          <Route component={pageNotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;