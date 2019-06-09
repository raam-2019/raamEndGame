import * as React from 'react';

import {Section} from 'components/layout/Section/Section';
import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';
import {Img} from 'components/Img/Img';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {SubHeading} from 'components/Heading/Heading';

import imgDaveOnTheRoad from 'assets/images/daveOnTheRoad.png';
import imgDaveRiding from 'assets/images/daveRiding.png';
import imgDaveSmiling from 'assets/images/daveSmiling.png';
import imgDaveCrushingATurn from 'assets/images/daveCrushingATurn.png';

import styles from './DaveBiographySection.module.css';
import {ImgWithHeading} from 'components/ImgWithHeading/ImgWithHeading';



export interface IDaveBiographySectionProps {}

export const DaveBiographySection: React.FC<IDaveBiographySectionProps> = props => (
  <Section
    backgroundColor="black"
    extraClassName={styles.root}>
    <FlexRow>
      <FlexCell>
        <ImgWithHeading
          extraClassName={styles.offsetImg}
          line1Text="Strength & Motivation"
          line2Text="Drive to Succeed"
          src={imgDaveOnTheRoad}
          height="485px" />
      </FlexCell>

      <FlexCell>
        <Paragraph theme="light">
          2019 is Dave’s 7th bid to win. Five times, he’s been top American finisher. His motivation? Simply, it’s the perfect race.
        </Paragraph>
      </FlexCell>

    </FlexRow>

    <FlexRow className={styles.secondRowShift}>
      <FlexCell>
        <SubHeading>From Pacific to Atlantic</SubHeading>

        <Paragraph theme="light">
          Called “the toughest test of endurance in the world” by Outside magazine, the 3,000-mile course crosses 4 mountain ranges, 3 deserts and 170,000 vertical feet of climbing.
        </Paragraph>
      </FlexCell>

      <FlexCell className={styles.doubleImageContainer}>
        <Img
          height="457px"
          src={imgDaveRiding} />
        <Img
          height="466px"
          src={imgDaveSmiling} />
      </FlexCell>
    </FlexRow>

    <FlexRow
      className={styles.rowOffset}>
      <FlexCell>
        <ImgWithHeading
          line1Text="Breakthrough with"
          line2Text="Innovation in Technology"
          height="400px"
          src={imgDaveCrushingATurn} />
      </FlexCell>

      <FlexCell className={styles.sendToBottom}>
        <Paragraph theme="light">
          Enabling this insanity is a technical internet of things platform to explore that “line” that separates breakthrough from catastrophe.
        </Paragraph>
      </FlexCell>
    </FlexRow>
  </Section>
);
