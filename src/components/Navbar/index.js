import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { connect } from "react-redux";
import { inputChange, resetInput } from "../../redux/action";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1
  },
  toolBar: {
    padding: '0',
    [theme.breakpoints.down("sm")]: {
      flexDirection: 'column'
    }
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      width: '100%',
      padding: theme.spacing(1, 0),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  searchIconMenu: {
    display: 'none',
    [theme.breakpoints.down("sm")]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    [theme.breakpoints.down("sm")]: {
      width: '100%',
      marginBottom: theme.spacing(2),
      display: 'none'
    }
  },
  searchIconInput: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: theme.spacing(0, 2),
  },
  inputRoot: {
    color: 'inherit',
    width: 340,
    [theme.breakpoints.down("sm")]: {
      width: '100%'
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(6),
  },
  displayBlock: {
    display: 'block'
  }
}));

const Navbar = ({ searchInputText, inputChange, resetInput }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const menuOpen = () => setSearchOpen(!searchOpen);
  const handleUrlQuery = text => text.trim().toLowerCase().replace(" ", "-");

  const handleOnSearchSubmit = e => {
    e.preventDefault();
    setSearchOpen(false);
    const query = handleUrlQuery(searchInputText);
    history.push(`/pokemon/${query}`)
  }

  const handleSearchChange = e => {
    inputChange(e.target.value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolBar}>
            <div className={classes.title}>
              <Link
                to="/"
                className={classes.link}
                onClick={() => {
                  resetInput()
                  setSearchOpen(false)
                }}
              >
                <Typography variant="h6">
                  VINDEX
              </Typography>
              </Link>
              <IconButton color="inherit" className={classes.searchIconMenu} onClick={menuOpen}>
                <SearchIcon />
              </IconButton>
            </div>
            <div className={clsx(classes.search, { [classes.displayBlock]: searchOpen })}>
              <form onSubmit={handleOnSearchSubmit}>
                <div className={classes.searchIconInput}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Enter the pokemon name or number"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  type="search"
                  value={searchInputText}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

const mapStatetoProps = state => ({
  searchInputText: state.searchInputText
});

const mapDispatchtoProps = dispatch => ({
  inputChange: text => dispatch(inputChange(text)),
  resetInput: () => dispatch(resetInput())
});

Navbar.propTypes = {
  searchInputText: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired,
  resetInput: PropTypes.func.isRequired
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Navbar);