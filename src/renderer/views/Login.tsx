import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const LoginWindow = styled.div`
  padding: 50px 0;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  box-shadow: 5px 5px 30px 0px grey;
  z-index: 999;

  &:after {
    content: '.';
    color: #fbfbfb;
    width: 300px;
    height: 300px;
    background-color: transparent;
    z-index: -10;
    position: absolute;
    left: calc(50% - 150px);
    bottom: calc(50% - 170px);
    border-radius: 10px;
    box-shadow: -3px -3px 25px 0px #fff;
  }
`;

const LoginTitle = styled.span`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 20px;
`;

export default function Login() {
  return (
    <LoginWindow>
      <LoginTitle>LOGIN</LoginTitle>
      <Button variant="contained">MOJANG 게정으로 로그인</Button>
      <Button variant="contained">MICROSOFT 게정으로 로그인</Button>
    </LoginWindow>
  );
}
