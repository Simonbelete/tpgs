import React, { useMemo } from "react";
import * as d3 from "d3";
import * as d3force from "d3-force";
import { BlurFilter, TextStyle } from "pixi.js";
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";

const data = {
  nodes: [
    { node: 0, name: "node0" },
    { node: 1, name: "node1" },
    { node: 2, name: "node2" },
    { node: 3, name: "node3" },
    { node: 4, name: "node4" },
    { node: 5, name: "node5" },
    { node: 6, name: "node6" },
    { node: 7, name: "node7" },
    { node: 8, name: "node8" },
    { node: 9, name: "node9" },
    { node: 10, name: "node10" },
  ],
  links: [
    { source: 0, target: 2, value: 2 },
    { source: 1, target: 2, value: 2 },
    { source: 1, target: 3, value: 2 },
  ],
};

export default function PedigreeChart() {
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  // Create copy
  const nodes = data.nodes.map((d) => ({ ...d }));

  const link = d3.forceLink(data.links);
  const links = link.links();

  const WIDTH = 400;
  const HEIGHT = 600;
  const RADIUS = 20;
  const DISTANCE = 5;

  const simulation = d3
    .forceSimulation<any>(nodes)
    .force("link", link)
    .force("charge", d3.forceManyBody())
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .force("collide", d3.forceCollide().radius(RADIUS)) // avoid node overlaps
    .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 4)); // nodes are attracted by the center of the chart area

  return (
    <div>
      <Stage options={{ backgroundColor: 0xffffff }}>
        <Container x={WIDTH / 2} y={HEIGHT / 2}>
          <Graphics
            draw={(g) => {
              g.clear();

              links.forEach((d: any, i) => {
                g.lineStyle(4, 0xd3d3d3);
                g.moveTo(d.source.x * DISTANCE, d.source.y * DISTANCE);
                g.lineTo(d.target.x * DISTANCE, d.target.y * DISTANCE);
                g.endFill();
              });

              simulation.nodes().forEach((d, i) => {
                g.beginFill(0xff3300);
                g.drawCircle(d.x * DISTANCE, d.y * DISTANCE, RADIUS);
                g.endFill();
              });
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
        </Container>
      </Stage>
    </div>
  );
}
