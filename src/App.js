import React, { useState } from 'react';

// Native Components
import Button from '@material-ui/core/Button';
import moment from 'moment';

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
          Click on the button to {showUserList ? 'hide' : 'show'} the user list.
        <div
          className="App-header-button"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowUserList(!showUserList)}
          >
            {showUserList ? 'Hide' : 'Show'}
          </Button>
        </div>
        {showUserList && <UserList date={moment().format('DD MMMM YYYY')} />}
      </header>
    </div>
  );
};

export default App;
