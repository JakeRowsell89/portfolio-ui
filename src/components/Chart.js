import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const colours = [
  "#F87AFF",
  "#AB1DE0",
  "#8718F5",
  "#4E16E0",
  "#4940FF",
  "#7B91FF",
  "#3D1DE0",
  "#8718F5",
  "#BE0BE0",
  "#FF29BB",
];

const defaultLabelStyle = {
  fontSize: "4px",
  fontFamily: "sans-serif",
};

function Chart({ assets }) {
  console.log(assets);
  return (
    <div className="Chart">
      <section className="Chart-list">
        <PieChart
          label={({ dataEntry }) => `
          ${dataEntry.title}
          ${Math.round(dataEntry.percentage)} %
          `}
          labelStyle={{
            ...defaultLabelStyle,
          }}
          data={assets
            .filter((asset) => asset.value)
            .map((asset, i) => ({
              title: asset.type,
              value: asset.value,
              color: colours[i],
            }))}
        />
      </section>
    </div>
  );
}

export default Chart;
