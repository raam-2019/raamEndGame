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
import * as costOfRestService from 'services/costOfRest';
import {BatteryWidgetSection} from 'pages/TeamPage/BatteryWidgetSection/BatteryWidgetSection';
import {BiometricsSection} from 'pages/TeamPage/BiometricsSection/BiometricsSection';
import {CourseAwarenessSection} from 'pages/TeamPage/CourseAwarenessSection/CourseAwarenessSection';



const GRAPH_WIDTH_PX = 750;
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
  currentTailWind: IPoint[];
  tailWindIn2Hours: IPoint[];

  predictedHumidity: IPoint[];
  predictedTemperature: IPoint[];
  timeCostOfRest: IPoint[];

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
      predictedHumidity: [],
      predictedTemperature: [],
      timeCostOfRest: [],
      androidBattery: -1,
      radarBattery: -1,
      watchBattery: -1,
      selectedBiometricRangeId: '20',  // Must match "20" in `BiometricsSectiontsx` as the default value.... could be typed if we wanted.
      selectedAwarenessRangeId: '1440', // Must match some default value in `CourseAwarenessSection.tsx`
      elevation: [],
      currentTailWind: [],
      tailWindIn2Hours: []
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
          heartRate: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'eqHeartRate')},
          coreBodyTemp: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'eqCoreTemp')},
          mo2: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'hemoTotal')},
          breathRate: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'eqBreathingRate')},
          skinTemp: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'eqSkinTemp')},
          enduranceZone: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'enduranceZone')},
          ambientTemperature: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'watchTemperature')},
          elevation: {$set: dataUtil.sensorData2PointSeries(riderData, 'ts', 'elevation')}
        }));
      });


    analyticsService
      .onAnalyticsUpdate()
      .pipe(takeUntil(this.__unsubscribe))
      .subscribe(result => {
        this.setState(update(this.state, {
          currentTailWind: {$set: dataUtil.analyticData2PointSeries(result, 'predicted_arrival_time', 'wind_speed_m_per_s')},
          tailWindIn2Hours: {$set: dataUtil.analyticData2PointSeries(result, 'predicted_arrival_time', 'wind_direction_plus_2hr')},
          predictedHumidity: {$set: dataUtil.analyticData2PointSeries(result, 'predicted_arrival_time', 'wind_direction_plus_2hr')}, // TODO {AD} this needs to be humidity
          predictedTemperature: {$set: dataUtil.analyticData2PointSeries(result, 'predicted_arrival_time', 'wind_direction_plus_2hr')},
          // timeCostOfRest: {$set: dataUtil.analyticData2PointSeries(result, 'predicted_arrival_time', 'wind_direction_plus_2hr')}  // TODO {AD} this needs to be temperature
        }));
      });

      costOfRestService
      .asObservable()
      .pipe(takeUntil(this.__unsubscribe))
      .subscribe(result => {
   
        this.setState(update(this.state, {
          timeCostOfRest: {$set: dataUtil.analyticCostRestData2PointSeries(result, 'predictionUnixTime', 'costOfRestSeconds')}  // TODO {AD} this needs to be temperature
        }));
        console.log(this.state.timeCostOfRest)
      });



  };


  public componentWillUnmount = () => {
    this.__unsubscribe.next();
    this.__unsubscribe.complete();
  };



  private __addSeriesAfterEndTime(dataSeries: IPoint[], endTime: moment.Moment) {
    return _.filter(dataSeries, point => endTime.isAfter(moment.unix(point.x)))
  };



  public render = () => {
    // There is an assumption here that `selectedBiometricRangeId` is always a string integer
    const biometricStartTime = moment().subtract(moment.duration(+this.state.selectedBiometricRangeId, 'minutes')).unix();
    const courseAwarenessEndTime = moment().add(moment.duration(+this.state.selectedAwarenessRangeId, 'minutes'));

    const [
      // elevation,
      currentTailWind,
      tailWindIn2Hours,
    ] = [
        this.__addSeriesAfterEndTime(this.state.elevation, courseAwarenessEndTime),
        this.__addSeriesAfterEndTime(this.state.currentTailWind, courseAwarenessEndTime),
        this.__addSeriesAfterEndTime(this.state.tailWindIn2Hours, courseAwarenessEndTime)
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
          startUnixTime={biometricStartTime}
          key={`biometrics-${this.state.selectedBiometricRangeId}`}
          selectedBiometricRangeId={this.state.selectedBiometricRangeId}
          ambientTemp={this.state.ambientTemperature}
          breathRate={this.state.breathRate}
          coreBodyTemp={this.state.coreBodyTemp}
          enduranceZone={this.state.enduranceZone}
          heartRate={this.state.heartRate}
          graphHeightPx={GRAPH_HEIGHT_PX}
          graphWidthPx={GRAPH_WIDTH_PX}
          numPointsBeforeLoad={NUM_POINTS_BEFORE_LOAD}
          onChangeBiometricsDuration={this.__handleChangeBiometricsDuration} />

        <CourseAwarenessSection
          key={`courseAwareness-${this.state.selectedAwarenessRangeId}`}
          predictedTimeXElevation={[]}
          predictedHeadwindXForecastedHeadwind={[]}
          tailwindnow={currentTailWind}
          tailwind2hrs={tailWindIn2Hours}

          predictedHumidity={this.state.predictedHumidity}
          predictedTemperature={this.state.predictedTemperature}
          timeCostOfRest={this.state.timeCostOfRest}
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