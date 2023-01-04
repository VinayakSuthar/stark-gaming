import Skeleton from "react-loading-skeleton";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./index.css";

export default function Banner({ value, loading }) {
  return (
    <div className="home-banner">
      {!loading ? (
        <Swiper autoplay modules={[Autoplay]} centeredSlides>
          {value?.map(({ id, name, background_image }) => {
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
      ) : (
        <Skeleton style={{ aspectRatio: "9/5" }} />
      )}
    </div>
  );
}
