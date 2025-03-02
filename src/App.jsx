import React from "react";
import { Provider } from "react-redux";
import Store from "@Store";
import { Master } from "@Routes";
import { SnackbarProvider } from "notistack";
import { NextUIProvider } from "@nextui-org/react";
import { styled } from "@mui/material";

function App() {
  const StyledMaterialDesignContent = styled(SnackbarProvider)(() => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: "var(--color-error)",
      color: "#FFFFFF",
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: "var(--color-confirmation)",
      color: "#FFFFFF",
    },
    "&.notistack-MuiContent-warning": {
      backgroundColor: "var(--color-warning)",
      color: "#FFFFFF",
    },
    "&.notistack-MuiContent-info": {
      backgroundColor: "var(--color-pink-1)",
      color: "#FFFFFF",
    },
  }));

  return (
    <>
      <NextUIProvider>
        <StyledMaterialDesignContent
          maxSnack={2}
          iconVariant={{
            success: "✅",
            error: "😵 ",
            warning: "⚠️",
            info: "ℹ️",
          }}
        >
          <Provider store={Store}>
            <Master />
          </Provider>
        </StyledMaterialDesignContent>
      </NextUIProvider>
    </>
  );
}

export default App;
