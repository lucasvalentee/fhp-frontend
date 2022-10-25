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

  form {
    margin: 10px 0;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0ms.2s;

      &:hover {
        color: shade(0.2, '#f4ede8');
      }
    }

    select:disabled {
      color: #312e38;
    }
  }
`;

export const GenericLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;

  button[type='button'] {
    background: #ff5050;
    width: 240px;
    font-weight: 800;
    margin-top: 0;

    &:hover {
      background: #e64848;
    }

    &:last-child {
      margin-left: 10px;
      background: #56be7f;

      &:hover {
        background: #4dab72;
      }
    }
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
