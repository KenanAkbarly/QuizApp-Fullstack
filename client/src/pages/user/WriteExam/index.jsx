import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../../apicalls/exmas";
import {
  HideLoading,
  ShowLoading,
} from "../../../redux/loaderSlice/loaderSlice";
import Instructions from "./Instructions";
import styled from "./style.module.scss";
import { addReport } from "../../../apicalls/reports";
import {Helmet} from "react-helmet";
import { FiRepeat } from 'react-icons/fi';
import { VscOpenPreview } from 'react-icons/vsc';
import { AiOutlineHome } from 'react-icons/ai';
function fancyTimeFormat(duration) {

  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}
const WriteExam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [examData, setExamData] = useState([]);
  const [view, setView] = useState("instructions");
  const [questions = [], setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOption = [], setSelectedOption] = useState({});
  const [result = {}, setResult] = useState({});
  const [minute, setMinute] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { user } = useSelector((state) => state.users);
  const {mode} = useSelector((state) => state.darkMode)

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setQuestions(response.data.questions);
        setExamData(response.data);
        setMinute(response.data.duration * 60);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculateResult = async () => {
    try {
      let correctAnswer = [];
      let wrongAnswer = [];
      questions.forEach((question, index) => {
        if (question.correctOption === selectedOption[index]) {
          correctAnswer.push(question);
        } else {
          wrongAnswer.push(question);
        }
      });

      let verdict = "Təbriklər keçdiniz";
      if (correctAnswer.length < examData.passingMarks) {
        verdict = "Kəsildiniz";
      }

      const tempResult = {
        correctAnswer,
        wrongAnswer,
        verdict,
      };
      setResult(tempResult);
      dispatch(ShowLoading());
      const response = await addReport({
        exam: params.id,
        result: tempResult,
        user: user._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setView("result");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const startTimer = () => {
    let totalMinute = examData.duration;
    let totalSeconds = totalMinute * 60;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0 ) {
        totalSeconds = totalSeconds - 1;
        setMinute(totalSeconds);
      } 
      else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  };
 
  useEffect(() => {
    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);
  return (
    examData && (
      <div style={mode? {backgroundColor:'rgb(244, 244, 244)'}:{backgroundColor:'#121721'}} className={styled.writeExam_body}>
        <div className={styled.header_text}>
          <h1  style={mode? {color:'#253858'}:{color:'#264e93'}}>{examData.name}</h1>
        </div>

        {view === "instructions" && (
          <Instructions
            examData={examData}
            setView={setView}
            startTimer={startTimer}
          />
          
        )}
        <div className={styled.writeExam}>
          {view === "questions" && (
            <div className={styled.question_body}>
              <div style={mode? {backgroundColor:'white'}:{backgroundColor:"#19202D"}} className={styled.question_option}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>{examData.name}</title>
            </Helmet>
                <div className={styled.text_timer}>
                  <h3 style={mode? {color:'#253858'}:{color:'#264e93'}}>
                    {selectedQuestionIndex + 1}.{" "}
                    {questions[selectedQuestionIndex] &&
                      questions[selectedQuestionIndex].name}
                  </h3>
                  <p className={styled.timer}>{fancyTimeFormat(minute)} </p>
                </div>
                <div className={styled.option_body}>
                  {Object.keys(questions[selectedQuestionIndex].options).map(
                    (option, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedOption({
                              ...selectedOption,
                              [selectedQuestionIndex]: option,
                            });
                          }}
                        >
                          <p
                            className={`${
                              selectedOption[selectedQuestionIndex] === option
                                ? styled.Selectedoption
                                : styled.option
                            }`}
                          >
                            {option}:{" "}
                            {questions[selectedQuestionIndex].options[option]}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
                <div className={styled.next_previous_btns}>
                  {selectedQuestionIndex > 0 && (
                    <button
                    style={mode? {border:'2px solid  #253858',color:'#253858'}:{border:'2px solid  #264e93',color:'white'}}
                      className={styled.previous_btn}
                      onClick={() => {
                        setSelectedQuestionIndex(selectedQuestionIndex - 1);
                      }}
                    >
                      Əvvəlki
                    </button>
                  )}
                  {selectedQuestionIndex < questions.length - 1 && (
                    <button
                    style={mode? {backgroundColor:'#253858'}:{backgroundColor:'#264E93'}}
                      className={styled.next_btn}
                      onClick={() => {
                        setSelectedQuestionIndex(selectedQuestionIndex + 1);
                      }}
                    >
                      Növbəti
                    </button>
                  )}
                  {selectedQuestionIndex === questions.length - 1 && (
                    <button
                      className={styled.submit_btn}
                      onClick={() => {
                        clearInterval(intervalId);
                        setTimeUp(true);
                      }}
                    >
                      Təsdiqlə
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styled.result_body}>
          {view === "result" && (
            <div className={styled.result_container}>
              <div className={styled.result_items}>
                <h1>İmtahan Nəticəsi</h1>
                <div className={styled.marks}>
                  <p>Umimi Sual : {examData.totalMarks}</p>
                  <p>Düzgün cavab sayı: {result.correctAnswer.length}</p>
                  <p>Yalnış cavab sayı: {result.wrongAnswer.length}</p>
                  <p>
                    Imtahandan keçmək üçün minimum nəticə:{" "}
                    {examData.passingMarks}
                  </p>
                  <p><strong>Status</strong>: <strong>{result.verdict}.</strong></p>
                </div>
                <div className={styled.result_btns}>
                  <button
                   style={mode? {border:'2px solid  #253858',color:'#253858'}:{border:'2px solid  #0e5be0',color:'white',backgroundColor:"#0e5be0"}}
                  className={styled.respet_btn}
                   onClick={()=>{
                    setView("instructions");
                    setSelectedQuestionIndex(0);
                    setSelectedOption({});
                    setMinute(examData.duration)
                   }}
                  ><FiRepeat/> İmtahanı təkrarla</button>
                  <button
                  style={mode? {border:'2px solid  #03CECA',color:'#095a59'}:{border:'2px solid  #03CECA',color:'white',backgroundColor:"#03CECA"}}
                  className={styled.review_btn}
                  onClick={()=>{
                    setView('review')
                  }}><VscOpenPreview/> İmtahan ayrıntısı</button>
                </div>
              </div>
              <div className={styled.lottie_animation}>
                {result.verdict === "Təbriklər keçdiniz" && (
                  <lottie-player
                    src="https://assets2.lottiefiles.com/packages/lf20_uu0x8lqv.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                )}
                {result.verdict === "Kəsildiniz" && (
                  <lottie-player
                    src="https://assets5.lottiefiles.com/packages/lf20_CJFDsxSINb.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styled.review_body}>
          {view === 'review' &&(
             <div className={styled.review_contanier}>
                {questions.map((question, index) =>{
                  const isCorrect = question.correctOption === selectedOption[index]
                  return <div className={`${isCorrect? styled.correct_options_review : styled.wrong_options_review}`}>
                     <h1
                     style={mode? {color:'rgb(63, 63, 63)'}:{color:'black'}}
                     >
                      {index + 1} : {question.name}
                     </h1>
                     <p
                     style={mode? {color:'rgb(63, 63, 63)'}:{color:'white'}}
                     >
                      Düzgün cavab : {question.correctOption} - {question.options[question.correctOption]}
                     </p>
                     <p
                     style={mode? {color:'rgb(63, 63, 63)'}:{color:'white'}}
                     >
                      Sizin cavabınız : {selectedOption[index]} - {question.options[selectedOption[index]]}
                     </p>
                  </div>
                })}
                <div className={styled.result_btns}>
                  
                  <button
                  style={mode? {border:'2px solid  #000',color:'#fff'}:{border:'2px solid  #035ece',color:'white',backgroundColor:"#035ece"}}
                  className={styled.close_btn}
                  onClick={()=>{
                    navigate("/quizz");
                  }}><AiOutlineHome/> Əsas səhifə</button>
                </div>
             </div>
          )}
        </div>
      </div>
    )
  );
};

export default WriteExam;
