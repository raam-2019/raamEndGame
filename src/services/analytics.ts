    
import * as _ from 'lodash';
import {BehaviorSubject} from "rxjs";
import {
  listRaamalytics,
  listRaamalytics_token
} from "graphql/queries";
import {
  API,
  graphqlOperation
} from "aws-amplify";
import moment from 'moment';
import {POLLING_INTERVAL_IN_MS} from 'services/util';



export interface IAnalyticsData {
  key: String;
  model_run_tstamp?: String;
  course_bearing?: number;
  cumulative_distance_to_segment?: number;
  headwind_m_per_s?: number;
  headwind_plus_2hr?: String;
  model_run?: String;
  predicted_arrival_time?: String;
  predicted_finishing_time?: String;
  predicted_power_watts?: number;
  segment_calories?: String;
  segment_duration_s?: number;
  segment_id?: String;
  segment_speed_km_per_h?: number;
  segment_tss?: number;
  wind_direction?: number;
  wind_direction_confidence_level?: number;
  wind_direction_plus_2hr?: number;
  wind_direction_plus_2hr_confidence_level?: number;
  wind_speed_confidence_level?: number;
  wind_speed_m_per_s?: number;
  wind_speed_plus_2hr?: String;
  wind_speed_plus_2hr_confidence_level?: String;
}



const __subject = new BehaviorSubject<IAnalyticsData[]>([]);
let __token = '';


export function init() {
  setInterval(() => __getData(), POLLING_INTERVAL_IN_MS);
}



export function onAnalyticsUpdate() {
  return __subject.asObservable();
}


async function __getData() {
  let serverResult: any;

  try {
    if (!__token) {
      serverResult = await API.graphql(graphqlOperation(listRaamalytics)) as any;
      __token = serverResult.data.listRaamalytics.nextToken;

    } else {
      serverResult = await API.graphql(graphqlOperation(listRaamalytics_token, {nextToken: __token})) as any;
      if (serverResult.data.listRaamalytics.nextToken !== null) {
        __token = serverResult.data.listRaamalytics.nextToken;
      }
    }

    _.forEach(serverResult.data.listRaamalytics.items, item => {
      item["predicted_arrival_time"] = moment(item["predicted_arrival_time"]).unix();
      item["wind_speed_plus_2hr"] = parseFloat(item["wind_speed_plus_2hr"]);
    });

    __subject.next(serverResult.data.listRaamalytics.items);

  } catch (err) {
    console.error(err);
  }
}