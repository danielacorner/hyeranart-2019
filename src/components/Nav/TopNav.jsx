import React, { useState, useRef } from "react"
import styled from "styled-components"
import { BREAKPOINTS } from "../../utils/constants"
import { LinksUlStyles, NavLink, useSectionCollectionLinks } from "./SideNav"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/Close"
import { IconButton } from "@material-ui/core"
import { useSpring, animated } from "react-spring"
import { useOnClickOutside } from "../../utils/customHooks"

const TopNavStyles = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  z-index: 9999;
  .popupAnimated {
    transform-origin: top right;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    left: 10px;
    top: 5px;
    right: 10px;
    pointer-events: ${props => (props.isModalOpen ? "auto" : "none")};
    .popupContainer {
      position: relative;
      margin-top: 8px;
      flex-grow: 1;
      @media (min-width: ${BREAKPOINTS.TABLET}px) {
        flex-grow: 0;
        width: 360px;
      }
      box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
        0 30px 60px -30px rgba(0, 0, 0, 0.3),
        0 -18px 60px -10px rgba(0, 0, 0, 0.025);
      border-radius: 4px;
      font-size: 17px;
      line-height: 40px;
      height: fit-content;
      width: fit-content;
      font-family: system-ui;
      background: white;
      padding: 17px 26px;
    }
  }
  .popupOpenButton {
    margin: 8px 10px 0 0;
    .MuiSvgIcon-root {
      transform: scaleY(1.2);
    }
  }
  .popupCloseButton {
    position: absolute;
    top: 0;
    right: 0;
  }
  li {
    width: fit-content;
    line-height: 2em;
    margin: 0;
    padding: 0 4px;
  }
  ul {
    margin: 0;
  }
  .linksContainer {
    display: grid;
    grid-template-rows: auto auto;
    height: fit-content;
    .sectionLinks {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .collectionLinks {
      margin-top: 17px;
    }
  }
`

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const springScaleUp = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: `scale(${isModalOpen ? 1 : 0.97})`,
    config: { mass: 0.4, tension: 270 },
  })
  const ref = useRef()
  useOnClickOutside(ref, () => setIsModalOpen(false))

  const { sectionLinksArr, collectionLinksArr } = useSectionCollectionLinks()

  return (
    <TopNavStyles isModalOpen={isModalOpen}>
      <IconButton className="popupOpenButton" onClick={toggleModal}>
        <MenuIcon />
      </IconButton>
      <animated.div style={springScaleUp} className="popupAnimated">
        <div ref={ref} className="popupContainer">
          <IconButton className="popupCloseButton" onClick={toggleModal}>
            <CloseIcon />
          </IconButton>
          <div className="linksContainer">
            <LinksUlStyles className="sectionLinks">
              {sectionLinksArr.map(({ type, url, text }) => (
                <NavLink key={url} type={type} url={url} text={text} />
              ))}
            </LinksUlStyles>
            <LinksUlStyles className="collectionLinks">
              {collectionLinksArr.map(({ type, url, text }) => (
                <NavLink key={url} type={type} url={url} text={text} />
              ))}
            </LinksUlStyles>
          </div>
        </div>
      </animated.div>
    </TopNavStyles>
  )
}
