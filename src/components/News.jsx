import React, { Component } from 'react';
import NewsItem from './NewsItem';
import ImgPlaceholder from '../assets/imgplaceholder.webp';
import { Link } from 'react-scroll';

export class News extends Component {
  articles = [];
  apiKey = process.env.REACT_APP_API_KEY;

  constructor(props) {
    super(props);
    let url = window.location.href.split('/')[3];
    let param = url.split('=');

    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      category: param[0] === 'category' ? param[1] : false,
      error: null,
      status: 'idle',
    };
  }

  fetchData = async () => {
    let url = this.state.category
      ? `https://newsapi.org/v2/top-headlines?country=${this.props.countryCode}&category=${this.state.category}&apiKey=${this.apiKey}&pageSize=21&page=1`
      : `https://newsapi.org/v2/top-headlines?country=${this.props.countryCode}&apiKey=${this.apiKey}&pageSize=21&page=1`;

    let data = await fetch(url);
    let code = data.status;

    if (code === 429) {
      this.setState({
        error: 'API Limit Exceeds',
      });
    } else {
      let parsedData = await data.json();

      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totalResults,
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.countryCode !== prevProps.countryCode) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  handleDropdownClick = () => {
    this.setState({ ishide: !this.state.ishide });
  };

  handlePrevClick = async () => {
    let url = this.state.category
      ? `https://newsapi.org/v2/top-headlines?country=${
          this.props.countryCode
        }&category=${this.state.category}&apiKey=${
          this.apiKey
        }&pageSize=21&page=${this.state.page - 1}`
      : `https://newsapi.org/v2/top-headlines?country=${
          this.props.countryCode
        }&apiKey=${this.apiKey}&pageSize=21&page=${this.state.page - 1}`;

    let data = await fetch(url);
    let code = data.status;

    if (code === 429) {
      this.setState({
        error: 'API Limit Exceeds',
      });
    } else {
      let parsedData = await data.json();
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
      });
    }
  };

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalArticles / 21)) {
    } else {
      let url = this.state.category
        ? `https://newsapi.org/v2/top-headlines?country=${
            this.props.countryCode
          }&category=${this.state.category}&apiKey=${
            this.apiKey
          }&pageSize=21&page=${this.state.page + 1}`
        : `https://newsapi.org/v2/top-headlines?country=${
            this.props.countryCode
          }&apiKey=${this.apiKey}&pageSize=21&page=${this.state.page + 1}`;

      let data = await fetch(url);
      let code = data.status;

      if (code === 429) {
        this.setState({
          error: 'API Limit Exceeds',
        });
      } else {
        let parsedData = await data.json();
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
        });
      }
    }
  };

  render() {
    return this.state.error === null ? (
      <div className="container mt-5 " id="myElement">
        <h2 className="pt-5">NewsMonkey - Top Headlines</h2>
        <div className="row row-gap-5 mt-5">
          {this.state.articles.map((news, idx) => (
            <div
              className="col-md-4 d-flex justify-content-center"
              key={`${news}_${idx}`}
            >
              <NewsItem
                title={news.title ? news.title.slice(0, 45) : ''}
                description={
                  news.description
                    ? news.description.slice(0, 88)
                    : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veniam dolore!'
                }
                imageUrl={news.urlToImage ? news.urlToImage : ImgPlaceholder}
                newsUrl={news.url}
              />
            </div>
          ))}
        </div>

        <div className="container my-5 d-flex justify-content-between">
          <Link
            activeClass="active"
            to="myElement"
            spy={true}
            smooth={true}
            duration={500}
          >
            <button
              disabled={this.state.page <= 1}
              onClick={this.handlePrevClick}
              type="button"
              className="btn btn-primary "
            >
              Prev
            </button>
          </Link>

          <Link
            activeClass="active"
            to="myElement"
            spy={true}
            smooth={true}
            duration={500}
          >
            <button
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalArticles / 21)
              }
              onClick={this.handleNextClick}
              type="button"
              className="btn btn-primary"
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    ) : (
      <div className="container">
        <h1
          className="d-flex justify-content-center align-items-center"
          style={{ height: '95vh' }}
        >
          API Limit Exceed
        </h1>
      </div>
    );
  }
}

export default News;
