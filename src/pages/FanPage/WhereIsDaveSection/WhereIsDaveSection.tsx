import * as React from 'react';

import {Section} from 'components/layout/Section/Section';
import {FlexColumn} from 'components/layout/FlexColumn';
import {Heading} from 'components/Heading/Heading';
import {RedWord} from 'components/RedWord/RedWord';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {FlexCell} from 'components/layout/FlexCell';
import {RaceTrackerMap} from 'components/widgets/RaceTrackerMap/RaceTrackerMap';

import imgTopoBkgd from 'assets/images/topographBackground.png';

import globalStyles from 'globalStyles.module.css';
import styles from './WhereIsDaveSection.module.css';



export interface IWhereIsDaveSectionProps {
  davesLat: number;
  davesLon: number;
}

export const WhereIsDaveSection: React.FC<IWhereIsDaveSectionProps> = props => (
  <Section
    backgroundImage={imgTopoBkgd}
    extraClassName={styles.root}>
    <FlexColumn className={globalStyles.alignCenter}>
      <Heading>
        <RedWord>Where</RedWord> is Dave along his journey?
          </Heading>

      <Paragraph>
        A fixed route from sea-to-sea, 50% longer than the Tour de France. 4 mountain ranges, 3 deserts, and just 7 stops for sleep (2 hours at a time).
          </Paragraph>

      <FlexCell >
        <RaceTrackerMap
          davesLat={props.davesLat}
          davesLon={props.davesLon} />
      </FlexCell>
    </FlexColumn>
  </Section>

);
