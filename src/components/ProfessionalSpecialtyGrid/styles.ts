import styled from 'styled-components';
import checkmarkIcon from '../../assets/checkmark-icon.svg';
import trashIcon from '../../assets/trash-icon.svg';

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;

  div,
  input,
  option {
    min-width: 50px;
    margin-top: 0;

    + div {
      margin-left: 10px;
    }
  }
`;

export const SaveButton = styled.button`
  border: none;
  display: flex;
  height: 48px;
  min-width: 48px;
  background: url(${checkmarkIcon});
  background-size: cover;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  border: none;
  display: flex;
  height: 48px;
  min-width: 48px;
  background: url(${trashIcon});
  background-size: cover;
  cursor: pointer;
`;
