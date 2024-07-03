"use client";
import * as React from "react";
import Switch from "@mui/material/Switch";
import { ChangeEvent, useState } from "react";

interface switchProps {
  getValues: (value: boolean) => void;
}

export default function ControlledSwitches({ getValues }: switchProps) {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    getValues(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
      sx={{
        "& .MuiSwitch-switchBase": {
          marginTop: 0.4,

          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        },
        "& .MuiSwitch-switchBase.Mui-checked": {
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
          backgroundColor: "#00F999",
        },
        "& .MuiSwitch-track": {
          borderRadius: 20 / 2,
          height: 20,
        },
        "& .MuiSwitch-thumb": {
          width: 20,
          height: 20,
        },
      }}
    />
  );
}
