import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

// Hook
import useFetch from '../../hooks/useFetch';

import './UserList.scss';

const UserList = () => {
  const [page, setPage] = useState(1);
  const [data, error, isLoading, abort, doFetch, doRetry] = useFetch(`https://reqres.in/api/users?page=${page}`);

  if (error) {
    return (
      <Paper className="UserList-wrapper" elevation={1}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => doRetry()}
        >
          Retry
        </Button>
      </Paper>
    );
  }

  if (isLoading || !data) {
    return (
      <Paper className="UserList-wrapper" elevation={1}>
        <div className="UserList-wrapper-progress">
          <CircularProgress />
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => abort()}
        >
          Cancel
        </Button>
      </Paper>
    );
  }

  const handleChangePage = (event) => {
    setPage(event.target.value);
    doFetch(`https://reqres.in/api/users?page=${event.target.value}`)
  };

  const pagesArr = [];
  if (data && data.total_pages) {
    for (let i = 0; i < data.total_pages; i += 1) {
      pagesArr.push(i + 1);
    }
  }

  const list = data.data || [];

  return (
    <div className="UserList">
      <Paper className="UserList-wrapper" elevation={1}>
        <div>User List</div>
        <div className="UserList-wrapper-pages">
          <span>Page</span>
          <Select
            value={page}
            onChange={event => handleChangePage(event)}
          >
            {pagesArr.map(value => (
              <MenuItem value={value} key={value}>{value}</MenuItem>
            ))}
          </Select>
        </div>
        {!isLoading && data && (
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
        {error && 'Hay error'}
      </Paper>
    </div>
  );
};

export default UserList;
