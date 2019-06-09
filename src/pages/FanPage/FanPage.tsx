import * as React from 'react';

import {takeUntil} from 'rxjs/operators';
import {RouteComponentProps} from 'react-router';
import {PageTemplate} from 'components/layout/PageTemplate/PageTemplate';
import {RedWord} from 'components/RedWord/RedWord';
import {
  Heading,
  SubHeading
} from 'components/Heading/Heading';
import {Section} from 'components/layout/Section/Section';
import {Paragraph} from 'components/Paragraph/Paragraph';
import {Img} from 'components/Img/Img';
import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';
import {FlexColumn} from 'components/layout/FlexColumn';
import {WhenShouldDaveRestSection} from 'pages/FanPage/WhenShouldDaveRestSection/WhenShouldDaveRestSection';
import {LiveGraphWrapper} from 'components/LiveGraphWrapper/LiveGraphWrapper';
import {DaveBiographySection} from 'pages/FanPage/DaveBiographySection/DaveBiographySection';
import {HowWasThisAccomplishedSection} from 'pages/FanPage/HowWasThisAccomplishedSection/HowWasThisAccomplishedSection';
import * as amplifyService from 'services/amplify';
import {Routes} from 'pages/routes';
import RaceTrackerMap from 'components/widgets/RaceTrackerMap/RaceTrackerMap';
import {Subject} from 'rxjs';

import imgTopoBkgd from 'assets/images/topographBackground.png';
import imgPerfectRaceHeader from 'assets/images/perfectRaceHeader.png';
import imgBannerbike from 'assets/images/bannerBike1.png';
import imgQlikApp from 'assets/images/qlik-app@3x.png';

import styles from './FanPage.module.css';
import globalStyles from 'globalStyles.module.css';

import {IPoint} from 'types/IPoint';
import update from 'immutability-helper';
import * as dataUtil from 'util/dataUtil';

export interface IFanPageProps extends RouteComponentProps {}


interface IFanPageState {
  davesLat: number;
  davesLon: number;

  coreBodyTemp: IPoint[];
  heartRate: IPoint[];
  breathRate: IPoint[];
  mo2: IPoint[];
  skinTemp: IPoint[];
}

export class FanPage extends React.Component<IFanPageProps, IFanPageState> {

  private __unsubscribe = new Subject();

  constructor(props: IFanPageProps) {
    super(props);
    this.state = {
      davesLat: 0,
      davesLon: 0,

      coreBodyTemp: [],
      heartRate: [],
      mo2: [],
      breathRate: [],
      skinTemp: []
    };
  }



  public componentDidMount = () => {
    window.document.title = "#ThePerfectRace - Dave Haase";
    amplifyService
      .onRiderUpdate()
      .pipe(takeUntil(this.__unsubscribe))
      .subscribe(riderData => {
        if (!riderData) {
          return;
        }

        const {
          ts,
          latitude,
          longitude,

          eqCoreTemp,
          eqSkinTemp,
          hemoPercent,
          eqBreathingRate,
          watchHeartRate
        } = riderData.rider;

        if (latitude !== null && longitude !== null) {
          this.setState({
            davesLat: latitude,
            davesLon: longitude
          });
        };

        this.setState(update(this.state, {
          heartRate: {$set: dataUtil.concatAndSortByX(this.state.heartRate, ts, watchHeartRate)},
          coreBodyTemp: {$set: dataUtil.concatAndSortByX(this.state.coreBodyTemp, ts, eqCoreTemp)},
          mo2: {$set: dataUtil.concatAndSortByX(this.state.mo2, ts, hemoPercent)},
          breathRate: {$set: dataUtil.concatAndSortByX(this.state.breathRate, ts, eqBreathingRate)},
          skinTemp: {$set: dataUtil.concatAndSortByX(this.state.skinTemp, ts, eqSkinTemp)},
        }));
      });
  };


  public componentWillUnmount = () => {
    this.__unsubscribe.next();
    this.__unsubscribe.complete();
  };



