import React from "react"
import { useTransition, animated } from "react-spring"
import styled from "styled-components"
import { SeeInARoomButton, ZoomButton, CommentsButton } from "./OptionsButtons"
import { SCALE_ON_HOVER } from "../../AnimatedImage/AnimatedImage"

const BUTTON_WIDTH = 40
const BUTTON_MARGIN = 6

const getInitialTransform = (idx, length) => {
  const x = getX(idx, length)
  return { transform: `translate3d(${-4 * x}px,0px,0) scale(0.2)`, opacity: 0 }
}
const getX = (idx, length) => {
  const xPct = idx / (length - 1)
  const x = (xPct - 0.5) * (2 * BUTTON_MARGIN)
  return x
}

const OptionsPopupStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  .animationWrapper {
    width: ${BUTTON_WIDTH}px;
    margin: 0 ${BUTTON_MARGIN}px;
  }
`

const OptionsPopup = ({
  isSelected,
  title,
  fullScreenLink,
  inARoomLink,
  gridGap,
  height,
}) => {
  const popupHeight = gridGap * 0.7 + height * ((SCALE_ON_HOVER - 1) / 2)

  const handleMakeAnOffer = () => null

  const buttonsToDisplay = [
    {
      idx: 0,
      iconButton: (
        <a href={inARoomLink} target="_blank" rel="noopener noreferrer">
          <SeeInARoomButton />
        </a>
      ),
      text: "See in a room",
    },
    {
      idx: 1,
      iconButton: (
        <a href={fullScreenLink} target="_blank" rel="noopener noreferrer">
          <ZoomButton />
        </a>
      ),
      text: "View full-screen",
    },
    {
      idx: 2,
      iconButton: <CommentsButton onClick={handleMakeAnOffer} />,
      text: "Make an offer",
    },
  ]

  const transitions = useTransition(
    buttonsToDisplay,
    item => item.text + title,
    {
      from: ({ idx }) => getInitialTransform(idx, buttonsToDisplay.length),
      enter: ({ idx }) => getInitialTransform(idx, buttonsToDisplay.length),
      update: ({ idx }) => {
        const x = getX(idx, buttonsToDisplay.length)
        const y = isSelected ? -popupHeight : 0
        const scale = isSelected ? 1 : 0.2
        return {
          transform: `translate3d(${
            isSelected ? x : -4 * x
          }px,-${y}px,0) scale(${scale})`,
          opacity: isSelected ? 1 : 0,
        }
      },
      leave: ({ idx }) => getInitialTransform(idx, buttonsToDisplay.length),
      trail: 75,
    }
  )

  return (
    <OptionsPopupStyles>
      {transitions.map(({ item, props, key }) => (
        <animated.div className="animationWrapper" key={key} style={props}>
          {item.iconButton}
        </animated.div>
      ))}
    </OptionsPopupStyles>
  )
}

export default React.memo(OptionsPopup)
