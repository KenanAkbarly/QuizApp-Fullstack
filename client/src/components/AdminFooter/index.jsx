import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from './style.module.scss'
import ScrollToTop from "react-scroll-to-top";
const Footer = () => {
  const {mode} = useSelector((state) => state.darkMode)
  const navigate = useNavigate()
  
  return (
    <>
     <footer 
      style={mode? {backgroundColor:'#1D3461'}:{backgroundColor:'#222222'}}
     className={styled.footer__home}>
        <ScrollToTop smooth top='60' />
        <div className={styled.footer__container}>
            <div className={styled.footer_content}>
             <div className={styled.footer_left}>
             <img src="https://www.shareicon.net/data/2015/08/19/87561_games_1042x1042.png" alt="" />
             <h1 style={mode? {color:'white'}:{color:'#264e93'}}>Quizlet</h1>
             </div>
             <div className={styled.footer_right}>
              <p
              onClick={() => navigate('/quizz')}
              
              >Əsas Səhifə</p>
              <p
               
              onClick={() => navigate('/admin/exams')}
              >İmtahanlar</p>
              <p
               
              onClick={() => navigate("/admin/reports")}
              >Nəticələr</p>
             </div>
            </div>
            <div
            style={mode? { borderTop:" 1px solid #858584"}:{ borderTop:" 1px solid #d4d4d437"}}
            className={styled.footer__bottom}>
                <p>Ⓒ Quizlet Quizz Portalı</p>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer