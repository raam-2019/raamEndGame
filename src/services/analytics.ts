import {BehaviorSubject} from "rxjs";
import {listRaamalytics,listRaamalytics_token} from "graphql/queries";
import {
  API,
  graphqlOperation
} from "aws-amplify";
import moment from 'moment';



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

var token:any = null;


export function init() {
  setInterval(() => __getData(), UPDATE_INTERVAL_IN_MS);
}



export function onAnalyticsUpdate() {
  return __subject.asObservable();
}


async function __getData() {

  try {
    if(token == null){
      const data = await API.graphql(graphqlOperation(listRaamalytics)) as any;
     // console.log(data);
      token  = data.data.listRaamalytics.nextToken;

      data.data.listRaamalytics.items.forEach((element:any) => {
        element["predicted_arrival_time"] = moment(element["predicted_arrival_time"]).unix();
        element["wind_speed_plus_2hr"] = parseFloat(element["wind_speed_plus_2hr"]);
      });

      // console.log(data.data.listRaamalytics.items);

    __subject.next(data.data.listRaamalytics.items);

    }else{
      const data = await API.graphql(graphqlOperation(listRaamalytics_token,{nextToken:token})) as any;
     // console.log(data);
        if(data.data.listRaamalytics.nextToken == null){
          //let it be at the last token if the next token is null
        }else{
          token  = data.data.listRaamalytics.nextToken;
        }
       // element["model_run_tstamp"] = moment(element["model_run_tstamp"]).unix()
       data.data.listRaamalytics.items.forEach((element:any) => {
        element["predicted_arrival_time"] = moment(element["predicted_arrival_time"]).unix();
        element["wind_speed_plus_2hr"] = parseFloat(element["wind_speed_plus_2hr"]);
      });

      // console.log(data.data.listRaamalytics.items);

        __subject.next(data.data.listRaamalytics.items);
    }
  
  } catch (err) {
    console.error(err);
  }
}
