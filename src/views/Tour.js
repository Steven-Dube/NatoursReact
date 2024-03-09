import React, {useEffect, useState} from "react";
import './Tour.css';
import {isTourBought, setStorageBoughtTour} from "../utils/LocalStorageUtil";

const Tour = (props) => {
  const [bought, setBought] = useState(false);
  const tour = props.tour;

  useEffect(() => {
    if(tour.id === undefined) {
      return;
    }

    const isBought = isTourBought(props.tour.id);
    setBought(isBought);
  }, [tour]);
  const boughtButtonClicked = () => {
    setBought(!bought);
    setStorageBoughtTour(props.tour.id);
  }

  return (
    <div className='tourContainer'>
      <div className='tourAttributeContainer'>
        <p className='boldText'>Tour name:&nbsp;</p>
        <p>{props.tour?.name}</p>
      </div>
      <div className="tourAttributeContainer">
        <p className='boldText'>Price:&nbsp;</p>
        <p>{props.tour?.price}$</p>
      </div>
      <div className="tourAttributeContainer">
        <p className='boldText'>Rating:&nbsp;</p>
        <p>{props.tour?.rating}/5</p>
      </div>
      <div className="tourAttributeContainer">
        <p className='boldText'>Description:&nbsp;</p>
        <p>{props.tour?.description}</p>
      </div>
      <button onClick={boughtButtonClicked}>{bought ? 'Cancel' : 'Buy'}</button>
    </div>
  );
}

export default Tour;