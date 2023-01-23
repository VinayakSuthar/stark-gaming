import axios from 'axios';

function useAxios() {
  return axios.create({
    baseURL: import.meta.env.VITE_URL,
  });
}

export default useAxios;
