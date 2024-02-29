// server.js
const express = require('express');
const axios = require('axios');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/news', async (req, res) => {
  const apiKey = '20252e8897cc40cb8045741bc9ecfd92'; // Replace with your News API key
  const { topics, frequency } = req.query;

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

    res.json(newsResults);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
