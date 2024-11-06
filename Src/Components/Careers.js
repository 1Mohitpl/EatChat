import React from 'react';

const Careers = () => {
  const jobs = [
    'Frontend Developer',
    'Backend Developer',
    'Product Designer',
    'Marketing Specialist',
    'Customer Success Manager',
  ];

  return (
    <div className="career-page">
      <div className="header-section">
        <h2 className="hire">Join Our Team at BeYumm!</h2>
        <p className="description">
          At BeYumm, we’re passionate about innovation and creating delightful food experiences. 
          If you’re looking to be part of an energetic, forward-thinking team, take a look at our open roles.
        </p>
        <p className="contact-info">Reach out at <span>careers@beyumm.com</span></p>
      </div>

      <div className="job-listings">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job}</h3>
            <button className="apply-button" onClick={()=> alert("Applied")}>Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;


