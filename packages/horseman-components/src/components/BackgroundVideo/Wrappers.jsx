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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;

  z-index: 0;

  background: white;
  display: block;
`;
