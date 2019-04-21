import React from 'react';
// Assets
import logo from './logo.svg';
import './App.scss';

// Custom components
import UserList from './components/UserList';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <UserList />
    </header>
  </div>
);

export default App;
