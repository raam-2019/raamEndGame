import * as _ from 'lodash';
import * as React from 'react';

import moment from 'moment';
import update from 'immutability-helper';
import {RouteComponentProps} from 'react-router';
import {PageTemplate} from 'components/layout/PageTemplate/PageTemplate';
import * as amplifyService from 'services/amplify';
import {IPoint} from 'types/IPoint';
import * as dataUtil from 'util/dataUtil';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ISensorData} from 'types/subscriptionTypes';
import * as analyticsService from 'services/analytics';
import {BatteryWidgetSection} from 'pages/TeamPage/BatteryWidgetSection/BatteryWidgetSection';
import {BiometricsSection} from 'pages/TeamPage/BiometricsSection/BiometricsSection';
import {CourseAwarenessSection} from 'pages/TeamPage/CourseAwarenessSection/CourseAwarenessSection';



const GRAPH_WIDTH_PX = 800;
const GRAPH_HEIGHT_PX = 400;
const NUM_POINTS_BEFORE_LOAD = 3;


export interface ITeamPageProps extends RouteComponentProps {}

interface ITeamPageState {
  coreBodyTemp: IPoint[];
  heartRate: IPoint[];
  breathRate: IPoint[];
  mo2: IPoint[];
  skinTemp: IPoint[];
  enduranceZone: IPoint[];
  ambientTemperature: IPoint[];
  elevation: IPoint[];
  tailwindnow:IPoint[];
  tailwind2hrs:IPoint[];
  costofrest:IPoint[];

  androidBattery: number;
  radarBattery: number;
  watchBattery: number;

  selectedAwarenessRangeId: string;
  selectedBiometricRangeId: string;
}

export class TeamPage extends React.Component<ITeamPageProps, ITeamPageState> {

  private __unsubscribe = new Subject();

  constructor(props: ITeamPageProps) {
    super(props);
    this.state = {
      coreBodyTemp: [],
      heartRate: [],
      mo2: [],
      ambientTemperature: [],
      breathRate: [],
      skinTemp: [],
      enduranceZone: [],
      androidBattery: -1,
      radarBattery: -1,
      watchBattery: -1,
      selectedBiometricRangeId: '20',  // Must match "20" in `BiometricsSectiontsx` as the default value.... could be typed if we wanted.
      selectedAwarenessRangeId: '20', // Must match some default value in `CourseAwarenessSection.tsx`
      elevation: [],
      tailwindnow: [],
      tailwind2hrs: [],
      costofrest: []
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
          enduranceZone: {$set: dataUtil.riderData2PointSeries(riderData, 'ts', 'enduranceZone')},
          ambientTemperature: {$set: dataUtil.riderData2PointSeries(riderData, 'ts', 'watchTemperature')},
          elevation: {$set: dataUtil.riderData2PointSeries(riderData, 'ts', 'elevation')}
        }));

      });
      

    analyticsService
      .onAnalyticsUpdate()
      .pipe(takeUntil(this.__unsubscribe))
      .subscribe(result => {
        console.log(result)
        this.setState(update(this.state, {
          tailwindnow: {$set: dataUtil.analyticData2PointSeries(result, 'predicted_arrival_time', 'wind_speed_m_per_s')},
          tailwind2hrs: {$set: dataUtil.analyticData2PointSeries(result, 'predicted_arrival_time', 'wind_speed_plus_2hr')},
        }));

        console.log(this.state.tailwindnow);
          
      });
  };


  public componentWillUnmount = () => {
    this.__unsubscribe.next();
    this.__unsubscribe.complete();
  };



  private __removeSeriesBeforeStartTime(dataSeries: IPoint[], startTime: moment.Moment) {
    return _.filter(dataSeries, point => startTime.isBefore(moment.unix(point.x)))
  }


  public render = () => {
    // There is an assumption here that `selectedBiometricRangeId` is always a string integer
    const biometricStartTime = moment().subtract(moment.duration(+this.state.selectedBiometricRangeId, 'minutes'));
    const courseAwarenessStartTime = moment().subtract(moment.duration(+this.state.selectedAwarenessRangeId, 'minutes'));

    const [
      ambientTemp,
      breathRate,
      coreBodyTemp,
      enduranceZone,
      heartRate
    ] = [
        this.__removeSeriesBeforeStartTime(this.state.ambientTemperature, biometricStartTime),
        this.__removeSeriesBeforeStartTime(this.state.breathRate, biometricStartTime),
        this.__removeSeriesBeforeStartTime(this.state.coreBodyTemp, biometricStartTime),
        this.__removeSeriesBeforeStartTime(this.state.enduranceZone, biometricStartTime),
        this.__removeSeriesBeforeStartTime(this.state.heartRate, biometricStartTime),
      ];

    const [
      elevation
    ] = [
        this.__removeSeriesBeforeStartTime(this.state.elevation, courseAwarenessStartTime)
      ];

      const [
        tailwindnow,
        tailwind2hrs

      ] = [
          this.__removeSeriesBeforeStartTime(this.state.tailwindnow, courseAwarenessStartTime),
          this.__removeSeriesBeforeStartTime(this.state.tailwind2hrs, courseAwarenessStartTime)
        ];



    return (
      <PageTemplate {...this.props}
        style={{backgroundColor: "#fafafa"}}>
        <div style={{height: '200px'}} />

        <BatteryWidgetSection
          phoneBattery={this.state.androidBattery}
          radarBattery={this.state.radarBattery}
          watchBattery={this.state.watchBattery} />

        <BiometricsSection
          key={`biometrics-${this.state.selectedBiometricRangeId}`}
          selectedBiometricRangeId={this.state.selectedBiometricRangeId}
          ambientTemp={ambientTemp}
          breathRate={heartRate}
          coreBodyTemp={coreBodyTemp}
          enduranceZone={enduranceZone}
          heartRate={breathRate}
          graphHeightPx={GRAPH_HEIGHT_PX}
          graphWidthPx={GRAPH_WIDTH_PX}
          numPointsBeforeLoad={NUM_POINTS_BEFORE_LOAD}
          onChangeBiometricsDuration={this.__handleChangeBiometricsDuration} />

        <CourseAwarenessSection
          key={`courseAwareness-${this.state.selectedAwarenessRangeId}`}
          elevation={elevation}

          tailwindnow={tailwindnow}
          tailwind2hrs={tailwind2hrs} 

          graphHeightPx={GRAPH_HEIGHT_PX}
          graphWidthPx={GRAPH_WIDTH_PX}
          numPointsBeforeLoad={NUM_POINTS_BEFORE_LOAD}
          selectedAwarenessRangeId={this.state.selectedAwarenessRangeId}
          onChangeCourseAwarenessDuration={this.__haveChangeCourseAwarenessDuration} />
      </PageTemplate>
    );
  };



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



  private __handleChangeBiometricsDuration = (selectedBiometricRangeId: string) =>
    this.setState({selectedBiometricRangeId});



  private __haveChangeCourseAwarenessDuration = (selectedAwarenessRangeId: string) =>
    this.setState({selectedAwarenessRangeId});

}
