"use client";
import React, { useEffect, useState } from "react";
import styles from "./newcicle.module.scss";

import { Divider, IconButton } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GreenButton } from "../buttons/button";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { info } from "console";

interface NewCicleProps {
  getdate?: (date: string) => void;
  okClick?: () => void;
  trashClick?: () => void;
  programatedCicle: programatedCicleType;
}

interface programatedCicleType {
  [index: number]: [string, string];
}

const programatedCicleList: programatedCicleType = [
  ["2022-04-17", "2022-04-24"],
  ["2022-04-25", "2022-05-02"],
  ["2022-05-03", "2022-05-10"],
  ["2022-05-11", "2022-05-18"],
  ["2022-05-19", "2022-05-26"],
  ["2022-05-27", "2022-06-03"],
  ["2022-05-27", "2022-06-03"],
  ["2022-05-27", "2022-06-03"],
  ["2022-05-27", "2022-06-03"],
];

function NewCicle({
  getdate,
  okClick,
  trashClick,
  programatedCicle = programatedCicleList,
}: NewCicleProps) {
  const [openDate, setOpenDate] = useState<Dayjs | null>(dayjs("2022-04-17"));
  const [closeDate, setCloseDate] = useState<Dayjs | null>(dayjs("2022-04-17"));

  useEffect(() => {
    if (openDate && closeDate) {
      getdate &&
        getdate(
          `${openDate.format("YYYY-MM-DD")} até ${closeDate.format(
            "YYYY-MM-DD"
          )}`
        );

      console.log(closeDate.format("YYYY-MM-DD"));
    }
  }, [openDate, closeDate]);

  return (
    <div className={styles.card}>
      <div className={styles.subDivision}>
        <div>
          <p>Data de Abertura</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                value={openDate}
                onChange={(newValue) => setOpenDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div>
          <p>Data de fechamento</p>
          <div className={styles.inLine}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  value={closeDate}
                  onChange={(newValue) => setCloseDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <GreenButton
              width="50px"
              height="30px"
              borderRadius="12px"
              onClick={okClick}
            >
              Ok
            </GreenButton>
          </div>
        </div>
      </div>

      <Divider />

      <div className={styles.listCicle}>
        {programatedCicle.map((cicle, index) => {
          return (
            <div key={index} className={styles.cicles}>
              <p>
                Ciclo programado: {cicle[0]} até {cicle[1]}
              </p>
              <IconButton aria-label="delete" onClick={trashClick}>
                <DeleteOutlinedIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewCicle;
