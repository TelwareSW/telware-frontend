import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ScrollContainer } from "styles/GlobalStyles";

// Example messages data (replace with real-time data from your backend or state management)
const messages = [
  { id: 1, sender: "self", text: "Hey there!", timestamp: "10:00 AM" },
  { id: 2, sender: "other", text: "Hi! How are you?", timestamp: "10:01 AM" },
  {
    id: 3,
    sender: "self",
    text: "I'm good, thanks! What about you?",
    timestamp: "10:02 AM",
  },
  {
    id: 4,
    sender: "other",
    text: "I'm doing well! What's new?",
    timestamp: "10:03 AM",
  },
  {
    id: 5,
    sender: "self",
    text: "Just working on some stuff. How about you?",
    timestamp: "10:04 AM",
  },
  {
    id: 6,
    sender: "other",
    text: "Same here! Busy day ahead.",
    timestamp: "10:05 AM",
  },
  {
    id: 7,
    sender: "self",
    text: "Yeah, same. Lots of things to get done.",
    timestamp: "10:06 AM",
  },
  {
    id: 8,
    sender: "other",
    text: "I hear you. Do you have any plans for the weekend?",
    timestamp: "10:07 AM",
  },
  {
    id: 9,
    sender: "self",
    text: "Nothing specific, just relaxing. You?",
    timestamp: "10:08 AM",
  },
  {
    id: 10,
    sender: "other",
    text: "I'm planning to go hiking if the weather's nice.",
    timestamp: "10:09 AM",
  },
  {
    id: 11,
    sender: "self",
    text: "That sounds fun! Where do you usually go?",
    timestamp: "10:10 AM",
  },
  {
    id: 12,
    sender: "other",
    text: "There's a great trail nearby. It's not too difficult.",
    timestamp: "10:11 AM",
  },
  {
    id: 13,
    sender: "self",
    text: "Nice! I might have to try it sometime.",
    timestamp: "10:12 AM",
  },
  {
    id: 14,
    sender: "other",
    text: "Definitely! It's a great way to clear your mind.",
    timestamp: "10:13 AM",
  },
  {
    id: 15,
    sender: "self",
    text: "I agree, nature has a calming effect.",
    timestamp: "10:14 AM",
  },
  {
    id: 16,
    sender: "other",
    text: "Exactly! Plus, it’s a good workout.",
    timestamp: "10:15 AM",
  },
  {
    id: 17,
    sender: "self",
    text: "I could use some exercise. Maybe I’ll join you next time.",
    timestamp: "10:16 AM",
  },
  {
    id: 18,
    sender: "other",
    text: "That would be great! Let's plan for it soon.",
    timestamp: "10:17 AM",
  },
  {
    id: 19,
    sender: "self",
    text: "Looking forward to it! Let me know when.",
    timestamp: "10:18 AM",
  },
  {
    id: 20,
    sender: "other",
    text: "For sure! I'll check my schedule and let you know.",
    timestamp: "10:19 AM",
  },
];

const ChatBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%; /* Set a fixed height */
  padding: 10px;
  /* background-color: #f9f9f9; */
`;

const Message = styled.div<{ isSelf: boolean }>`
  display: flex;
  align-items: flex-end;
  margin: 5px 0;

  ${({ isSelf }) =>
    isSelf ? "justify-content: flex-end;" : "justify-content: flex-start;"}
`;

const Bubble = styled.div<{ isSelf: boolean }>`
  max-width: 70%;
  padding: 10px;
  border-radius: 15px;
  font-size: 14px;
  background-color: ${({ isSelf }) => (isSelf ? "#0084ff" : "#e5e5ea")};
  color: ${({ isSelf }) => (isSelf ? "#fff" : "#000")};
  margin: ${({ isSelf }) => (isSelf ? "0 0 0 10px" : "0 10px 0 0")};
`;

const Timestamp = styled.span`
  font-size: 10px;
  color: gray;
  margin-top: 5px;
`;

function ChatBody() {
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom on mount or when messages change
  useEffect(() => {
    if (chatRef.current) {
      // Check if the user is already at the bottom
      const isScrolledToBottom =
        chatRef.current.scrollHeight - chatRef.current.scrollTop ===
        chatRef.current.clientHeight;

      if (isScrolledToBottom) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <ScrollContainer>
      <ChatBodyContainer ref={chatRef}>
        {messages.map((msg) => (
          <Message key={msg.id} isSelf={msg.sender === "self"}>
            <Bubble isSelf={msg.sender === "self"}>{msg.text}</Bubble>
            <Timestamp>{msg.timestamp}</Timestamp>
          </Message>
        ))}
      </ChatBodyContainer>
    </ScrollContainer>
  );
}

export default ChatBody;
