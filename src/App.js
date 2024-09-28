import React from 'react';
import ProductTable from './components/ProductTable/ProductTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div class="header">
        <FontAwesomeIcon icon={faArrowLeft}/>
        <span>Rules creation &nbsp;&nbsp;</span>
        <button>Publish Feed</button>
      </div>
      <ProductTable />
    </div>
  );
};

export default App;
