import React from 'react';
import { Image } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import DaBike from '../../Assets/Image/DaveBike.jpg';
import DaDaveOne from '../../Assets/Image/4.jpg';
import DaDaveTwo from '../../Assets/Image/1.jpg';
import DaDaveThree from '../../Assets/Image/3.jpg';
import DaDaveFour from '../../Assets/Image/2.jpg';

import '../../Assets/Stylesheet.css'

class FanExpLanding extends React.Component {
  render () {
    return (
      <div className='LandingMain'>
      <br />
        <Row>
          <Col>
            <div className='TLA container'>
              <Image src={DaBike} fluid />
            </div>
          </Col>
          <Col>
          <br />
          <br />
          <br />
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
          </Col>
        </Row>

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
            then, after a seven-year hiatus finishes second-place in both 2015
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
              <div className='mm'> Strength {'&'} Motivation </div>
              <br />
              <div className='nn'> Drive to Succeed</div>
              <br />

              <div className='container'>
                <br />

                <p className='textWhite'>
                  {' '}
                  2019 is Dave's 7th bid to win Five times, he's been top
                  American finisher. His motivation? Simply, it's the perfect
                  race.{' '}
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className='BLL'>
          <Container className='SL '>
            <Row>
              <Col>
                <br />
                <h1 className='brandWhite'>From Pacific </h1>
                <h1 className='brandWhite'> To Atlantic</h1>
                <p className='textWhite1'>
                  {' '}
                  Called 'the toughest test of endurance in the world' by
                  Outside magazine. The 3,000 miles course crosses 4 mountain
                  range, 3 deserts and 170,000 vertical feet of climbing.{' '}
                </p>
              </Col>
              <Col>
                <div className='container'>
                  <Image src={DaDaveTwo} fluid />
                </div>
              </Col>
              <Col>
                <div className='container'>
                  <br />
                  <br />
                  <br />
                  <Image src={DaDaveThree} fluid />
                </div>
              </Col>
            </Row>
          </Container>
          <div>
            <Row>
              <Col>
                <div className='container'>
                  <Image src={DaDaveFour} fluid />
                </div>
              </Col>
              <Col xs={7}>
                <br />
                <div className='LLL container'>
                  <div className='mm'> Breakthrough </div>
                  <br />
                  <div className='nn'> Technology </div>
                  <br />
                  <p className='textWhite1'>
                    {' '}
                    Enabling this insanity is a technical internet of things
                    platform to explore that 'line' that seperates breakthrough
                    from catastrophe.{' '}
                  </p>
                </div>
              </Col>
            </Row>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default FanExpLanding
