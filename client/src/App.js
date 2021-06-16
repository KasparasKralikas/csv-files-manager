import React, { useState } from 'react';
import CSVUploader from './components/CSVUploader';
import TableView from './components/TableView';

function App() {

  const [data, setData] = useState();

  return (
    <div>
      <CSVUploader setData={setData}/>
      <TableView data={data}/>
    </div>
  );
}

export default App;
