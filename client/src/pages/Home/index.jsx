import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import HomeHeader from "../../components/HomeHeader";
import styled from "./style.module.scss";
import Carusel from "../../components/Carusel";
import Contact from "../../components/Contact";
import HomeFooter from "../../components/HomeFooter";
const Home = () => {
  return (
    <div>
      <section>
        <div className={styled.header}>
          <HomeHeader />
          <div className={styled.header_text}>
            <div>
              <h1>Quizlet'ilə Tanış Olun</h1>
              <p>
                Nəzəri biliklərinizi yoxlamaq və boşluqlarınzı aradan qaldırmaq
                üçün imtahan programı.
              </p>
              <button
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                Qeydiyyatdan Keç
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="learning">
        <div className={styled.learning_section}>
          <div className={styled.contanier}>
            <div className={styled.learning_section_left}>
              <h2>Öyrənmə sürətində imtahan və qiymətləndirmə.</h2>
              <p>
                Anında geri dönüş,öyrənmə prosesinin vacib
                hissəsidir.Quizlet,sizə sinif vəya ofis üçün tam da bunu
                verir.Tələbələr üçün diqqət çəkici qarşılıqlı təsir təqdim
                edərkən müəllimlərə zaman qazandıran,öyrənməyi izləmənin və
                dəyərləndirmənin yoludur.
              </p>
            </div>

            <div className={styled.learning_section_right}>
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_ayopewsc.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>
      </section>

      <section id="activity">
        <div className={styled.carusel_body}>
          <Carusel />
        </div>
      </section>

      <section id="accesibility">
        <div className={styled.activity_section}>
          <div className={styled.contanier}>
            <div className={styled.activity_section_right}>
              <lottie-player
                src="https://assets6.lottiefiles.com/packages/lf20_qef87ngc.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>

            <div className={styled.activity_section_left}>
              <h2>Bütün cihazlarda əlçatanlıq</h2>
              <p>
                Web saytların bütün cihazlar üçün əlçatan olması vacib
                faktordur. Quzilet imtahan programı bütün əsas rəqəmsal
                cihazlarda və platformalarda istifadə üçün əlçatandır.
                Smartfonlarda, planşetlərdə, notbuklarda və kompüterlərdə
                Quizlet-dən istifadə edə bilərsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
         <Contact/>
      </section>
      <section>
        <HomeFooter/>
      </section>
    </div>
  );
};
export default Home;
