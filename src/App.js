import React, { useState } from 'react';

// Native Components
import Button from '@material-ui/core/Button';

// Custom Components
import UserList from './components/UserList';

// Assets
import logo from './logo.svg';
import './App.scss';

const App = () => {
  const [showUserList, setShowUserList] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Click on the button to show the user list.
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowUserList(!showUserList)}
        >
          {showUserList ? 'Hide' : 'Show'}
        </Button>
        {showUserList && <UserList />}
      </header>
    </div>
  );
};

export default App;
