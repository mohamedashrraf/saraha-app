import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import style from './Profile.module.css';
import img from '../../images/avatar.png'
import axios from 'axios';
import jwtDecode from 'jwt-decode';


export default function Profile() {
  const avatar = 'path_to_avatar_image'; // Provide the correct path to your avatar image
  const userName = 'My Profile'; // Provide the correct username

  const [allMessages, setAllMessages] = useState([])
  const [userId, setUserId] = useState("");
  
  async function getMessages() {
    await axios.get("https://sara7aiti.onrender.com/api/v1/message", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((data) => {
        console.log(data.data.allMessages);
        console.log(data)
        setAllMessages(data.data.allMessages);
      });
  }

  function getUserId() {
    let decoded = jwtDecode(localStorage.getItem("userToken"));
    console.log(decoded);
    setUserId(decoded);
  }

  useEffect(() => {
    getMessages()
    getUserId()
  },[])


  return (
    <>
    <div className="container text-center py-3 my-5 text-center">
        <div className="card py-3 mb-5 d-flex justify-content-center align-items-center">
        <a data-toggle="modal" data-target="#profile">
          <img src={img} alt="User Avatar" className="avatar w-25" />
        </a>
        <h3 className="py-2">{userName}</h3>
        <Link to={'/sendmessage/'+userId} className="w-25 mx-auto text-center btn btn-outline-dark rounded-pill" variant="primary">
          <i className="fas fa-share-alt" /> Share Profile
        </Link>
      </div>
      </div>


      <div className="container text-center py-3 my-5 text-center">
        <div className="card mb-5 d-flex justify-content-center align-items-center">
          {allMessages.length == 0 ?
            <div className='col-md-12'>
              <div className='card py-5'>
                <p>you don't have any messages</p>
              </div>
            </div> :
            <>
              <h3 className="py-2">{userName}</h3>
            </>
          }
          </div>
        </div>
        
     
    </>
    
  );
}


//share profile button لما ادوس عليه يوديني صفحة الرسايل ويحط id اليوزر اللي واخده من التوكين بعمله ديكود ويحطه في ال url
//getUserId function بفك بيها تشفير التوكين واخ منه ال id واحطه في ال url