import { FormHandles } from '@unform/core';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import CardData from '../../models/CardData';
import ChatbotRegionFormDTO from '../../models/ChatbotRegionFormDTO';
import BotService from '../../services/BotService';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../Button';
import ChatbotCardData from '../ChatbotCardData';
import ChatbotRegionForm from '../ChatbotRegionForm';
import {
  BotAvatar,
  BotBoxMessage,
  BotBoxMessageContainer,
  ChatHistory,
  ChatInput,
  Container,
  Content,
  MessageContainer,
  OptionsContainer,
  UserAvatar,
  UserBoxMessage,
  UserBoxMessageContainer,
} from './styles';

interface ChatMessage {
  message: string;
  type: 'bot' | 'user';
  options?: string[];
  cardData?: CardData[];
}

const Chatbot: React.FC = () => {
  const [messageToBeProcessed, setMessageToBeProcessed] = useState('');
  const [processBotMessage, setProcessBotMessage] = useState(false);
  const [chatMessage, setChatMessage] = useState<ChatMessage[]>([]);
  const chatbotRegionFormRef = useRef<FormHandles[]>([]);

  const chatHistoryRef = createRef<HTMLDivElement>();

  const chatInputRef = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (chatHistoryRef.current?.scrollHeight) {
      chatHistoryRef.current.scrollTo({
        top: chatHistoryRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistoryRef, chatMessage]);

  useEffect(() => {
    async function startConversation() {
      const botResponse = await BotService.startConversation();
      setChatMessage([
        {
          message: botResponse.answer,
          type: 'bot',
          options: botResponse?.options,
          cardData: botResponse?.cardData,
        } as ChatMessage,
      ]);
    }

    startConversation();
  }, []);

  const sendMessage = useCallback(() => {
    if (!chatInputRef.current?.value) {
      return;
    }

    const message = chatInputRef.current?.value;

    chatInputRef.current.value = '';

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
  }, [chatMessage, chatInputRef]);

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
            options: botResponse?.options,
            cardData: botResponse?.cardData,
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
          sendMessage();
        }
      }
    },
    [sendMessage],
  );

  const handleSubmitRegionForm = useCallback(
    async (data: ChatbotRegionFormDTO, formRef: FormHandles) => {
      try {
        formRef.setErrors({});

        const schema = Yup.object().shape({
          countryStateId: Yup.string().required('O estado é obrigatório'),
          cityId: Yup.string().required('A cidade é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const botResponse = await BotService.processRegion(data);

        setChatMessage([
          ...chatMessage,
          ...[
            {
              message: botResponse.answer,
              type: 'bot',
              options: botResponse?.options,
            } as ChatMessage,
          ],
        ]);
      } catch (err: Yup.ValidationError | any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.setErrors(errors);
        }
      }
    },
    [chatMessage],
  );

  return (
    <Container>
      <Content>
        <ChatHistory ref={chatHistoryRef}>
          {chatMessage &&
            chatMessage.map((chatHistory, index) =>
              chatHistory.type === 'bot' ? (
                <BotBoxMessageContainer key={`BotBoxMessageContainer_${index}`}>
                  <MessageContainer>
                    <BotAvatar />
                    <BotBoxMessage>
                      <p>{chatHistory.message}</p>
                    </BotBoxMessage>
                  </MessageContainer>

                  <OptionsContainer>
                    {chatHistory?.options &&
                      chatHistory?.options.map((option, id) =>
                        option === 'showRegionInputs' ? (
                          <ChatbotRegionForm
                            key={`ChatbotRegionForm_${id}`}
                            inputRef={chatbotRegionFormRef?.current[id]}
                            handleSubmit={handleSubmitRegionForm}
                          />
                        ) : option === 'showProfessionalData' ? (
                          <ChatbotCardData
                            key={`ChatbotCardData_${id}`}
                            data={chatHistory?.cardData || []}
                            index={index}
                          />
                        ) : (
                          ''
                        ),
                      )}
                  </OptionsContainer>
                </BotBoxMessageContainer>
              ) : (
                <UserBoxMessageContainer
                  key={`UserBoxMessageContainer_${index}`}
                >
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
          <textarea ref={chatInputRef} onKeyDown={e => handleKeyDown(e)} />
          <Button type="button" onClick={() => sendMessage()}>
            Enviar
          </Button>
        </ChatInput>
      </Content>
    </Container>
  );
};

export default Chatbot;
