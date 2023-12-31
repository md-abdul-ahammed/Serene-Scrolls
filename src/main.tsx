import ReactDOM from "react-dom/client";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Notifications } from "@mantine/notifications";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={{
        primaryColor: "violet",
        shadows: {
          md: "1px 1px 3px rgba(0, 0, 0, .25)",
          xl: "5px 5px 3px rgba(0, 0, 0, .25)",
        },

        headings: {
          sizes: {
            h1: { fontSize: "2rem" },
          },
        },
      }}
    >
      <Notifications position="top-center" autoClose={3000} />
      <App />
    </MantineProvider>
  </Provider>
);
