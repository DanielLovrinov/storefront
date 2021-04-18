import React from "react";
import Collapsible from "react-collapsible";
import ReactSVG from "react-svg";

import expandImg from "images/expand.svg";

import "./scss/index.scss";

interface Props {
  allData?: any;
}

export const ProductDescription = (props: Props) => {
  return (
    <div className="productDescription">
      <div>
        <h2>Opis</h2>
        {props.allData.seoDescription ? (
          <p>{props.allData.seoDescription}</p>
        ) : (
          <p>No information</p>
        )}
      </div>
      <div className="separatorLine" />
      <Collapsible
        className="triggerTitle"
        openedClassName="triggerTitleO"
        trigger={
          <div className="expandRow">
            <h3>Podaci o proizvodu</h3>
            <ReactSVG path={expandImg} />
          </div>
        }
        transitionTime={100}
        open
      >
        {props.allData.seoDescription ? (
          <p>{props.allData.seoDescription}</p>
        ) : (
          <p>No information</p>
        )}
      </Collapsible>
      <div className="separatorLine" />
      <Collapsible
        className="triggerTitle"
        openedClassName="triggerTitleO"
        trigger={
          <div className="expandRow">
            <h3>Načini plaćanja</h3>
            <ReactSVG path={expandImg} />
          </div>
        }
        transitionTime={100}
      >
        {props.allData.seoDescription ? (
          <p>{props.allData.seoDescription}</p>
        ) : (
          <p>No information</p>
        )}
      </Collapsible>
      <div className="separatorLine" />
      <Collapsible
        className="triggerTitle"
        openedClassName="triggerTitleO"
        trigger={
          <div className="expandRow">
            <h3>Dostava</h3>
            <ReactSVG path={expandImg} />
          </div>
        }
        transitionTime={100}
      >
        {props.allData.seoDescription ? (
          <p>{props.allData.seoDescription}</p>
        ) : (
          <p>No information</p>
        )}
      </Collapsible>
      <div className="separatorLine" />
      <Collapsible
        className="triggerTitle"
        openedClassName="triggerTitleO"
        trigger={
          <div className="expandRow">
            <h3>Dokumenti</h3>
            <ReactSVG path={expandImg} />
          </div>
        }
        transitionTime={100}
      >
        {props.allData.seoDescription ? (
          <p>{props.allData.seoDescription}</p>
        ) : (
          <p>No information</p>
        )}
      </Collapsible>
      <div className="separatorLine" />
    </div>
  );
};
