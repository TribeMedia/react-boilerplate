/**
 * Created by gqadonis on 5/21/16.
 */

import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const Header = (props) => (
  <AppBar title="A/B Testing User App"
          iconElementRight = {
		                    <IconMenu
		                      iconButtonElement={
		                        <IconButton><MoreVertIcon /></IconButton>
		                      }
		                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
		                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		                      onItemTouchTap={(evt, value) => props.onMenuSelect(value)}
		                    >
		                      <MenuItem primaryText="Log In" />
		                    </IconMenu>
		                  }
  />
);

Header.propTypes = {
  onMenuSelect: React.PropTypes.func,
}

export default Header;