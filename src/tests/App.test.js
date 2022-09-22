import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData'

test('Verifica se a tabela e renderizada com todos os planetas', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(testData),
  }));
  render(<App />);
  await waitFor(() => {
    const planets = screen.getAllByTestId('planet-name')
    expect(planets).toHaveLength(10)
  }); 
});

test('Testa filtro de nome', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(testData),
  }));
  render(<App />);
  const nameFilter = screen.getByTestId('name-filter')
  expect(nameFilter).toBeInTheDocument()
  userEvent.type(nameFilter, 'Tatooine')
  expect(nameFilter).toHaveValue('Tatooine')
  await waitFor(() => {
    const tatooine = screen.getByText('Tatooine')
    expect(tatooine).toBeInTheDocument()
  }); 
});

test('Testa filtro numerico', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(testData),
  }));
  render(<App />);
  const columnFilter = screen.getByTestId('column-filter')
  const comparisonFilter = screen.getByTestId('comparison-filter')
  const valueFilter = screen.getByTestId('value-filter')
  const buttonFilter = screen.getByTestId('button-filter')
  const buttonRemoveFilter = screen.getByTestId('button-remove-filters')
  expect(columnFilter).toBeInTheDocument()
  expect(columnFilter).toHaveValue('population')
  expect(comparisonFilter).toBeInTheDocument()
  expect(comparisonFilter).toHaveValue('maior que')
  expect(valueFilter).toBeInTheDocument()
  expect(buttonFilter).toBeInTheDocument()
  expect(buttonRemoveFilter).toBeInTheDocument()
  userEvent.click(buttonFilter)
  expect(columnFilter).toHaveValue('orbital_period')
  const filters = screen.getByTestId('filter')
  expect(filters).toBeInTheDocument()
  const removeFilter = screen.getByText('Remove Filter')
  expect(removeFilter).toBeInTheDocument()
  userEvent.click(removeFilter)
  expect(removeFilter).not.toBeInTheDocument()
  userEvent.click(buttonRemoveFilter)
  expect(filters).not.toBeInTheDocument()
  userEvent.selectOptions(columnFilter,'diameter')
  userEvent.selectOptions(comparisonFilter,'menor que')
  userEvent.type(valueFilter,'1000')
  userEvent.click(buttonFilter)
  userEvent.selectOptions(columnFilter,'rotation_period')
  userEvent.selectOptions(comparisonFilter,'maior que')
  userEvent.type(valueFilter,'1000')
  userEvent.click(buttonFilter)
  userEvent.selectOptions(columnFilter,'population')
  userEvent.selectOptions(comparisonFilter,'igual a')
  userEvent.type(valueFilter,'1000')
  userEvent.click(buttonFilter)
  act(() => {
    userEvent.click(buttonFilter)

  });
  
});

test('Testa ordenacao', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(testData),
  }));
  render(<App />);
  
  await waitFor(() => {
    const columnSort = screen.getByTestId('column-sort')
    const ascSort = screen.getByTestId('column-sort-input-asc')
    const descSort = screen.getByTestId('column-sort-input-desc')
    const buttonSort = screen.getByTestId('column-sort-button')
    expect(columnSort).toBeInTheDocument()
    userEvent.selectOptions(columnSort, 'diameter')
    expect(columnSort).toHaveValue('diameter')
    expect(ascSort).toBeInTheDocument()
    expect(descSort).toBeInTheDocument()
    expect(buttonSort).toBeInTheDocument()
    userEvent.click(descSort)
    expect(ascSort).not.toBeChecked()
    expect(descSort).toBeChecked()
    userEvent.click(buttonSort)
    userEvent.click(buttonSort)
    userEvent.click(ascSort)
    expect(ascSort).toBeChecked()
    userEvent.click(buttonSort)
    const buttonFilter = screen.getByTestId('button-filter')
    //userEvent.click(buttonFilter)
    act(() => {
      userEvent.click(ascSort)
      userEvent.click(descSort)
      userEvent.selectOptions(columnSort,'diameter')
      userEvent.click(buttonSort)
    });
    const planets = screen.getAllByTestId('planet-name')
    expect(planets).toHaveLength(10)
    //expect(planets[0]).toHaveTextContent('Tatooine')
  }); 
});

test('Testa todas as possibilidades de filtros numericos', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(testData),
  }));
  render(<App />);
  const columnFilter = screen.getByTestId('column-filter')
  const comparisonFilter = screen.getByTestId('comparison-filter')
  const valueFilter = screen.getByTestId('value-filter')
  const buttonFilter = screen.getByTestId('button-filter')
  userEvent.selectOptions(columnFilter, 'rotation_period')
  expect(columnFilter).toHaveValue('rotation_period')
  userEvent.selectOptions(comparisonFilter, 'igual a')
  expect(comparisonFilter).toHaveValue('igual a')
  userEvent.clear(valueFilter)
  userEvent.type(valueFilter, '23')
  expect(valueFilter).toHaveValue('23')
  //userEvent.click(buttonFilter)
  await waitFor(() => {
    expect(screen.getByText('Tatooine')).toBeInTheDocument()
    userEvent.click(buttonFilter)
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.click(buttonFilter)
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.click(buttonFilter)
  }); 
});




