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
import { formatDate } from "@/utils/formatDate";

interface NewCicleProps {
  getdate?: (openDate: string, closeDate: string) => void;
  okClick?: () => void;
  trashClick?: (id: string) => void;
  programatedCicle: programatedCicleType[];
}

interface programatedCicleType {
  id: string;
  dateOpened: string;
  dateConcluded: string;
}

const programatedCicleList: programatedCicleType[] = [
  {
    id: "1",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "2",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "3",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "4",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "5",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "6",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "7",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "8",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "9",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "10",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "11",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "12",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "13",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
  {
    id: "14",
    dateOpened: "2022-04-17",
    dateConcluded: "2022-04-17",
  },
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
        getdate(openDate.format("YYYY-MM-DD"), closeDate.format("YYYY-MM-DD"));
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
                Ciclo programado: {formatDate(cicle.dateOpened)} até{" "}
                {formatDate(cicle.dateConcluded)}
              </p>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  trashClick && trashClick(cicle.id);
                }}
              >
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
