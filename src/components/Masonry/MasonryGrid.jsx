import React, { useState } from "react"
import styled from "styled-components"
import { NAV_HEIGHT } from "../Carousel/CarouselStyles"
import AnimatedImage from "../AnimatedImage/AnimatedImage"
import { BREAKPOINTS } from "../../utils/constants"
import { useMediaQuery } from "@material-ui/core"
import ButtonsDrawer from "../ButtonsDrawer"

const GRID_SIZE = 16
const GRID_GAP = 16 * 5

const MasonryStyles = styled.div`
  width: 100%;
  padding-bottom: 2em;
  min-height: calc(100vh - ${NAV_HEIGHT}px);
  .masonry-grid {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(
      auto-fill,
      minmax(${props => props.gridSize}px, 1fr)
    );
    width: auto;
    place-items: center center;
    place-content: center center;
  }
  .gatsby-image-wrapper {
  }
  .grid-item {
  }
`

const MasonryGridWrapper = ({ imagesDataArr }) => {
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.TABLET}px)`)
  const isMobileOrLarger = useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px)`)
  const gridMultiplier = isTabletOrLarger ? 1 : isMobileOrLarger ? 0.8 : 0.6

  const gridSize = GRID_SIZE * gridMultiplier
  const gridGap = GRID_GAP * gridMultiplier
  const gridGapSpan = Math.round(gridGap / gridSize)

  return (
    <MasonryGridMemoized
      imagesDataArr={imagesDataArr.filter(img => Boolean(img.fluid))}
      gridSize={gridSize}
      gridGapSpan={gridGapSpan}
      gridGap={gridGap}
      gridMultiplier={gridMultiplier}
    />
  )
}

const MasonryGrid = ({
  imagesDataArr,
  gridSize,
  gridGapSpan,
  gridGap,
  gridMultiplier,
}) => {
  const [selectedImgMetadata, setSelectedImgMetadata] = useState(null)
  const handleClickAway = () => setSelectedImgMetadata(null)
  return (
    <MasonryStyles gridSize={gridSize}>
      <div className={"masonry-grid"}>
        {imagesDataArr.map(
          (
            {
              id,
              Image,
              caption,
              date,
              moreInfo,
              path,
              price,
              title,
              width,
              height,
              depth,
              fluid,
              saatchiLink,
            },
            idx
          ) => {
            const widthInches = width * gridMultiplier
            const heightInches = height * gridMultiplier
            const xSpan = Math.ceil(widthInches + gridGapSpan)
            const ySpan = Math.ceil(heightInches + gridGapSpan)
            return (
              <div
                key={id}
                className="grid-item"
                style={{
                  gridColumn: `span ${xSpan}`,
                  gridRow: `span ${ySpan}`, // doesn't work?
                  marginTop: gridGap,
                }}
              >
                <AnimatedImage
                  gridSize={gridSize}
                  setSelectedImgMetadata={setSelectedImgMetadata}
                  isSelected={
                    selectedImgMetadata && selectedImgMetadata.title === title
                  }
                  gridGap={gridGap}
                  title={title}
                  fluid={fluid}
                  depthInches={depth}
                  widthInches={width * gridMultiplier}
                  heightInches={height * gridMultiplier}
                  fullScreenLink={Image}
                  saatchiLink={saatchiLink}
                />
              </div>
            )
          }
        )}
      </div>
      <ButtonsDrawer
        onBackdropClick={handleClickAway}
        open={selectedImgMetadata !== null}
        metadata={selectedImgMetadata}
      />
    </MasonryStyles>
  )
}

const MasonryGridMemoized = React.memo(MasonryGrid)

export default MasonryGridWrapper
