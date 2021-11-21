import { useState } from 'react';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlankPost from './blankPost';

export default function Image({ fileNumber, caption, postId, files }) {
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(false)



  const increase = () => {
    if (counter === fileNumber - 1) return null
    setCounter(counter + 1)
  }
  const decrease = () => {
    if (counter === 0) return null
    setCounter(counter - 1)
  }

  return (
    <div className="image-slider">
      <div className="image-slider__box">
        {files.length && <img src={files[counter]} alt={caption} />}
        {loading && <BlankPost width="100%" height="95%" counter={counter} />}
        <>
          {counter < (fileNumber - 1) &&
            (
              <button className="image-slider__btn image-slider__btn-inc" onClick={increase}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            )
          }</>
        {counter !== 0 && <button className="image-slider__btn image-slider__btn-dec" onClick={decrease}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>}
      </div>

    </div>
  );
}

