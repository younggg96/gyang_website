import React from "react";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "./index.scss";

const GyImgSwiper = ({ imgs, className }) => {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      className={className}
    >
      {!!imgs.length && (
        <div className="imgs">
          {imgs.map((img) => {
            return (
              <SwiperSlide key={img.id}>
                <img src={img.url} alt="moment img" />
              </SwiperSlide>
            );
          })}
        </div>
      )}
    </Swiper>
  );
};

export default GyImgSwiper;
