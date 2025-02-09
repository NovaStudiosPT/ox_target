import React from "react"

import {MantineProvider, createTheme} from "@mantine/core";
import {isEnvBrowser} from "./utils/misc";

import Dev from "./features/dev/index";
import Target from "./features/target/Target";

import "@mantine/core/styles.css";

const theme = createTheme({
    fontFamily: "Roboto",
});

const App: React.FC = () => {
    return (
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <Target />
            {isEnvBrowser() && <Dev/>}
        </MantineProvider>
    );
};

export default App;