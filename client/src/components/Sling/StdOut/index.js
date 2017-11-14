import React from 'react';

import Loading from '../../globals/Loading';

const StdOut = ({ text, loading }) => {
  return (
    <div className="stdout">
      {loading ? (
        <Loading />
      ) : (
        text.split('\n').map((singleLine, idx) => (
          <div key={`stdout-singleline-idx-${idx}`}>{singleLine}</div>
        ))
      )}
    </div>
  );
};

export default StdOut;
