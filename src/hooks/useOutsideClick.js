import { useEffect, useRef } from 'react';

export default function useOutsideClick(callBack) {
  const ref = useRef();
  const outsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callBack();
    }
  };
  useEffect(() => {
    document.addEventListener('click', outsideClick, true);
    return () => {
      document.removeEventListener('click', outsideClick, true);
    };
  }, []);
  return ref;
}
