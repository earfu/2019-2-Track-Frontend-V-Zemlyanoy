import React from 'react';
import PropTypes from 'prop-types';

interface mainTopProps {
  source: string;
  target: string;
  handleSource: (event: React.SyntheticEvent<HTMLSelectElement>) => void;
  handleTarget: (event: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const MainTop: React.FunctionComponent<mainTopProps> = ({
  source,
  target,
  handleSource,
  handleTarget,
}) => {
  return (
    <div className="lang-div">
      <p className="top-text">Source language:</p>
      <p>{source}</p>
      <select id="source" onChange={handleSource}>
        <option value="??">Auto-detect</option>
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="ru">Russian</option>
        <option value="fr">French</option>
        <option value="sp">Spanish</option>
        <option value="it">Italian</option>
      </select>
      <p className="top-text">Target language:</p>
      <p>{target}</p>
      <select id="target" onChange={handleTarget}>
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="ru">Russian</option>
        <option value="fr">French</option>
        <option value="sp">Spanish</option>
        <option value="it">Italian</option>
      </select>
    </div>
  );
};

export default MainTop;
