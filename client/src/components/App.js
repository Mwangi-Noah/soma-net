import React, { useState, useEffect } from 'react';
import SinglePost from './SinglePost';
import NavbarComponent from './NavbarComponent';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import BookPaginationBar from './BookPaginationBar';
import PostMenu from './PostMenu';
import './styles.css';
import Dashboard from './Dashboard';
import Cookies from 'js-cookie';
import Popup from './Popup';
import Notifications from './Notifications';

const App = () => {
  const [popup, setPopup] = useState({});
  const username = Cookies.get('username');

  const usePostsNumberFetch = (setPopup) => {
    const [number, setNumber] = useState(0);

    useEffect(() => {
      // Fetch the number of posts from the server
      // Replace with your actual API call or data fetching logic
      const fetchPostsNumber = async () => {
        try {
          const response = await fetch('/api/posts/number');
          const data = await response.json();
          setNumber(data.number);
        } catch (error) {
          setPopup({ message: 'Error fetching posts number' });
        }
      };

      fetchPostsNumber();
    }, [setPopup]);

    return number;
  };

  const usePostsPaginationFetch = (currentPage, postsPerPage, filterOptions, setPopup) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Fetch the paginated posts from the server
      // Replace with your actual API call or data fetching logic
      const fetchPaginatedPosts = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/posts?page=${currentPage}&limit=${postsPerPage}&filter=${JSON.stringify(filterOptions)}`
          );
          const data = await response.json();
          setPosts(data.posts);
          setLoading(false);
        } catch (error) {
          setPopup({ message: 'Error fetching paginated posts' });
          setLoading(false);
        }
      };

      fetchPaginatedPosts();
    }, [currentPage, postsPerPage, filterOptions, setPopup]);

    return { posts, loading };
  };

  const useReactionsFetch = (username, setPopup) => {
    const [reactions, setReactions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Fetch the reactions for the user from the server
      // Replace with your actual API call or data fetching logic
      const fetchReactions = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/reactions?username=${username}`);
          const data = await response.json();
          setReactions(data.reactions);
          setLoading(false);
        } catch (error) {
          setPopup({ message: 'Error fetching reactions' });
          setLoading(false);
        }
      };

      fetchReactions();
    }, [username, setPopup]);

    return { reactions, loading };
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({});
  const totalPosts = usePostsNumberFetch(setPopup);
  const { posts, loading } = usePostsPaginationFetch(
    currentPage,
    20, // Set the number of posts per page to 20
    filterOptions,
    setPopup
  );
  const { reactions } = useReactionsFetch(username, setPopup);

  return (
    <div>
      <NavbarComponent />
      <Notifications username={username} />
      {popup.message && <Popup error message={popup.message} />}
      <div className='row'>
        <div className='list-group-flush align-items-center col-8 align-self-start mt-3'>
          <PostMenu
            setFilterOptions={setFilterOptions}
            filterOptions={filterOptions}
          />
          {posts && !loading ? (
            posts.map((post) => {
              const status = reactions[post._id] || 0;
              return (
                <SinglePost
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  body={post.body}
                  upvotes={post.upvotes}
                  date={post.date}
                  status={status}
                  author={post.author}
                />
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className='col-3 d-flex flex-column align-items-center'>
          <Link
            className='btn btn-primary align-self-top mt-3 mb-3 pr-5 pl-5'
            to='/create'
          >
            Create a Post
          </Link>
          {totalPosts && (
            <BookPaginationBar
              currentPage={currentPage}
              setPage={setCurrentPage}
              totalPosts={totalPosts}
              perPage={20} // Set the number of posts per page to 20
            />
          )}
          {username && (
            <Dashboard username={username} setPopup={setPopup} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;