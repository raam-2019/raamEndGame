import * as React from 'react';

import * as formatUtil from 'util/formatUtil';

import styles from './Img.module.css';



export interface IImgProps {
  extraClassName?: string;
  src: string;
  width?: string;
  height?: string;
  alt?: string;
  renderUsingBkgd?: boolean;
}

export const Img: React.SFC<IImgProps> = props => props.renderUsingBkgd ? (
  <div
    className={styles.backgroundImage}
    style={{
      width: props.width || props.height,
      height: props.height || props.width,
      backgroundImage: formatUtil.generateCssUrlString(props.src)
    }} />
) : (
    <img
      alt={props.alt}
      className={props.extraClassName || ''}
      src={props.src}
      style={{
        width: props.width,
        height: props.height
      }} />
  );
