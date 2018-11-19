import React from 'react';

import CryptoPortfolioBuilder from './CryptoPortfolioBuilder';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';

class MainPage extends React.Component {

  render() {
    console.log("portfolio parameter: " + this.getParam("portfolio"));

    return (
        <div>
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h4" color="inherit">
                Simple Cryptocurrency Portfolio Tracker
              </Typography>

            </Toolbar>
          </AppBar>

          <CryptoPortfolioBuilder/>
        </div>
      );
  }

  componentDidMount(){
    console.log(this.constructor.name+" did mount")
  }

  getParam(queryParameter){
    console.log("Getting query parameter: " + queryParameter);

    const paramsString = window.location.search.split("?")[1]||""

    const params = {}

    for (const paramString of paramsString.split("&")){
      const paramStringSplit = paramString.split("=")
      params[paramStringSplit[0]] = paramStringSplit[1]
    }

    return params[queryParameter];
  }
}

export default MainPage;
