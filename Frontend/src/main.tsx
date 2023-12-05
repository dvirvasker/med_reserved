import { render } from "preact";
import App from "./App";
import ThemeWrapper from "./ThemeWrapper";
import CardataContextProvider from "./context/Context";

render(
	<CardataContextProvider>
		<ThemeWrapper>
			<App />
		</ThemeWrapper>
	</CardataContextProvider>,
	document.getElementById("app")!
);
