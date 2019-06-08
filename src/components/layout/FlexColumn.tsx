import * as React from 'react';



export interface IFlexColumnProps {
  className?: string;
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'initial' | 'inherit';
}

export const FlexColumn: React.FC<IFlexColumnProps> = props => (
  <div
    className={props.className}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: props.alignItems,
      justifyContent: props.justifyContent
    }}>
    {props.children}
  </div>
);
