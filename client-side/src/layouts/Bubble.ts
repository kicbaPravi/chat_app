import styled from 'styled-components';

export const Bubble = styled.div`
  width: 448px;
  min-height: 77px;
  padding: 23px 30px;
  border-radius: 15px;
  background: #ffffff;
  margin-bottom: 9px;

  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 11px 14px 11px 0;
    border-color: transparent white;
    display: block;
    width: 0;
    z-index: 1;
    left: -14px;
    top: 12px;
  }

  & p {
    line-height: 1.3em;
  }
`;
