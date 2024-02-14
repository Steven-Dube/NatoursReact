import React, { useRef, useState } from "react";
import './Tour.css';

const Tour = (props) => {
  const [bought, setBought] = useState(false);
  const boughtButtonClicked = () => {
    setBought(!bought);
    props.storeTour(props.tour.id, !bought);
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