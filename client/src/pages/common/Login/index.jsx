import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from './style.module.scss';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { loginUser } from '../../../apicalls/users';
import { useDispatch } from 'react-redux'
import { ShowLoading, HideLoading } from '../../.././redux/loaderSlice/loaderSlice'
const Login = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('*Keçərsiz e-mail adress!').required('*E-mail xanasını doldurun!'),
      password: Yup.string()
        .required('*Parol daxil edin!')
        .min(6, '*Minumum 6 simvol olmalıdır!')
    }),
    onSubmit: async (values) => {
      try {
        dispatch(ShowLoading())
        const response = await loginUser(values)
        dispatch(HideLoading())
        if (response.success) {
          message.success(response.message)
          localStorage.setItem('token', response.data)
          window.location.href = "/quizz";
        } else {
          message.error(response.message);
        }      
      } catch (error) {
        dispatch(HideLoading())
        message.error(error.message);
      }
      formik.resetForm()
    },
  });
  return (
    <div className={styled.login_body}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Daxil ol</title>
        <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <div className={styled.header}>
        <img src="https://www.shareicon.net/data/2015/08/19/87561_games_1042x1042.png" alt="" />
        <h1>Quizlet</h1>
      </div>
      <div className={styled.login}>
        <div className={styled.login_right}>
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_KvK0ZJBQzu.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
        </div>
        <div className={styled.login_left}>
          <form onSubmit={formik.handleSubmit}>
            <h2>Daxil ol</h2>
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

            <button type="submit">Giriş</button>
            <Link className={styled.register_link} to='/register'>
             Qeydiyyatdan keçməmisiniz? Qeydiyyat
            </Link>
          </form>
        </div>
        
      </div>
    </div>
  )
}

export default Login