import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    // Add the new message to the existing messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: newMessage },
    ]);

    // Clear the input field
    setNewMessage('');
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Book Club Chat</Card.Title>
          {/* Display existing messages */}
          <div className="message-container">
            {messages.map((message) => (
              <div key={message.id}>{message.text}</div>
            ))}
          </div>
          {/* New message input field */}
          <Form onSubmit={handleSendMessage}>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChatComponent;