import * as React from 'react';



export interface ITickMarkProps {
  value: string | number;
}

export const TickMark = (props: ITickMarkProps) => (
  <tspan style={{fontSize: '10px'}}>{props.value}</tspan>
);
