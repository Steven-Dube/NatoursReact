import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Tours.css';
import './../views/Navbar';
import Navbar from "../views/Navbar";
import Tour from "../views/Tour";
import {isUserAuthenticated} from "../utils/LocalStorageUtil";

const Tours = () => {
  const [tours, setTours] = useState([{}]);
  const [errorState, setErrorState] = useState(false);
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate();

  const goToLogin = () => {
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, '4000');
  }

  useEffect(() => {
    if(!isUserAuthenticated()) {
      setAuthorized(false);
      goToLogin();
    }

    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API}/tours`,{
      headers: { Authorization: `Bearer ${token}` }
    }).then(
        res => {
          if(res.status === 200) {
            res.json().then(data => {
              setTours(data.tours);
              setAuthorized(true);
            });
          } else if(res.status === 401) {
            setAuthorized(false);
            goToLogin();
          } else {
            setErrorState(true);
          }
        }
    ).catch(err => {
      setErrorState(true);
    })
  }, []);

  return (
    <div>
        {authorized && <Navbar />}
      <div className='toursBackground'>
        {!authorized &&
          <div>You are not authorized, you will be redirected to the login page soon.</div>
        }
        {!errorState && authorized &&
          <div>
            <h1 className='centeredText toursTitle'>Tours</h1>
            <div className='toursContainer'>
              {tours?.map((tour, i) => (
                <div key={i}>
                  <Tour tour={{
                    name: tour.name,
                    price: tour.price,
                    rating: tour.rating,
                    description: tour.description,
                    id: tour._id,
                  }} />
                </div>
              ))}
            </div>
          </div>
        }
        {errorState && authorized &&
          <div>Cannot fetch tours...</div>
        }
      </div>
    </div>
  );
};

export default Tours;