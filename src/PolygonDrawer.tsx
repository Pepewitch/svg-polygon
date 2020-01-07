import React, { useState, Fragment } from "react";
import styled from "styled-components";

const DrawingCircle = styled.circle<{ isFirst: boolean }>`
  fill: black;
  ${props =>
    props.isFirst &&
    `
    &:hover {
      fill: red;
    }
  `}
`;

const DrawingPath = styled.path`
  stroke-width: 1px;
  stroke: black;
  fill: transparent;
`;

const FollowCursorPath = styled.path`
  stroke-width: 1px;
  stroke: black;
  fill: transparent;
`;

const DrawedPath = styled.path`
  stroke-width: 1px;
  stroke: black;
  fill: transparent;
`;

export const PolygonDrawer = () => {
  const [drawing, setDrawing] = useState<any[] | null>(null);
  const [polygon, setPolygon] = useState<any>([]);
  const [currentMouseLocation, setCurrentMouseLocation] = useState({
    positionX: 0,
    positionY: 0
  });
  console.log(polygon);
  return (
    <svg
      onMouseMove={e => {
        const positionX = e.nativeEvent.offsetX;
        const positionY = e.nativeEvent.offsetY;
        setCurrentMouseLocation({ positionX, positionY });
      }}
      onClick={e => {
        const positionX = e.nativeEvent.offsetX;
        const positionY = e.nativeEvent.offsetY;
        setDrawing(
          drawing
            ? [...drawing, { positionX, positionY }]
            : [{ positionX, positionY }]
        );
      }}
      style={{
        backgroundImage: 'url("/logo512.png")',
        backgroundPosition: "center",
        backgroundRepeat: "none",
        backgroundSize: "cover",
        margin: "60px",
        border: "1px solid black"
      }}
      width={800}
      height={600}
    >
      {polygon.map((p: any, index: number) => (
        <DrawedPath
          key={index}
          d={`M${p[0].positionX} ${p[0].positionY} ${p
            .slice(1)
            .reduce((prev: any, curr: any) => {
              return `${prev} L${curr.positionX} ${curr.positionY}`;
            }, "")} L${p[0].positionX} ${p[0].positionY}`}
        />
      ))}
      {drawing && (
        <Fragment>
          <DrawingPath
            d={`M${drawing[0].positionX} ${
              drawing[0].positionY
            } ${drawing.slice(1).reduce((prev, curr) => {
              return `${prev} L${curr.positionX} ${curr.positionY}`;
            }, "")}`}
          />
          <FollowCursorPath
            d={`M${drawing[drawing.length - 1].positionX} ${
              drawing[drawing.length - 1].positionY
            } L${currentMouseLocation.positionX} ${
              currentMouseLocation.positionY
            }`}
          />
          <circle
            cx={currentMouseLocation.positionX}
            cy={currentMouseLocation.positionY}
            r="5"
          />
          {drawing.map((points, index) => (
            <DrawingCircle
              key={index}
              isFirst={index === 0}
              cx={points.positionX}
              cy={points.positionY}
              r="5"
              onClick={e => {
                if (index === 0) {
                  e.stopPropagation();
                  setPolygon([...polygon, drawing]);
                  setDrawing(null);
                }
              }}
            />
          ))}
        </Fragment>
      )}
    </svg>
  );
};
