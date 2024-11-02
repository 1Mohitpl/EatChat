import { useState } from "react";
const Profile  =  (props) =>{
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    return(
 
        <div>
            <h1>Profile component</h1>
            <h3> address : {props.address}</h3>
            <h3>Counts here : {count}</h3>
            <h3>press : {count2}</h3>
            <button onClick={() => {setCount("A"); setCount2("B")}}>count</button>
        </div>
    )
}
 
export default Profile;