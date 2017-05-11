import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuBar from './MenuBar';
import DevTools from './DevTools';

class App extends Component {
  render() {
    const { hashes } = this.props;
    return (
      <div>
        <MenuBar />
        <ul>
          { hashes.map(h => <li key={ h }>{ h }</li>) }
        </ul>
        <DevTools />
      </div>
    );
  }
}
App.propTypes = {
  hashes: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps)(App);

function mapStateToProps(state) {
  return {
    hashes: Object.keys(state.previews),
  };
}
