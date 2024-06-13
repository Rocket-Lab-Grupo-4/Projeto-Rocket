"use client";
import React from "react";
import styles from "./Login.module.scss";
import {
  TextField,
  Button,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Link from "next/link";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          border: "1px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00f999",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00f999",
          },
        },
        notchedOutline: {
          border: "1px",

          borderColor: "#00f999",
        },
        input: {
          padding: "14px 20px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
          left: "20px",
          fontWeight: "bold",
          fontSize: "22px",
          top: "-5px",
          "&.Mui-focused": {
            color: "black",
            transform: "translate(14px, -22px) scale(0.75)",
          },
          transform: "translate(14px, -22px) scale(0.75)",
        },
        shrink: {
          transform: "translate(14px, -22px) scale(0.75)",
        },
      },
    },
  },
});

export default function Login() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.loginContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.logo} />
          <Typography className={styles.loginTitle}>
            Olá!
            <br />
            Para iniciar navegação, efetue login
          </Typography>
          <div className={styles.group40} />
          <Typography className={styles.loginSubtitle}>LOGIN</Typography>
          <div className={styles.inputGroup}>
            <TextField
              className={styles.loginInput}
              label="Usuário:"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className={styles.passwordGroup}>
            <TextField
              className={styles.loginInput}
              label="Senha:"
              variant="outlined"
              type="password"
              fullWidth
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button className={styles.loginButton} variant="contained">
              Entrar
            </Button>
          </div>
          <Link href="/cadastro" className={styles.createAccount}>
            <strong>Criar Conta</strong>
          </Link>
          <Link href="#" className={styles.forgotPassword}>
            Esqueceu sua senha?{" "}
            <strong className={styles.forgotPasswordHover}>Clique aqui!</strong>
          </Link>
        </div>
      </div>
    </ThemeProvider>
  );
}
