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
import {IPoint} from 'types/IPoint';
import {FlexRow} from 'components/layout/FlexRow';
import {LiveGraphWrapper} from 'components/LiveGraphWrapper/LiveGraphWrapper';
import {FlexCell} from 'components/layout/FlexCell';
import {CoreAndSkinTemperatureWidget} from 'components/widgets/CoreAndSkinTemperatureWidget';
import * as dataUtil from 'util/dataUtil';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';



export interface ITeamPageProps extends RouteComponentProps {

}

interface ITeamPageState {
  coreBodyTemp: IPoint[];
  heartRate: IPoint[];
  breathRate: IPoint[];
  mo2: IPoint[];
  skinTemp: IPoint[];
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
      skinTemp: []
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
          hemoPercent,
          eqBreathingRate,
          eqSkinTemp
        } = riderData.rider;

        this.setState(update(this.state, {
          heartRate: {$set: dataUtil.concatAndSortByX(this.state.heartRate, ts, watchHeartRate)},
          coreBodyTemp: {$set: dataUtil.concatAndSortByX(this.state.coreBodyTemp, ts, eqCoreTemp)},
          mo2: {$set: dataUtil.concatAndSortByX(this.state.mo2, ts, hemoPercent)},
          breathRate: {$set: dataUtil.concatAndSortByX(this.state.breathRate, ts, eqBreathingRate)},
          skinTemp: {$set: dataUtil.concatAndSortByX(this.state.skinTemp, ts, eqSkinTemp)}
        }));
      });
  };



  public componentWillUnmount = () => {
    this.__unsubscribe.next();
    this.__unsubscribe.complete();
  };



  public render = () => (
    <PageTemplate>
      <Section>
        <Heading>
          <RedWord>Team</RedWord> Page
        </Heading>
      </Section>

      <Section>
        <Heading>Biometrics</Heading>

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
        <Heading>Performance</Heading>

        <LiveGraphWrapper
          width="300px"
          height="300px"
          title="Power and Speed" />
      </Section>

      <Section>
        <Heading>Course Awareness</Heading>
      </Section>
    </PageTemplate>
  );

}
