import { useCallback, useEffect, useRef, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import BotService from '../../services/BotService';
import Button from '../Button';
import {
  BotAvatar,
  BotBoxMessage,
  BotBoxMessageContainer,
  ChatHistory,
  ChatInput,
  Container,
  Content,
  UserAvatar,
  UserBoxMessage,
  UserBoxMessageContainer,
} from './styles';

interface ChatMessage {
  message: string;
  type: 'bot' | 'user';
}

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messageToBeProcessed, setMessageToBeProcessed] = useState('');
  const [processBotMessage, setProcessBotMessage] = useState(false);
  const [chatMessage, setChatMessage] = useState<ChatMessage[]>([]);

  useEffect(() => {
    async function startConversation() {
      const botResponse = await BotService.startConversation();

      setChatMessage([
        {
          message: botResponse.answer,
          type: 'bot',
        } as ChatMessage,
      ]);
    }

    startConversation();
  }, []);

  const sendMessage = useCallback(() => {
    if (!message) {
      return;
    }

    setChatMessage([
      ...chatMessage,
      ...[
        {
          message,
          type: 'user',
        } as ChatMessage,
      ],
    ]);

    setProcessBotMessage(true);
    setMessageToBeProcessed(message);
    setMessage('');
  }, [chatMessage, message]);

  useEffect(() => {
    if (!processBotMessage || !messageToBeProcessed) {
      return;
    }

    setProcessBotMessage(false);

    async function process() {
      const botResponse = await BotService.processMessage(messageToBeProcessed);

      setChatMessage([
        ...chatMessage,
        ...[
          {
            message: botResponse.answer,
            type: 'bot',
          } as ChatMessage,
        ],
      ]);
    }

    process();
    setMessageToBeProcessed('');
  }, [processBotMessage, chatMessage, messageToBeProcessed]);

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Enter') {
        event.preventDefault();

        if (event.target.value !== '') {
          setMessage(event.target.value);
          sendMessage();
        }
      }
    },
    [sendMessage],
  );

  return (
    <Container>
      <Content>
        <ChatHistory>
          {chatMessage &&
            chatMessage.map((chatHistory, index) =>
              chatHistory.type === 'bot' ? (
                <BotBoxMessageContainer key={`bot_message_${index}`}>
                  <BotAvatar />
                  <BotBoxMessage>
                    <p>{chatHistory.message}</p>
                  </BotBoxMessage>
                </BotBoxMessageContainer>
              ) : (
                <UserBoxMessageContainer key={`user_message_${index}`}>
                  <UserAvatar />
                  <UserBoxMessage>
                    <p>{chatHistory.message}</p>
                  </UserBoxMessage>
                </UserBoxMessageContainer>
              ),
            )}
        </ChatHistory>
        <ChatInput>
          <FiMail size={20} />
          <textarea
            value={message}
            onChange={event => setMessage(event.target.value)}
            onKeyDown={e => handleKeyDown(e)}
          />
          <Button type="button" onClick={() => sendMessage()}>
            Enviar
          </Button>
        </ChatInput>
      </Content>
    </Container>
  );
};

export default Chatbot;
