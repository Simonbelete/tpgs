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
    parentIds: [],
  },
  {
    id: "1",
    parentIds: [],
  },
  {
    id: "11",
    parentIds: [],
  },
  {
    id: "2",
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
  // const builder = d3dag
  //   .graphConnect()
  //   .sourceId(({ source }: { source: string }) => source)
  //   .targetId(({ target }: { target: string }) => target);
  const builder = d3dag.graphStratify();
  const graph = builder(data);

  const nodeRadius = 20;
  const nodeSize = [nodeRadius * 4, nodeRadius * 4] as const;

  const shape = d3dag.tweakShape(nodeSize, d3dag.shapeEllipse);

  const line = d3.line(); //.curve(d3.curveBasis);
  // curveBasis
  const layout = d3dag
    .sugiyama()
    //.layering(d3dag.layeringLongestPath())
    //.decross(d3dag.decrossOpt())
    //.coord(d3dag.coordGreedy())
    //.coord(d3dag.coordQuad())
    .nodeSize(nodeSize)
    .gap([nodeRadius, nodeRadius])
    .tweaks([shape]);

  const { width, height } = layout(graph);

  // @ts-ignore
  const nodes = [...graph.nodes()];

  // @ts-ignore
  const links = [...graph.links()];

  // const link = d3.forceLink(data.links);
  // const links = link.links();

  const WIDTH = 400;
  const HEIGHT = 600;
  const RADIUS = 20;
  const DISTANCE = 5;

  // const simulation = d3
  //   .forceSimulation<any>(nodes)
  //   .force("link", link)
  //   .force("charge", d3.forceManyBody())
  //   .force("x", d3.forceX())
  //   .force("y", d3.forceY())
  //   .force("collide", d3.forceCollide().radius(RADIUS)) // avoid node overlaps
  //   .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 4)); // nodes are attracted by the center of the chart area

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
                g.beginFill(0xff3300);
                g.drawCircle(d.x, d.y, 20);
                g.endFill();
              });

              links.forEach((d: any, i) => {
                g.lineStyle(4, 0xd3d3d3);

                g.moveTo(d.source.x, d.source.y);
                g.lineTo(d.target.x, d.target.y);

                // g.lineTo(d.target.x, d.target.y);

                // (cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
                // g.bezierCurveTo(100, 0, 150, 0, d.target.x, d.target.y);
                // g.moveTo(d.source.x, d.source.y);
                // g.lineTo(d.target.x, d.target.y);
                g.endFill();
              });
            }}
          />
          {nodes.map((d, i) => (
            <Text
              key={i}
              text={d.data.id}
              x={d.x}
              y={d.y}
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