  public render = () => (
    <PageTemplate {...this.props}>
      <Section
        backgroundImage={imgTopoBkgd}
        extraClassName={`${globalStyles.alignCenter} ${styles.bannerSection}`}>
        <Img
          extraClassName={styles.perfectRaceHeaderImg}
          src={imgPerfectRaceHeader} />

        <Img
          extraClassName={styles.bannerBikeImg}
          src={imgBannerbike} />
      </Section>



      <Section extraClassName={styles.whoIsDaveHaaseSection}>
        <FlexColumn
          className={globalStyles.alignCenter}
          alignItems="center">
          <Heading>
            <RedWord>Who</RedWord> is Dave Haase?
          </Heading>

          <Paragraph>
            Dave is a RAAM veteran and winning is his quest. And he’s a man of the ascent. Dave’s history with RAAM spans 2004, ’05, ’06, ’08 and then, after a seven-year hiatus second-place finishes in both 2015 and 2016.
          </Paragraph>
        </FlexColumn>
      </Section>



      <DaveBiographySection />



      <Section
        backgroundImage={imgTopoBkgd}
        extraClassName={styles.whereIsDaveSection}>
        <FlexColumn className={globalStyles.alignCenter}>
          <Heading>
            <RedWord>Where</RedWord> is Dave along his journey?
          </Heading>

          <Paragraph>
            A fixed route from sea-to-sea, 50% longer than the Tour de France. 4 mountain ranges, 3 deserts, and just 7 stops for sleep (2 hours at a time).
          </Paragraph>

          <FlexCell >
            <RaceTrackerMap
              davesLat={this.state.davesLat}
              davesLon={this.state.davesLon} />
          </FlexCell>

        </FlexColumn>
      </Section>



      <Section extraClassName={styles.perfectRaceSection}>
        <FlexColumn className={globalStyles.alignCenter}>
          <Heading>
            <RedWord>What</RedWord> does the perfect race look like?
          </Heading>

          <Paragraph>
            A learning model, retrained as the race progresses eliminates guesswork. It creates luck. Take a ride in the team command center. Where would you stop next?
          </Paragraph>
        </FlexColumn>

        <LiveGraphWrapper
          extraClassName={styles.daveSkinAndCoreTemperatureGraph}
          height="513px"
          title="Dave's Skin and Core Temperature vs Heart Rate Over Time" />
      </Section>



      <Section
        backgroundColor="black"
        extraClassName={styles.analyzeDataSection}>
        <FlexRow>
          <FlexCell>
            <SubHeading>
              We must analyze data both old and new
            </SubHeading>

            <Paragraph theme="light">
              Understanding the history of RAAM is not only necessary but helps write the perfect race plan. What data can you find for yourself? Go, play, with the 36 year history of this epic adventure.
            </Paragraph>
          </FlexCell>

          <FlexCell>
            <a
              href="https://webapps.qlik.com/raam/index.html"
              rel="noopener noreferrer"
              target="_blank">
              <Img
                src={imgQlikApp}
                width="100%" />
            </a>
          </FlexCell>
        </FlexRow>
      </Section>



      <WhenShouldDaveRestSection 
        mo2={this.state.mo2} 
        coreBodyTemp={this.state.coreBodyTemp} />
      <HowWasThisAccomplishedSection />

      <Section backgroundColor="black">
        <FlexRow justifyContent="flex-end">
          <FlexCell flex="0">
            {this.props.location.pathname !== Routes.teamPage.path && (
              <button
                className={styles.teamPageButton}
                onClick={this.__handleClickTeamLogin}>
                Team Login
              </button>
            )}
          </FlexCell>
        </FlexRow>
      </Section>
    </PageTemplate>
  );



  private __handleClickTeamLogin = () => {
    const result = window.prompt("Enter Team Password");

    if (result === 'daveHaaseTeam2019') {
      this.props.history.push(Routes.teamPage.path);
    }
  };

}
