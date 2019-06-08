import {FanPage} from "pages/FanPage/FanPage";
import {TeamPage} from "pages/TeamPage/TeamPage";
import {withRouter} from "react-router";




export interface IRouteData {
  path: string;
  component: React.ComponentType;
}



export const Routes: Record<string, IRouteData> = {
  fanExperience: {
    path: '/',
    component: withRouter(FanPage),
  },
  teamPage: {
    path: '/daveHaaseTeam',
    component: withRouter(TeamPage)
  }
};