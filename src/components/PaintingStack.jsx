import React, { useState } from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"

const IMG_HEIGHT_PX = 220
const IMG_HEIGHT_COLLAPSED_PX = 70
const CANVAS_OFFSET_PX = 4

const StackContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  .img-container {
    margin-top: 20px;
    .canvas-background {
      position: relative;
      margin: auto;
      width: 50vw;
      &:before,
      &:after {
        left: 0;
        right: 0;
        position: absolute;
        content: "";
      }
      &:before {
        background: hsla(0, 0%, 90%);
        border: 1px solid hsla(0, 0%, 50%, 0.1);
        top: ${CANVAS_OFFSET_PX / 2}px;
        bottom: -${CANVAS_OFFSET_PX / 2}px;
        left: 100%;
        width: ${CANVAS_OFFSET_PX}px;
        transform: skew(0deg, 45deg);
      }
      &:after {
        background: hsla(0, 0%, 70%);
        border: 1px solid hsla(0, 0%, 50%, 0.4);
        top: 100%;
        right: -${CANVAS_OFFSET_PX / 2}px;
        left: ${CANVAS_OFFSET_PX / 2}px;
        height: ${CANVAS_OFFSET_PX}px;
        transform: skew(45deg, 0deg);
      }
    }
  }
`

const StackedImage = ({ idx, expandSelf, isExpanded }) => {
  const springBoxShadow = useSpring({
    transform: `scale(${isExpanded ? 1 : 0.98})`,
    boxShadow: `${
      isExpanded ? `3px 6px 8px` : `0px 4px 2px`
    } rgba(0, 0, 0, 0.31)`,
  })
  const springMaxHeight = useSpring({
    maxHeight: isExpanded ? IMG_HEIGHT_PX : IMG_HEIGHT_COLLAPSED_PX,
  })
  return (
    <animated.div
      key={idx}
      onClick={expandSelf}
      className={`img-container`}
      style={springMaxHeight}
    >
      <animated.div
        className="canvas-background"
        style={{
          backgroundImage: `url(https://picsum.photos/${500 +
            idx}/${IMG_HEIGHT_PX})`,
          height: IMG_HEIGHT_PX,
          ...springBoxShadow,
        }}
      ></animated.div>
    </animated.div>
  )
}

export default () => {
  const [expandedImgIndex, setExpandedImgIndex] = useState(null)
  return (
    <StackContainerStyles>
      {[...Array(10)].map((_, idx) => (
        <StackedImage
          idx={idx}
          expandSelf={() => setExpandedImgIndex(idx)}
          isExpanded={idx === expandedImgIndex}
        />
      ))}
    </StackContainerStyles>
  )
}
