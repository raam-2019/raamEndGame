import * as React from 'react';
import {Section} from 'components/layout/Section/Section';
import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';
import {SubHeading} from 'components/Heading/Heading';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {Img} from 'components/Img/Img';

import imgQlikApp from 'assets/images/qlik-app@3x.png';

import styles from './AnalyzeDataSection.module.css';



export interface IAnalyzeDataSection {}

export const AnalyzeDataSection: React.FC<IAnalyzeDataSection> = props => (
  <Section extraClassName={styles.root}>
    <FlexRow>
      <FlexCell>
        <SubHeading>
          Winners are historians and analysts.
        </SubHeading>

        <Paragraph theme="dark">
          Understanding the history of RAAM is not only necessary but helps write the perfect race plan. What data can you find for yourself? Go, play, with the 36 year history of this epic adventure.
            </Paragraph>
      </FlexCell>

      <FlexCell>
        <a
          href="https://webapps.qlik.com/raam/index.html"
          rel="noopener noreferrer"
          target="_blank">
          <Img
            extraClassName={styles.qlikAppImg}
            src={imgQlikApp} />
        </a>
      </FlexCell>
    </FlexRow>
  </Section>
);
