import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "./style.module.scss";
import {
  AiOutlineInstagram,
  AiOutlineUser,
  AiOutlineMail,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
const Footer = () => {
  const [name, setName] = useState([]);
  const [mail, setMail] = useState([]);
  const [message, setMessage] = useState([]);
  const nameChange = (event) => {
    setName([...name, event.target.value]);
  };
  const mailChange = (event) => {
    setMail([...mail, event.target.value]);
  };
  const messageChange = (event) => {
    setMessage([...message, event.target.value]);
  };

  const { mode } = useSelector((state) => state.darkMode);
  const navigate = useNavigate();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if (name.length == 0 || message.length == 0 || mail.length == 0) {
      toast("Bütün xanaları doldurun", {
        duration: 2000,
        position: "top-center",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "❌",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    } else {
      emailjs
        .sendForm(
          "service_av4v13g",
          "template_tc6z19i",
          form.current,
          "hyuIMQftk4iaBZx3B"
        )
        .then(
          (result) => {
            toast("Mesaj göndərildi", {
              duration: 4000,
              position: "top-center",

              // Styling
              style: {},
              className: "",

              // Custom Icon
              icon: "📨",

              // Change colors of success/error/loading icon
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },

              // Aria
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            });

            e.target.reset();
          },
          (error) => {
            toast("Mesaj göndərilmedi", {
              duration: 2000,
              position: "top-center",

              // Styling
              style: {},
              className: "",

              // Custom Icon
              icon: "❌",

              // Change colors of success/error/loading icon
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },

              // Aria
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            });
          }
        );
    }
  };
  return (
    <>
      <footer
        style={
          mode ? { backgroundColor: "#1D3461" } : { backgroundColor: "#1a1a1a" }
        }
        className={styled.footer__home}
      >
        <ScrollToTop smooth top="60" />
        <div className={styled.footer__container}>
          <div className={styled.footer_content}>
            <div className={styled.footer_left_body}>
              <div className={styled.footer_left}>
                <img
                  src="https://www.shareicon.net/data/2015/08/19/87561_games_1042x1042.png"
                  alt=""
                />
                <h1 style={mode ? { color: "white" } : { color: "#264e93" }}>
                  Quizlet
                </h1>
              </div>
              <div className={styled.social_media}>
                <p>Bizi izlə</p>
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
            <div className={styled.footer_middle}>
              <h1>Səhifələr</h1>
              <p onClick={() => navigate("/quizz")}>Əsas Səhifə</p>
              <p onClick={() => navigate("/user/reports")}>Nəticə</p>
            </div>
            <div className={styled.footer_right}>
              <h1>Bizimlə əlaqə</h1>
              <form ref={form} onSubmit={sendEmail}>
                <div className={styled.inp_body}>
                  <AiOutlineUser />
                  <input
                    onChange={nameChange}
                    placeholder="İstifadəçi adı"
                    type="text"
                    name="user_name"
                  />
                </div>
                <div className={styled.inp_body}>
                  <AiOutlineMail />
                  <input
                    onChange={mailChange}
                    type="email"
                    placeholder="E-mail"
                    name="user_email"
                  />
                </div>
                <div className={styled.textArea_body}>
                  <textarea
                    onChange={messageChange}
                    placeholder="Mesaj yazın"
                    name="message"
                  />
                </div>
                <div className={styled.submit_btn}>
                  <input type="submit" value="Göndər" />
                </div>
              </form>
            </div>
          </div>
          <div
            style={
              mode
                ? { borderTop: " 1px solid #858584" }
                : { borderTop: " 1px solid #d4d4d437" }
            }
            className={styled.footer__bottom}
          >
            <p>Ⓒ Quizlet Quizz Portalı</p>
          </div>
        </div>
        <Toaster />
      </footer>
    </>
  );
};

export default Footer;
