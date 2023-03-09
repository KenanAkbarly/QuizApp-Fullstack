import React, { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import styled from "./style.module.scss";
import userHome from "../../.././src/asset/tablet/userHome.jpg";
import userNetice from "../../.././src/asset/tablet/userNetice.jpg";
import examResult from "../../.././src/asset/tablet/examResult.jpg";
const Carusel = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className={styled.carusel_body}>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          style: {
            alignSelf: "center",
            background: "#9dc3da",
            border: "none",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
            fontSize: "20px",
            height: 40,
            lineHeight: 1,
            textAlign: "center",
            width: 40,
            top:"58%",
            position:'absolute',
            right:0,
            zIndex:10,
            marginRight:"10px"
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: "center",
            background: "#9dc3da",
            border: "none",
            borderRadius: "50%",
            color: "white",
            cursor: "pointer",
            fontSize: "20px",
            height: 40,
            lineHeight: 1,
            textAlign: "center",
            width: 40,
            position:'absolute',
            top:"58%",
            left:0,
            zIndex:10,
            marginLeft:"10px"
           
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 768,
          },
        ]}
        speed={600}
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        <div className={styled.carusel_item}>
          <div className={styled.carusel_contanier}>
            <div className={styled.carusel_text}>
              <h2>İmtahanlar</h2>
              <p>
                Siz hesabınıza giriş edib, imtahanlarda iştirak edərək nəzəri
                biliklərinizi daha da möhkəmləndirə, və yeni biliklər eldə edə
                bilərisiniz.
              </p>
            </div>
            <div className={styled.image_body}>
              <img src={userHome} alt="" />
            </div>
          </div>
        </div>
        <div className={styled.carusel_item}>
          <div className={styled.carusel_contanier}>
            <div className={styled.carusel_text}>
              <h2>Nəticələr</h2>
              <p>
                Siz nəticələr bölməsində nəticə keçmişinizə baxa
                biləriniz.Burada iştirak etdiyiniz imtahanların nəticələri bütün
                ayrıntıları ilə öz əksini tapır.
              </p>
            </div>
            <div className={styled.image_body}>
              <img src={userNetice} alt="" />
            </div>
          </div>
        </div>
        <div className={styled.carusel_item}>
          <div className={styled.carusel_contanier}>
            <div className={styled.carusel_text}>
              <h2>İmtahan ayrıntısı</h2>
              <p>
                Bu bölmədə iştirak etdiyiniz imtahanda cavabladıqınz suallar öz
                əksini tapır.Bunun sayəsində siz düzgün və səhv cavabladıqnız
                sualları görə bilərsiniz.
              </p>
            </div>
            <div className={styled.image_body}>
              <img src={examResult} alt="" />
            </div>
          </div>
        </div>
      </ReactSimplyCarousel>
    </div>
  );
};

export default Carusel;
