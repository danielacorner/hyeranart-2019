import React, { useEffect } from "react"
import styled from "styled-components"

import { IconButton } from "@material-ui/core"
import ForwardIcon from "@material-ui/icons/ArrowForwardIos"
import MobileStepper from "@material-ui/core/MobileStepper"

const PaginationStyles = styled.div`
  display: flex;
  justify-content: center;
  height: 82px;
  position: relative;
  margin-bottom: 3em;
  .paginationContent {
    font-family: system-ui;
    width: fit-content;
    margin: auto;
    display: flex;
    align-items: center;
    .currentPageInfo {
      width: 120px;
      text-align: center;
    }
    .stepperWrapper {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0px;
      width: 100%;
      .MuiPaper-root {
        margin: auto;
        width: fit-content;
      }
    }
  }
  .MuiMobileStepper-root {
    background: none;
  }
  .MuiMobileStepper-dot {
    cursor: pointer;
    margin: 0 3px;
  }
`

export default ({
  setCurrentPageIdx,
  currentPageIdx,
  handlePrev,
  firstItemNum,
  lastItemNum,
  numItems,
  numPages,
  handleNext,
}) => {
  useEffect(() => {
    document
      .querySelectorAll(".MuiMobileStepper-dot")
      .forEach((stepper, idx) =>
        stepper.addEventListener("click", () => setCurrentPageIdx(idx))
      )

    return () => {
      document
        .querySelectorAll(".MuiMobileStepper-dot")
        .forEach((stepper, idx) =>
          stepper.removeEventListener("click", () => setCurrentPageIdx(idx))
        )
    }
  }, [setCurrentPageIdx])
  return (
    <PaginationStyles className="paginationWrapper">
      <div className="paginationContent">
        <div className="stepperWrapper">
          <MobileStepper
            variant="dots"
            steps={numPages}
            position="static"
            activeStep={currentPageIdx}
          />
        </div>
        <IconButton disabled={currentPageIdx <= 0} onClick={handlePrev}>
          <ForwardIcon
            style={{ transform: "rotate(180deg) translateX(2px)" }}
          />
        </IconButton>
        <div className="currentPageInfo">
          {firstItemNum} - {Math.min(lastItemNum, numItems)} of {numItems}
        </div>
        <IconButton disabled={lastItemNum >= numItems} onClick={handleNext}>
          <ForwardIcon />
        </IconButton>
      </div>
    </PaginationStyles>
  )
}
