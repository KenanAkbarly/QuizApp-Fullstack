import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "./style.module.scss";
import {Helmet} from "react-helmet";
import { useSelector } from "react-redux";
const Instructions = ({ examData, setView, startTimer }) => {
  const navigate = useNavigate();
  const {mode} = useSelector((state) => state.darkMode)
  return (
   <div  style={mode? {backgroundColor:'rgb(244, 244, 244)'}:{backgroundColor:'#121721'}}  className={styled.inc_body}>
     <div className={styled.Instructions_body}>
      <h1  style={mode? {color:'#253858'}:{color:'#264e93'}} >İmtahan Təlimatları</h1>
      <ol className={styled.gradient_list}>
        <li style={mode? {backgroundColor:'white',color:'black'}:{backgroundColor:"#19202D",color:'white'}}>İmtahan müddəti {examData.duration} dəqiqədir.</li>
        <li style={mode? {backgroundColor:'white',color:'black'}:{backgroundColor:"#19202D",color:'white'}}>
          İmtahan {examData.duration} dəqiqədən sonra avtomatik olaraq
          sonlanacaq.
        </li>
        <li style={mode? {backgroundColor:'white',color:'black'}:{backgroundColor:"#19202D",color:'white'}}>Cavabı təsdiqlədikdən sonra variantı dəyişə bilməzsiniz.</li>
        <li style={mode? {backgroundColor:'white',color:'black'}:{backgroundColor:"#19202D",color:'white'}}>İmtahan müddətində səhifəni yeniləməyin.</li>
        <li style={mode? {backgroundColor:'white',color:'black'}:{backgroundColor:"#19202D",color:'white'}}>
          Suallar arasında <strong>"Əvvəlki"</strong> və{" "}
          <strong>"Növbəti"</strong> buttonları vasitəsi ilə keçid edə
          bilərsiniz.
        </li>
        <li style={mode? {backgroundColor:'white',color:'black'}:{backgroundColor:"#19202D",color:'white'}}>
          İmtahandı ümumi sualların sayı <strong>{examData.totalMarks}</strong>.
        </li>
        <li style={mode? {backgroundColor:'white',color:'black'}:{backgroundColor:"#19202D",color:'white'}}>
          İmtahandan keçmək üçün yazılmalı olan minimum sual sayı{" "}
          <strong>{examData.passingMarks}</strong>.
        </li>
      </ol>
      <div className={styled.btn_body}>
        <button  style={mode? {border:'2px solid  #253858',color:" #253858"} :{border: "2px solid #264e93",color: "#264e93"}} onClick={() => navigate(-1)}>Legv et</button>
        <button  style={mode? {border:'2px solid  #253858',color:" #253858"} :{border: "2px solid #264e93",color: "#264e93"}} onClick={() => {
          startTimer();
          setView("questions")
        }}>İmtahana Başla</button>
      </div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Təlimatlar</title>
            </Helmet>
    </div>
   </div>
  );
};

export default Instructions;
