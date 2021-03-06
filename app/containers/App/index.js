/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyTheme from '../../material_ui_theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Img from 'components/Img';
import Footer from 'components/Footer';
import Banner from './banner-metal.jpg';
import A from 'components/A';

import styles from './styles.css';

import getInspectorTools from '../../inspectorTools';

const inspectorTools = getInspectorTools();

const muiTheme = getMuiTheme(MyTheme);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

function App(props) {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={styles.wrapper}>

        {props.children}
        <Footer />

      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;