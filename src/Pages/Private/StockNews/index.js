import React from "react";
import "./style.css";

const StockNews = () => {
  const newsData = [
    {
      id: "1867315",
      imgSrc: "https://i.dawn.com/medium/2024/10/241443031c52f9d.jpg?r=144310",
      link: "https://www.dawn.com/news/1867315/all-time-high-1700-point-surge-takes-psx-past-88000-on-hopes-of-rate-cut",
      headline:
        "All-time high: 1,700-point surge takes PSX past 88,000 on hopes of rate cut",
    },
    {
      id: "1867329",
      imgSrc: "https://i.dawn.com/medium/2024/10/2412073226aae3c.jpg?r=121321",
      link: "https://www.dawn.com/news/1867329/lahore-based-coworking-startup-colabs-raises-2m-in-pre-series-a-funding-round",
      headline:
        "Lahore-based coworking startup Colabs raises $2m in pre Series A funding round",
    },
    {
      id: "1867250",
      imgSrc: "https://i.dawn.com/medium/2024/10/240900318154802.jpg?r=090057",
      link: "https://www.dawn.com/news/1867250/sbp-poised-for-fourth-straight-policy-rate-cut",
      headline: "SBP poised for fourth straight policy rate cut",
    },
    {
      id: "1867251",
      imgSrc: "https://i.dawn.com/medium/2024/10/24085942e6fd769.jpg?r=085946",
      link: "https://www.dawn.com/news/1867251/imf-sees-early-fiscal-turnaround",
      headline: "IMF sees early fiscal turnaround",
    },
    {
      id: "1867316",
      imgSrc: "https://i.dawn.com/medium/2024/10/2410140174ffa72.png?r=102310",
      link: "https://www.dawn.com/news/1867275",
      headline:
        "Aurangzeb hopes to secure additional funding from IMF’s climate resiliency fund",
    },
  ];

  return (
    <div className="stock-news-page">
      <div className="section">
        <h2 className="title">PSX Highlights of the Day</h2>
        {newsData.map((news) => (
          <article className="news-item" key={news.id}>
            <h3 className="news-headline">
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                {news.headline}
              </a>
            </h3>
            <figure className="news-image">
              <a href={news.link} target="_blank" rel="noopener noreferrer">
                <img src={news.imgSrc} alt={news.headline} />
              </a>
            </figure>
          </article>
        ))}
      </div>
    </div>
  );
};

export default StockNews;
