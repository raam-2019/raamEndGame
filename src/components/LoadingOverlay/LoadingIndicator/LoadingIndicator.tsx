import * as React from 'react';

import './LoadingIndicator.css';



export interface ILoadingIndicatorProps {}

export const LoadingIndicator: React.FC<ILoadingIndicatorProps> = props => (
  <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
);
