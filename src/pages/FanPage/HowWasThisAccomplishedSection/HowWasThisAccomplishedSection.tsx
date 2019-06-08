import * as React from 'react';
import {Section} from 'components/layout/Section/Section';
import {FlexColumn} from 'components/layout/FlexColumn';
import {Heading} from 'components/Heading/Heading';
import {RedWord} from 'components/RedWord/RedWord';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {Line} from 'components/Line/Line';

import styles from './HowWasThisAccomplishedSection.module.css';
import globalStyles from 'globalStyles.module.css';
import {SocialMediaFeed} from 'components/SocialMediaFeed/SocialMediaFeed';



export interface IHowWasThisAccomplishedSectionProps {}

export const HowWasThisAccomplishedSection: React.FC<IHowWasThisAccomplishedSectionProps> = props => (
  <Section
    extraClassName={styles.root}
    backgroundColor="black">
    <FlexColumn className={globalStyles.alignCenter}>
      <Heading extraClassName={globalStyles.whiteText}>
        <RedWord>How</RedWord> was all this accomplished?
          </Heading>

      <Paragraph theme="light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lorem arcu, cursus id arcu tincidunt, pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lorem arcu, cursus id arcu.
      </Paragraph>

      <Heading extraClassName={globalStyles.whiteText}>
        Sponsors
        <Line />
      </Heading>

      <Heading extraClassName={globalStyles.whiteText}>
        Dave Haase
        <Line />
      </Heading>

      <SocialMediaFeed />

      <Heading extraClassName={globalStyles.whiteText}>
        The Team
        <Line />
      </Heading>

    </FlexColumn>
  </Section>
);
