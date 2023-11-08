import styled from 'styled-components';

export const Background = styled.div`
  position: relative;
  width: 70vw;
  height: 70vh;
  top: 0;
  bottom: 10px;
  right: 30px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;