import React from 'react';
import PropTypes from 'prop-types';

function buildBar(contents) {
  return (
    <div className="progress">
      { contents }
    </div>
  );
}

export default function ProgressBar({ percent }) {
  const displayPercent = percent ? (percent * 100).toFixed(1) : '0.0';
  if(percent < 1) {
    if(percent > 0) {
      return buildBar(<div className="progress__running" style={ { width: `${displayPercent}%` } }>
        { displayPercent }%
      </div>);
    }
    return buildBar(<div className="progress__none">Not Started</div>);
  }
  return buildBar(<div className="progress__done">Complete!</div>);
}

ProgressBar.propTypes = {
  percent: PropTypes.number,
};
