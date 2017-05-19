import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removePreview } from '../../reducers/previews/actions';
import Card from '../components/VideoCard';

class VideoCard extends Component {
  constructor() {
    super();
    this.state = { isMenuOpen: false };
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }

  handleMenuChange(newMenuState) {
    this.setState({
      isMenuOpen: newMenuState,
    });
  }

  render() {
    const { isMenuOpen } = this.state;
    const {
      data,
      removePreview,
    } = this.props;
    return <Card { ...data } setMenuOpen={ this.handleMenuChange } isConvertMenuOpen={ isMenuOpen } screenshot={ data.files ? data.files[0] : null } remove={ () => removePreview(data.id) } />;
  }
}

VideoCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    processingStart: PropTypes.number,
    processingEnd: PropTypes.number,
    files: PropTypes.array,
  }),
  removePreview: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    data: ownProps.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removePreview,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
