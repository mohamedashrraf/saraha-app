// import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css'
// import { CounterContext } from '../../Context/counter'

export default function Navbar() {
  // let {counter} = useContext(CounterContext)
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <Link className="navbar-brand" to={''}><h3 className='text-white'>Saraha</h3></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to={''} aria-current="page" href="#">Home</Link>
        </li>
        <li className="nav-item">
                <Link className="nav-link" to={'profile'}>Profile</Link>
                <span className='text-white'></span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'login'}>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'register'}>Register</Link>
        </li>
      </ul>
    </div>
  </div>
      </nav>
      </>
  )
}
