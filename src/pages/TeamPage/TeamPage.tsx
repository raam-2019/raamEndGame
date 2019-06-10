import * as _ from 'lodash';
import * as React from 'react';

import update from 'immutability-helper';
import {RouteComponentProps} from 'react-router';
import {PageTemplate} from 'components/layout/PageTemplate/PageTemplate';
import {Heading} from 'components/Heading/Heading';
import {Section} from 'components/layout/Section/Section';
import {RedWord} from 'components/RedWord/RedWord';
import * as amplifyService from 'services/amplify';
import {HeartAndBreathRateWidget} from 'components/widgets/HeartAndBreathRateWidget';
import {EnduranceZoneWidget} from 'components/widgets/EnduranceZoneWidget';
import {IPoint} from 'types/IPoint';
import {FlexRow} from 'components/layout/FlexRow';
import {LiveGraphWrapper} from 'components/LiveGraphWrapper/LiveGraphWrapper';
import {FlexCell} from 'components/layout/FlexCell';
import {CoreAndSkinTemperatureWidget} from 'components/widgets/CoreAndSkinTemperatureWidget';
import {ElevationWidget} from 'components/widgets/ElevationWidget';
import * as dataUtil from 'util/dataUtil';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BatteryLifeWidget} from 'components/BatteryLifeWidget/BatteryLifeWidget';
import {ISensorData} from 'types/subscriptionTypes';
import * as analyticsService from 'services/analytics';

import imgTopoBkgd from 'assets/images/topographBackground.png';

import styles from './TeamPage.module.css';

import {SelectField} from 'components/fields/generic/SelectField';


export interface ITeamPageProps extends RouteComponentProps {

}

interface ITeamPageState {
  coreBodyTemp: IPoint[];
  heartRate: IPoint[];
  breathRate: IPoint[];
  mo2: IPoint[];
  skinTemp: IPoint[];
  enduranceZone: IPoint[];
  elevation: IPoint[];

  androidBattery: number;
  radarBattery: number;
  watchBattery: number;

  forecastingHours: number;
}

const selectValues =
   [
     { id: "hour4", displayValue: "4 Hour" },
     { id: "hour8", displayValue: "8 Hours" },
     { id: "hour16", displayValue: "16 Hours" },
     { id: "hour24", displayValue: "24 Hours" },
     { id: "hour36", displayValue: "36 Hours" },
     { id: "hour48", displayValue: "48 Hours" }
  ];


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
      enduranceZone: [],
      androidBattery: -1,
      radarBattery: -1,
      watchBattery: -1,

      forecastingHours: 24,

      elevation: [{x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100},
      {x: Math.floor(Math.random() * (+24 - +0)) + +0, y: Math.floor(Math.random() * (+100 - +1000)) + +100}]
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

        this.__setCurrentBatteryLevelState(riderData);

        this.setState(update(this.state, {
          heartRate: {$set: dataUtil.riderData2PointSeries(riderData, 'ts', 'watchHeartRate')},
          coreBodyTemp: {$set: dataUtil.riderData2PointSeries(riderData, 'ts', 'eqCoreTemp')},
          mo2: {$set: dataUtil.riderData2PointSeries(riderData, 'ts', 'hemoTotal')},
          breathRate: {$set: dataUtil.riderData2PointSeries(riderData, 'ts', 'eqBreathingRate')},
          skinTemp: {$set: dataUtil.riderData2PointSeries(riderData, 'ts', 'eqSkinTemp')},
          enduranceZone: {$set: dataUtil.riderData2PointSeries(riderData, 'ts', 'enduranceZone')}
        }));
      });
      
    //  var token:any = null;

    //  setInterval(function(){
    //     if(token == null){
    //       amplifyService.getAnalytics().then((result:any) => {
    //         console.log(result); 
    //         token  = result.data.listRaamalytics.nextToken;
    //       });
    //     }else{
    //       amplifyService.getAnalyticsTokened(token).then((result:any) => {
    //         console.log(result); 
    //         if(result.data.listRaamalytics.nextToken == null){
    //         }else{
    //           token  = result.data.listRaamalytics.nextToken;
    //         }
    //       });
    //     }
    //   }
    //   , 5000 )

    analyticsService
      .onAnalyticsUpdate()
      .pipe(takeUntil(this.__unsubscribe))
      .subscribe(result => {
        console.log(result);
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
              max={1}
              batteryLife={this.state.androidBattery}
              deviceName="Android" />
          </FlexCell>

          <FlexCell>
            <BatteryLifeWidget
              lowNumbersAreFull={true}
              min={1}
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
        <FlexCell>
          <CoreAndSkinTemperatureWidget
            widthPx={900}
            heightPx={300}
            coreTempSeries={this.state.coreBodyTemp}
            skinTempSeries={this.state.skinTemp} />
        </FlexCell>

        <FlexCell>
          <HeartAndBreathRateWidget
            breathRateSeries={this.state.breathRate}
            heartRateSeries={this.state.heartRate}
            heightPx={300}
            widthPx={900}
          />
        </FlexCell>

        <FlexCell>
          <EnduranceZoneWidget
            enduranceZone={this.state.enduranceZone}
            heightPx={300}
            widthPx={900}
          />
        </FlexCell>

      </Section>

      <Section>
        <Heading><RedWord>#</RedWord>Performance</Heading>

        <FlexRow justifyContent="flex-end">
          <FlexCell flex="2">
            <SelectField
              options = {selectValues}
              onChange = {this.__handleChange}
              />
          </FlexCell>
        </FlexRow>

        <FlexCell>
          <ElevationWidget
            elevation={this.state.elevation}
            heightPx={300}
            widthPx={900}
          />
        </FlexCell>

        <LiveGraphWrapper
          width="300px"
          height="300px"
          title="Power and Speed" />
      </Section>

      <Section>
        <Heading><RedWord>Course</RedWord> Awareness</Heading>
      </Section>

      <Section backgroundColor="white">
        <FlexRow justifyContent="flex-end">
          <FlexCell flex="0">
            <SelectField
              options = {selectValues}
              onChange = {this.__handleChange}
              />
          </FlexCell>
        </FlexRow>
      </Section>

    </PageTemplate>
  );



  private __setCurrentBatteryLevelState = (riderData: ISensorData[]) => {
    const lastData = _.last(riderData);
    if (!lastData) {
      return;
    }

    const {androidBattery, radarBattery, watchBattery} = lastData;
    this.setState({
      androidBattery: androidBattery || -1,
      radarBattery: radarBattery || -1,
      watchBattery: watchBattery || -1
    });
  };

  private __handleChange = (id: string) => {
    const id2Hours: Record<string, number> = {
     'hour4': 4,
     'hour8': 8,
     'hour16': 16,
     'hour24': 24,
     'hour36': 36,
     'hour48': 48
   };

   this.setState({forecastingHours: id2Hours[id]});

   console.log(this.state.forecastingHours);
  };

}
