import { useState, useEffect, useRef } from 'react';

const useFetch = (defaultUrl) => {
  const [url] = useState(defaultUrl);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [retry, setRetry] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const controlllerRef = useRef(null);

  const doFetch = (newUrl) => {
    setIsLoading(true);
    setData(null);
    const controller = new AbortController();
    controlllerRef.current = controller;
    return fetch(newUrl, { signal: controller.signal })
      .then(res => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.name);
        console.log(err.name);
        console.log(error);
        if (err.name === 'AbortError') {
          setRetry(url);
        }
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (url) {
      doFetch(url);
    }
  }, [url]);

  const abort = () => {
    setError('AbortError');
    controlllerRef.current.abort();
  };
  const doRetry = () => (doFetch(retry));

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
