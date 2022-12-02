import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css";

const options = {
  method: "GET",
  url: "https://rawg-video-games-database.p.rapidapi.com/games",
  params: { key: "cf5e35876a3546608b18bd8bc95faa6a", page_size: "5" },
  headers: {
    "X-RapidAPI-Key": "a4f8b06da6msh92455035e1ac775p15e6eejsnad144ad41e61",
    "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
  },
};

export default function Banner() {
  const [gameList, setGameList] = useState([]);
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.results);
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
