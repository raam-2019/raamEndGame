import * as React from 'react';

import {Section} from 'components/layout/Section/Section';
import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';
import {Img} from 'components/Img/Img';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {SubHeading} from 'components/Heading/Heading';
import {ImgWithHeading} from 'components/ImgWithHeading/ImgWithHeading';

import imgDaveOnTheRoad from 'assets/images/daveOnTheRoad.png';
import imgDaveRiding from 'assets/images/daveRiding.png';
import imgDaveSmiling from 'assets/images/daveSmiling.png';
import imgDaveCrushingATurn from 'assets/images/daveCrushingATurn.png';

import styles from './DaveBiographySection.module.css';



export interface IDaveBiographySectionProps {}

export const DaveBiographySection: React.FC<IDaveBiographySectionProps> = props => (
  <Section extraClassName={styles.root}>
    <div className={styles.offsetBackground} />

    <FlexRow>
      <FlexCell>
        <ImgWithHeading
          extraClassName={styles.offsetImg}
          line1Text="Strength & Motivation"
          line2Text="Drive to Succeed"
          src={imgDaveOnTheRoad} />
      </FlexCell>

      <FlexCell
        justifyContent="flex-end"
        className={styles.sendToBottom}>
        <Paragraph
          theme="light">
          2019 is Dave’s 7th bid to win. Five times, he’s been top American finisher. His motivation? Simply, it’s the perfect race.
        </Paragraph>
      </FlexCell>
    </FlexRow>

    <FlexRow>
      <FlexCell>
        <SubHeading>From Pacific to Atlantic</SubHeading>

        <Paragraph theme="light">
          Called “the toughest test of endurance in the world” by Outside magazine, the 3,000-mile course crosses 4 mountain ranges, 3 deserts and 170,000 vertical feet of climbing.
        </Paragraph>
      </FlexCell>

      <FlexCell
        className={styles.doubleImageContainer}
        flex="583px">
        <Img src={imgDaveSmiling} />
        <Img src={imgDaveRiding} />
      </FlexCell>
    </FlexRow>

    <FlexRow>
      <FlexCell>
        <ImgWithHeading
          extraClassName={styles.crushingTurnImg}
          line1Text="Breakthrough with"
          line2Text="Innovation in Technology"
          src={imgDaveCrushingATurn} />
      </FlexCell>

      <FlexCell
        justifyContent="flex-end"
        className={styles.sendToBottom}>
        <Paragraph
          theme="light"
          useMargin={false}>
          Enabling this insanity is a technical internet of things platform to explore that “line” that separates breakthrough from catastrophe.
        </Paragraph>
      </FlexCell>
    </FlexRow>
  </Section >
);
