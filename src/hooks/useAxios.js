import { useEffect, useState } from "react";
import axios from "axios";

function useAxios() {
  return axios.create({
    baseURL: "https://rawg-video-games-database.p.rapidapi.com/",
    responseType: "json",
    params: { key: import.meta.env.VITE_RAWG_KEY },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
    },
  });
}

export default useAxios;
