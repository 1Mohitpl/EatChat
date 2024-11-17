import { Outlet } from "react-router-dom";
import ProfileClass from "./profileClass";
import Profile from "./Profile";
import React from "react";
import { Component } from "react";



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
            <div className="items">
            <h1>Get to Know us Better</h1>
            <img src="https://themes.muffingroup.com/be/ecofood3/wp-content/uploads/2024/02/ecofood3-about-pic1.webp" ></img>
            <Outlet />
            <Profile  address = {"kolkata"} />
            <ProfileClass name = {"first child"} />
            {/* <ProfileClass name = {"second child"} />     */}
            </div>
            </>
        )

    }
}


export default About;