import React, { useEffect, useState } from 'react';
import { Card, Button, Form, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const BookClub = () => {
  const { bookClubId } = useParams();
  const [bookClub, setBookClub] = useState(null);
  const [discussionQuestions, setDiscussionQuestions] = useState([]);
  const [newDiscussionQuestion, setNewDiscussionQuestion] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  useEffect(() => {
    // Fetch book club data and discussion questions
    fetch(`/api/bookclubs/${bookClubId}`)
      .then((response) => response.json())
      .then((data) => {
        setBookClub(data);
        setDiscussionQuestions(data.discussionQuestions);
      })
      .catch((error) => {
        console.error('Failed to fetch book club:', error);
      });
  }, [bookClubId]);

  const handleDiscussionQuestionSubmit = (e) => {
    e.preventDefault();
    // API call to create a new discussion question
    fetch(`/api/bookclubs/${bookClubId}/discussionQuestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: newDiscussionQuestion,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDiscussionQuestions([...discussionQuestions, data]);
        setNewDiscussionQuestion('');
      })
      .catch((error) => {
        console.error('Failed to create discussion question:', error);
      });
  };

  const handleJoinBookClub = () => {
    // API call to join the book club
    fetch(`/api/bookclubs/${bookClubId}/join`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          // Update the book club data to include the new member
          setBookClub((prevBookClub) => ({
            ...prevBookClub,
            members: [...prevBookClub.members, { email: 'current_user_email' }],
          }));
        } else {
          console.error('Failed to join book club:', response.status);
        }
      })
      .catch((error) => {
        console.error('Failed to join book club:', error);
      });
  };

  const handleAddMember = () => {
    // API call to add a new member to the book club
    fetch(`/api/bookclubs/${bookClubId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newMemberEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the book club data to include the new member
        setBookClub((prevBookClub) => ({
          ...prevBookClub,
          members: [...prevBookClub.members, data],
        }));
        setNewMemberEmail('');
      })
      .catch((error) => {
        console.error('Failed to add member:', error);
      });
  };

  return (
    <div>
      {bookClub && (
        <Card>
          <Card.Body>
            <Card.Title>{bookClub.book.title}</Card.Title>
            <Card.Text>Author: {bookClub.book.author}</Card.Text>
            <Button variant="primary" onClick={handleJoinBookClub}>
              Join Book Club
            </Button>
          </Card.Body>
        </Card>
      )}

      <div className="mt-4">
        <h3>Discussion Questions</h3>
        <Form onSubmit={handleDiscussionQuestionSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              value={newDiscussionQuestion}
              onChange={(e) => setNewDiscussionQuestion(e.target.value)}
              placeholder="Enter your discussion question"
              required
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>

        <ListGroup className="mt-4">
          {discussionQuestions.map((question) => (
            <ListGroup.Item key={question.id}>{question.question}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="mt-4">
        <h3>Members</h3>
        <Form onSubmit={handleAddMember}>
          <Form.Group>
            <Form.Control
              type="email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              placeholder="Enter member's email"
              required
            />
          </Form.Group>
          <Button type="submit">Add Member</Button>
        </Form>

        {bookClub && (
          <ul>
            {bookClub.members.map((member, index) => (
              <li key={index}>{member.email}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Add chat area / forum box here */}
    </div>
  );
};

export default BookClub;