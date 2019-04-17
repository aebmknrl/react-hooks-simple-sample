import React from 'react';

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

// Hook
import useUserList from './UserListHook';

import './UserList.scss';

const UserList = () => {
  const userListHook = useUserList();
  if (!userListHook) {
    return (
      <div>Cargando...</div>
    );
  }
  const totalPages = userListHook.pages;
  const pages = [];
  if (totalPages) {
    for (let i = 0; i < totalPages; i += 1) {
      pages.push(i + 1);
    }
  }

  const handleChange = (event) => {
    userListHook.setPage(event.target.value);
  };

  return (
    <div className="UserList">
      <Paper className="UserList-wrapper" elevation={1}>
        <div>User List</div>
        <div className="UserList-wrapper-pages">
          <span>Página</span>
          <Select
            value={userListHook.currentPage}
            onChange={event => handleChange(event)}
          >
            {pages.map(value => (
              <MenuItem value={value} key={value}>{value}</MenuItem>
            ))}
          </Select>
        </div>
        {userListHook.isLoading && (
          <div className="UserList-wrapper-progress">
            <CircularProgress />
          </div>
        )}
        {!userListHook.isLoading && (
          <List>
            {userListHook.list.map(value => (
              <ListItem key={value.id}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={value.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${value.first_name} ${value.last_name}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </div>
  );
};

export default UserList;
