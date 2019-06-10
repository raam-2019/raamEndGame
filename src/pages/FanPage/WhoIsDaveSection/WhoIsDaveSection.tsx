import * as React from 'react';

import {Section} from 'components/layout/Section/Section';
import {FlexColumn} from 'components/layout/FlexColumn';
import {Heading} from 'components/Heading/Heading';
import {RedWord} from 'components/RedWord/RedWord';
import {Paragraph} from 'components/Paragraph/Paragraph';

import globalStyles from 'globalStyles.module.css';
import styles from './WhoIsDaveSection.module.css';



export interface IWhoIsDaveSectionProps {}

export const WhoIsDaveSection: React.FC<IWhoIsDaveSectionProps> = props => (
  <Section extraClassName={styles.root}>
    <FlexColumn
      className={globalStyles.alignCenter}
      alignItems="center">
      <Heading>
        <RedWord>Who</RedWord> is Dave Haase?
          </Heading>

      <Paragraph>
        Dave is a RAAM veteran and winning is his quest. And he’s a man on the ascent. Dave’s history with RAAM spans 2004, ’05, ’06, ’08 and then, after a seven-year hiatus second-place finishes in both 2015 and 2016.
          </Paragraph>
    </FlexColumn>
  </Section>

);
