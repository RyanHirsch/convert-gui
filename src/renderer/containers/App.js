import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuBar from './MenuBar';
import DevTools from './DevTools';
import VideoCard from '../containers/VideoCard';

class App extends Component {
  render() {
    const { previews } = this.props;
    return (
      <div>
        <MenuBar />
        <div className="video-cards">
          { previews.map(v => <VideoCard key={ v.id } data={ v } />) }
        </div>
        <DevTools />
      </div>
    );
  }
}
App.propTypes = {
  previews: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(App);

function mapStateToProps(state) {
  const hashes = Object.keys(state.previews);
  return {
    previews: hashes.map(hash => ({
      ...state.previews[hash],
      id: hash,
    })).sort((a, b) => b.processingStart - a.processingStart),
  };
}
