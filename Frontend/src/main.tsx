import { render } from "preact";
import App from "./App";
import ThemeWrapper from "./ThemeWrapper";
import CardataContextProvider from "./context/SiteContext";

render(
	<CardataContextProvider>
		<ThemeWrapper>
			<App />
		</ThemeWrapper>
	</CardataContextProvider>,
	document.getElementById("app")!
);
