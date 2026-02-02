import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import fonts locally
// Minimal font set to cut bundle size
import '@fontsource/orbitron/600.css';
import '@fontsource/orbitron/700.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import '@fontsource/cinzel/700.css';
import '@fontsource/playfair-display/700.css';

createRoot(document.getElementById("root")!).render(<App />);
