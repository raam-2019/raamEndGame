import {BehaviorSubject} from "rxjs";
import {listRaamalytics} from "graphql/queries";
import {
  API,
  graphqlOperation
} from "aws-amplify";



export interface IAnalytic {
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

export const UPDATE_INTERVAL_IN_MS = 1000 * 5;

const __subject = new BehaviorSubject<IAnalytic[]>([]);



export function init() {
  setInterval(() => __getData(), UPDATE_INTERVAL_IN_MS);
}



export function onAnalyticsUpdate() {
  return __subject.asObservable();
}



async function __getData() {
  try {
    const data = await API.graphql(graphqlOperation(listRaamalytics)) as any;
    __subject.next(data.data.listRaamalytics.items);
  } catch (err) {
    console.error(err);
  }
}
