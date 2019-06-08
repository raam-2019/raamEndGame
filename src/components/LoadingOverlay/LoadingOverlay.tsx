import * as React from 'react';

import styles from './LoadingOverlay.module.css';
import {LoadingIndicator} from 'components/LoadingOverlay/LoadingIndicator/LoadingIndicator';
import {FlexColumn} from 'components/layout/FlexColumn';



export interface ILoadingOverlayProps {}

export const LoadingOverlay: React.FC<ILoadingOverlayProps> = props => (
  <FlexColumn className={styles.root}>
    <LoadingIndicator />

    <div>Loading</div>
  </FlexColumn>
);
