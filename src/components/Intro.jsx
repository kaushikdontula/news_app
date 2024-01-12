// // Intro.js

// import React, { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
// // import { Form } from './Form';
// import './intro.css';

// const Intro = () => {
//   const navigate = useNavigate();
//   const formRef = useRef(null);

//   const handleGetStarted = () => {
//     // Scroll to the Form component when Get Started is clicked
//     formRef.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="intro-container">
//       <div className="intro-content">
//         <h1 style={{ color: '#ecf0f1' }}>Welcome to NewsNest</h1>
//         <p style={{ color: '#bdc3c7' }}>
//           Stay Informed, Stay Updated. NewsNest delivers the latest news tailored to your interests.
//         </p>
//         <div className="animation-container">
//           {/* Use FontAwesomeIcon to render the newspaper icon */}
//           <div className="icon-container">
//             <FontAwesomeIcon icon={faNewspaper} />
//           </div>
//         </div>
//       </div>
//       <button onClick={handleGetStarted}>Get Started</button>

//       <div ref={formRef}>
//         {/* < Form /> */}
//       </div>
//     </div>
//   );
// };

// export default Intro;



// intro.js
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import Particles from 'react-particles-js'; // Import react-particles-js
import './intro.css';

const Intro = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleGetStarted = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="intro-container">
      <Particles
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        params={{
          particles: {
            number: {
              value: 100,
            },
            size: {
              value: 3,
            },
          },
        }}
      />
      <div className="intro-content">
        <h1 style={{ color: '#ecf0f1' }}>Welcome to News Nest</h1>
        <p style={{ color: '#bdc3c7' }}>
          Stay Informed, Stay Updated. News Nest delivers the latest news tailored to your interests.
        </p>
        {/* <div className="animation-container">
          <div className="icon-container">
            <FontAwesomeIcon icon={faNewspaper} />
          </div>
        </div> */}
      </div>
      <button onClick={handleGetStarted}>Get Started</button>
      <div ref={formRef}></div>
    </div>
  );
};

export default Intro;
