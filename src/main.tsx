import React, { StrictMode } from "react";

import { createRoot, Root } from "react-dom/client";

import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

import App from "./App";

//const rootElement = document.getElementById("root");
const rootElement = document.getElementById("root");
let root;
if (rootElement) {
    root = createRoot(rootElement);
}

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
(root as Root).render(
    <StrictMode>
        <AgoraRTCProvider client={client}>
            <App />
        </AgoraRTCProvider>
    </StrictMode>
);
