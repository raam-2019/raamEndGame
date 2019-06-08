import * as React from 'react';

import update from 'immutability-helper';
import {RouteComponentProps} from 'react-router';
import {PageTemplate} from 'components/layout/PageTemplate/PageTemplate';
import {Heading} from 'components/Heading/Heading';
import {Section} from 'components/layout/Section/Section';
import {RedWord} from 'components/RedWord/RedWord';
import * as amplifyService from 'services/amplify';
import {HeartRateWidget} from 'components/widgets/HeartRateWidget/HeartRateWidget';
import {ILineSeries} from 'types/ILineSeries';
import {FlexRow} from 'components/layout/FlexRow';
import {LiveGraphWrapper} from 'components/LiveGraphWrapper/LiveGraphWrapper';
import {FlexCell} from 'components/layout/FlexCell';



export interface ITeamPageProps extends RouteComponentProps {

}

interface ITeamPageState {
  coreBodyTemperatureSeries: ILineSeries;
  heartRateLineSeries: ILineSeries;
  mo2Series: ILineSeries;
}

export class TeamPage extends React.Component<ITeamPageProps, ITeamPageState> {


  constructor(props: ITeamPageProps) {
    super(props);
    this.state = {
      coreBodyTemperatureSeries: [],
      heartRateLineSeries: [],
      mo2Series: []
    };

  }



  public componentDidMount = () => {
    amplifyService
      .onRiderUpdate()
      .subscribe(riderData => {
        if (!riderData) {
          return;
        }

        const {ts, watchHeartRate, eqCoreTemp, hemoPercent} = riderData.rider;

        this.setState(update(this.state, {
          heartRateLineSeries: this.__genStateUpdateWithPoint(ts, watchHeartRate),
          coreBodyTemperatureSeries: this.__genStateUpdateWithPoint(ts, eqCoreTemp),
          mo2Series: this.__genStateUpdateWithPoint(ts, hemoPercent)
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
            <LiveGraphWrapper
              width="300px"
              height="300px"
              title="Core Body Temperature" />
          </FlexCell>

          <FlexCell>
            <HeartRateWidget
              widthPx={300}
              heightPx={300}
              title="Heart Rate"
              heartRateSeries={this.state.heartRateLineSeries} />
          </FlexCell>

          <FlexCell>
            <LiveGraphWrapper
              width="300px"
              height="300px"
              title="MO2" />
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



  private __genStateUpdateWithPoint(x: number | null, y: number | null) {
    return {$push: x && y ? [{x, y}] : []};
  }

}
