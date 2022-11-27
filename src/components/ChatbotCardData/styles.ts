import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  align-items: flex-start;

  max-width: 75%;

  background: #cdcdcd;
  padding: 16px;
  border-radius: 15px;
  min-height: 40px;
  text-align: left;
  font-size: 14px;
  margin-bottom: 16px;
  margin-left: 58px;

  overflow-x: scroll;
`;

export const Card = styled.div`
  background: #dcdcdc;
  border-radius: 15px;
  padding: 10px;
  min-width: 450px;
  max-width: 450px;

  line-height: 22px;

  &:first-child {
    margin-right: 16px;
  }

  p {
    align-items: center;
  }

  h3 {
    margin-bottom: 8px;
  }

  svg {
    margin-right: 8px;
  }
`;
