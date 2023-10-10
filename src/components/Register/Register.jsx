import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const [isLoading, setLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  let Navigate = useNavigate()

  function register(values) { //send to backend and batabase 
    console.log(values);
    setLoading(true);
    axios.post("https://sara7aiti.onrender.com/api/v1/user", values).then((data) => {
      console.log(data);
      if (data.data.message == "Added") {
        setLoading(false);
        Navigate('/login')
      }
    }).catch((err)=> {
      console.log(err.response.data.error)
      setApiError(err.response.data.error)
      setLoading(false);
    })
  }

  // const validate = (values) => { //validation from scratch
  //   const errors = {};
  //   if (!values.name) {
  //     errors.name = 'Required';
  //     } else if (values.name.length <3) {
  //     errors.name = 'Must be 3 characters or more';
  //   }else if (values.name.length > 15) {
  //     errors.name = 'Must be 15 characters or less';
  //     }
  
  //   if (!values.email) {
  //     errors.email = 'Email is Required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //     }

  //     if (!values.password) {
  //       errors.password = 'password is Required';
  //     } else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
  //             errors.password = 'password not match';
  //     }

  //     if (!values.rePassword) {
  //       errors.rePassword = 'rePassword is Required';
  //     }
  //       else if (values.password != values.rePassword) {
  //             errors.rePassword = 'rePassword must match Password';
  //     }

  //     if (!values.age) {
  //         errors.age="age is required"
  //     } else if(values.age < 10){
  //       errors.age="age must be more than 10"
  //     }
  //     else if(values.age > 60){
  //             errors.age="age must be less than 60"
  //     }

  //   return errors;
  // };


  //2 validate using YUP

  const validationSchema = Yup.object({ //validation using yup
    name: Yup.string().max(15, 'Must be 15 characters or less').min(3,'Must be 3 characters or more').required('name is required'),
    email: Yup.string().email('Invalid email address').required('Email is Required'),
    password: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,}).*$/,'Invalid password address').required('password is Required'),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "rePassword must match Password").required('repassword is Required'), //oneOf بتقارن الباسورد
    age: Yup.number().max(60,'age must be less than 60').min(10,'age must be more than 10').required('age is Required'),

  })
   

  let formik = useFormik({
    initialValues: {
    name:"",
    email:"",
    password:"",
    rePassword:"",
    age:0
    },validationSchema,
    onSubmit: (values) => {
      register(values)
      console.log("Hey",values);
    }
  })




  return (
    <div className="w-50 mx-auto my-5">
      <h3 className='text-center'>Register</h3>
      <form onSubmit={formik.handleSubmit}>
      <div className='form-group my-2'>
        <label htmlFor="userName">Username</label>
          <input type="text" id='userName' className='form-control' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ""}
        </div>
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
          <div className='form-group my-2'>
        <label htmlFor="rePassword">rePassword</label>
          <input type="password" id='rePassword' className='form-control' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:""}

        </div>
          <div className='form-group my-2'>
        <label htmlFor="age">age</label>
          <input type="number" id='age' className='form-control' name='age' value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.age && formik.touched.age ? <div className='alert alert-danger'>{formik.errors.age}</div>:""}

        </div>
        <button type='submit' className='btn btn-outline-dark rounded-pill d-block mx-auto'>
          {isLoading? <i className='fa fa-spin fa-spinner'></i>:<><i className='fa fa-edit'></i>Register</>}
          </button>
        {apiError ? <div className='alert alert-danger'>{apiError }</div>:""}
      </form>
      
    </div>
  )
}



//npm i formik باكدج تعمل فاليديت للفورم بعرفها واديها ال keys البيانات اللي هسجل بيها
