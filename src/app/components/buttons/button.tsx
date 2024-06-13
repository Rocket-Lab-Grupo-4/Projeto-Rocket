import * as React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { blue, purple } from "@mui/material/colors";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

interface ColorButtonProps extends ButtonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const BlueButton = styled(Button)<ColorButtonProps>(
  ({ width, height, borderRadius }) => ({
    width: width || "100%",
    height: height || "100%",
    borderRadius: borderRadius || "16px",
    backgroundColor: "#00183C",
    color: "#00F999",
    "&:hover": {
      backgroundColor: "#0a2e63",
    },
  })
);

export const GreenButton = styled(Button)<ColorButtonProps>(
  ({ width, height ,borderRadius }) => ({
    width: width || "100%",
    height: height || "100%",
    borderRadius: borderRadius || "16px",

    backgroundColor: "#00F999",
    color: "#00183C",
    "&:hover": {
      backgroundColor: "#30e09d",
    },
  })
);
