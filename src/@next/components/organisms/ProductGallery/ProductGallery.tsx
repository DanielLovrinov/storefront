import React from "react";
import { useInView } from "react-intersection-observer";

import { Icon } from "@components/atoms";
import { CachedImage } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

import ReactSVG from "react-svg";

import expand from "images/expand.svg";

import "./scss/index.scss";

const MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS = 4;

export const ProductGallery: React.FC<IProps> = ({ images }: IProps) => {
  const [imageIndex, setImageIndex] = React.useState<number>(0);

  const displayButtons = images.length > MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS;

  React.useEffect(() => {
    if (imageIndex >= images.length) {
      setImageIndex(0);
    }
  }, [images]);

  const bottomImageRef = React.useRef<HTMLDivElement | null>(null);
  const topImageRef = React.useRef<HTMLDivElement | null>(null);
  const [topImageIntersectionObserver, topImageInView] = useInView({
    threshold: 0.5,
  });

  const [bottomImageIntersectionObserver, bottomImageInView] = useInView({
    threshold: 0.5,
  });

  const setBottomRef = React.useCallback(
    node => {
      bottomImageRef.current = node;
      bottomImageIntersectionObserver(node);
    },
    [bottomImageIntersectionObserver]
  );

  const setTopRef = React.useCallback(
    node => {
      topImageRef.current = node;
      topImageIntersectionObserver(node);
    },
    [topImageIntersectionObserver]
  );

  const setIntersectionObserver = (index: number, lengthOfArray: number) => {
    if (lengthOfArray > MINIMAL_NUMBER_OF_IMAGES_FOR_BUTTONS) {
      if (index === 0) {
        return setTopRef;
      }
      if (index === lengthOfArray - 1) {
        return setBottomRef;
      }
    }
  };

  function browseGallery(i: any) {
    console.log(images.length);
    console.log(imageIndex);

    if (imageIndex + i > images.length - 1) {
      setImageIndex(0);
    } else if (imageIndex + i < 0) {
      setImageIndex(images.length - 1);
    } else {
      setImageIndex(imageIndex + i);
    }
  }

  return (
    <S.Wrapper data-test="productPhotosGallery">
      <S.ThumbnailsContainer>
        <S.ThumbnailList>
          <ul>
            {images &&
              images.length > 0 &&
              images.map((image, index) => {
                return (
                  <li
                    key={index}
                    data-test="galleryThumbnail"
                    data-test-id={index}
                  >
                    <S.Thumbnail
                      ref={setIntersectionObserver(index, images.length)}
                      onClick={() => setImageIndex(index)}
                      onMouseEnter={() => setImageIndex(index)}
                      activeThumbnail={Boolean(index === imageIndex)}
                    >
                      <CachedImage alt={image.alt} url={image.url} />
                    </S.Thumbnail>
                  </li>
                );
              })}
          </ul>
        </S.ThumbnailList>
      </S.ThumbnailsContainer>

      <S.Preview data-test="imagePreview">
        {/* {images && images.length > 0 && imageIndex < images.length && ( */}
        <CachedImage
          alt={images[imageIndex].alt}
          url={images[imageIndex].url}
        />
        {/* )} */}
        {/* {images.length === 0 && <CachedImage />} */}
      </S.Preview>
      <div className="galleryControls">
        <button className="arrowLeft" onClick={() => browseGallery(-1)}>
          {" "}
          <ReactSVG path={expand} />
        </button>
        <button className="arrowRight" onClick={() => browseGallery(1)}>
          {" "}
          <ReactSVG path={expand} />
        </button>
      </div>
    </S.Wrapper>
  );
};
