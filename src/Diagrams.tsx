import * as React from "react";
import createEngine, {
  DefaultLinkModel,
  DiagramModel
} from "@projectstorm/react-diagrams";
import { NodeFactory } from "./CustomDiagramNodes/NodeFactory";
import { NodeModel } from "./CustomDiagramNodes/NodeModel";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

// create an instance of the engine with all the defaults
const engine = createEngine();
engine.getNodeFactories().registerFactory(new NodeFactory());

// --- node source
const node1 = new NodeModel({
  color: "LemonChiffon",
  title: "Source: '/Data/Models/'",
  content: "Yellow_penguin.glTF, ... [4]",
  source: true
});
node1.setPosition(40, 350);

// --- node data
const node2 = new NodeModel({
  color: "LightCyan",
  title: "Transform",
  content: "glTF to FBX"
});
node2.setPosition(325, 100);

const node3 = new NodeModel({
  color: "LightCyan",
  title: "Transform",
  content: "glTF to USD"
});
node3.setPosition(325, 200);

const node4 = new NodeModel({
  color: "LemonChiffon",
  title: "Material Lib",
  content: "Leather.mtl, ... [4]",
  source: true
});
node4.setPosition(325, 300);

// --- node function
const node5 = new NodeModel({
  color: "Lavender",
  title: "FUNC: Unreal Engine Renderer",
  inputs: ["Model (FBX)", "Materials"],
  outputs: ["Image", "Exec. Time"]
});
node5.setPosition(550, 100);

const node8 = new NodeModel({
  color: "Lavender",
  title: "FUNC: Generate QR Code for AR",
  inputs: ["Model (glTF)"],
  outputs: ["Image (QR Code)", "URL"]
});
node8.setPosition(550, 400);

// --- node outputs
const node6 = new NodeModel({
  color: "#E0FFE0",
  title: "Image output",
  content: "Yellow_penguin.png, ...[4]"
});
node6.setPosition(900, 100);

const node7 = new NodeModel({
  color: "#E0FFE0",
  title: "Exec. Time",
  content: "= 10.2 s"
});
node7.setPosition(900, 200);

const node9 = new NodeModel({
  color: "#E0FFE0",
  title: "QR Code Output",
  content: "QR_yellow_penguin.png, ...[4]"
});
node9.setPosition(900, 400);

// links
//const link = n1p2.link<DefaultLinkModel>(n2p1);
const link1 = new DefaultLinkModel();
link1.setSourcePort(node1.getPort("Out"));
link1.setTargetPort(node2.getPort("In"));

const link2 = new DefaultLinkModel();
link2.setSourcePort(node1.getPort("Out"));
link2.setTargetPort(node3.getPort("In"));

const link3 = new DefaultLinkModel();
link3.setSourcePort(node2.getPort("Out"));
link3.setTargetPort(node5.getPort("Model (FBX)"));

const link4 = new DefaultLinkModel();
link4.setSourcePort(node4.getPort("Out"));
link4.setTargetPort(node5.getPort("Materials"));

const link5 = new DefaultLinkModel();
link5.setSourcePort(node5.getPort("Image"));
link5.setTargetPort(node6.getPort("In"));

const link6 = new DefaultLinkModel();
link6.setSourcePort(node5.getPort("Exec. Time"));
link6.setTargetPort(node7.getPort("In"));

const link7 = new DefaultLinkModel();
link7.setSourcePort(node1.getPort("Out"));
link7.setTargetPort(node8.getPort("Model (glTF)"));

const link8 = new DefaultLinkModel();
link8.setSourcePort(node8.getPort("Image (QR Code)"));
link8.setTargetPort(node9.getPort("In"));

const link9 = new DefaultLinkModel();
link9.setSourcePort(node1.getPort("Out"));
link9.setTargetPort(node8.getPort("Model (glTF)"));

// model
const model = new DiagramModel();
model.addAll(
  node1,
  node2,
  node3,
  node4,
  node5,
  node6,
  node7,
  node8,
  node9,
  link1,
  link2,
  link3,
  link4,
  link5,
  link6,
  link7,
  link8,
  link9
);
engine.setModel(model);

const Diagrams = () => {
  return <CanvasWidget className="diagram-container" engine={engine} />;
};

export default Diagrams;
