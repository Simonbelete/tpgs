import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
} from "react";
import { Application, TextStyle } from "pixi.js";
import { Viewport as PixiViewport } from "pixi-viewport";
import { Stage, PixiComponent, Container, Text, Graphics } from "@pixi/react";
import * as d3 from "d3";
import * as d3dag from "d3-dag";
import {
  useGetPedigreeQuery,
  useLazyGetPedigreeQuery,
} from "@/features/analyses/services";

const PixiComponentViewport = PixiComponent("Viewport", {
  create: (props) => {
    const viewport = new PixiViewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,
      events: props.app.renderer.events,
    });
    viewport.drag().pinch().wheel().decelerate();

    return viewport;
  },
});

const PedigreeTree = () => {
  const ref = useRef(null);

  const stageOptions = {
    antialias: true,
    autoDensity: true,
    backgroundAlpha: 0,
  };

  const width = window.innerWidth;
  const height = window.innerWidth * 0.7;

  const { data } = useGetPedigreeQuery({});

  const builder = d3dag.graphStratify();
  const graph = builder(
    (data?.results || []).map((e) => {
      return {
        id: e.tag,
        parentIds: e.parents,
        sex: e.sex,
      };
    })
  );

  const nodeRadius = 30;
  const nodeSize = [nodeRadius * 4, nodeRadius * 4] as const;

  const shape = d3dag.tweakShape(nodeSize, d3dag.shapeEllipse);

  const line = d3.line();
  // curveBasis
  const layout = d3dag
    .sugiyama()
    .nodeSize(nodeSize)
    .gap([nodeRadius, nodeRadius])
    .tweaks([shape]);

  // const { width, height } = layout(graph);

  // @ts-ignore
  const nodes = [...graph.nodes()];

  // @ts-ignore
  const links = [...graph.links()];

  const RECT_WIDTH = 50;
  const RECT_HEIGHT = 50;

  console.log(data);
  console.log(nodes);

  return (
    <></>
    // <Stage
    //   width={width}
    //   height={height}
    //   ref={ref}
    //   options={{ backgroundColor: 0xffffff }}
    // >
    //   {ref.current && (
    //     <PixiComponentViewport
    //       width={width}
    //       height={height}
    //       app={ref.current.app}
    //     >
    //       <Container width={width} height={height}>
    //         {/* <Text
    //           text={"Hello"}
    //           x={100}
    //           y={100}
    //           style={
    //             new TextStyle({
    //               fill: "blue",
    //               fontSize: 16,
    //               fontWeight: "700",
    //             })
    //           }
    //         /> */}
    //         <Graphics
    //           draw={(g) => {
    //             g.clear();
    //             // g.lineStyle(5, 0xaa0000, 1);
    //             // g.bezierCurveTo(0, 200, 200, 0, 240, 100);

    //             nodes.forEach((d, i) => {
    //               if (d.data.sex == "M") {
    //                 g.lineStyle(2, 0xf0000, 0.5);
    //                 // Draw rectangle from center
    //                 g.drawRect(
    //                   d.x - RECT_WIDTH / 2,
    //                   d.y - RECT_HEIGHT / 2,
    //                   RECT_WIDTH,
    //                   RECT_HEIGHT
    //                 );
    //                 g.endFill();
    //               } else if (d.data.sex == "F") {
    //                 g.lineStyle(2, 0xf0000, 1);
    //                 g.drawCircle(d.x, d.y, 30);
    //                 g.endFill();
    //               } else {
    //                 g.lineStyle(2, 0xc34288, 1);
    //                 g.drawCircle(d.x, d.y, 30);
    //                 g.endFill();
    //               }
    //             });

    //             links.forEach((d: any, i) => {
    //               g.lineStyle(1, 0xf0000);

    //               g.moveTo(d.source.x, d.source.y + RECT_HEIGHT);
    //               g.lineTo(d.target.x, d.target.y - RECT_HEIGHT);
    //               g.endFill();
    //             });
    //           }}
    //         />
    //         {nodes.map((d, i) => (
    //           <Text
    //             key={i}
    //             text={d.data.id}
    //             x={d.x - RECT_WIDTH / 2}
    //             y={d.y + RECT_HEIGHT / 2}
    //             style={
    //               new TextStyle({
    //                 fill: "blue",
    //                 fontSize: 16,
    //                 fontWeight: "700",
    //               })
    //             }
    //           />
    //         ))}
    //       </Container>
    //     </PixiComponentViewport>
    //   )}
    // </Stage>
  );
};

export default PedigreeTree;
