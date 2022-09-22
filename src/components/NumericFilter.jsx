import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';

function NumericFilter() {
  const [column, setColumnState] = useState('population');
  const [comparison, setComparisonState] = useState('maior que');
  const [value, setValueState] = useState('0');
  const [columnFilterOptions, setColumnFilterOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const { numericFilter, setNumericFilter } = useContext(AppContext);
  const { planets } = useContext(AppContext);
  const { setFilteredPlanetsState } = useContext(AppContext);

  const addFilter = () => {
    setNumericFilter([...numericFilter, {
      column,
      comparison,
      value,
    }]);
    setColumnFilterOptions(columnFilterOptions.filter((e) => e !== column));
  };

  const removeFilter = (event) => {
    setFilteredPlanetsState(planets);
    setNumericFilter(numericFilter.filter((e) => e.column !== event.target.name));
    console.log(event.target.name);
    setColumnFilterOptions([...columnFilterOptions, event.target.name]);
  };

  const removeAllFilters = () => {
    setNumericFilter([]);
    setColumnFilterOptions(['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  };

  useEffect(() => {
    setColumnState(columnFilterOptions[0]);
  }, [columnFilterOptions]);

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ (event) => setColumnState(event.target.value) }
      >
        {columnFilterOptions.map((elem) => <option key={ elem }>{elem}</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (event) => setComparisonState(event.target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        onChange={ (event) => setValueState(event.target.value) }
        value={ value }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ addFilter }
      >
        Add Filter
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remove All Filters
      </button>
      {
        numericFilter.map((elem, i) => (
          <p
            data-testid="filter"
            key={ i }
          >
            {`${elem.column} ${elem.comparison} ${elem.value}`}
            <button
              type="button"
              onClick={ removeFilter }
              name={ elem.column }
            >
              Remove Filter
            </button>
          </p>
        ))
      }
    </div>
  );
}

export default NumericFilter;
