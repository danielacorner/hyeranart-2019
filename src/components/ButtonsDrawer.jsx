import React from "react"
import { Drawer, Button } from "@material-ui/core"
import styled from "styled-components"
import SALogo from "./Masonry/OptionsPopup/SALogo"
import ZoomIcon from "@material-ui/icons/ZoomIn"
import PaintingMetadata from "./Masonry/PaintingMetadata"
import { BREAKPOINTS } from "../utils/constants"

export const DRAWER_HEIGHT_PX = 128

const DrawerContentsStyles = styled.div`
  padding: 0.5em 1em;
  height: ${DRAWER_HEIGHT_PX}px;
  position: relative;
  .buttonsWrapper {
    position: absolute;
    bottom: 8px;
    right: 8px;
    @media (min-width: ${BREAKPOINTS.MOBILE}px) {
      bottom: 1em;
      right: 1em;
    }
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: white;
  }
  a {
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
  button {
    text-transform: none;
  }
  .btnSaatchi {
    margin-left: 12px;
  }
`

const OptionsButtons = ({ saatchiLink, fullScreenLink }) => (
  <div className="buttonsWrapper">
    <a href={fullScreenLink} target="_blank" rel="noopener noreferrer">
      <Button
        className="btnOpen"
        startIcon={
          <div style={{ width: 24, height: 24, transform: "translateY(-1px)" }}>
            <ZoomIcon />
          </div>
        }
        variant="outlined"
      >
        Open Image
      </Button>
    </a>
    {saatchiLink && <SaatchiButton saatchiLink={saatchiLink} />}
  </div>
)

export function SaatchiButton({ saatchiLink, style = {} }) {
  return (
    <a
      style={{ textDecoration: "none", ...style }}
      href={saatchiLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        style={{ textTransform: "none" }}
        className="btnSaatchi"
        startIcon={
          <div style={{ width: 24, height: 24, transform: "scale(1.5)" }}>
            <SALogo />
          </div>
        }
        variant="outlined"
      >
        View on Saatchi Art
      </Button>
    </a>
  )
}

export default ({ onBackdropClick, open, metadata }) => (
  <Drawer anchor="bottom" open={open} ModalProps={{ onBackdropClick }}>
    <DrawerContentsStyles>
      <PaintingMetadata isLarge={true} metadata={metadata} />
      <OptionsButtons
        saatchiLink={metadata && metadata.saatchiLink}
        fullScreenLink={metadata && metadata.fullScreenLink}
      />
    </DrawerContentsStyles>
  </Drawer>
)
