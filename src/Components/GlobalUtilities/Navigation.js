import React, { Component } from 'react'
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import '../../Assets/Stylesheet.css'

import $ from 'jquery';

class Navagation extends Component {
  componentDidMount () {
    // Jquery here $(...)...

    $(document).ready(function () {
      'use strict'

      var c

      var currentScrollTop = 0

      var navbar = $('nav')

      $(window).scroll(function () {
        var a = $(window).scrollTop()
        var b = navbar.height()

        currentScrollTop = a

        if (c < currentScrollTop && a > b + b) {
          navbar.addClass('scrollUp')
        } else if (c > currentScrollTop && !(a <= b)) {
          navbar.removeClass('scrollUp')
        }
        c = currentScrollTop
      })
    })
  }

  render () {
    return (
      <nav>
        <div class='container'>
          <a href='/' id='brand'>
            RAAM
          </a>
          <a href='/' id='brandWhite'>
             _
          </a>
          <a href='/' id='brandRed'>
             2019
          </a>
          <button>
            <span />
            <span />
            <span />
          </button>

          <ul class='navbar-menu'>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/social'>Social Media</a>
            </li>
            <li>
              <a href='https://www.davehaase.com/shop'>Sponsor now!</a>
            </li>
            <li>
              <a href='/dashboardRAAMforVIPaccess'>TEST team page</a>
            </li>
            <li>
              <a href='/'>page d</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navagation
