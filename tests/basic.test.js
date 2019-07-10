/* global test expect */
const Molecule = require("./mcul.node");
const MoleculeVisualizeSVG = require("./../src/index");
const fs = require("fs");

test("Hydrochloric acid", () => {
  let svg = MoleculeVisualizeSVG.createOrganicSVG(
    Molecule.createFromText("4-chloro-2,3-dimethylhex-2-yne", "iupac")
  );
  fs.writeFileSync("ex.svg", svg);
  expect(svg).toMatchInlineSnapshot(
    `"<?xml version=\\"1.0\\" encoding=\\"UTF-8\\" standalone=\\"no\\"?><!DOCTYPE svg PUBLIC \\"-//W3C//DTD SVG 1.1//EN\\" \\"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\\"><svg version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" viewBox=\\"-20 -59 220 133\\"><style>text {font-size: 8px; font-family: monospace; font-weight: 900;}</style><path d=\\"M0 15 L36 0\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><path d=\\"M36 0 L72 15\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><path d=\\"M38 -1.1666666666666665 L70 12.166666666666666\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><path d=\\"M38 2.8333333333333335 L70 16.166666666666668\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><path d=\\"M72 15 L108 0\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><path d=\\"M108 0 L144 15\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><path d=\\"M144 15 L180 0\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><path d=\\"M36 0 L36 -39\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><path d=\\"M72 15 L72 54\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><path d=\\"M108 0 L108 -39\\" stroke=\\"black\\" stroke-width=\\"1\\" fill=\\"none\\" /><circle cx=\\"0\\" cy=\\"15\\" r=\\"0.6666666666666666\\" fill=\\"black\\"/><circle cx=\\"36\\" cy=\\"0\\" r=\\"0.6666666666666666\\" fill=\\"black\\"/><circle cx=\\"72\\" cy=\\"15\\" r=\\"0.6666666666666666\\" fill=\\"black\\"/><circle cx=\\"108\\" cy=\\"0\\" r=\\"0.6666666666666666\\" fill=\\"black\\"/><circle cx=\\"144\\" cy=\\"15\\" r=\\"0.6666666666666666\\" fill=\\"black\\"/><circle cx=\\"180\\" cy=\\"0\\" r=\\"0.6666666666666666\\" fill=\\"black\\"/><circle cx=\\"108\\" cy=\\"-39\\" r=\\"7\\" fill=\\"white\\" /><text x=\\"103.5\\" y=\\"-36.5\\"  r=\\"2\\" fill=\\"black\\">Cl</text><circle cx=\\"36\\" cy=\\"-39\\" r=\\"0.6666666666666666\\" fill=\\"black\\"/><circle cx=\\"72\\" cy=\\"54\\" r=\\"0.6666666666666666\\" fill=\\"black\\"/></svg>"`
  );
});
