import { createRoot } from "react-dom/client";
import App, { PageProvider, ThemeProvider } from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <PageProvider>
      <App />
    </PageProvider>
  </ThemeProvider>
);
