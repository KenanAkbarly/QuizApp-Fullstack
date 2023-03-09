import React from "react";
import styled from "./style.module.scss";
import { AiOutlineInstagram, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BsGithub } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
import { Link } from "react-scroll";
const HomeFooter = () => {
  return (
    <>
      <footer className={styled.footer__home}>
        <ScrollToTop smooth top="200" />
        <div className={styled.footer__container}>
          <div className={styled.footer_content}>
            <div className={styled.footer_left_body}>
              <div className={styled.footer_left}>
                <img
                  src="https://www.shareicon.net/data/2015/08/19/87561_games_1042x1042.png"
                  alt=""
                />
                <h1>Quizlet</h1>
              </div>
              <div className={styled.footer__bottom}>
                <div>
                  <p>© Copyright 2023. Bütün hüquqlar qorunur.</p>
                  <p>Quizlet Kenan Akbarly-nin məhsuludur</p>
                </div>
              </div>
            </div>
            <div className={styled.footer_middle}>
              <h1>Səhifələr</h1>
              <p>
                <Link
                  to="learning"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  Haqqımızda
                </Link>
              </p>
              <p>
                <Link
                  to="activity"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  Fəaliyyət
                </Link>
              </p>
              <p>
                {" "}
                <Link
                  to="accesibility"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  Əlçatanlıq
                </Link>
              </p>
              <p>
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  Əlaqə
                </Link>
              </p>
            </div>
            <div className={styled.footer_right}>
              <h1>Əlaqə məlumatı</h1>
              <div className={styled.social_media}>
                <p>
                  <GoLocation /> Bakı, Azərbaycan AZ 1073.
                </p>
                <p>
                  <AiOutlineMail /> akbarlykenan@gmail.com
                </p>
                <h3>Bizi izlə</h3>
                <div className={styled.effect}>
                  <div className={styled.buttons}>
                    <a
                      target={"_blank"}
                      href="https://www.instagram.com/kenanakbarly/?hl=ru"
                      className={styled.insta}
                      title="İnstagram-da bizə qoşulun"
                    >
                      <i>
                        <AiOutlineInstagram />
                      </i>
                    </a>
                    <a
                      target={"_blank"}
                      href="https://www.linkedin.com/in/kenan-akbarly-a815b222a/"
                      className={styled.in}
                      title="Linkedİn-də bizə qoşulun"
                    >
                      <i>
                        <FaLinkedinIn />
                      </i>
                    </a>
                    <a
                      target={"_blank"}
                      href="https://github.com/KenanAkbarly"
                      className={styled.github}
                      title="Github-da bizə qoşulun"
                    >
                      <i>
                        <BsGithub />
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </footer>
    </>
  );
};

export default HomeFooter;
