import * as React from 'react';

import {Section} from 'components/layout/Section/Section';
import {FlexColumn} from 'components/layout/FlexColumn';
import {Heading} from 'components/Heading/Heading';
import {RedWord} from 'components/RedWord/RedWord';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';
import {LiveGraphWrapper} from 'components/LiveGraphWrapper/LiveGraphWrapper';
import {NumberWidget} from 'components/widgets/NumberWidget';

import globalStyles from 'globalStyles.module.css';
import styles from './WhenShouldDaveRestSection.module.css';

import {IPoint} from 'types/IPoint';

export interface IWhenShouldDaveRestSectionProps {
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
        This is how all of the data we analyze ties together. It’s more than just heartbeats and speed. It’s what lies out of sight, or beneath our human senses that holds the secret.
      </Paragraph>
    </FlexColumn>

    <FlexRow className={styles.row}>
      <FlexCell>
      <NumberWidget NumberPoints={props.coreBodyTemp}/>
      </FlexCell>

      <FlexCell className={globalStyles.alignLeft}>
        <Paragraph>
          It’s an ingestible reporting back from inside Dave preventing heat stress injury. We can’t win if we can’t finish. And we finish what we start.
        </Paragraph>
      </FlexCell>
    </FlexRow>

    <FlexRow className={styles.row}>
      <FlexCell className={globalStyles.alignRight}>
        <Paragraph>
          It’s near-infrared spectroscopy to measure the oxygen saturation in muscles. This is actionable info to keep Dave at his limits. Moment by moment.
        </Paragraph>
      </FlexCell>

      <FlexCell>
        <NumberWidget NumberPoints={props.mo2}/>
      </FlexCell>
    </FlexRow>

    <FlexRow className={styles.row}>
      <FlexCell>
        <LiveGraphWrapper title="Graph of Data 3" />
      </FlexCell>

      <FlexCell className={globalStyles.alignLeft}>
        <Paragraph>
          It’s a forward view to conditions precisely where Dave will be in the future. This is actionable info for when to push and when to rest. Can we call a couple hours “rest?”
        </Paragraph>
      </FlexCell>
    </FlexRow>

    <FlexRow className={styles.row}>
      <FlexCell className={styles.alignRight}>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lorem arcu, cursus id arcu tincidunt, pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lorem
          </Paragraph>
      </FlexCell>

      <FlexCell>
        <LiveGraphWrapper title="Graph of Data 4" />
      </FlexCell>
    </FlexRow>
  </Section>
);
