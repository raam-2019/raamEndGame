import * as React from 'react';

import styles from './SocialMediaFeed.module.css';



export interface ISocialMediaFeedProps {}

export const SocialMediaFeed: React.FC<ISocialMediaFeedProps> = props => (
  <iframe
    className={styles.root}
    src="https://www.juicer.io/api/feeds/jonas-klare/iframe?per=1"
    title="Social Media" />
);
