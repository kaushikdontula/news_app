import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './Form.css';
import moment from 'moment';
import ArticleCarousel from './articleCarousel'; // Correct the import path

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    topics: [],
    frequency: 'daily',
  });

  const [articles, setArticles] = useState([]); // Separate state for articles

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTopicChange = (selectedTopics) => {
    setFormData((prevData) => ({
      ...prevData,
      topics: selectedTopics.map((topic) => topic.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = '20252e8897cc40cb8045741bc9ecfd92';
    const { topics, frequency } = formData;

    try {
      let fromDate;

      if (frequency === 'daily') {
        fromDate = moment().subtract(1, 'days');
      } else if (frequency === 'weekly') {
        fromDate = moment().subtract(7, 'days');
      } else if (frequency === 'monthly') {
        fromDate = moment().subtract(1, 'months');
      }

      const toDate = moment();

      const newsPromises = topics.map(async (topic) => {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          headers: {
            'X-Api-Key': apiKey,
          },
          params: {
            q: topic,
            from: fromDate.format('YYYY-MM-DD'),
            to: toDate.format('YYYY-MM-DD'),
          },
        });

        const sortedArticles = response.data.articles.sort(
          (a, b) => b.popularity - a.popularity
        );

        const top10Articles = sortedArticles.slice(0, 10);

        return { topic, articles: top10Articles };
      });

      const newsResults = await Promise.all(newsPromises);

      console.log('Response from News API:', newsResults);

      setArticles(newsResults.flatMap((result) => result.articles));
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const apiKey = '20252e8897cc40cb8045741bc9ecfd92'; // Replace with your News API key
  //   const { topics } = formData;
  
  //   try {
  //     // Fetch news for each selected topic
  //     const newsPromises = topics.map(async (topic) => {
  //       const response = await axios.get('https://newsapi.org/v2/top-headlines', {
  //         headers: {
  //           'X-Api-Key': apiKey,
  //         },
  //         params: {
  //           q: topic,
  //         },
  //       });
  //       return { topic, articles: response.data.articles };
  //     });
  
  //     // Wait for all news promises to resolve
  //     const newsResults = await Promise.all(newsPromises);
  
  //     // Log the response data to see what you're getting
  //     console.log('Response from News API:', newsResults);
  
  //     // Implement logic to send news to the user (e.g., email, text)
  //     // You might need a server-side component to send emails or texts
  //     console.log('News sent to user:', formData);
  //   } catch (error) {
  //     console.error('Error fetching news:', error);
  //   }
  // };
  

  const topicsOptions = [
    { value: 'politics', label: 'Politics' },
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'finance', label: 'Finance' },
    { value: 'real-estate', label: 'Real-Estate' },
    { value: 'world-events', label: 'World Events' },
    { value: 'music', label: 'Music' },
    { value: 'hollywood', label: 'Hollywood' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Phone Number:
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Topics of Interest (select multiple):
        <Select
          isMulti
          name="topics"
          value={topicsOptions.filter((topic) =>
            formData.topics.includes(topic.value)
          )}
          options={topicsOptions}
          onChange={handleTopicChange}
        />
      </label>
      <br />

      <label>
        Notification Frequency:
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleInputChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>
      <br />

      <button type="submit"  className="preview-button" >Preview Articles</button>

      <ArticleCarousel articles={articles} selectedTopics={formData.topics} />
    </form>
  );
};

export default Form;
