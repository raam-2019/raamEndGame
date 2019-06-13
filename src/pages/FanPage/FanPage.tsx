import * as _ from 'lodash';
import * as React from 'react';

import {takeUntil} from 'rxjs/operators';
import {RouteComponentProps} from 'react-router';
import {PageTemplate} from 'components/layout/PageTemplate/PageTemplate';
import {Section} from 'components/layout/Section/Section';
import {FlexRow} from 'components/layout/FlexRow';
import {FlexCell} from 'components/layout/FlexCell';
import {DaveBiographySection} from 'pages/FanPage/DaveBiographySection/DaveBiographySection';
import {HowWasThisAccomplishedSection} from 'pages/FanPage/HowWasThisAccomplishedSection/HowWasThisAccomplishedSection';
import * as amplifyService from 'services/amplify';
import {Routes} from 'pages/routes';
import {Subject} from 'rxjs';
import {IPoint} from 'types/IPoint';
import update from 'immutability-helper';
import * as dataUtil from 'util/dataUtil';
import {ISensorData} from 'types/subscriptionTypes';
import {AnalyzeDataSection} from 'pages/FanPage/AnalyzeDataSection/AnalyzeDataSection';
import {BannerSection} from 'pages/FanPage/BannerSection/BannerSection';
import {WhoIsDaveSection} from 'pages/FanPage/WhoIsDaveSection/WhoIsDaveSection';
import {WhereIsDaveSection} from 'pages/FanPage/WhereIsDaveSection/WhereIsDaveSection';
import {PerfectRaceSection} from 'pages/FanPage/PerfectRaceSection/PerfectRaceSection';



export interface IFanPageProps extends RouteComponentProps {}

interface IFanPageState {
  davesLat: number;
  davesLon: number;

  coreBodyTemp: IPoint[];
  heartRate: IPoint[];
  breathRate: IPoint[];
  mo2: IPoint[];
  skinTemp: IPoint[];
  watchSpeed: IPoint[];
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
      skinTemp: [],
      watchSpeed: [],
    };
  }



  public componentDidMount = () => {
    window.document.title = "#ThePerfectRace - Dave Haase";
    amplifyService
      .onRiderUpdate()
      .pipe(takeUntil(this.__unsubscribe))
      .subscribe(riderData => {
        if (_.isEmpty(riderData)) {
          return;
        }

        this.__setCurrentLatLonState(riderData);

        this.setState(update(this.state, {
          heartRate: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'eqHeartRate')},
          coreBodyTemp: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'eqCoreTemp')},
          mo2: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'hemoPercent')},
          breathRate: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'eqBreathingRate')},
          skinTemp: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'eqSkinTemp')},
          watchSpeed: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'watchSpeed')},
        }));
      });
  };


  public componentWillUnmount = () => {
    this.__unsubscribe.next();
    this.__unsubscribe.complete();
  };



  public render = () => (
    <PageTemplate {...this.props}>
      <BannerSection />
      <WhoIsDaveSection />
      <DaveBiographySection />

      <WhereIsDaveSection
        davesLat={this.state.davesLat}
        davesLon={this.state.davesLon} />

      <PerfectRaceSection
        mo2={this.state.mo2}
        coreBodyTemp={this.state.coreBodyTemp}
        heartRate={this.state.heartRate}
        speed={this.state.watchSpeed} />

      <AnalyzeDataSection />
      <HowWasThisAccomplishedSection />

      <Section backgroundColor="black">
        <FlexRow justifyContent="flex-end">
          <FlexCell>
            {this.props.location.pathname !== Routes.teamPage.path && (
              <button onClick={this.__handleClickTeamLogin}>
                Team Login
              </button>
            )}
          </FlexCell>
        </FlexRow>
      </Section>
    </PageTemplate>
  );



  private __setCurrentLatLonState = (riderData: ISensorData[]) => {
    const lastData = _.last(riderData);
    if (lastData) {
      const {latitude, longitude} = lastData;
      if (latitude !== null && longitude !== null) {
        this.setState({
          davesLat: latitude,
          davesLon: longitude
        });
      };
    }
  };



  private __handleClickTeamLogin = () => {
    const result = window.prompt("Enter Team Password");

    if (result === 'daveHaaseTeam2019') {
      this.props.history.push(Routes.teamPage.path);
    }
  };

}
