import React from "react";

class  Profile extends React.Component {
    constructor (props) {
      super(props); // always mentiond super propes 
      this.state = {
        userInfo: {
          name :"Dummy name",
          location: "Dummy loaction",
        },
      };
      console.log("child-construture" + this.props.name);
      
    }

    async componentDidMount(props){

      // best place to Api Call
      const data  =  await fetch ("https://api.github.com/users/1Mohitpl");
      const json = await data.json();
       this.setState({
        userInfo : json,
       });
      console.log("child-didmouint" + this.props.name);
      
    }

    componentDidUpdate(){
      console.log("component did mount");
    }


   componentWillUnmount() {
      console.log("component will mount");
      
   }






    render() {
      console.log("child-render" + this.props.name);
      
        const {userInfo} = this.state;  // destruture the state varible

       return (
        <div>
            <h1>classbased profile component</h1> 
            <img src= {userInfo?.avatar_url} />
            <h3> Name : {userInfo?.name}</h3> {/*passing propes in classbased compoenent*/}
            <h3> location : {userInfo?.location}</h3>
            {/* <button onClick={() =>{
                 this.setState({
                    count : 4,
                    carNo : 5,
                 })
            }}>setCount</button> */}
        </div>
        );
    
  

        
    }
} 

export default Profile;