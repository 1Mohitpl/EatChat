import React from "react";

class  Profile extends React.Component {
    constructor (props) {
      super(props); // always mentiond super propes 
      this.state = {
        count : 2,
        carNo : 34,
      };
    }
    render() {
        const {count} = this.state;  // destruture the state varible
        return (
        <div>
            <h1>classbased profile component</h1> 
            <h3> Name : {this.props.name}</h3> {/*passing propes in classbased compoenent*/}
            <h3>counts : {count}</h3>
            <h3> carNo : {count}</h3>
            <button onClick={() =>{
                 this.setState({
                    count : 4,
                    carNo : 5,
                 })
            }}>setCount</button>
        </div>
        );
    
  

        
    }
} 

export default Profile;