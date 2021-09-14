import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import App from "./App";
import "./fonts.css";

import store from "./redux/store.js";

const GlobalStyle = createGlobalStyle` 


* {
	padding: 0px;
	margin: 0px;
	border: 0px;
}
*,
*:before,
*:after {
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
:focus,
:active {
	outline: none;
}

html,
body {
	line-height: 1;
	-ms-text-size-adjust: 100%;
	-moz-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	color: #000;
	font-size: 20px;
	height: 100%;
	min-width: 320px;
	font-family: "Rubik";
	&.lock, &.popup-lock {
		overflow: hidden; 
	}
}

#root {
	min-height: 100%;
}

a:focus,
a:active { 
	outline: none;
}
aside,
nav,
footer,
header,
section {
	display: block;
}

input,
button,
textarea {
	font-family: Rubik; 
}
input::-ms-clear {
	display: none;
}
button {
	cursor: pointer;
}
button::-moz-focus-inner {
	padding: 0;
	border: 0;
}
a,
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: none;
}
ul li {
	list-style: none;
}
img {
	vertical-align: top;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: inherit;
	font-size: inherit;
}

`;

const theme = {
	media: {
		extraSmallDevices: "(max-width: 479.98px)",
		smallDevices: "(max-width: 767.98px)",
		mediumDevices: "(max-width: 991.98px)",
		trololo: "(max-width: 550px)",
		largeDevices: "(max-width: 1236px)",
	},
	mediaFM: {
		largeDevices: "(min-width: 991.98px)",
	},
};

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<GlobalStyle />
					<App />
				</Provider>
			</ThemeProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
