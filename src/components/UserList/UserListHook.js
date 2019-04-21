import { useState, useEffect } from 'react';
import axios from 'axios';


const useUserList = () => {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await axios(`https://reqres.in/api/users?page=${page}`);
      setUserData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => () => console.log('List Component Unmounted'), []);

  if (!userData) {
    return {};
  }
  return {
    pages: userData.data.total_pages,
    currentPage: userData.data.page,
    list: userData.data.data,
    isLoading,
    setPage,
  };
};

export default useUserList;
