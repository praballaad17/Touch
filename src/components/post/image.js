import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BlankPost from './blankPost';

export default function Image({ fileNumber, postId, files, author }) {
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

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
        <div className={`${fileNumber == 2 || fileNumber == 3 || fileNumber == 4 ? `image-slider__box-left-${fileNumber}` : "image-slider__box-left"}`}>
          {files.map((item, index) => (<>
            {index < 2 ? <Link to={`/${author}/${postId}/${index + 1}`} key={index}
              className={`${fileNumber == 2 || fileNumber == 4 || fileNumber == 3 ? `image-slider__box-img-${fileNumber}` : "image-slider__box-img"}`}>
              <img
                className="image-slider__box-img-nor"
                src={item} alt="files" />
            </Link> : <></>}
          </>)
          )}
        </div>

        {fileNumber > 2 ? <div className={`${fileNumber == 4 ? "image-slider__box-right-2" : "image-slider__box-right-3"}`}>
          {files.map((item, index) => (<>
            {index > 1 ? <Link to={`/${author}/${postId}/${index + 1}`} key={index}><img className={`${fileNumber == 4 ? `image-slider__box-img-${fileNumber}` : "image-slider__box-img-r3"}`} src={item} alt="files" /></Link> : <></>}

          </>)
          )}
        </div> : <></>}
        {/* {files.length ? <Link to={`/${author}/${postId}/${counter + 1}`}><img className="image-slider__box-img" src={files[counter]} alt={caption} /></Link> : <></>}
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
        </button>} */}
      </div>

    </div>
  );
}

