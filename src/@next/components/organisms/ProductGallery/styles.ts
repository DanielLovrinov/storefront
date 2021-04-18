import { styled } from "@styles";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: column-reverse;
  }
`;

export const Thumbnail = styled.div<{ activeThumbnail: boolean }>`
  width: 115px;
  display: flex;
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.activeThumbnail === true ? "#D0D9E0" : "transparent"};
  justify-content: center;
  height: 140px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: contain;
  }

  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 7px;
`;

export const Button = styled.div`
  height: 50px;
  width: 100%;
  position: absolute;
  z-index: 1;
  background-color: rgba(50, 50, 50, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const TopButton = styled(Button)`
  top: 0%;
  transform: rotate(180deg);
`;

export const BottomButton = styled(Button)`
  bottom: 0%;
`;

export const ThumbnailsContainer = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: initial;
  }
`;

export const ThumbnailList = styled.div`
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0px;
  }

  ul {
    display: flex;
    padding: 0;
    margin: 0;
  }
`;

export const Preview = styled.div`
  grid-area: preview;
  width: auto;
  max-height: 560px;
  overflow: hidden;
  img {
    max-height: inherit;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;
