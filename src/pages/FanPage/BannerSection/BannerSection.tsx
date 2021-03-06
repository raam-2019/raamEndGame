import * as React from 'react';

import {Img} from 'components/Img/Img';
import {Section} from 'components/layout/Section/Section';
import {Heading} from 'components/Heading/Heading';

import imgPerfectRaceHeader from 'assets/images/perfectRaceHeader.png';
import imgBannerbike from 'assets/images/bannerBike1.png';
import imgTopoBkgd from 'assets/images/topographBackground.png';

import styles from './BannerSection.module.css';
import globalStyles from 'globalStyles.module.css';
import {RedWord} from 'components/RedWord/RedWord';
import {Card} from 'components/Card/Card';



export interface IBannerSectionProps {}

export const BannerSection: React.FC<IBannerSectionProps> = props => (
  <Section
    backgroundImage={imgTopoBkgd}
    extraClassName={`${globalStyles.alignCenter} ${styles.bannerSection}`}>

    <a
      className={styles.link}
      href="https://www.facebook.com/RAAMraces/photos/a.287055445092/10162218751930093/?type=3&theater">
      <Card>
        <Heading>
          <RedWord>News</RedWord> on Dave's Withdrawal
        </Heading>
      </Card>
    </a>
    <br />

    <div>
      <Img
        extraClassName={styles.perfectRaceHeaderImg}
        src={imgPerfectRaceHeader} />

      <Img
        extraClassName={styles.bannerBikeImg}
        src={imgBannerbike} />
    </div>
  </Section>
);
