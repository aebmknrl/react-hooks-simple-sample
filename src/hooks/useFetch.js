import { useState, useEffect, useRef } from 'react';

const useFetch = (defaultUrl) => {
  const [url] = useState(defaultUrl);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const controlllerRef = useRef(null);

  const doFetch = (newUrl) => {
    setIsLoading(true);
    setData(null);
    const controller = new AbortController();
    controlllerRef.current = controller;
    fetch(newUrl, { signal: controller.signal })
      .then(res => res.json())
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        console.log(err.name);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (url) {
      doFetch(url);
    }
  }, [url]);

  const abort = () => (controlllerRef.current.abort());

  return [
    data,
    error,
    isLoading,
    abort,
    doFetch,
  ];
};

export default useFetch;
