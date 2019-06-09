import * as React from 'react';



export interface IRedWordProps {}

export const RedWord: React.FC<IRedWordProps> = props => (
  <span style={{color: '#da0001'}}>{props.children}</span>
);
