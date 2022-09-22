import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function NameFilter() {
  const { setNameFilter } = useContext(AppContext);
  return (
    <div>
      Name Filter:
      <input
        data-testid="name-filter"
        onChange={ (event) => setNameFilter(event.target.value) }
      />
    </div>
  );
}

export default NameFilter;
