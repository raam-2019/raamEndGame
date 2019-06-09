import * as React from 'react';



export interface IFlexCellProps {
  className?: string;
  flex?: string;

  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'initial' | 'inherit';
}

export const FlexCell: React.FC<IFlexCellProps> = props => (
  <div
    className={props.className}
    style={{
      display: 'flex',
      flexDirection: 'column',
      flex: props.flex || '1 1',
      // border: '1px solid red',
      alignItems: props.alignItems,
      justifyContent: props.justifyContent
    }}>
    {props.children}
  </div>
);
