import * as React from 'react';

import update from 'immutability-helper';
import {RouteComponentProps} from 'react-router';
import {PageTemplate} from 'components/layout/PageTemplate/PageTemplate';
import {Heading} from 'components/Heading/Heading';
import {Section} from 'components/layout/Section/Section';
import {RedWord} from 'components/RedWord/RedWord';
import * as amplifyService from 'services/amplify';
import {HeartAndBreathRateWidget} from 'components/widgets/HeartAndBreathRateWidget';
import {IPoint} from 'types/IPoint';
import {FlexRow} from 'components/layout/FlexRow';
import {LiveGraphWrapper} from 'components/LiveGraphWrapper/LiveGraphWrapper';
import {FlexCell} from 'components/layout/FlexCell';
import {CoreAndSkinTemperatureWidget} from 'components/widgets/CoreAndSkinTemperatureWidget';
import * as dataUtil from 'util/dataUtil';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BatteryLifeWidget} from 'components/BatteryLifeWidget/BatteryLifeWidget';

import imgTopoBkgd from 'assets/images/topographBackground.png';

import styles from './TeamPage.module.css';



export interface ITeamPageProps extends RouteComponentProps {

}

interface ITeamPageState {
  coreBodyTemp: IPoint[];
  heartRate: IPoint[];
  breathRate: IPoint[];
  mo2: IPoint[];
  skinTemp: IPoint[];

  aeroBattery: number;
  androidBattery: number;
  mo2Battery: number;
  radarBattery: number;
  watchBattery: number;
}

export class TeamPage extends React.Component<ITeamPageProps, ITeamPageState> {

  private __unsubscribe = new Subject();



  constructor(props: ITeamPageProps) {
    super(props);
    this.state = {
      coreBodyTemp: [],
      heartRate: [],
      mo2: [],
      breathRate: [],
      skinTemp: [],
      aeroBattery: 0,
      androidBattery: 0,
      mo2Battery: 0,
      radarBattery: 0,
      watchBattery: 0
    };

  }



  public componentDidMount = () => {
    window.document.title = "#InternetOfDave - Team Page";
    amplifyService
      .onRiderUpdate()
      .pipe(takeUntil(this.__unsubscribe))
      .subscribe(riderData => {
        if (!riderData) {
          return;
        }

        const {
          ts,
          watchHeartRate,
          eqCoreTemp,
          eqSkinTemp,
          hemoPercent,
          eqBreathingRate,
          aeroBattery,
          androidBattery,
          mo2Battery,
          radarBattery,
          watchBattery
        } = riderData.rider;

        this.setState(update(this.state, {
          heartRate: {$set: dataUtil.concatAndSortByX(this.state.heartRate, ts, watchHeartRate)},
          coreBodyTemp: {$set: dataUtil.concatAndSortByX(this.state.coreBodyTemp, ts, eqCoreTemp)},
          mo2: {$set: dataUtil.concatAndSortByX(this.state.mo2, ts, hemoPercent)},
          breathRate: {$set: dataUtil.concatAndSortByX(this.state.breathRate, ts, eqBreathingRate)},
          skinTemp: {$set: dataUtil.concatAndSortByX(this.state.skinTemp, ts, eqSkinTemp)},
          aeroBattery: {$set: aeroBattery || -1},
          androidBattery: {$set: androidBattery || -1},
          mo2Battery: {$set: mo2Battery || -1},
          radarBattery: {$set: radarBattery || -1},
          watchBattery: {$set: watchBattery || -1}
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
        extraClassName={styles.firstSection}>
        <Heading><RedWord>Device</RedWord> Health</Heading>

        <FlexRow justifyContent="space-between">
          <FlexCell>
            <BatteryLifeWidget
              min={0}
              max={5}
              batteryLife={this.state.aeroBattery}
              deviceName="Aero" />
          </FlexCell>
          <FlexCell>
            <BatteryLifeWidget
              min={0}
              max={100}
              batteryLife={this.state.androidBattery}
              deviceName="Android" />
          </FlexCell>
          <FlexCell>
            <BatteryLifeWidget
              min={0}
              max={100}
              batteryLife={this.state.mo2Battery}
              deviceName="MO2" />
          </FlexCell>
          <FlexCell>
            <BatteryLifeWidget
              min={0}
              max={5}
              batteryLife={this.state.radarBattery}
              deviceName="Radar" />
          </FlexCell>
          <FlexCell>
            <BatteryLifeWidget
              min={0}
              max={100}
              batteryLife={this.state.watchBattery}
              deviceName="Watch" />
          </FlexCell>
        </FlexRow>

        <Heading><RedWord>#</RedWord>Biometrics</Heading>

        <FlexRow>
          <FlexCell>
            <CoreAndSkinTemperatureWidget
              widthPx={300}
              heightPx={300}
              coreTempSeries={this.state.coreBodyTemp}
              skinTempSeries={this.state.skinTemp} />
          </FlexCell>

          <FlexCell>
            <HeartAndBreathRateWidget
              breathRateSeries={this.state.breathRate}
              heartRateSeries={this.state.heartRate}
              heightPx={300}
              widthPx={300}
            />
          </FlexCell>

          <FlexCell>
            {/* TODO Needs to be an MO2 widget here */}
          </FlexCell>
        </FlexRow>
      </Section>

      <Section>
        <Heading><RedWord>#</RedWord>Performance</Heading>

        <LiveGraphWrapper
          width="300px"
          height="300px"
          title="Power and Speed" />
      </Section>

      <Section>
        <Heading><RedWord>Course</RedWord> Awareness</Heading>
      </Section>
    </PageTemplate>
  );

}
