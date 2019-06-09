import * as React from 'react';

import {
  Img,
  IImgProps
} from 'components/Img/Img';

import styles from './ImgWithHeading.module.css';



export interface IImgWithHeadingProps extends IImgProps {
  alt?: string;
  src: string;

  line1Text?: string;
  line2Text?: string;

  extraClassName?: string;
}

export const ImgWithHeading: React.FC<IImgWithHeadingProps> = props => (
  <div className={`${styles.root} ${props.extraClassName || ''}`}>
    <Img
      alt={props.alt}
      src={props.src}
      height={props.height}
      width={props.width} />

    <div className={styles.headingContainer}>
      {props.line1Text && (<h1 className={styles.heading}>{props.line1Text}</h1>)}
      {props.line2Text && (<h1 className={styles.heading}>{props.line2Text}</h1>)}
    </div>
  </div>

);
