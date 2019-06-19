import * as _ from 'lodash';
import * as React from 'react';

import {Section} from 'components/layout/Section/Section';
import {FlexColumn} from 'components/layout/FlexColumn';
import {Heading} from 'components/Heading/Heading';
import {RedWord} from 'components/RedWord/RedWord';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';
import {NumberWidget} from 'components/NumberWidget/NumberWidget';
import {IPoint} from 'types/IPoint';
import {OffsetBackground} from 'components/OffsetBackground/OffsetBackground';

import styles from './PerfectRaceSection.module.css';
import globalStyles from 'globalStyles.module.css';



export interface IPerfectRaceSectionProps {
  heartRate: IPoint[];
  coreBodyTemp: IPoint[];
  mo2: IPoint[];
  speed: IPoint[];
}

export const PerfectRaceSection: React.FC<IPerfectRaceSectionProps> = props => {
  const speedAsMph = _.map(props.speed, point => ({
    x: point.x,
    y: point.y * 2.237 // m/s -> mph
  } as IPoint));

  return (
    <React.Fragment>
      <Section>
        <FlexColumn className={globalStyles.alignCenter}>
          <Heading>
            <RedWord>What</RedWord> does the perfect race look like?
        </Heading>

          <Paragraph>
            <strong>It’s more than just heartbeats and speed. </strong>Oh sure, those are inputs and outputs…
        </Paragraph>
        </FlexColumn>
      </Section>

      <Section>
        {OffsetBackground({backgroundColor: 'black', offsetPx: 75})}

        <FlexRow
          className={styles.row}
          justifyContent="space-between">
          <FlexCell alignItems="center">
            <NumberWidget
              numDecimalDigits={0}
              numberPoints={props.heartRate}
              unitText="bpm" />
          </FlexCell>

          <FlexCell alignItems="center">
            <NumberWidget
              numDecimalDigits={0}
              numberPoints={speedAsMph}
              unitText="mph" />
          </FlexCell>
        </FlexRow>

        <Paragraph
          extraClassName={styles.text}
          theme="light">
          More importantly it’s what lies out of sight, or beneath our human senses that holds the secret.
      </Paragraph>

        <FlexRow
          className={styles.row}
          justifyContent="space-between">
          <FlexCell alignItems="center">
            <NumberWidget
              numDecimalDigits={1}
              numberPoints={props.coreBodyTemp}
              unitText={'\xB0F'} />
          </FlexCell>

          <FlexCell justifyContent="center">
            <Paragraph
              extraClassName={styles.text}
              theme="light">
              <strong>It’s an ingestible reporting back from inside Dave preventing heat stress injury.</strong> We can’t win if we can’t finish. And we finish what we start.
          </Paragraph>
          </FlexCell>
        </FlexRow>

        <FlexRow
          className={styles.row}
          justifyContent="space-between">
          <FlexCell justifyContent="center">
            <Paragraph
              extraClassName={styles.text}
              theme="light">
              <strong>It’s near-infrared spectroscopy to measure the oxygen saturation in muscles.</strong> This is actionable info to keep Dave at his limits. Moment by moment.
          </Paragraph>
          </FlexCell>

          <FlexCell alignItems="center">
            <NumberWidget
              numDecimalDigits={2}
              numberPoints={props.mo2}
              unitText="%" />
          </FlexCell>
        </FlexRow>

        <FlexRow
          className={styles.row}
          justifyContent="space-between">
          <FlexCell alignItems="center">
            {/* TODO Net effective wind e.g. "-4 mph" */}
            <NumberWidget
              numDecimalDigits={1}
              numberPoints={[{x: 0, y: 5}]}
              unitText="mph" />
          </FlexCell>

          <FlexCell justifyContent="center">
            <Paragraph
              extraClassName={styles.text}
              theme="light">
              <strong>It’s a forward view to conditions precisely where Dave will be in the future.</strong> This is actionable info for when to push and when to rest. Can we call a couple hours “rest?”
          </Paragraph>
          </FlexCell>
        </FlexRow>
      </Section>
    </React.Fragment>
  );
};
