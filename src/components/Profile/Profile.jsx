import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import style from './Profile.module.css';
import img from '../../images/avatar.png'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { increase, decrease } from '../../Redux/counterSlice';
import { getMessages } from '../../Redux/messagesSlice'
// import { QueryClient, QueryClientProvider, useQuery } from "react-query";



export default function Profile() {
  const userName = 'Profile Name'; 

  const [allMessages, setAllMessages] = useState([])
  const [userId, setUserId] = useState("");

  let { counter } = useSelector((state) => state.counterRed);
  // const messages = useSelector((state) => state.message); //using redux
  let dispatch = useDispatch();
  

  async function getMessages() {   //using context
    await axios.get("https://sara7aiti.onrender.com/api/v1/message", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((data) => {
        console.log(data)
        setAllMessages(data.data.allMessages);
      });
  }

  //  const { isLoading, error, data, isFetching } = useQuery("repoData", () => using react-query
  //   axios
  //     .get("https://sara7aiti.onrender.com/api/v1/message", {
  //       headers: {
  //         token: localStorage.getItem("userToken"),
  //       },
  //     })
  //     .then((data) => {
  //       console.log(data.data);
  //       setAllMessages(data.data.allMessages);
  //     })
  // );

  function getUserId() {
    let decoded = jwtDecode(localStorage.getItem("userToken"));
    console.log(decoded);
    setUserId(decoded.id);
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
          <h3 className="py-2">{userName} { counter }</h3>
        <Link to={'/message/'+ userId} className="w-25 mx-auto text-center btn btn-outline-dark rounded-pill" variant="primary">
          <i className="fas fa-share-alt" /> Share Profile
          </Link>
          <div>
          <button className="my-2 mx-auto text-center btn btn-outline-dark rounded-pill" onClick={()=>dispatch(increase())}>Increace</button>
            <button className="my-2 mx-auto text-center btn btn-outline-dark rounded-pill" onClick={()=>dispatch(decrease())}>Decreace</button>
            </div>
      </div>
      </div>


      <div className="container text-center py-3 my-5 text-center">
        <div className="card mb-5 d-flex justify-content-center align-items-center">
          {allMessages.length === 0 ?
            <div className='col-md-12'>
              <div className='card py-5'>
                <p>you don't have any messages</p>
              </div>
            </div> :
            <>
              {allMessages.map((ele) => 
                <div className='col-md-12'>
                  <div className='card py-5'>
                    <p key={ele.id}>{ele.messageContent}</p>
                  </div>
                </div>
              )}
            </>
          }
          </div>
        </div>
        
    </>
    
  );
}


//share profile button لما ادوس عليه يوديني صفحة الرسايل ويحط id اليوزر اللي واخده من التوكين بعمله ديكود ويحطه في ال url
//getUserId function بفك بيها تشفير التوكين واخ منه ال id واحطه في ال url