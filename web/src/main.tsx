import {StrictMode} from "react"
import {createRoot} from "react-dom/client"

import {isEnvBrowser} from "./utils/misc";

import App from "./App"

import ErrorBoundary from "./providers/errorBoundary";

import "./index.css"

if (isEnvBrowser()) {
    const root = document.getElementById("root");
    root!.style.backgroundImage = `url("https://i.imgur.com/3pzRj9n.png")`;
    root!.style.backgroundSize = "cover";
    root!.style.backgroundRepeat = "no-repeat";
    root!.style.backgroundPosition = "center";
}

const root = document.getElementById("root");

createRoot(root!).render(
    <StrictMode>
        <ErrorBoundary>
            <App/>
        </ErrorBoundary>
    </StrictMode>
)