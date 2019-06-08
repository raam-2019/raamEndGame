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
    amplifyService
      .onRiderUpdate()
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
          heartRate: this.__concatAndSortNewPoint(this.state.heartRate, ts, watchHeartRate),
          coreBodyTemp: this.__concatAndSortNewPoint(this.state.coreBodyTemp, ts, eqCoreTemp),
          mo2: this.__concatAndSortNewPoint(this.state.mo2, ts, hemoPercent),
          breathRate: this.__concatAndSortNewPoint(this.state.breathRate, ts, eqBreathingRate),
          skinTemp: this.__concatAndSortNewPoint(this.state.skinTemp, ts, eqSkinTemp)
        }));
      });
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
            {/* Needs to be a MO2 */}
            {/* <HeartAndBreathRateWidget
              strokeColor="green"
              widthPx={300}
              heightPx={300}
              title="MO2"
              heartRateSeries={this.state.mo2} /> */}
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



  private __concatAndSortNewPoint = (values: IPoint[], x: number | null, y: number | null) => ({
    $set: _.sortBy(_.concat(values, (x && y) ? {x, y} : []), point => point.x)
  });

}
