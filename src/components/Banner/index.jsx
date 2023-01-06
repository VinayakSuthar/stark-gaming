/* eslint-disable react/prop-types */
import Skeleton from 'react-loading-skeleton';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './index.css';

export default function Banner({ value, loading }) {
  return (
    <div className="home-banner">
      {!loading ? (
        <Swiper autoplay centeredSlides navigation pagination modules={[Autoplay, Navigation, Pagination]}>
          {value?.map(({ id, name, background_image: backgroundImage }) => (
            <SwiperSlide key={id} className="img-box">
              <Link to={`/browse/${id}`}>
                <img className="banner-image" alt="banner" src={backgroundImage} />
                <div className="title">
                  <p>{name}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton style={{ aspectRatio: '9/5' }} />
      )}
    </div>
  );
}
