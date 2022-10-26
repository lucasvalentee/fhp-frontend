import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  padding: 40px;

  h3 {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 800;
    text-align: start;
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

    div[class='dropdown-container'] {
      background: #fff;
      border-radius: 10px;
      padding: 8px;
      width: 100%;
      border: 2px solid #cdcdcd;
      text-align: start;
    }

    div[class='dropdown-container'],
    div[class='dropdown-heading'],
    div[class='dropdown-heading-value'] {
      &:hover {
        cursor: pointer;
      }
    }

    div[class='rmsc specialties-required'] > div[class='dropdown-container'] {
      border: 2px solid #c53030;
    }

    .submitButton {
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
