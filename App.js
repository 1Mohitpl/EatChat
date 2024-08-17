import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement(
    "h1",
    {
        id: "title",
    },
     "Heading 1 for parcel"
);

const heading2 = React.createElement(
    "h2",
    {
        id: "title",

    }, 
    "Heading 2"
);

const container = React.createElement(
    "div",
    {
        id: "container",
        
    },
    [heading, heading2]
);

console.log(heading);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(container);