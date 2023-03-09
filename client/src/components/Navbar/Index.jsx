import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "./style.module.scss";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "remixicon/fonts/remixicon.css";
import Switch from "../Switch";
const Index = ({ menu }) => {
  const { user } = useSelector((state) => state.users);
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const showModal = () => setModal(!modal);
  const navigate = useNavigate();
  const activeRoute = window.location.pathname;
  const { mode } = useSelector((state) => state.darkMode);
  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("/admin/exams/edit") &&
        paths.includes("/admin/exams")
      ) {
        return true;
      }
      if (
        activeRoute.includes("/user/write-exam") &&
        paths.includes("/user/write-exam")
      ) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <div
        style={
          mode
            ? { backgroundColor: "rgb(244, 244, 244)" }
            : { backgroundColor: "#121721" }
        }
        className={styled.navbar}
      >
        <div className={styled.switch_contanier}>
          <div className={styled.switch_body}>
            <Switch />
          </div>
        </div>
        <div
          style={
            mode ? { backgroundColor: "white" } : { backgroundColor: "#19202D" }
          }
          className={styled.container}
        >
          <div
            onClick={() => navigate("/quizz")}
            className={styled.navbar_left}
          >
            <img
              src="https://www.shareicon.net/data/2015/08/19/87561_games_1042x1042.png"
              alt=""
            />
            <h1 style={mode ? { color: "#253858" } : { color: "#264e93" }}>
              Quizlet
            </h1>
          </div>
          <div
            style={mode ? { color: "#253858" } : { color: "#264e93" }}
            className={styled.navbar_right}
          >
            {menu.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    getIsActiveOrNot(item.paths) && styled.Dark_active_route
                  }`}
                >
                  <p className={styled.items} onClick={() => item.onClick()}>
                    {item.icon} <span>{item.title}</span>
                  </p>
                </div>
              );
            })}
            <p
              onClick={showModal}
              className={modal ? styled.modal_items : styled.items}
            >
              {user?.isAdmin ? (
                <i class="ri-admin-line"></i>
              ) : (
                <i className="ri-user-line"></i>
              )}
              <span>{user?.isAdmin ? "Admin" : "User"}</span>

              <div
                style={
                  mode
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "#14213a" }
                }
                className={modal ? styled.active_modal : styled.none_modal}
              >
                <p
                  style={mode ? { color: "#253858" } : { color: "#264e93" }}
                  className={styled.user_name}
                >
                  <i class="ri-emotion-happy-line"></i>
                  {user?.name}
                </p>
                <p
                  style={mode ? { color: "#253858" } : { color: "#264e93" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                  className={styled.items}
                >
                  <i className="ri-logout-box-line"></i>Çıxış
                </p>
              </div>
            </p>
          </div>
        </div>
      </div>

      <div
        style={
          mode
            ? { backgroundColor: "rgb(244, 244, 244)" }
            : { backgroundColor: "#121721" }
        }
        className={styled.ham_menu}
      >
        <div className={styled.switch_contanier}>
          <div className={styled.switch_body}>
            <Switch />
          </div>
        </div>
        <IconContext.Provider
          value={mode ? { color: "#253858" } : { color: "#264e93" }}
        >
          <div
            style={
              mode
                ? { backgroundColor: "white" }
                : { backgroundColor: "#19202D" }
            }
            className={styled.hamburger_menu}
          >
            <div
              onClick={() => navigate("/quizz")}
              className={styled.ham_menu_navbar_left}
            >
              <img
                src="https://www.shareicon.net/data/2015/08/19/87561_games_1042x1042.png"
                alt=""
              />
              <h1 style={mode ? { color: "#253858" } : { color: "#264e93" }}>
                Quizlet
              </h1>
            </div>
            <Link to="#" className={styled.menu_bars}>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav
            style={
              mode
                ? { backgroundColor: "white" }
                : { backgroundColor: "#19202D" }
            }
            className={sidebar ? styled.active : styled.nav_menu}
          >
            <ul className={styled.nav_menu_items} onClick={showSidebar}>
              <li className={styled.navbar_toggle}>
                <Link to="#" className={styled.menu_bars}>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {menu.map((item, index) => {
                return (
                  <div key={index} className={styled.nav_text}>
                    <p
                      style={mode ? { color: "#253858" } : { color: "#264e93" }}
                      className={styled.nav_items}
                      onClick={() => item.onClick()}
                    >
                      {item.icon}{" "}
                      <span className={styled.span}>{item.title}</span>
                    </p>
                  </div>
                );
              })}
              <p className={styled.nav_text}>
                <p
                  style={mode ? { color: "#253858" } : { color: "#264e93" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                  className={styled.nav_items_user}
                >
                  <i className="ri-logout-box-line"></i>
                  <span className={styled.span}>Çıxış</span>
                </p>
              </p>
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default Index;
