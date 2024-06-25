"use client";
import React, { useState } from "react";
import styles from "./Login.module.scss";
import {
  TextField,
  Button,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";

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
          fontWeight: "bold",
          fontSize: "22px",
          top: "-5px",
          "&.Mui-focused": {
            color: "black",
            // transform: "translate(14px, -22px) scale(0.75)",
          },
          transform: "translate(14px, -22px) scale(0.75)",
        },
        shrink: {
          // transform: "translate(14px, -22px) scale(0.75)",
        },
      },
    },
  },
});

const Login: React.FC<LoginProps> = ({ onLogin, onToggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin();
  };

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
          <div className={styles.group40}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <Typography className={styles.loginSubtitle}>LOGIN</Typography>
              <TextField
                className={styles.Input}
                label="Usuário:"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                className={styles.Input}
                label="Senha:"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className={styles.loginButton}
                type="submit"
                variant="contained"
              >
                Entrar
              </Button>
            </form>
          </div>

                   <p className={styles.createAccount}>
            Não possui acesso?{" "}
            <strong
              onClick={onToggleForm}
              className={styles.createAccountHover}
            >
              Crie aqui!
            </strong>
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
