import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from './style.module.scss';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import { registerUser } from '../../../apicalls/users';
import { message } from 'antd'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice/loaderSlice';
const Register = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(25, '*Adınız maximum 25 simvol ola bilər!')
        .required('*Adınızı daxil edin!'),
      email: Yup.string().email('*Keçərsiz e-mail adress!').required("*E-mail'nizi daxil edin!"),
      password: Yup.string()
        .required('*Parol daxil edin!')
        .min(6, '*Minumum 6 simvol olmalıdır!')
    }),
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        dispatch(ShowLoading())
        const response = await registerUser(values)
        dispatch(HideLoading())
        if (response.success) {
          message.success(response.message)
          window.location.href = "/login";
        } else {
          message.error(response.message)
        }
      } catch (error) {
        dispatch(HideLoading())
        message.error(error.message)
      }
      formik.resetForm()
    },
  });
  return (
    <div className={styled.login_body}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Qeydiyyat</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <div className={styled.header}>
        <img src="https://www.shareicon.net/data/2015/08/19/87561_games_1042x1042.png" alt="" />
        <h1>Quizlet</h1>
      </div>
      <div className={styled.login}>
      <div className={styled.login_right}>
      <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_jcikwtux.json"  background="transparent"  speed="1" loop  autoplay></lottie-player>
        </div>
        <div className={styled.login_left}>
          <form onSubmit={formik.handleSubmit}>
            <h2>Qeydiyyat</h2>
            <div className={styled.inp_body}>
              <AiOutlineUser />
              <input
                id="name"
                name="name"
                type="text"
                placeholder='Ad'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />

            </div>
            {formik.touched.name && formik.errors.name ? (
              <span className={styled.requried}>{formik.errors.name}</span>
            ) : null}
            <div className={styled.inp_body}>
              <HiOutlineMail />
              <input
                id="email"
                name="email"
                type="email"
                placeholder='E-mail'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

            </div>
            {formik.touched.email && formik.errors.email ? (
              <span className={styled.requried}>{formik.errors.email}</span>
            ) : null}
            <div className={styled.inp_body}>
              <RiLockPasswordLine />
              <input
                id="password"
                name="password"
                type="password"
                placeholder='Parol'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <span className={styled.requried}>{formik.errors.password}</span>
            ) : null}

            <button type="submit">Təsdiqlə</button>
            <Link className={styled.register_link} to='/login'>
              Artıq qeydiyyatdan keçmisiniz? Daxil ol
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register