import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import Button from '../Button';
import {
  BotBoxMessage,
  BotBoxMessageContainer,
  ChatHistory,
  ChatInput,
  Container,
  Content,
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

    function process() {
      setChatMessage([
        ...chatMessage,
        ...[
          {
            message: 'Resposta do bot',
            type: 'bot',
          } as ChatMessage,
        ],
      ]);

      return 'ok';
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
                  <BotBoxMessage>
                    <p>{chatHistory.message}</p>
                  </BotBoxMessage>
                </BotBoxMessageContainer>
              ) : (
                <UserBoxMessageContainer key={`user_message_${index}`}>
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
