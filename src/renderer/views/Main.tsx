import React from 'react';
import styled from 'styled-components';

const MainContainerDiv = styled.div`
  padding: 50px 0;
  width: 300px;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  box-shadow: 5px 5px 30px 0px grey;
  z-index: 999;
`;

const GameContainer = styled.div`
  padding: 50px;
`;

export default function Login() {
  return (
    <MainContainerDiv>
      {/* <LoginTitle>LOGIN</LoginTitle> */}
    </MainContainerDiv>
  );
}
