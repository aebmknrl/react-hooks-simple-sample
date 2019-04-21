import React, { useState } from 'react';

// Native Components
import Button from '@material-ui/core/Button';

// Hooks
import useFetch from './hooks/useFetch';

// Assets
import logo from './logo.svg';
import './App.scss';

const App = () => {
  const [page, setPage] = useState(1);
  const [data, error, isLoading, abort, doFetch] = useFetch();

  const handleAction = () => {
    if (isLoading) {
      abort();
      console.log('abort signal sended');
    } else {
      doFetch(`https://reqres.in/api/users?page=${page}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div
          className="App-header-button"
        >
          <Button
            variant="contained"
            color={isLoading ? 'secondary' : 'primary'}
            onClick={() => handleAction()}
          >
            {isLoading ? 'Cancel' : 'Test'}
          </Button>
        </div>
        {isLoading && 'Loading...'}
        {data && !isLoading && 'Data loaded'}
        <input type="text" onChange={event => setPage(event.target.value)} value={page} />
      </header>
    </div>
  );
};

export default App;
