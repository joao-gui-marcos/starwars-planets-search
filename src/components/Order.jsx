import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function Order() {
  const [column, setColumnState] = useState('population');
  const [sort, setOrderState] = useState('');
  const { setOrder } = useContext(AppContext);

  const addOrder = () => {
    setOrder({
      column,
      sort,
    });
  };

  return (
    <div>
      Order
      <select
        data-testid="column-sort"
        onChange={ (event) => setColumnState(event.target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <label htmlFor="asc">
        Ascendente
        <input
          id="asc"
          type="radio"
          name="order"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ (event) => setOrderState(event.target.value) }
        />
      </label>
      <label htmlFor="des">
        Descendente
        <input
          id="des"
          type="radio"
          name="order"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ (event) => setOrderState(event.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ addOrder }
      >
        Order
      </button>
    </div>
  );
}

export default Order;
