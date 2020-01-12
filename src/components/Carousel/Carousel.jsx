import React, { useState, useEffect, useRef } from "react"
import Img from "gatsby-image"
import ArrowRightIcon from "@material-ui/icons/ArrowForwardIos"
import { IconButton } from "@material-ui/core"
import { animated, useSpring } from "react-spring"
import Tilt from "react-tilt"
import ContainerDimensions from "react-container-dimensions"
import { CarouselStyles } from "./CarouselStyles"
import { Scene3DCanvasStyles } from "../Animated/Scene3DStyles"
import { useImagesQuery } from "../../utils/queries"

const ArrowLeftIcon = () => (
  <ArrowRightIcon style={{ transform: "rotate(180deg)" }} />
)

const CAROUSEL_MAX_WIDTH = 960
const CANVAS_THICKNESS = 60

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default () => {
  const { /* imagesDataArr, */ imagesArr } = useImagesQuery()

  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
  const prevSelectedImgIndex = usePrevious(selectedImgIndex)
  const [carouselWidth, setCarouselWidth] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // window is not defined during gatsby build
    // must wait until we're in the browser
    const newCarouselWidth = Math.min(window.innerWidth, CAROUSEL_MAX_WIDTH)
    if (newCarouselWidth !== carouselWidth) {
      setCarouselWidth(newCarouselWidth)
    }
  }, [carouselWidth])

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown)
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  })

  const handlePrevious = () => {
    setIsModalOpen(false)
    const prevIndex = selectedImgIndex - 1
    setSelectedImgIndex(prevIndex < 0 ? imagesArr.length - 1 : prevIndex)
  }
  const handleNext = () => {
    setIsModalOpen(false)
    const nextIndex = selectedImgIndex + 1
    setSelectedImgIndex(nextIndex > imagesArr.length - 1 ? 0 : nextIndex)
  }
  const handleKeydown = event => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      handleNext()
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      handlePrevious()
    }
  }
  const springLeftRight = useSpring({
    transform: `translate(${-selectedImgIndex * carouselWidth}px,0)`,
  })

  const springModalBackground = useSpring({
    opacity: isModalOpen ? 1 : 0,
    pointerEvents: isModalOpen ? "auto" : "none",
    background: `hsla(0,0%,30%,${isModalOpen ? 0.8 : 0})`,
  })
  const springModalImage = useSpring({
    transform: `scale(${isModalOpen ? 0.8 : 1})`,
  })

  return (
    <Scene3DCanvasStyles thicknessPx={CANVAS_THICKNESS}>
      <CarouselStyles>
        <div className="arrow-wrapper arrow-left">
          <IconButton onClick={handlePrevious}>
            <ArrowLeftIcon />
          </IconButton>
        </div>

        <animated.div
          className="animated-images-wrapper"
          style={springLeftRight}
        >
          {imagesArr.map((image, idx) => (
            <div
              key={idx}
              className="img-wrapper"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <Img title={"hi"} fluid={image} />
            </div>
          ))}
        </animated.div>

        <div className="arrow-wrapper arrow-right">
          <IconButton onClick={handleNext}>
            <ArrowRightIcon />
          </IconButton>
        </div>

        <animated.div
          className="animated-modal-wrapper"
          style={springModalBackground}
        >
          <Tilt
            options={{
              // https://www.npmjs.com/package/react-tilt
              max: 30,
              perspective: 8000,
            }}
            style={{
              height: "100%",
            }}
            className="scene"
          >
            <ContainerDimensions>
              {({ height, width }) => (
                <animated.div
                  className="img-wrapper cube"
                  style={springModalImage}
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className="cube__face cube__face--front">
                    <Img
                      title={"hi"}
                      fluid={
                        imagesArr[
                          prevSelectedImgIndex ||
                            (prevSelectedImgIndex === 0
                              ? prevSelectedImgIndex
                              : selectedImgIndex)
                        ]
                      }
                    />
                  </div>
                  <div
                    className="cube__face cube__face--right"
                    style={{
                      transform: `rotateY(90deg) translateZ(${width -
                        CANVAS_THICKNESS / 2}px)`,
                    }}
                  ></div>
                  <div className="cube__face cube__face--left"></div>
                  <div className="cube__face cube__face--top"></div>
                  <div
                    className="cube__face cube__face--bottom"
                    style={{
                      transform: `rotateX(-90deg) translateZ(${height -
                        CANVAS_THICKNESS / 2}px)`,
                    }}
                  ></div>
                </animated.div>
              )}
            </ContainerDimensions>
          </Tilt>
        </animated.div>
      </CarouselStyles>
    </Scene3DCanvasStyles>
  )
}
