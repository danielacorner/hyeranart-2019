import React, { useEffect } from "react"

import MasonryGrid from "./MasonryGrid"
import { useImagesQuery } from "../../utils/queries"
import { useState } from "react"
import styled from "styled-components"
import Pagination from "../Pagination"
import SwipeableViews from "react-swipeable-views"
import { animated, useSpring } from "react-spring"
import { SPRING_UP_DOWN_PX } from "../Layout"

const GalleryStyles = styled.div`
  height: 100%;
  .react-swipeable-view-container {
    [data-swipeable="true"] {
      overflow: hidden !important;
    }
  }
  .masonry-grid {
    margin: 0 1em;
  }
`

// TODO: adjustable NUM_PER_PAGE?
const NUM_PER_PAGE = 5

export default () => {
  const {  galleryImagesArr } = useImagesQuery()
  // TODO: consider performance using react-swipeable-views-utils virtualization
  // https://react-swipeable-views.com/demos/demos/#virtualize
  const [currentPageIdx, setCurrentPageIdx] = useState(0)
  const imageSpreads = galleryImagesArr.reduce((acc, image, idx) => {
    const idxInSpreads = Math.floor(idx / NUM_PER_PAGE)
    if (acc[idxInSpreads]) {
      acc[idxInSpreads].push(image)
    } else {
      acc[idxInSpreads] = [image]
    }
    return acc
  }, [])

  const handleNext = () => setCurrentPageIdx(currentPageIdx + 1)
  const handlePrev = () => setCurrentPageIdx(currentPageIdx - 1)

  const firstItemNum = currentPageIdx * NUM_PER_PAGE + 1
  const lastItemNum = firstItemNum + NUM_PER_PAGE
  const numItems = galleryImagesArr.length
  const numPages = Math.ceil(numItems / NUM_PER_PAGE)
  const allPagesNums = [...Array(numPages).keys()]

  const handleChangeIndex = index => setCurrentPageIdx(index)
  const handleFilterToNearestSlides = () => {
    // when we switch slides, "virtualize" so that only the nearest three slides are rendered
  }

  const [isMounted, setIsMounted] = useState(0)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const springEnter = useSpring({
    opacity: isMounted ? 1 : 0,
    transform: `translateY(${isMounted ? 0 : -SPRING_UP_DOWN_PX}px)`,
  })
  return (
    <animated.div style={springEnter}>
      <GalleryStyles>
        <SwipeableViews
        // slideStyle={{maxHeight:'200vh'}}
          className="swipeable"
          index={currentPageIdx}
          onChangeIndex={handleChangeIndex}
          enableMouseEvents={true}
          onTransitionEnd={handleFilterToNearestSlides}
        >
          {allPagesNums.map(idx => (
            <div key={idx} className={`swipeable-slide slide-${idx}`}>
              <MasonryGrid imagesDataArr={imageSpreads[idx]} />
            </div>
          ))}
        </SwipeableViews>
        <Pagination
          setCurrentPageIdx={setCurrentPageIdx}
          currentPageIdx={currentPageIdx}
          handlePrev={handlePrev}
          firstItemNum={firstItemNum}
          lastItemNum={lastItemNum}
          numItems={numItems}
          numPages={numPages}
          handleNext={handleNext}
        />
      </GalleryStyles>
    </animated.div>
  )
}
