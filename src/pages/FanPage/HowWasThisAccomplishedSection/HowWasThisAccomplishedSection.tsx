import * as _ from 'lodash';
import * as React from 'react';

import {Section} from 'components/layout/Section/Section';
import {FlexColumn} from 'components/layout/FlexColumn';
import {Heading} from 'components/Heading/Heading';
import {RedWord} from 'components/RedWord/RedWord';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {Line} from 'components/Line/Line';
import {SocialMediaFeed} from 'components/SocialMediaFeed/SocialMediaFeed';
import {SponsorCarousel} from 'pages/FanPage/HowWasThisAccomplishedSection/SponsorCarousel/SponsorCarousel';

import styles from './HowWasThisAccomplishedSection.module.css';
import globalStyles from 'globalStyles.module.css';
import {Img} from 'components/Img/Img';
import {FlexCell} from 'components/layout/FlexCell';
import {FlexRow} from 'components/layout/FlexRow';


export interface IHowWasThisAccomplishedSectionProps {}

export const HowWasThisAccomplishedSection: React.FC<IHowWasThisAccomplishedSectionProps> = props => {
  const elTeamMembers = _.map(__teamMembers, teamMember => (
    <div key={teamMember.linkedInUrl}>
      <FlexCell className={styles.teamMember}>
        <Img
          renderUsingBkgd={true}
          height="80px"
          width="80px"
          src={teamMember.linkedInUrl} />
        <div >
          {teamMember.name}
        </div>

        <div className={styles.name}>
          {teamMember.titleText}
        </div>
      </FlexCell>
    </div>
  ));

  return (
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

        <SponsorCarousel />

        <Heading extraClassName={globalStyles.whiteText}>
          Dave Haase
        <Line />
        </Heading>

        <SocialMediaFeed />

        <Heading extraClassName={globalStyles.whiteText}>
          The Team
        <Line />
        </Heading>

        <FlexRow>
          {elTeamMembers}
        </FlexRow>
      </FlexColumn>
    </Section>
  );
};



interface ITeamMember {
  name: string;
  profilePictureUrl: string;
  titleText: string;
  linkedInUrl: string;
}

const __teamMembers: ITeamMember[] = [
  {
    name: 'Doug Barton',
    profilePictureUrl: '',
    titleText: "President and CEO at UBIX.AI",
    linkedInUrl: 'https://www.linkedin.com/in/bartondoug/'
  },
  {
    name: 'Christopher Patterson',
    profilePictureUrl: '',
    titleText: "COO at Iron Forge Development",
    linkedInUrl: 'https://www.linkedin.com/in/christopher-patterson/'
  },
  {
    name: "Andrew Daniel",
    profilePictureUrl: '',
    titleText: "VP of Web at Iron Forge Development",
    linkedInUrl: 'https://www.linkedin.com/in/adaniel2/'
  },
  {
    name: "Douglas Robertson",
    profilePictureUrl: '',
    titleText: "Aeronautical Data Analyst",
    linkedInUrl: 'https://www.linkedin.com/in/dbrobert/'
  },
  {
    name: "Steven Wangen",
    profilePictureUrl: '',
    titleText: "Assistant Scientist at the Wisconsin Institute for Discovery",
    linkedInUrl: 'https://www.linkedin.com/in/steven-wangen/'
  },
  {
    name: "Jonas Klare",
    profilePictureUrl: '',
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/jonasklare/'
  },
  {
    name: "Matt Wildman",
    profilePictureUrl: '',
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/matt-wildman/'
  },
  {
    name: "Rayhan Islam",
    profilePictureUrl: '',
    titleText: "CS Master’s Candidate at Drexel University",
    linkedInUrl: 'https://www.linkedin.com/in/rayhan-islam-6690b5143/'
  },
  {
    name: "Andrew Geng",
    profilePictureUrl: '',
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/andrew-geng/'
  },
  {
    name: "Nafis Faisal Khan Arrafi",
    profilePictureUrl: '',
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/nafis-faisal-khan-arrafi-876abb125/'
  },
  {
    name: "Matthew Cargille",
    profilePictureUrl: '',
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/mcargille/'
  },
  {
    name: "William Mustari",
    profilePictureUrl: '',
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/william-m-36335180/'
  },
  {
    name: "Patricia Hernandez, PhD",
    profilePictureUrl: '',
    titleText: "Assistant Professor at Marian University of Fond du Lac",
    linkedInUrl: 'https://www.linkedin.com/in/patricia-hernandez-phd-b421128/'
  },
  {
    name: "Sabrina Wulf",
    profilePictureUrl: '',
    titleText: "Bachelor of Science - Public Relations at Illinois State University",
    linkedInUrl: 'https://www.linkedin.com/in/sabrinawulf/ '
  }
];