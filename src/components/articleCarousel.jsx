// import React from 'react';
// import './Form.css';

// // Define the ArticleCarousel component
// const ArticleCarousel = ({ articles }) => {
//   // Handle the case where articles is undefined (e.g., still loading or empty)
//   if (!articles) {
//     return null;
//   }

//   // Function to format the date
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Render the article cards
//   return (
//     <div className="article-carousel">
//       {articles.map((article, index) => (
//         <div key={index} className="article-card">
//           <div className="article-image-container">
//             <img src={article.urlToImage} alt={article.title} className="article-image" />
//           </div>
//           <h3>{article.title}</h3>
//           <p>{article.description}</p>
//           <p>{formatDate(article.publishedAt)}</p> {/* Use the formatDate function */}
//           {/* Add more details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// };

// // Export the ArticleCarousel component
// export default ArticleCarousel;

import React from 'react';
import './Form.css';

// Define the ArticleCarousel component
const ArticleCarousel = ({ articles, selectedTopics }) => {
  // Handle the case where articles are undefined (e.g., still loading or empty)
  if (!articles) {
    return null;
  }

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render the article cards with topic titles
  return (
    <div className="article-carousel">
      {selectedTopics.map((topic, topicIndex) => (
        <div key={topicIndex}>
          <h2>{topic}</h2>
          {articles
            .filter((article, index) => index >= topicIndex * 10 && index < (topicIndex + 1) * 10)
            .map((article, index) => (
              <div key={index} className="article-card">
                <div className="article-image-container">
                  <img src={article.urlToImage} alt={article.title} className="article-image" />
                </div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p>{formatDate(article.publishedAt)}</p>
                {/* Add more details as needed */}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

// Export the ArticleCarousel component
export default ArticleCarousel;
