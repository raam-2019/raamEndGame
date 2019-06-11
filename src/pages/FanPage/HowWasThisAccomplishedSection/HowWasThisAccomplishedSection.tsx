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
import {Img} from 'components/Img/Img';
import {FlexCell} from 'components/layout/FlexCell';
import {FlexRow} from 'components/layout/FlexRow';

import imgAndrewDaniel from 'assets/images/teamMembers/andrewDaniel.jpeg';
import imgAndrewGeng from 'assets/images/teamMembers/andrewGeng.jpeg';
import imgDougBarton from 'assets/images/teamMembers/dougBarton.jpeg';
import imgDouglasRobertson from 'assets/images/teamMembers/douglasRobertson.jpeg';
import imgJonasKlare from 'assets/images/teamMembers/jonasKlare.jpeg';
import imgMatthewCargille from 'assets/images/teamMembers/matthewCargille.jpeg';
import imgMattWildman from 'assets/images/teamMembers/mattWildman.jpeg';
import imgNafisFaisalKhanArrafi from 'assets/images/teamMembers/nafisFaisalKhanArrafi.jpeg';
import imgPatriciaHernandezPhD from 'assets/images/teamMembers/patriciaHernandezPhD.jpeg';
import imgRayhanIslam from 'assets/images/teamMembers/rayhanIslam.jpeg';
import imgSabrinaWulf from 'assets/images/teamMembers/sabrinaWulf.jpeg';
import imgStevenWangen from 'assets/images/teamMembers/stevenWangen.jpeg';
import imgWilliamMustari from 'assets/images/teamMembers/williamMustari.jpeg';
import imgSumnerWebster from 'assets/images/teamMembers/sumnerWebster.jpeg';
import imgTeam from 'assets/images/Team288.jpg';

import styles from './HowWasThisAccomplishedSection.module.css';
import globalStyles from 'globalStyles.module.css';



export interface IHowWasThisAccomplishedSectionProps {}

export const HowWasThisAccomplishedSection: React.FC<IHowWasThisAccomplishedSectionProps> = props => {
  const elTeamMembers = _.map(__teamMembers, teamMember => (
    <FlexCell
      alignItems="center"
      justifyContent="space-between"
      key={teamMember.linkedInUrl}
      className={styles.teamMember}>
      <Img
        extraClassName={styles.profilePicture}
        height="100px"
        width="100px"
        src={teamMember.profilePictureUrl} />

      <div>
        <div className={styles.name}>
          {teamMember.name}
        </div>

        <div className={styles.titleText}>
          {teamMember.titleText}
        </div>
      </div>

      <a
        className={styles.link}
        href={teamMember.linkedInUrl}>LinkedIn</a>
    </FlexCell>
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
          This epic adventure is underwritten by volunteers and sponsors with something to prove. We use sports, fitness, medical, IoT, and AI as the centerpiece of a tech-enabled platform that powers breakthrough performances.
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

        <Heading extraClassName={globalStyles.whiteText}>
          The Race Crew
          <Line />
        </Heading>

        <FlexRow>
          <Img
            extraClassName={styles.teamImg}
            src={imgTeam} />
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
    profilePictureUrl: imgDougBarton,
    titleText: "President and CEO at UBIX.AI",
    linkedInUrl: 'https://www.linkedin.com/in/bartondoug/'
  },
  {
    name: 'Sumner Webster',
    profilePictureUrl: imgSumnerWebster,
    titleText: "CEO of Iron Forge Development",
    linkedInUrl: 'https://www.linkedin.com/in/sumnerwebster/'
  },
  {
    name: "Andrew Daniel",
    profilePictureUrl: imgAndrewDaniel,
    titleText: "VP of Web at Iron Forge Development",
    linkedInUrl: 'https://www.linkedin.com/in/adaniel2/'
  },
  {
    name: "Douglas Robertson",
    profilePictureUrl: imgDouglasRobertson,
    titleText: "Aeronautical Data Analyst",
    linkedInUrl: 'https://www.linkedin.com/in/dbrobert/'
  },
  {
    name: "Steven Wangen",
    profilePictureUrl: imgStevenWangen,
    titleText: "Assistant Scientist at the Wisconsin Institute for Discovery",
    linkedInUrl: 'https://www.linkedin.com/in/steven-wangen/'
  },
  {
    name: "Jonas Klare",
    profilePictureUrl: imgJonasKlare,
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/jonasklare/'
  },
  {
    name: "Matt Wildman",
    profilePictureUrl: imgMattWildman,
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/matt-wildman/'
  },
  {
    name: "Rayhan Islam",
    profilePictureUrl: imgRayhanIslam,
    titleText: "CS Master’s Candidate at Drexel University",
    linkedInUrl: 'https://www.linkedin.com/in/rayhan-islam-6690b5143/'
  },
  {
    name: "Andrew Geng",
    profilePictureUrl: imgAndrewGeng,
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/andrew-geng/'
  },
  {
    name: "Nafis Faisal Khan Arrafi",
    profilePictureUrl: imgNafisFaisalKhanArrafi,
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/nafis-faisal-khan-arrafi-876abb125/'
  },
  {
    name: "Matthew Cargille",
    profilePictureUrl: imgMatthewCargille,
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/mcargille/'
  },
  {
    name: "William Mustari",
    profilePictureUrl: imgWilliamMustari,
    titleText: "CS Student at UW-Madison",
    linkedInUrl: 'https://www.linkedin.com/in/william-m-36335180/'
  },
  {
    name: "Patricia Hernandez, PhD",
    profilePictureUrl: imgPatriciaHernandezPhD,
    titleText: "Assistant Professor at Marian University of Fond du Lac",
    linkedInUrl: 'https://www.linkedin.com/in/patricia-hernandez-phd-b421128/'
  },
  {
    name: "Sabrina Wulf",
    profilePictureUrl: imgSabrinaWulf,
    titleText: "Bachelor of Science - Public Relations at Illinois State University",
    linkedInUrl: 'https://www.linkedin.com/in/sabrinawulf/ '
  }
];