import { Outlet } from "react-router-dom";



const About = () =>{
    return (
        <>
        <div className="items">
        <h1>Get to Know us Better</h1>
        <img src="https://themes.muffingroup.com/be/ecofood3/wp-content/uploads/2024/02/ecofood3-about-pic1.webp" ></img>
        <Outlet />
        </div>
        </>
    )

}

export default About;