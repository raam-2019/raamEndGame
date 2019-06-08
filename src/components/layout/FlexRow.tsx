import React from 'react';



export interface IFlexRowProps {
  className?: string;
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'initial' | 'inherit';
}

export const FlexRow: React.FC<IFlexRowProps> = props => (
  <div
    className={props.className}
    style={{
      display: 'flex',
      alignItems: props.alignItems,
      justifyContent: props.justifyContent,
      flexWrap: 'wrap'
    }}>
    {props.children}
  </div>
);
