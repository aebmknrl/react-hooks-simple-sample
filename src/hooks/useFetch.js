import { useState, useRef } from 'react';

const useFetch = () => {
  const [url, setUrl] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const controlllerRef = useRef(null);

  const doFetch = (newUrl) => {
    setIsLoading(true);
    setData(null);
    setUrl(newUrl);
    const controller = new AbortController();
    controlllerRef.current = controller;
    return fetch(newUrl, { signal: controller.signal })
      .then(res => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.name);
      });
  };
  const abort = () => (controlllerRef.current.abort());

  const doRetry = () => {
    doFetch(url);
    setError(null);
  };

  return [
    data,
    error,
    isLoading,
    abort,
    doFetch,
    doRetry,
  ];
};

export default useFetch;
