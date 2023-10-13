import React, { useEffect, useState } from 'react';
// import style from './SendMessage.module.css'
import { useParams } from 'react-router-dom'
import avatarImg from "../../images/avatar.png";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../Redux/messagesSlice'

export default function SendMessage() {
  let {userId} = useParams(); 
  const messages = useSelector((state) => state.message);
  let dispatch = useDispatch();

//   async function addMessage(values) {   //use context
//     let data = {
//       ...values,
//       receivedId: userId.userId
//     };
//     console.log(data);
//     try {
//   let addedMessages = await axios.post("https://sara7aiti.onrender.com/api/v1/message", data);
//   console.log(addedMessages);
// } catch (error) {
//   console.error("Error:", error.response.data);
// }

//   }

  let formik = useFormik({
    initialValues: {
      messageContent: "",
    },
    onSubmit: (values) => {
      // addMessage(values);
      dispatch(addMessage({ messageContent: values.messageContent, receivedId: userId }));  //use redux
      console.log(values)
    },
  })
  

  return (
    <>
      <div className="container text-center py-2 my-5 text-center">
        <div className="card py-5 mb-5">
          <a data-target="#profile">
            <img src={avatarImg} className="avatar" style={{width:'60px'}} />
          </a>
          <div className="container w-50 m-auto">
            <form onSubmit={formik.handleSubmit}>
              <textarea
                className="form-control"
                name="messageContent"
                cols={10}
                rows={9}
                placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"
                value={formik.values.messageContent}
                onChange={formik.handleChange}
              />
              <button type="submit" className="btn btn-outline-info mt-3">
                <i className="far fa-paper-plane" /> Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}



//ياخد id اليوزر من ال url وابعتله رسالة