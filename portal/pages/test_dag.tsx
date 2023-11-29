import React, { ReactElement, useMemo } from "react";
import * as d3 from "d3";
import * as d3dag from "d3-dag";
import * as d3force from "d3-force";
import { BlurFilter, TextStyle } from "pixi.js";
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";

// const data = [
//   {
//     id: "0",
//     parentIds: [],
//   },
//   {
//     id: "1",
//     parentIds: [],
//   },
//   {
//     id: "2",
//     parentIds: ["0", "1"],
//   },
//   {
//     id: "3",
//     parentIds: ["0", "1"],
//   },
//   {
//     id: "4",
//     parentIds: ["0", "1"],
//   },
//   {
//     id: "5",
//     parentIds: ["3", "4"],
//   },
//   {
//     id: "6",
//     parentIds: ["3", "2"],
//   },
// ];

// const data = [
//   // Source = parent, target = child
//   { source: "0", target: "2" },
//   { source: "0", target: "3" },
//   { source: "1", target: "2" },
//   { source: "1", target: "4" },
// ];

const data = [
  {
    id: "0",
    sex: "M",
    parentIds: [],
  },
  {
    id: "1",
    sex: "F",
    parentIds: [],
  },
  {
    id: "11",
    sex: "M",
    parentIds: [],
  },
  {
    id: "2",
    sex: "F",
    parentIds: ["0", "1", "11"],
  },
  {
    id: "3",
    parentIds: ["0"],
  },
  {
    id: "4",
    parentIds: ["1"],
  },
];
const PedigreeChart = () => {
  const builder = d3dag.graphStratify();
  const graph = builder(data);

  const nodeRadius = 30;
  const nodeSize = [nodeRadius * 4, nodeRadius * 4] as const;

  const shape = d3dag.tweakShape(nodeSize, d3dag.shapeEllipse);

  const line = d3.line(); //.curve(d3.curveBasis);
  // curveBasis
  const layout = d3dag
    .sugiyama()
    .nodeSize(nodeSize)
    .gap([nodeRadius, nodeRadius])
    .tweaks([shape]);

  const { width, height } = layout(graph);

  // @ts-ignore
  const nodes = [...graph.nodes()];

  // @ts-ignore
  const links = [...graph.links()];

  const WIDTH = 400;
  const HEIGHT = 600;
  const RADIUS = 20;
  const DISTANCE = 5;

  const RECT_WIDTH = 50;
  const RECT_HEIGHT = 50;

  return (
    <div>
      <Stage options={{ backgroundColor: 0xffffff }}>
        <Container x={WIDTH / 2} y={HEIGHT / 4}>
          <Graphics
            draw={(g) => {
              g.clear();
              // g.lineStyle(5, 0xaa0000, 1);
              // g.bezierCurveTo(0, 200, 200, 0, 240, 100);

              nodes.forEach((d, i) => {
                if (d.data.sex == "M") {
                  g.lineStyle(2, 0xf0000, 0.5);
                  // Draw rectangle from center
                  g.drawRect(
                    d.x - RECT_WIDTH / 2,
                    d.y - RECT_HEIGHT / 2,
                    RECT_WIDTH,
                    RECT_HEIGHT
                  );
                  g.endFill();
                } else if (d.data.sex == "F") {
                  g.lineStyle(2, 0xf0000, 1);
                  g.drawCircle(d.x, d.y, 30);
                  g.endFill();
                } else {
                  g.lineStyle(2, 0xc34288, 1);
                  g.drawCircle(d.x, d.y, 30);
                  g.endFill();
                }
                // g.beginFill(0xff3300);
                // g.drawCircle(d.x, d.y, 20);
                // g.endFill();
              });

              links.forEach((d: any, i) => {
                g.lineStyle(1, 0xf0000);

                g.moveTo(d.source.x, d.source.y + RECT_HEIGHT);
                g.lineTo(d.target.x, d.target.y - RECT_HEIGHT);
                g.endFill();
              });
            }}
          />
          {nodes.map((d, i) => (
            <Text
              key={i}
              text={d.data.id}
              x={d.x - RECT_WIDTH / 2}
              y={d.y + RECT_HEIGHT / 2}
              style={
                new TextStyle({
                  fill: "blue",
                  fontSize: 16,
                  fontWeight: "700",
                })
              }
            />
          ))}
        </Container>
        {/* <Container x={WIDTH / 2} y={HEIGHT / 2}>
          <Graphics
            draw={(g) => {
              g.clear();

              nodes.fore;

              // links.forEach((d: any, i) => {
              //   g.lineStyle(4, 0xd3d3d3);
              //   g.moveTo(d.source.x * DISTANCE, d.source.y * DISTANCE);
              //   g.lineTo(d.target.x * DISTANCE, d.target.y * DISTANCE);
              //   g.endFill();
              // });

              // simulation.nodes().forEach((d, i) => {
              //   g.beginFill(0xff3300);
              //   g.drawCircle(d.x * DISTANCE, d.y * DISTANCE, RADIUS);
              //   g.endFill();
              // });
            }}
          />

          {simulation.nodes().map((d, i) => (
            <Text
              key={i}
              text={d.name}
              x={d.x * DISTANCE - RADIUS / 2}
              y={d.y * DISTANCE + RADIUS}
              style={
                new TextStyle({
                  fontSize: 12,
                  fontWeight: "400",
                })
              }
            />
          ))}
        </Container> */}
      </Stage>
    </div>
  );
};

PedigreeChart.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default PedigreeChart;
