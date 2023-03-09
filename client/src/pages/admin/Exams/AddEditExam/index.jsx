import { message } from "antd";
import React, { useEffect, useState } from "react";
import PageTitle from "../../../../components/PageTitle/index";
import styled from "./style.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { GiDuration } from "react-icons/gi";
import { SiVirustotal } from "react-icons/si";
import { VscPass } from "react-icons/vsc";
import {
  addExam,
  deleteQuestionById,
  editExamById,
  getExamById,
} from "../../../../apicalls/exmas";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoading,
  ShowLoading,
} from "../../../../redux/loaderSlice/loaderSlice";
import { Tabs } from "antd";
import TabPane from "rc-tabs/lib/TabPanelList/TabPane";
import AddEditQuestion from "../AddEditQuestion";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table } from "antd";

const AddEditExams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {mode} = useSelector((state)=> state.darkMode)
  const [examData, setExamData] = useState([]);
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    useState(false);
  const [selcetedQuestion, setSelcetedQuestion] = useState(null);
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      name: "",
      duration: "",
      category: "",
      totalMarks: "",
      passingMarks: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(35, "İmtahan adı 35 simvoldan çox ola bilməz")
        .required("*Bu xananı doldurun!"),
      duration: Yup.string()
        .min(1, "İmtahan vaxtı 1 dəqiqədən az ola bilməz")
        .required("*Bu xananı doldurun!"),
      category: Yup.string()
        .max(35, "İmtahan kategoriyası 35 simvoldan çox ola bilməz")
        .required("*Bu xananı doldurun!"),
      totalMarks: Yup.string()
        .min(1, "Maximum nəticə 1-dən az ola bilməz")
        .required("*Bu xananı doldurun!"),
      passingMarks: Yup.string()
        .min(1, "Minimum nəticə 1-dən az ola bilməz")
        .required("*Bu xananı doldurun!"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(ShowLoading());
        let response;

        if (params.id) {
          response = await editExamById({
            ...values,
            examId: params.id,
          });
        } else {
          response = await addExam(values);
        }

        if (response.success) {
          message.success(response.message);
          navigate("/admin/exams");
        } else {
          message.error(response.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    },
  });

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  useEffect(() => {
    if (examData) {
      formik.setValues({
        name: examData.name,
        duration: examData.duration,
        category: examData.category,
        totalMarks: examData.totalMarks,
        passingMarks: examData.passingMarks,
      });
    }
  }, [examData]);

  const deleteQuestion = async (questionId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteQuestionById({
        questionId,
        examId : params.id
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getExamData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const questionColumns = [
    {
      title: "Suallar",
      dataIndex: "name",
      align: "left",
      width: "500px",
    },
    {
      title: "Variantlar",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div>
              {key} : {record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Düzgün cavab",
      dataIndex: "correctOption",
      align: "left",
      render: (text, record) => {
        return ` ${record.correctOption} : ${
          record.options[record.correctOption]
        }`;
      },
    },
    {
      title: "Əməliyyatlar",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className={styled.action}>
            <span
              onClick={() => {
                setSelcetedQuestion(record);
                setShowAddEditQuestionModal(true);
              }}
            >
              <FiEdit3 />
            </span>
            <span
              onClick={() => {
                deleteQuestion(record._id);
              }}
            >
              <RiDeleteBin6Line />
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <div
    style={mode? {backgroundColor:'rgb(244, 244, 244)'}:{backgroundColor:'#121721'}} 
    className={styled.edit_body}>
       <div 
    className={styled.addExam_body}>
      <div className={styled.addExam_text}>
        <PageTitle
          title={params.id ? "Imtahan düzəlişi" : "Imtahan əlavə et"}
        />
      </div>
      <div
      style={mode? {backgroundColor:'white'}:{backgroundColor:"#131e32"}}
      className={styled.form_body}>
        {(examData || !params.id) && (
          <form onSubmit={formik.handleSubmit}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Imtahan Təfərrüatı" key="1">
                <div className={styled.tab_pane1}>
                  <div
                  style={mode? {color:'#253858'}:{color:'white'}}
                  className={styled.inp_name_body}>
                    <p 
                     style={mode? {color:'#253858'}:{color:'#264e93'}}
                    className={styled.exam_name}>Imtahan adı</p>
                    <div className={styled.inp_body}>
                      <MdOutlineDriveFileRenameOutline />
                      <input
                      style={mode? {color:'#253858'}:{color:'white'}}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="İmtahan adını daxil edin."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name ? (
                      <div className={styled.require}>{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <div className={styled.inp_name_body}>
                    <p 
                     style={mode? {color:'#253858'}:{color:'#264e93'}}
                    className={styled.exam_name}>Imtahan müddəti</p>
                    <div 
                    style={mode? {color:'#253858'}:{color:'white'}}
                    className={styled.inp_body}>
                      <GiDuration />
                      <input
                      style={mode? {color:'#253858'}:{color:'white'}}
                        id="duration"
                        name="duration"
                        type="number"
                        placeholder="İmtahan müddətin daxil edin."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.duration}
                      />
                    </div>
                    {formik.touched.duration && formik.errors.duration ? (
                      <div className={styled.require}>
                        {formik.errors.duration}
                      </div>
                    ) : null}
                  </div>

                  <div className={styled.inp_name_body}>
                    <p 
                     style={mode? {color:'#253858'}:{color:'#264e93'}}
                    className={styled.exam_name}>Imtahan kategoriyası</p>
                    <div 
                    style={mode? {color:'#253858'}:{color:'white'}}
                    className={styled.inp_body}>
                      <BiCategoryAlt />
                      <input
                      style={mode? {color:'#253858'}:{color:'white'}}
                        id="category"
                        name="category"
                        type="text"
                        placeholder="İmtahan kategoriyanını daxil edin."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                      />
                    </div>
                    {formik.touched.category && formik.errors.category ? (
                      <div className={styled.require}>
                        {formik.errors.category}
                      </div>
                    ) : null}
                  </div>

                  <div className={styled.inp_name_body}>
                    <p 
                     style={mode? {color:'#253858'}:{color:'#264e93'}}
                    className={styled.exam_name}>Maximum nəticə</p>
                    <div
                    style={mode? {color:'#253858'}:{color:'white'}}
                    className={styled.inp_body}>
                      <SiVirustotal />
                      <input
                      style={mode? {color:'#253858'}:{color:'white'}}
                        id="totalMarks"
                        name="totalMarks"
                        type="number"
                        placeholder="İmtahanda maximum nəticəni daxil edin."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.totalMarks}
                      />
                    </div>
                    {formik.touched.totalMarks && formik.errors.totalMarks ? (
                      <div className={styled.require}>
                        {formik.errors.totalMarks}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <div className={styled.inp_name_body}>
                      <p 
                       style={mode? {color:'#253858'}:{color:'#264e93'}}
                      className={styled.exam_name}>Minimum nəticə</p>
                      <div 
                      style={mode? {color:'#253858'}:{color:'white'}}
                      className={styled.inp_body}>
                        <VscPass />
                        <input
                        style={mode? {color:'#253858'}:{color:'white'}}
                          id="passingMarks"
                          name="passingMarks"
                          type="number"
                          placeholder="Lazım olan minimum nəticəni daxil edin."
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passingMarks}
                        />
                      </div>
                      {formik.touched.passingMarks &&
                      formik.errors.passingMarks ? (
                        <div className={styled.require}>
                          {formik.errors.passingMarks}
                        </div>
                      ) : null}
                    </div>
                    <div className={styled.addExam_btns}>
                    <button
                      className={styled.cancelBtn}
                      type="button"
                      onClick={() => navigate("/admin/exams")}
                    >
                      Ləğv et
                    </button>
                    <button className={styled.addBtn} type="submit">
                      Əlavə et
                    </button>
                    </div>
                  </div>
                </div>
              </TabPane>
              {params.id && (
                <TabPane tab="Imtahan Suallari" key="2">
                  <div className={styled.qustion_header}>
                    <button
                     style={mode? {border:'2px solid  #253858',color:" #253858"} :{border: "2px solid #264e93",color: "#264e93"}}
                      type="button"
                      className={styled.add_question_btn}
                      onClick={() => setShowAddEditQuestionModal(true)}
                    >
                      <i className="ri-add-line"></i>
                      <span>Sual əlavə et</span>
                    </button>
                  </div>
                  <div className={styled.table}>
                  <Table
                    columns={questionColumns}
                    dataSource={examData?.questions || []}
                  />
                  </div>
                </TabPane>
              )}
            </Tabs>
          </form>
        )}
      </div>
      {showAddEditQuestionModal && (
        <AddEditQuestion
          setShowAddEditQuestionModal={setShowAddEditQuestionModal}
          showAddEditQuestionModal={showAddEditQuestionModal}
          examId={params.id}
          refreshData={getExamData}
          selcetedQuestion={selcetedQuestion}
          setSelcetedQuestion={setSelcetedQuestion}
        />
      )}
    </div>
    </div>
  );
};

export default AddEditExams;
