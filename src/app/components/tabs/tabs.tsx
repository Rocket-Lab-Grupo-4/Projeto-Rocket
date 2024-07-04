"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, mt: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface BasicTabsProps {
  children: React.ReactNode[];
}

export default function BasicTabs({ children }: BasicTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ sx: { display: "none" } }}
          sx={{
            "& .MuiTabs-flexContainer": {
              borderBottom: "none",
            },
            "& .MuiTab-root": {
              minWidth: 0,
              marginRight: 2,
              marginBottom: 2,
              padding: "0px 12px",
              textTransform: "none",
              color: "black",
              height: "fit-content",
              borderRadius: "30px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "rgba(0, 24, 60, 1)",
              "&:hover": {
                backgroundColor: "#30e09d",
              },
              "&.Mui-selected": {
                color: "black",
                textDecoration: "underline",
              },
            },
          }}
        >
          <Tab 
            label="Em aberto" 
            {...a11yProps(0)} 
            sx={{
              backgroundColor: "#00F999",
              "&:hover": {
                backgroundColor: "#30e09d",
              },
              "&.Mui-selected": {
                backgroundColor: "#00F999",
                color: "#00183C",
              },
            }}
          />
          <Tab 
            label="Finalizadas" 
            {...a11yProps(1)} 
            sx={{
              backgroundColor: "#00F999",
              "&:hover": {
                backgroundColor: "#30e09d",
              },
              "&.Mui-selected": {
                backgroundColor: "#00F999",
                color: "#00183C",
              },
            }}
          />
        </Tabs>
      </Box>
      {children.map((child, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          {child}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
