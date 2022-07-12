import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Login from './Login';

import './styles/Global.scss';
import TitleBar from './TitleBar';

const LayoutDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fbfbfb;
  border-radius: 10px;
`;

const ContentDiv = styled.div`
  width: 100%;
  height: calc(100% - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.span`
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
`;

export default function Layout() {

  // const [loading] = useRecoilState(loadingState);

  return (
    <LayoutDiv>
      {/* <LoadingDiv>
        <CircularProgress />
        <LoadingText>로딩 중...</LoadingText>
      </LoadingDiv> */}
      <TitleBar />
      <ContentDiv>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </ContentDiv>
    </LayoutDiv>
  );
}
