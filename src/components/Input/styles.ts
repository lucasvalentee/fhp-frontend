import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 2px solid #cdcdcd;
  color: #cdcdcd;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 10px;
  }

  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #62a0fd;
      border-color: #62a0fd;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #62a0fd;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #312e38;

    &::placeholder {
      color: #cdcdcd;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
