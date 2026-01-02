import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { useVisitorTracking } from "./hooks/useBackend";

const Root = () => {
  useVisitorTracking();
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <App />
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
