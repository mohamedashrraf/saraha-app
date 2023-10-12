import React from 'react'
// import style from './SendMessage.module.css'
import { useParams } from 'react-router-dom'
import avatarImg from "../../images/avatar.png";
import { useFormik } from "formik";
import axios from "axios";

export default function SendMessage() {
  let userId = useParams(); 

  async function addMessage(values) {
    let data = {
      ...values,
      receivedId: userId.id,
    };
    let { addedMessages } = await axios.post("https://sara7aiti.onrender.com/api/v1/message", data);
    console.log(addedMessages);
  }

  let formik = useFormik({
    initialValues: {
      messageContent: "",
    },
    onSubmit: (values) => {
      addMessage(values);
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