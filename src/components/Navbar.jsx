import React, { Component } from 'react';
import codeData from '../assets/codes.json';

export class Navbar extends Component {
  static propTypes = {};

  constructor() {
    super();
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
      currentCode: 'in',
      categoryData: categoryArr,
    };
  }

  handleToggle = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    console.log(this.state.countryData);
    return (
      <nav className="navbar navbar-expand-lg position-fixed z-1 top-0 start-0 end-0 bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
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

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <div
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {this.state.categoryData.map((item) => (
                    <a
                      class="dropdown-item"
                      href={`/category=${item.toLowerCase()}`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Countries
                </a>
                <div
                  class="dropdown-menu overflow-y-auto"
                  aria-labelledby="navbarDropdownMenuLink"
                  style={{ height: '20rem' }}
                >
                  {this.state.countryData.map((item) => (
                    <a class="dropdown-item" href={`/country=${item.code}`}>
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
