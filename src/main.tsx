import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import fonts locally
import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/500.css';
import '@fontsource/orbitron/600.css';
import '@fontsource/orbitron/700.css';
import '@fontsource/orbitron/800.css';
import '@fontsource/orbitron/900.css';
import '@fontsource/manrope/200.css';
import '@fontsource/manrope/300.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import '@fontsource/cinzel/400.css';
import '@fontsource/cinzel/500.css';
import '@fontsource/cinzel/600.css';
import '@fontsource/cinzel/700.css';
import '@fontsource/cinzel/800.css';
import '@fontsource/cinzel/900.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/400-italic.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/800.css';
import '@fontsource/playfair-display/900.css';

createRoot(document.getElementById("root")!).render(<App />);
