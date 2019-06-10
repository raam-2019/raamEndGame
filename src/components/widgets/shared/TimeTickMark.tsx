import * as React from 'react';

import {duration2MinutesAndSeconds} from 'util/formatUtil';
import moment from 'moment';



export interface ITimeTickMarkProps {
  unixTime: number;
}

export const TimeTickMark = (props: ITimeTickMarkProps) => (
  <tspan style={{fontSize: '10px'}}>{duration2MinutesAndSeconds(moment().diff(moment.unix(props.unixTime)))}</tspan>
);
