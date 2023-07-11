import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './UserDashboard.module.css';
import useUserDataFetch from '../../Hooks/useUserDataFetch';
import api from '../../api';
import Cookies from 'js-cookie';

const Dashboard = ({ setPopup }) => {
  const username = Cookies.get('username');
  const data = useUserDataFetch(username, setPopup);
  const hiddenInput = React.useRef();

  async function handleChange(e) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const res = await api.sendChangeIconRequest(formData, username);
    if (res.status === 200) {
      window.location.reload();
    } else if (res.status === 401) {
      setPopup({ message: 'Something went wrong. Please re-login again.' });
    } else {
      setPopup({ message: 'That is not a valid type.' });
    }
  }

  function handleClick() {
    // Trigger the click event of the hidden "choose image" input
    if (hiddenInput.current) hiddenInput.current.click();
  }

  return (
    <div className='card justify-content-center d-flex flex-column'>
      <div className={styles.background}>
        <p className={styles.editIcon} onClick={handleClick}>
          Edit Image
        </p>
        <input
          ref={hiddenInput}
          type='file'
          id='fileField'
          name='file'
          accept='image/*'
          hidden='true'
          onChange={handleChange}
        />
        <div
          className={`mx-auto ${styles.imgContainer}`}
          style={{
            backgroundImage: `url("/api/v1/users/${username}/icon")`,
          }}
        />
        <h5 className={styles.text}>{username}</h5>
      </div>
      <ul className='list-group'>
        <li className='list-group-item'>
          <h5 className={styles.text}>Reputation</h5>
          <div className={`p-1 border bg-light ${styles.text}`}>
            {data.reputation}
          </div>
        </li>
        <li className='list-group-item'>
          <h5 className={styles.text}>Number of Posts</h5>
          <div className={`p-1 border bg-light ${styles.text}`}>
            {data.numberOfPosts}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;