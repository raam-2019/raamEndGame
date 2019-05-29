import React, { Component } from 'react';
import Widget0 from '../Widget0';
import Widget1 from '../Widget1';
import Widget2 from '../Widget2';
import Widget3 from '../Widget3';
import Widget4 from '../Widget4';
import Widget5 from '../Widget5';
import Widget6 from '../Widget6';
import Navagation from '../GlobalUtilities/Navigation';
import FanExpLanding from './FanExpLanding';

import '../../Assets/Stylesheet.css'

class Fanexperience extends Component {
  // For Dashboard access for now we will have to add /dashboardRAAMforVIPaccess to our http
  // Fanexperience will be root dir
  render () {
    return (
      <div className='main'>
        <div  >
          <Navagation />
          <br />
          <br />
          <FanExpLanding />
          <br />
          <Widget0 />
          
          <div className='App'>
         
            <Widget1 heading='Stat 1' rowspan={2} colspan={3} />
            <Widget2 heading='Stat 2' rowspan={2} colspan={1} />
            <Widget3 heading='Some graph shit' colspan={2} rowspan={2} />
            <Widget4 heading='Some more stat' />
            <Widget5 heading='ThisAndThat' />
            <Widget6 heading='RAAM' />
          </div>
        </div>
      </div>
    )
  }
}

export default Fanexperience
