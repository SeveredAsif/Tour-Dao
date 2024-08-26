import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FiMessageSquare, FiX } from "react-icons/fi";
import "../css/ChatPage.css"; // Import the CSS file

function ChatPage() {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]); // Use an array to store all messages
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await axios.get("http://localhost:4000/gemini", { params: { prompt } });
            setMessages([...messages, { question: prompt, answer: result.data.text }]); // Add new message to the array
            setPrompt(""); // Clear the input field after submission
        } catch (error) {
            console.error("Error calling the API", error);
            setMessages([...messages, { question: prompt, answer: "Something went wrong. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-bubble-container">
            {!isOpen ? (
                <div className="chat-bubble" onClick={() => setIsOpen(true)}>
                    <FiMessageSquare size={24} />
                </div>
            ) : (
                <div className="chat-box">
                    <div className="chat-box-header">
                        <span className="chat-box-title">Chat with TravelBot</span>
                        <FiX size={24} onClick={() => setIsOpen(false)} className="chat-box-close" />
                    </div>
                    <Container className="chat-container">
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className="chat-response-box">
                                    <div className="user-question">{msg.question}</div>
                                    <div className="chat-response">{msg.answer}</div>
                                </div>
                            ))}
                        </div>
                        <Form onSubmit={handleSubmit} className="chat-form">
                            <Row>
                                <Col>
                                    <Form.Control
                                        className="chat-input"
                                        type="text"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Ask anything..."
                                        required
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button className="chat-button" variant="primary" type="submit" disabled={loading}>
                                        {loading ? "Sending..." : "Send"}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default ChatPage;
