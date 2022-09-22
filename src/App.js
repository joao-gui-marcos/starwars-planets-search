import React from 'react';
import './App.css';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';
import Order from './components/Order';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <div>
        <span>Hello, App!</span>
        <NameFilter />
        <NumericFilter />
        <Order />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
//
