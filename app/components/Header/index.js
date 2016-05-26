/**
 * Created by gqadonis on 5/21/16.
 */

import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import shouldPureComponentUpdate from 'react-pure-render/function'

import getInspectorTools from '../../inspectorTools';

const inspectorTools = getInspectorTools();

class Header extends React.Component {

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    var thisComponent = this;

    inspectorTools.addComponent("Header", this, {
      properties : [
        {
          name: 'title',
          description: 'Header Title',
          propType: window.inspectorTools.PropTypes.String,
          required: false,
          setMethod: function (value) {
            console.log('In Header Component setting new title: ' + value);
            thisComponent.props.onSetTitle(value);
          },
          getMethod: function () {
            return thisComponent.props.title;
          }
        }
      ],
      actions: [
        {
          name: 'MENU_SELECT',
          dataPropTypes: [
            {
              name: 'value',
              propType: window.inspectorTools.PropTypes.Object
            }
          ]
        }
      ]
    });
  }

  componentWillUnmount() {
    inspectorTools.removeComponent("Header");
  }

  menuSelect(value) {
    this.props.onMenuSelect(value)
    inspectorTools.dispatchAction("Header", {
      name: 'MENU_SELECT',
      value: value
    })
  }

  render() {
    return (
      <AppBar title={this.props.title}
              iconElementRight = {
		                    <IconMenu
		                      iconButtonElement={
		                        <IconButton><MoreVertIcon /></IconButton>
		                      }
		                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
		                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		                      onItemTouchTap={(evt, value) => this.menuSelect(value)}
		                    >
		                      <MenuItem primaryText="Log In" />
		                    </IconMenu>
		                  }
      />
    );
  }
};

Header.propTypes = {
  title: React.PropTypes.string,
  onMenuSelect: React.PropTypes.func,
  onSetTitle: React.PropTypes.func,
};

export default Header;