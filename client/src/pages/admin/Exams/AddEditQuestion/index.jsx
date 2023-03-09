import React, { useEffect } from 'react'
import { Modal, message } from 'antd'
import styled from './style.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addQuestionToExam, editQuestionById } from '../../../../apicalls/exmas';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice/loaderSlice';
const AddEditQuestion = ({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selcetedQuestion,
  setSelcetedQuestion
}) => {

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: '',
      correctOption: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Minimum 2 simvol olmalidir')
        .required('*Bu xana boş qala bilməz!'),
      correctOption: Yup.string()
        .max(1, 'Maximum 1 simvol olmalidir')
        .required('*Bu xana boş qala bilməz!'),
      optionA: Yup.string()
        .min(1, 'Minimum 1 simvol olmalidir')
        .required('*Bu xana boş qala bilməz!'),
      optionB: Yup.string()
        .min(1, 'Minimum 1 simvol olmalidir')
        .required('*Bu xana boş qala bilməz!'),
      optionC: Yup.string()
        .min(1, 'Minimum 1 simvol olmalidir')
        .required('*Bu xana boş qala bilməz!'),
      optionD: Yup.string()
        .min(1, 'Minimum 1 simvol olmalidir')
        .required('*Bu xana boş qala bilməz!'),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(ShowLoading());
        const requiredPayload = {
          name: values.name,
          correctOption: values.correctOption,
          options: {
            A: values.optionA,
            B: values.optionB,
            C: values.optionC,
            D: values.optionD,
          },
          exam: examId,
        };

        let response;
         if(selcetedQuestion) {
            response = await editQuestionById({
              ... requiredPayload,
              questionId: selcetedQuestion._id
            })
         }else{
         response = await addQuestionToExam(requiredPayload);
         }
        if (response.success) {
          message.success(response.message);
          refreshData();
          setShowAddEditQuestionModal(false);
        } else {
          message.error(response.message);
        }
        setSelcetedQuestion(null)
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    },
  });
  useEffect(() => {
    if (selcetedQuestion) {
      formik.setValues({
        name: selcetedQuestion?.name,
        optionA: selcetedQuestion?.options?.A,
        optionB: selcetedQuestion?.options?.B,
        optionC: selcetedQuestion?.options?.C,
        optionD: selcetedQuestion?.options?.D,
        correctOption: selcetedQuestion?.correctOption,
      });
    }
  }, [selcetedQuestion]);
  return (
    <>
      <Modal className={styled.module_first} title={selcetedQuestion? "Sualı düzəlt" : 'Sual Əlavə et' }visible={showAddEditQuestionModal} footer={false} onCancel={() => {setShowAddEditQuestionModal(false)
      setSelcetedQuestion(null)
      }}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styled.inp_name_body}>
            <p className={styled.exam_name}>Sual</p>
            <div className={styled.inp_body}>
              <textarea
                id="name"
                name="name"
                type="text"
                placeholder='Sualı daxil edin.'

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
            <p className={styled.exam_name}>Düzgün variant</p>
            <div className={styled.inp_body}>
              <input
                id="correctOption"
                name="correctOption"
                type="text"
                placeholder='Düzgün variantı daxil edin.'

                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.correctOption}
              />
            </div>
            {formik.touched.correctOption && formik.errors.correctOption ? (
              <div className={styled.require}>{formik.errors.correctOption}</div>
            ) : null}
          </div>

          <div className={styled.option_body}>
            <div className={styled.inp_name_body}>
              <p className={styled.exam_name}>Variant A</p>
              <div className={styled.inp_body}>
                <input
                  id="optionA"
                  name="optionA"
                  type="text"
                  placeholder='Variantı daxil edin.'

                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.optionA}
                />
              </div>
              {formik.touched.optionA && formik.errors.optionA ? (
                <div className={styled.require}>{formik.errors.optionA}</div>
              ) : null}
            </div>
            <div className={styled.inp_name_body}>
              <p className={styled.exam_name}>Variant B</p>
              <div className={styled.inp_body}>
                <input
                  id="optionB"
                  name="optionB"
                  type="text"
                  placeholder='Variantı daxil edin.'

                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.optionB}
                />
              </div>
              {formik.touched.optionB && formik.errors.optionB ? (
                <div className={styled.require}>{formik.errors.optionB}</div>
              ) : null}
            </div>
            <div className={styled.inp_name_body}>
              <p className={styled.exam_name}>Variant C</p>
              <div className={styled.inp_body}>
                <input
                  id="optionC"
                  name="optionC"
                  type="text"
                  placeholder='Variantı daxil edin.'

                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.optionC}
                />
              </div>
              {formik.touched.optionC && formik.errors.optionC ? (
                <div className={styled.require}>{formik.errors.optionC}</div>
              ) : null}
            </div>
            <div className={styled.inp_name_body}>
              <p className={styled.exam_name}>Variant D</p>
              <div className={styled.inp_body}>
                <input
                  id="optionD"
                  name="optionD"
                  type="text"
                  placeholder='Variantı daxil edin.'

                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.optionD}
                />
              </div>
              {formik.touched.optionD && formik.errors.optionD ? (
                <div className={styled.require}>{formik.errors.optionD}</div>
              ) : null}
            </div>
          </div>
          
          <div className={styled.btns}>
            <button className={styled.cancelBtn} type='button' onClick={() => setShowAddEditQuestionModal(false)}>Ləğv et</button>
            <button className={styled.addBtn} type="submit">Əlavə et</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddEditQuestion