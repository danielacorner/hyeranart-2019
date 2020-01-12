import React from "react"
import { AnimatedImageContent } from "./AnimatedImageContent"
import { SpringInOut } from "../Animated/Springs"
import styled from "styled-components"
import { Portal } from "@material-ui/core"
import ButtonsDrawer, { DRAWER_HEIGHT_PX } from "../ButtonsDrawer"

const ModalWrapperStyles = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  height: calc(100vh - ${DRAWER_HEIGHT_PX}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  pointer-events: none;
  .springUpDownWrapper {
    pointer-events: ${props => (props.isSelected ? "auto" : "none")};
  }
`

const AnimatedImageModal = ({
isSelected,
width,
height,
depthPx,
handleMouseOver,
handleMouseOut,
handleClick,
springOnHover,
springOpacityWhite,
springOpacityBlack,
title,
fluid,
handleClickAway,
isSelected,
saatchiLink,
fullScreenLink,
metadata,
}) => (
  <Portal>
    <ModalWrapperStyles isSelected={isSelected}>
      <SpringInOut
        in={isSelected}
        widthPx={width}
        heightPx={height}
      >
        <AnimatedImageContent
          width={width}
          height={height}
          depthPx={depthPx}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          handleClick={handleClick}
          springOnHover={springOnHover}
          springOpacityWhite={springOpacityWhite}
          springOpacityBlack={springOpacityBlack}
          title={title}
          fluid={fluid}
          metadata={metadata}
          isModalImage={true}
        />
      </SpringInOut>
      <ButtonsDrawer
        onBackdropClick={handleClickAway}
        open={isSelected}
        saatchiLink={saatchiLink}
        fullScreenLink={fullScreenLink}
        metadata={metadata}
      />
    </ModalWrapperStyles>
  </Portal>
)
export default AnimatedImageModal
