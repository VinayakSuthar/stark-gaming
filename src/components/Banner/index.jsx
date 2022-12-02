import axios from "axios";
import { useEffect, useState } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./index.css";

export default function Banner() {
  const [gameList, setGameList] = useState([]);
  const options = {
    method: "GET",
    url: "https://rawg-video-games-database.p.rapidapi.com/games",
    params: { key: import.meta.env.VITE_RAWG_KEY, page_size: "8" },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
    },
  };
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setGameList(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="home-banner">
      <Swiper autoplay lazy modules={[Autoplay]} centeredSlides>
        {gameList?.map(({ id, name, background_image }) => {
          return (
            <SwiperSlide key={id} className="img-box">
              <img className="banner-image" src={background_image} />
              <div className="title">
                <p>{name}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
