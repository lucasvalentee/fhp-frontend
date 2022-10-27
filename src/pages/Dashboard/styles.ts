import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: stretch;

  .arrowLeft {
    color: #62a0fd;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0ms.2s;

    display: flex;
    align-items: center;
    align-self: center;

    svg {
      margin-right: 8px;
    }

    &:hover {
      color: #4e80ca;
    }
  }
`;
