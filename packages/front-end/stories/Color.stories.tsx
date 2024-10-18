import { Meta, StoryFn, StoryObj } from "@storybook/react";
import ColorPalette from "./ColorPalette";
import { css } from "@/styled-system/css";
import { theme } from "@/style/theme";
import { useState } from "react";
import Switch from "@/components/Switch";
import React from "react";

const meta = {
  title: "Color/Palette",
  component: React.Fragment,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof React.Fragment>;

type Story = StoryObj<typeof meta>;
export default meta;

const Template: StoryFn = (_args) => {
  const [background, setBackground] = useState(true);
  return (
    <div
      className={css({ padding: "1rem" })}
      style={
        background
          ? { color: "black", backgroundColor: "white" }
          : { color: "white", backgroundColor: "black" }
      }
    >
      <h1 className={css({ fontWeight: "bold", fontSize: "2rem" })}>
        Color Palette
      </h1>
      <label
        className={css({
          margin: "1rem 0",
          fontWeight: "semibold",
          fontSize: "1.5rem",
          display: "block",
        })}
        htmlFor="background"
      >
        Set background
      </label>
      <Switch
        checked={background}
        onChange={(e) => {
          setBackground(e.target.checked);
        }}
        name="background"
        id="background"
      />
      <ColorPalette title="primary" palette={theme.colors?.primary} />
      <ColorPalette title="secondary" palette={theme.colors?.secondary} />
      <ColorPalette title="tertiary" palette={theme.colors?.tertiary} />
      <ColorPalette title="grey" palette={theme.colors?.grey} />
    </div>
  );
};

export const Default: Story = Template.bind({
});
