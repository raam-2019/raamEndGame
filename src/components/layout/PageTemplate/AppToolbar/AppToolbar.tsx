import * as React from 'react';

import {ResponsiveContainer} from 'components/layout/ResponsiveContainer/ResponsiveContainer';
import {RedWord} from 'components/RedWord/RedWord';
import {Heading} from 'components/Heading/Heading';
import {FlexCell} from 'components/layout/FlexCell';
import {FlexRow} from 'components/layout/FlexRow';
import {
  NavLink,
  RouteComponentProps
} from 'react-router-dom';
import {Routes} from 'pages/routes';

import styles from './AppToolbar.module.css';



export interface IAppToolbarProps extends RouteComponentProps {}

export class AppToolbar extends React.Component<IAppToolbarProps> {



  public render = () => (
    <div className={styles.root}>
      <ResponsiveContainer>
        <FlexRow alignItems="center"
          justifyContent="space-between">
          <FlexCell>
            <NavLink
              className={styles.link}
              to={Routes.fanExperience.path}>
              <Heading><RedWord>RAAM</RedWord> 2019</Heading>
            </NavLink>
          </FlexCell>
        </FlexRow>
      </ResponsiveContainer>
    </div>
  );

}