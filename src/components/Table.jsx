import React, { useEffect, useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import fetchPlanets from '../services';

function Table() {
  // const [planets, setPlanetsState] = useState([]);
  // const [filteredPlanets, setFilteredPlanetsState] = useState([]);
  const { nameFilter } = useContext(AppContext);
  const { numericFilter } = useContext(AppContext);
  const { planets, setPlanetsState } = useContext(AppContext);
  const { filteredPlanets, setFilteredPlanetsState } = useContext(AppContext);
  const { order } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const filterByName = () => {
    if (nameFilter === '') {
      setFilteredPlanetsState(planets);
    } else {
      setFilteredPlanetsState(filteredPlanets.filter((e) => e.name.includes(nameFilter)));
    }
  };

  const filterByNumber = ({ column, comparison, value }) => {
    if (comparison === 'maior que') {
      setFilteredPlanetsState(
        filteredPlanets.filter(
          (elem) => Number(elem[column]) > Number(value) && elem[column] !== 'unknown',
        ),
      );
    }
    if (comparison === 'menor que') {
      setFilteredPlanetsState(
        filteredPlanets.filter(
          (elem) => Number(elem[column]) < Number(value) && elem[column] !== 'unknown',
        ),
      );
    }
    if (comparison === 'igual a') {
      setFilteredPlanetsState(
        filteredPlanets.filter((elem) => Number(elem[column]) === Number(value)),
      );
    }
  };

  useEffect(() => {
    const setPlanets = async () => {
      const results = await fetchPlanets();
      setPlanetsState(results);
      setFilteredPlanetsState(results);
      setLoading(false);
    };
    setPlanets();
  }, []);

  useEffect(() => {
    filterByName();
  }, [nameFilter]);

  useEffect(() => {
    if (numericFilter.length === 0) {
      filterByName();
    } else {
      numericFilter.forEach((elem) => {
        filterByNumber(elem);
      });
    }
  }, [numericFilter]);

  const orderAsc = (param) => [...filteredPlanets].sort((a, b) => Number(a[param])
  - Number(b[param]));
  const orderDesc = (param) => [...filteredPlanets].sort((a, b) => Number(b[param])
  - Number(a[param]));
  const moveUnknown = (data, par) => {
    data.push(data.splice(data.findIndex((v) => v[par] === 'unknown'), 1)[0]);
    return data;
  };

  useEffect(() => {
    console.log('ordenou');
    if (order.sort === 'ASC') {
      setFilteredPlanetsState(
        moveUnknown(moveUnknown(orderAsc(order.column), order.column), order.column),
      );
    }
    if (order.sort === 'DESC') {
      setFilteredPlanetsState(
        moveUnknown(moveUnknown(orderDesc(order.column), order.column), order.column),
      );
    }
  }, [order]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {!loading && Object.keys(planets[0]).map((ele) => <th key={ ele }>{ele}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            !loading && filteredPlanets.map((elem, i) => (
              <tr
                key={ i }
              >
                {Object.values(elem).map((ele, ind) => (
                  ind === 0
                    ? (
                      <td
                        key={ ele }
                        data-testid="planet-name"
                      >
                        {ele}
                      </td>
                    )
                    : (
                      <td
                        key={ ele }
                      >
                        {ele}
                      </td>
                    )))}
              </tr>))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
