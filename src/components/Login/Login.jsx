import React, { useContext, useState } from 'react'
// import style from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/tokenContext'


export default function Login() {
   const [isLoading, setLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  let Navigate = useNavigate()

  let { setToken } = useContext(tokenContext);

  function login(values) { //send to backend and batabase 
    console.log(values);
    setLoading(true);
    axios.post("https://sara7aiti.onrender.com/api/v1/user/signin", values).then((data) => {
      console.log(data);
      if (data.data.message == "welcome") {
        setLoading(false);
        localStorage.setItem("userToken",data.data.token)
        setToken(data.data.token);
        Navigate('/profile')
      }
    }).catch((err)=> {
      console.log(err.response.data.error)
      setApiError(err.response.data.error)
      setLoading(false);
    })
  }


  const validationSchema = Yup.object({ //validation using yup
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    password: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,}).*$/,'Invalid password address').required('password is Required'),
  })
   

  let formik = useFormik({
    initialValues: {
    email:"",
    password:"",
    },validationSchema,
    onSubmit: (values) => {
      login(values);
      console.log("Hey",values);
    }
  })



  return (
<div className="w-50 mx-auto my-5">
      <h3 className='text-center'>Login</h3>
      <form onSubmit={formik.handleSubmit}>
          <div className='form-group my-2'>
        <label htmlFor="email">Email</label>
          <input type="text" id='email' className='form-control' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:""}

        </div>
          <div className='form-group my-2'>
        <label htmlFor="password">Password</label>
          <input type="password" id='password' className='form-control' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:""}
        </div>
        <button type='submit' className='btn btn-outline-dark rounded-pill d-block mx-auto'>
          {isLoading? <i className='fa fa-spin fa-spinner'></i>:<><i className='fa fa-edit'></i>Register</>}
          </button>
        {apiError ? <div className='alert alert-danger'>{apiError }</div>:""}
      </form>
      
    </div>  )
}


//token نستخدم التوكين من الكونتكست لما يعمل لوج ان احطه في اللوكال واخلي setToken بتساوي التوكين عشان اي لوج ان جديد ياخد التوكين الجديد