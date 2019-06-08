import * as React from 'react';

import {ResponsiveContainer} from 'components/layout/ResponsiveContainer/ResponsiveContainer';

import styles from './Section.module.css';



export interface ISectionProps {
  extraClassName?: string;
  backgroundColor?: string;
  backgroundImage?: string;
}

export const Section: React.SFC<ISectionProps> = props => (
  <section
    className={`${styles.root} ${props.extraClassName || ''}`}
    style={{
      backgroundColor: props.backgroundColor,
      backgroundImage: props.backgroundImage ? `url('${props.backgroundImage}')` : ''
    }}>
    <ResponsiveContainer>
      {props.children}
    </ResponsiveContainer>
  </section>
);
