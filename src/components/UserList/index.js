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
  const {
    pages,
    setPage,
    currentPage,
    isLoading,
    list,
  } = useUserList();

  if (!pages) {
    return (
      <div>Loading...</div>
    );
  }
  const pagesArr = [];
  if (pages) {
    for (let i = 0; i < pages; i += 1) {
      pagesArr.push(i + 1);
    }
  }

  const handleChange = (event) => {
    setPage(event.target.value);
  };

  return (
    <div className="UserList">
      <Paper className="UserList-wrapper" elevation={1}>
        <div>User List</div>
        <div className="UserList-wrapper-pages">
          <span>Page</span>
          <Select
            value={currentPage}
            onChange={event => handleChange(event)}
          >
            {pagesArr.map(value => (
              <MenuItem value={value} key={value}>{value}</MenuItem>
            ))}
          </Select>
        </div>
        {isLoading && (
          <div className="UserList-wrapper-progress">
            <CircularProgress />
          </div>
        )}
        {!isLoading && (
          <List>
            {list.map(value => (
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
