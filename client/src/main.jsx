import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import router from "./routes/router";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
		{/* <BrowserRouter> */}
		{/* <App /> */}
		{/* </BrowserRouter> */}
	</Provider>
);
