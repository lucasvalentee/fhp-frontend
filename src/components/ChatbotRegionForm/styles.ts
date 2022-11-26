import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Content = styled.div`
  background: #cdcdcd;
  padding: 10px;
  border-radius: 15px;
  max-width: 50%;
  min-height: 40px;
  text-align: left;
  font-size: 14px;
  margin-bottom: 16px;
  margin-left: 58px;

  select,
  button {
    font-size: 14px;
  }
`;
