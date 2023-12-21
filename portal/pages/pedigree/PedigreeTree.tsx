import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
} from "react";
import * as d3 from "d3";
import * as d3dag from "d3-dag";
import * as d3force from "d3-force";
import { BlurFilter, TextStyle } from "pixi.js";
import { useGetPedigreeQuery } from "@/features/analyses/services";
import { ReportingLayout } from "@/layouts";
import { Box } from "@mui/material";
import {
  Stage,
  Container,
  Sprite,
  Text,
  Graphics,
  PixiComponent,
  useApp,
} from "@pixi/react";
import { Application } from "pixi.js";
import { Viewport } from "pixi-viewport";
import dynamic from "next/dynamic";

const PixiViewportComponent = PixiComponent("Viewport", {
  create(props) {
    const { app, ...viewportProps } = props;

    const viewport = new Viewport({
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
      ...viewportProps,
    });

    // activate plugins
    (props.plugins || []).forEach((plugin) => {
      viewport[plugin]();
    });

    return viewport;
  },
  applyProps(viewport, _oldProps, _newProps) {
    const {
      plugins: oldPlugins,
      children: oldChildren,
      ...oldProps
    } = _oldProps;
    const {
      plugins: newPlugins,
      children: newChildren,
      ...newProps
    } = _newProps;

    Object.keys(newProps).forEach((p) => {
      if (oldProps[p] !== newProps[p]) {
        viewport[p] = newProps[p];
      }
    });
  },
  didMount() {
    console.log("viewport mounted");
  },
});

// create a component that can be consumed
// that automatically pass down the app
const PixiViewport = forwardRef((props, ref) => (
  <PixiViewportComponent ref={ref} app={useApp()} {...props} />
));

const PedigreeTree = () => {
  // const { data } = useGetPedigreeQuery({});
  const data: any = { results: [] };
  const ref = useRef(null);

  const stageOptions = {
    antialias: true,
    autoDensity: true,
    backgroundAlpha: 0,
  };

  const width = 100;
  const height = 200;

  return (
    <Stage width={width} height={height}>
      <PixiViewport ref={ref} />
    </Stage>
  );
};

export default PedigreeTree;
