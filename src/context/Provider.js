import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState([]);
  const [planets, setPlanetsState] = useState([]);
  const [filteredPlanets, setFilteredPlanetsState] = useState([]);
  const [order, setOrder] = useState({});
  const contextValue = {
    nameFilter,
    setNameFilter,
    numericFilter,
    setNumericFilter,
    planets,
    setPlanetsState,
    filteredPlanets,
    setFilteredPlanetsState,
    order,
    setOrder,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Provider;
