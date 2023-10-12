import React from 'react'
// import style from './ProtectedRoutes.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes(props) {

  if (localStorage.getItem("userToken")) {
      return props.children
    }
  else {
    return <Navigate to={"/login"}/>
    
  }
  
}



//لو كتبت في ال url لينك صفحة البروفايل او الرسايل ميدخلش عليها ويحولني للوج ان لو انا مش مسجل







//قبل ما ادخل علي كمبوننت ارسال رسالو البروفايل يتاكد الاول في توكين في اللوكال ستورج ولا لا يجولوا بروبس
//navigate to ترجع كومبوننت / usenavigate ترجع url