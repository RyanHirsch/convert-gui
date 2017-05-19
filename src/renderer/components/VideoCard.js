import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardMedia, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
// import FontAwesome from 'react-fontawesome';

const upperRight = {
  position: 'absolute',
  top: 0,
  right: 0,
};

export default function VideoCard({ setMenuOpen, isConvertMenuOpen, remove, name, processingEnd, screenshot }) {
  return (
    <Card>
      <CardHeader
        title={ name }
        children={
          <div style={ upperRight }>
            <IconButton tooltip="Remove" onTouchTap={remove} >
              <FontIcon className="fa fa-times" />
            </IconButton>
          </div>
        }
      />
      <CardMedia>
        { !processingEnd
          ? <div style={{ display: 'flex', height: '240px', width: '240px' }}><div className="loader">Loading...</div></div>
          : <img src={ screenshot } />
        }
      </CardMedia>

      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
      <CardActions>
        <IconMenu
          iconButtonElement={<RaisedButton label="Convert" />}
          open={ isConvertMenuOpen }
          onRequestChange={ setMenuOpen }
        >
          <MenuItem value="1" primaryText="Web Video" leftIcon={<FontIcon className="fa fa-video-camera" />}/>
          <MenuItem value="2" primaryText="Audio Only" leftIcon={<FontIcon className="fa fa-headphones" />}/>
        </IconMenu>
      </CardActions>
    </Card>
  );
}

VideoCard.propTypes = {
  remove: PropTypes.func,
  setMenuOpen: PropTypes.func,
  name: PropTypes.string,
  processingStart: PropTypes.number,
  processingEnd: PropTypes.number,
  screenshot: PropTypes.string,
  isConvertMenuOpen: PropTypes.bool,
};
