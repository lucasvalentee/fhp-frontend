import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Header = styled.div`
  width: 100%;
  height: 100px;
  background: #eff3f8;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderInformation = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    max-height: 90%;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  min-width: 25%;
  align-items: center;
  justify-content: end;

  > button {
    margin-top: 0;
  }
`;

export const ButtonSignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

export const ButtonSignUp = styled.div`
  :hover {
    cursor: pointer;
    color: #62a0fd;
  }
  font-size: 18px;
  font-weight: bold;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 25%;
  flex: 1;
  text-align: center;
  padding: 0 12px;

  > button {
    padding: 8px;
    height: auto;
  }
`;

export const UserButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  > button:last-child {
    margin-left: 12px;
    background: #ff5050;
  }

  > button {
    padding: 8px;
    height: auto;
  }
`;

export const Content = styled.div``;
