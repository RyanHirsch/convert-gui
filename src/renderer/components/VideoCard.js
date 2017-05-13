import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Card, CardActions, CardMedia, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default function VideoCard({ remove, name, processingEnd, screenshot }) {
  return (
    <Card>
      <FlatButton
        icon={ <FontAwesome name="times" /> }
        onTouchTap={ remove }
      />
      <CardHeader title={ name } />
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
      </CardActions>
    </Card>
  );
}

VideoCard.propTypes = {
  remove: PropTypes.func,
  name: PropTypes.string,
  processingStart: PropTypes.number,
  processingEnd: PropTypes.number,
  screenshot: PropTypes.string,
};
