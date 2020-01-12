import styled from "styled-components"
const CANVAS_BORDER_COLOR = "hsl(0,0%,80%)"

export const Scene3DCanvasStyles = styled.div`
  perspective: 3000;
  .scene,
  &.scene {
    width: fit-content;
    height: fit-content;
    transform-style: preserve-3d;
    position: relative;
  }
  .cube {
    width: 100%;
    height: fit-content;
    position: relative;
    transform-style: preserve-3d;
  }
  .cube__face {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid ${CANVAS_BORDER_COLOR};
  }
  .cube__face--front {
    transform: rotateY(0deg) translateZ(${props => props.thicknessPx / 2}px);
  }
  .cube__face--right {
    background: hsla(0, 0%, 80%);
    width: ${props => props.thicknessPx}px;
  }
  .cube__face--back {
    transform: rotateY(180deg) translateZ(${props => props.thicknessPx / 2}px);
  }
  .cube__face--left {
    background: hsla(0, 0%, 94%);
    width: ${props => props.thicknessPx}px;
    transform: rotateY(-90deg) translateZ(${props => props.thicknessPx / 2}px);
  }
  .cube__face--top {
    background: hsla(0, 0%, 94%);
    height: ${props => props.thicknessPx}px;
    transform: rotateX(90deg) translateZ(${props => props.thicknessPx / 2}px);
  }
  .cube__face--bottom {
    background: hsla(0, 0%, 80%);
    height: ${props => props.thicknessPx}px;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .overlay-white {
    background: rgba(255, 255, 255, 1);
  }
  .overlay-black {
    background: rgba(0, 0, 0, 0.8);
  }
`
