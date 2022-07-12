import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  padding: 30px 50px 0 50px;
  width: 100%;
  height: 80px;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  -webkit-app-region: drag;
`;

const TitleText = styled.span`
  font-weight: 900;
  font-size: 1.8rem;
  color: #000;
`;

const TitleButtons = styled.div`
  color: #000;
  -webkit-app-region: no-drag;
`;

export default function TitleBar() {
  return (
    <Header>
      <TitleText>PIXEL Launcher</TitleText>
      <TitleButtons>
      </TitleButtons>
    </Header>
  );
}
