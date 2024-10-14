import React, { useState } from 'react';
import blogService from '../services/blogs';
import Alert from './Alert';

const Dropeabble = ({ blog, state, stateHandler, alertHandler }) => {
  const [drop, setDrop] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({}); 

  const handleDrop = () => {
    setDrop(!drop);
  };

  const handleLike = () => {
    const likeObjet = {
      ...blog,
      likes: blog.likes + 1,
    };

    blogService
      .update(blog.id, likeObjet)
      .then((returnedBlog) => {
        const updatedBlogs = state.map((b) => 
          b.id === blog.id ? { ...b, likes: returnedBlog.likes } : b
        );
        updatedBlogs.sort((a, b) => b.likes - a.likes);
        stateHandler(updatedBlogs);
      })
      .catch((error) => {
        console.error('Error al dar like: ', error);
      });
  };

  const handleDeleteClick = () => {
    setAlertConfig({
      message: `Do you want to delete the blog: ${blog.title}?`,
      type: 'infoq',
      onConfirm: handleDeleteConfirm,
      onCancel: handleDeleteCancel,
    });
    setShowAlert(true);
  };

  const handleDeleteConfirm = () => {
    blogService
      .remove(blog.id)
      .then(() => {
        stateHandler(state.filter((b) => b.id !== blog.id));
        alertHandler({ text: 'Blog deleted', type: 'success' });
        setTimeout(() => {
          alertHandler({ text: '', type: '' });
        }, 3000);
      })
      .catch((error) => {
        console.error('Error al borrar: ', error);
        alertHandler({ text: `Something bad happened: ${error}`, type: 'error' });
        setTimeout(() => {
          alertHandler({ text: '', type: '' });
        }, 5000);
      });
    setShowAlert(false); 
  };

  const handleDeleteCancel = () => {
    setShowAlert(false);
  };

  return (
    <div className={`blog ${drop ? 'droped' : ''}`}>
      <div className="info">
        <h2 className='btitle'>{blog.title}</h2>
        <div className={`fullinfo ${drop ? 'droped' : ''}`}>
          <p className='ifo'>
            Autor: <span className='if'>{blog.author}</span>
          </p>
          <p className='ifo'>
            Link: <span className='if'>{blog.url}</span>
          </p>
          <p className='ifo'>
            Usuario: <span className='if'>{blog.user.name}</span>
          </p>
          <button class="Btn" onClick={handleLike}>
            <span class="leftContainer">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path></svg>
              <span class="like">Like</span>
            </span>
            <span class="likeCount">
              {blog.likes}
            </span>
          </button>
        </div>
      </div>

      <div className="ctas">
        <label className="label">
          <div className="toggle">
            <input onClick={handleDrop} className="toggle-state" type="checkbox" name="check" value="check" />
            <div className="indicator"></div>
          </div>
        </label>

        <button onClick={handleDeleteClick} className={`deleteButton ${drop ? 'droped' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 59" className="bin">
            <path fill="#B5BAC1" d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"></path>
            <path fill="#B5BAC1" d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"></path>
            <path fill="#B5BAC1" d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z" clipRule="evenodd" fillRule="evenodd"></path>
            <path fill="#B5BAC1" d="M2 13H48L47.6742 21.28H2.32031L2 13Z"></path>
          </svg>
        </button>
      </div>

      {showAlert && (
        <Alert message={alertConfig.message} type={alertConfig.type} onConfirm={alertConfig.onConfirm} onCancel={alertConfig.onCancel} />
      )}
    </div>
  );
};

export default Dropeabble;
