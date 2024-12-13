const Contact = () =>{

    return (
        <div className="form-container">
          <div className="form">
            <div className="info">
              <h1 className="heading font-bold">Get In Touch</h1>
              <div className="input-group">
                <h2>What is your Full Name?</h2>
                <input type="text" placeholder="Full Name" className="input" />
              </div>
              <div className="input-group">
                <h2>What is your Email Address?</h2>
                <input type="email" placeholder="Email Address" className="input" />
              </div>
              <div className="input-group">
                <h2>Write your query here</h2>
                <textarea placeholder="Write your query here" className="textarea"></textarea>
              </div>
              <div className="btn-container">
                <button className="contact-btn">Submit</button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Contact;