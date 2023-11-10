import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: 'Inter', sans-serif;
  }

  body {
    background: #125CB1;
    display: grid;
    place-items: center;
    height: 100vh;
  }

  a {
    text-decoration: none;
  }

 a.active{
  color: #a3d1ee;
}
`;

// paragraph

interface ParagraphProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  margin?: string;
  lineheight?: string;
  onhover?: string;
  cursor?: string;
}

export const Text = styled.p<ParagraphProps>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '12px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineheight};
  color: ${(props) => props.color};
  cursor: ${(props) => props.cursor};
  transition: ease 0.4s;

  &:hover {
    color: ${(props) => props.onhover};
  }
`;

interface FlexProps {
  flexdirection?: string;
  gap?: string;
  margin?: string;
  padding?: string;
  justifyContent?: string;
  alignItems?: string;
  flex?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  gap: ${(props) => props.gap};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => props.flexdirection};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  flex: ${(props) => props.flex};
  position: relative;
`;
