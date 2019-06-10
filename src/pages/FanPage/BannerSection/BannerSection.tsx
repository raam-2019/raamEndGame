import * as React from 'react';

import {Img} from 'components/Img/Img';
import {Section} from 'components/layout/Section/Section';

import imgPerfectRaceHeader from 'assets/images/perfectRaceHeader.png';
import imgBannerbike from 'assets/images/bannerBike1.png';
import imgTopoBkgd from 'assets/images/topographBackground.png';

import styles from './BannerSection.module.css';
import globalStyles from 'globalStyles.module.css';



export interface IBannerSectionProps {}

export const BannerSection: React.FC<IBannerSectionProps> = props => (
  <Section
    backgroundImage={imgTopoBkgd}
    extraClassName={`${globalStyles.alignCenter} ${styles.bannerSection}`}>
    <Img
      extraClassName={styles.perfectRaceHeaderImg}
      src={imgPerfectRaceHeader} />

    <Img
      extraClassName={styles.bannerBikeImg}
      src={imgBannerbike} />
  </Section>
);
