import styled from "styled-components";

export const ComponentWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
`;

export const Video = styled.video.attrs({
  autoPlay: true,
  muted: true,
  loop: true,
  playsInline: true,
})`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  z-index: 0;
  width: 100vw;

  height: auto;
  background: white;
  background-position: center center;
  background-size: cover;
  display: block;
`;
