import styled from 'styled-components';

export const Input = styled.textarea`
  width: 723px;
  height: 48px;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  font-size: 14px;
  padding-top: 15px;
  outline: none;
  padding-left: 23px;
  resize: vertical;
  max-height: 78px;

  &::placeholder {
    color: #82878d;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
