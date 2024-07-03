import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

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
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#0a2e63",
    },
  })
);

export const GreenButton = styled(Button)<ColorButtonProps>(
  ({ width, height, borderRadius }) => ({
    width: width || "100%",
    height: height || "100%",
    borderRadius: borderRadius || "16px",
    backgroundColor: "#00F999",
    fontWeight: "bold",

    color: "#00183C",
    "&:hover": {
      backgroundColor: "#30e09d",
    },
  })
);

export const BlueButtonColorWhite = styled(Button)<ColorButtonProps>(
  ({ width, height, borderRadius }) => ({
    width: width || "100%",
    height: height || "100%",
    borderRadius: borderRadius || "16px",
    backgroundColor: "#00183C",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#0a2e63",
    },
  })
);

export const OutlinedButton = styled(Button)<ColorButtonProps>(
  ({ width, height, borderRadius }) => ({
    width: width || "100%",
    height: height || "100%",
    borderRadius: borderRadius || "25px",
    border: "1px solid #00F999",
    color: "#00F999",

    "&:hover": {
      backgroundColor: "#00F999",
      color: "#00183C",
    },
  })
);
