import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../constants';
import api from '../../api';

const Notifications = ({ username }) => {
  const [notifications, setNotifications] = useState(
    localStorage.getItem('notifications')
      ? JSON.parse(localStorage.getItem('notifications'))
      : []
  );

  useEffect(() => {
    function addNotification(message, link) {
      setNotifications((oldArray) => {
        if (!oldArray.some((e) => e.link === link)) {
          return [...oldArray, { message, link }];
        } else {
          return oldArray;
        }
      });
    }

    let eventSource;
    async function fetchNotifications() {
      try {
        const res = await api.getNotifications(username);
        if (res.status === 200) {
          const newNotifications = res.data.notifications;
          setNotifications(newNotifications);
          localStorage.setItem('notifications', JSON.stringify(newNotifications));
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (username) {
      // Fetch initial notifications
      fetchNotifications();

      // Set up WebSocket connection for real-time notifications
      eventSource = new EventSource(
        `${API_URL}/api/v1/users/${username}/notifications`,
        { withCredentials: true }
      );
      eventSource.onmessage = (e) => {
        addNotification('A comment was added to your post', e.data);
      };
    }

    return function cleanup() {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [username]);

  function deleteNotification(link) {
    const newNotifications = notifications.filter((e) => e.link !== link);
    setNotifications(newNotifications);
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
  }

  return (
    <div>
      {notifications.map((el) => (
        <div className="alert alert-success" role="alert" key={el.link}>
          <div className="d-flex justify-content-between">
            <p>{el.message}</p>
            <p
              onClick={() => deleteNotification(el.link)}
              style={{ cursor: 'pointer' }}
            >
              &#10005;
            </p>
          </div>
          <Link
            to={`/posts/${el.link}`}
            onClick={() => deleteNotification(el.link)}
          >
            Visit Post
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Notifications;