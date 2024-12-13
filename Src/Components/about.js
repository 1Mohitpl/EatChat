import { Outlet } from "react-router-dom";
// import ProfileClass from "./profileClass";
import Profile from "./Profile";
import React from "react";
import { Component } from "react";
import aboutimg from "../imgs/about.jpg"




class About extends Component{
    constructor (props){
        super(props);
        console.log("parent-constructure");  
        
    }
      componentDidMount (){
        // best place to make API call
        console.log("parent-componentdidmount");
        
    }
    render() {
        console.log("parent-render");
        
        return (
            <>
            <div className="about-container">
                <div className="text-content">
                    <h1 className="main-heading">Get to Know Us Better</h1>
                    <h2 className="sub-heading">"More than meals, we serve experiences"</h2>
                </div>
                <Outlet/>
                <div className="image-content">
                    <img src={aboutimg} alt="about-img" className="about-img" />
                </div>
            </div>
        </>
        
        )
    }
}


export default About;