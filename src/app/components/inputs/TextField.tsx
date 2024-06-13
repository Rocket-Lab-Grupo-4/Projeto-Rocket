"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { useEffect } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InputTextField({ value, onChange }: Props) {
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <TextField
      onChange={handleChange}
      value={inputValue}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
            padding: "0px",
            margin: "0px",
          },
          "& .MuiOutlinedInput-input": {
            padding: "5px",
          },
        },

        background: "rgba(241, 241, 241, 1)",
        height: "object-fit",
        borderRadius: "16px",
      }}
    />
  );
}
