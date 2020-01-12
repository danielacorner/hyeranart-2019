import styled from "styled-components"
const CAROUSEL_MAX_WIDTH = 960
export const NAV_HEIGHT = 64

export const CarouselStyles = styled.div`
  max-width: ${CAROUSEL_MAX_WIDTH}px;
  max-height: calc(100vh - ${NAV_HEIGHT}px);
  margin: auto;
  display: grid;
  align-items: center;
  align-content: center;
  .gatsby-image-wrapper {
    height: 100%;
  }
  .animated-images-wrapper {
    position: relative;
    display: grid;
    grid-auto-flow: column;
    height: 100%;
    .img-wrapper {
      display: grid;
      align-items: center;
      height: 100%;
      max-height: calc(100vh - ${NAV_HEIGHT}px);
      max-width: ${CAROUSEL_MAX_WIDTH}px;
      width: 100vw;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        /* object-fit: contain !important; */
      }
    }
  }

  position: relative;
  .arrow-wrapper {
    position: absolute;
    z-index: 1;
    height: 100%;
    display: grid;
    align-items: center;
    &.arrow-right {
      right: -3em;
    }
    &.arrow-left {
      left: -3em;
    }
    .MuiIconButton-root {
      /* color: rgba(255, 255, 255, 0.54); */
    }
    .MuiButtonBase-root.MuiIconButton-root {
      background-color: rgba(255, 255, 255, 0.36);
    }
    .MuiButtonBase-root.MuiIconButton-root:hover {
      /* background-color: rgba(255, 255, 255, 0.16); */
    }
  }
  .animated-modal-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`
