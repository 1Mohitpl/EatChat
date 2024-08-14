import React from "react";
import ReactDom from "react-dom/client";

const heading = React.createElement(
    "h1",
    {
        id: "title1"

    },
    "heading 1"
);

const heading2 = React.createElement(
    "h2",
    {
        id : "title2"

    },
    "heading 2"

);

const container = React.createElement(
    "div",
    {
        id: "title3"

    },
    [heading, heading2]
);