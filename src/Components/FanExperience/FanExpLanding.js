import React from 'react'
import { Image } from 'react-bootstrap'

import DaBike from '../../Assets/Image/DaveBike.jpg'
import DaDaveOne from '../../Assets/Image/4.jpg'

import '../../Assets/Stylesheet.css'

class FanExpLanding extends React.Component {
  render () {
    return (
      <div className='LandingMain'>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div class='row'>
          <div class='col'>
            <div className='TLA container'>
              <Image src={DaBike} fluid />
            </div>
          </div>
          <div class='col'>
            <div className='TRA container'>
              <div>
                <a href='/' className='brand'>
                  Dave
                </a>
                <a href='/' className='brandWhite'>
                  .
                </a>
                <a href='/' className='brand'>
                  Haase
                </a>
              </div>
              <br />
              <a href='/' className='brandRed'>
                #
              </a>
              <a href='/' className='brand'>
                ThePerfectRace
              </a>
            </div>
          </div>
        </div>

        <div className='BM container center'>
          <br />
          <br />
          <a href='/' className='brandRed'>
            Who
          </a>
          <a href='/' className='brandWhite'>
            .
          </a>
          <a href='/' className='brand'>
            is Dave Haase?
          </a>

          <br />
          <br />

          <p>
            {' '}
            Dave is a RAAM veteran and winning is his Quest. And he's a man on
            the ascent. Dave's history with RAAM spans 2004, '05, '06, '08 and
            then, after a seven-year hiatus finishes secone-place in both 2015
            and 2016.{' '}
          </p>
        </div>

        <div className='BLT'>
          <div class='row'>
            <div class='col'>
              <div className='container'>
                <Image src={DaDaveOne} fluid />
              </div>
            </div>

            <div class='col'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <a href='/' className='brandWhite'>
            Working...
          </a>
            </div>
          </div>
        </div>
        <div className="BLL">
        Something
        </div>



      </div>
    )
  }
}

export default FanExpLanding
