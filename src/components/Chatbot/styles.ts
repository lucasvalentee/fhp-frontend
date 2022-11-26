import styled from 'styled-components';
import doctorAvatar from '../../assets/avatar_doctor.svg';
import userAvatar from '../../assets/user_avatar.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: calc(100vh - 132px);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background: #fff;
  border-radius: 25px;
  border: 1px solid #cdcdcd;
  overflow: hidden;
`;

export const ChatHistory = styled.div`
  padding: 24px 24px 8px 24px;
  overflow-y: auto;
`;

export const ChatInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 60px;
  width: 100%;
  padding: 8px;
  background: #fff;
  border-top: 1px solid #cdcdcd;
  color: #cdcdcd;

  svg {
    margin-right: 16px;
  }

  textarea {
    resize: none;
    flex: 1;
    border: none;
    font-size: 14px;
  }

  button {
    width: 150px;
    height: 44px;
    margin: 0;
  }
`;

export const BotBoxMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const BotBoxMessage = styled.div`
  background: #cdcdcd;
  padding: 10px;
  border-radius: 15px;
  max-width: 75%;
  min-height: 40px;
  text-align: left;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const UserBoxMessageContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const UserBoxMessage = styled.div`
  background: #cdcdcd;
  padding: 10px;
  border-radius: 15px;
  max-width: 75%;
  min-height: 40px;
  text-align: right;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const BotAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${doctorAvatar}) no-repeat center;
  background-size: cover;
  margin-right: 8px;
`;

export const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${userAvatar}) no-repeat center;
  background-size: cover;
  margin-top: -5px;
  margin-left: 8px;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
