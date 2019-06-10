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

import globalStyles from 'globalStyles.module.css';
import styles from './WhenShouldDaveRestSection.module.css';




export interface IWhenShouldDaveRestSectionProps {
  heartRate: IPoint[];
  mo2: IPoint[];
  coreBodyTemp: IPoint[];
}

export const WhenShouldDaveRestSection: React.FC<IWhenShouldDaveRestSectionProps> = props => (
  <Section extraClassName={styles.root}>
    <FlexColumn className={globalStyles.alignCenter}>
      <Heading>
        <RedWord>When</RedWord> should Dave rest?
      </Heading>

      <Paragraph>
        It's about heartbeats but it's also about what lies out of sight, or beneath our human senses, that holds the secret to the perfect race.
      </Paragraph>
    </FlexColumn>

    <FlexRow className={styles.row}>
      <FlexCell
        alignItems="center"
        justifyContent="center">
        <NumberWidget
          extraClassName={styles.widget}
          numberPoints={props.heartRate}
          unitText="" />
      </FlexCell>

      <FlexCell className={globalStyles.alignLeft}>
        <Paragraph>
          The most commonly used indicator of exertion is heart rate. Here's Dave's. But knowing when to surrender more (or save it) is so much more...
        </Paragraph>
      </FlexCell>
    </FlexRow>

    <FlexRow className={styles.row}>
      <FlexCell className={globalStyles.alignRight}>
        <Paragraph>
          It’s an ingestible reporting back from inside Dave preventing heat stress injury. We can’t win if we can’t finish. And we finish what we start.
        </Paragraph>
      </FlexCell>

      <FlexCell>
        <NumberWidget
          extraClassName={styles.widget}
          numberPoints={props.coreBodyTemp}
          unitText={'\xB0F'} />
      </FlexCell>
    </FlexRow>

    <FlexRow className={styles.row}>
      <FlexCell>
        <NumberWidget
          extraClassName={styles.widget}
          numberPoints={props.mo2}
          unitText="" />
      </FlexCell>

      <FlexCell className={globalStyles.alignLeft}>
        <Paragraph>
          It’s near-infrared spectroscopy to measure the oxygen saturation in muscles. This is actionable info to keep Dave at his limits. Moment by moment.
        </Paragraph>
      </FlexCell>
    </FlexRow>

    <FlexRow className={styles.row}>
      <FlexCell className={styles.alignRight}>
        <Paragraph>
          It’s a forward view to conditions precisely where Dave will be in the future. This is actionable info for when to push and when to rest. Can we call a couple hours “rest?”
        </Paragraph>
      </FlexCell>

      <FlexCell>
        {/* TODO Net effective wind e.g. "-4 mph" */}
        <NumberWidget
          extraClassName={styles.widget}
          numberPoints={[]}
          unitText="N/A" />
      </FlexCell>
    </FlexRow>
  </Section>
);
