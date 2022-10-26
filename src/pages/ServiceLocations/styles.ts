import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  padding: 40px 10px;

  h1 {
    margin-bottom: 24px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  a {
    background: #56be7f;
    height: 56px;
    width: 240px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #fff;
    font-weight: 800;
    margin-top: 16px;
    transition: background-color 0ms.2s;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;

    &:hover {
      background: #4dab72;
    }
  }
`;

export const NotFoundDataContainer = styled.div`
  background-color: #fbfbfb;
  display: flex;
  flex: 1;
  justify-content: center;

  h3 {
    font-weight: 400;
  }
`;
