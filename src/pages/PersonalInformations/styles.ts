import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  padding: 40px;

  h3 {
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: 400;
  }

  form {
    margin: 40px 0;
    width: 80%;
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

    button {
      max-width: 180px;
      align-self: flex-end;
      background: #56be7f;
      font-weight: 800;

      &:hover {
        background: #4dab72;
      }
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  div,
  input,
  option {
    margin-top: 0;

    + div {
      margin-left: 10px;
    }
  }
`;
