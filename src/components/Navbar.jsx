import React, { Component } from 'react';
import codeData from '../assets/codes.json';

export class Navbar extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    let categoryArr = [
      'Business',
      'Entertainment',
      'General',
      'Health',
      'Science',
      'Sports',
      'Technology',
    ];
    this.state = {
      showMenu: false,
      countryData: codeData,
      
      categoryData: categoryArr,
    };
  }

  handleToggle = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    const { currentCode } = this.props;

    return (
      <nav className="navbar navbar-expand-lg position-fixed z-1 top-0 start-0 end-0 bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            News Monkey
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse mx-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2  gap-3 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Categories
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {this.state.categoryData.map((item, idx) => (
                    <a
                      className="dropdown-item"
                      href={`/category=${item.toLowerCase()}`}
                      key={`${item}_${idx}`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Countries
                </button>
                <div
                  className="dropdown-menu overflow-y-auto"
                  aria-labelledby="navbarDropdownMenuLink"
                  style={{ height: '20rem' }}
                >
                  {this.state.countryData.map((item, idx) => (
                    <a
                      className="dropdown-item"
                      style={{ cursor: 'pointer' }}
                      key={`${item}_${idx}`}
                      onClick={() => {
                        currentCode(item.code);
                      }}
                    >
                      {item.country}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
