import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { Carousel as CarouselBase } from "react-responsive-carousel";
import styles from "./styles";

import { imageType } from "../../types";

import media from "../../styleUtils/media";
import Picture from "../Picture";
import Overlay from "./Overlay";

const StyledCarousel = styled.div`
  ${styles};

  .carousel {
    &.carousel-slider {
      margin-bottom: 50px;
      overflow: visible;

      .control-arrow {
        display: none;

        ${media.mdAndUp(css`
          display: block;
          position: absolute;
          bottom: auto;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          background: #000;
          height: 47px;
          width: 47px;
          opacity: 0.6;
        `)};

        &:hover {
          opacity: 1;
          background: #4a4a4a;
        }

        &.control-prev {
          left: 15px;
        }

        &.control-next {
          right: 15px;
        }
      }

      .slider {
        max-height: 685px;
      }

      .slide {
        .textWrap {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 1;
          background: transparent;
          width: 100%;
          z-index: 2;

          .text {
            font-weight: 300;
            color: white;
            max-width: 78%;
            margin: 0 auto;
            font-size: 1.3em;
            line-height: 1.4em;

            ${media.smAndUp(css`
              font-size: 1.5em;
              line-height: 1.6em;
            `)};

            ${media.mdAndUp(css`
              font-size: 2em;
              line-height: 1.5em;
            `)};
          }
        }
      }
    }

    .control-dots {
      bottom: -50px;

      .dot {
        background: #4a4a4a;
        height: 11px;
        width: 11px;
        box-shadow: none;
      }
    }
  }
`;

const Carousel = ({ images, ...rest }) => {
  const items = images.map(slide => (
    <div key={slide.src}>
      <Picture {...slide} />
      {slide.text && (
        <div>
          <div className="textWrap">
            <div className="text">{slide.text}</div>
          </div>
          <Overlay />
        </div>
      )}
    </div>
  ));

  return (
    <StyledCarousel>
      <CarouselBase {...rest}>{items}</CarouselBase>
    </StyledCarousel>
  );
};

Carousel.defaultProps = {
  showArrows: true,
  showThumbs: false,
  infiniteLoop: true,
  showStatus: false,
  emulateTouch: true,
};

Carousel.propTypes = {
  /**
   * The images that will be rendered within this slider component.
   */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      ...imageType,
      /**
       * overlay text
       */
      text: PropTypes.string,
    }),
  ).isRequired,

  /**
   * If true will display side arrows
   */
  showArrows: PropTypes.bool,

  /**
   * If true will display image thumbnails below the slider
   */
  showThumbs: PropTypes.bool,

  /**
   * If true will loop from the end to the beginning again.
   */
  infiniteLoop: PropTypes.bool,

  /**
   * show index of the current item. i.e: (1/8)
   */
  showStatus: PropTypes.bool,

  /**
   * Allows mouse to simulate swipe
   */
  emulateTouch: PropTypes.bool,
};

export default Carousel;
