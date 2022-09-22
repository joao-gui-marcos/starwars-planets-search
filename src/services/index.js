const URL = 'https://swapi.dev/api/planets';

const fetchPlanets = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  const { results } = data;
  results.forEach((elem) => {
    delete elem.residents;
  });
  console.log(results);
  return results;
};

export default fetchPlanets;
