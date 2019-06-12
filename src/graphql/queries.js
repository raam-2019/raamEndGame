// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
  }
}
`;
export const listTodos = `query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
export const getAssetTable6ce042e = `query GetAssetTable6ce042e($id: String!, $ts: Int!) {
  getAssetTable6ce042e(id: $id, ts: $ts) {
    id
    ts
  }
}
`;
export const listAssetTable6ce042es = `query ListAssetTable6ce042es(
  $filter: TableAssetTable6ce042eFilterInput
  $limit: Int
  $nextToken: String
) {
  listAssetTable6ce042es(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      ts
      elevation
      watchPower
      radarBattery
      pcrr
      totalVehicles
      palt
      hemoTotal
      hemoPercent
      watchBattery
      watchSpeed
      watchAltitude
      aeroBattery
      enduranceZone
      ptot
      watchHeartRate
      watchPressure
      cda
      intervalZone
      pacc
      watchHeading
      longitude
      latitude
      watchLocationQuality
      eqBreathingRate
      watchCadence
      pair
      eqCoreTemp
      eqSkinTemp
      eqHeartRate
      aeroPressure
      androidBattery
      watchTemperature
      mo2Battery
    }
    nextToken
  }
}
`;

export const listRaamalytics_token = `query Raaamalytics (
  $nextToken: String
) {
  listRaamalytics(limit:500, nextToken: $nextToken){
    items {
      key
      model_run_tstamp
      course_bearing
      cumulative_distance_to_segment
      headwind_m_per_s
      headwind_plus_2hr
      model_run
      predicted_arrival_time
      predicted_finishing_time
      predicted_power_watts
      segment_calories
      segment_duration_s
      segment_id
      segment_speed_km_per_h
      segment_tss
      wind_direction
      wind_direction_confidence_level
      wind_direction_plus_2hr
      wind_direction_plus_2hr_confidence_level
      wind_speed_confidence_level
      wind_speed_m_per_s
      wind_speed_plus_2hr
      wind_speed_plus_2hr_confidence_level
    }
    nextToken
  }
}
`;

export const listRaamalytics = `query Raaamalytics {
  listRaamalytics(limit:500){
    items {
      key
      model_run_tstamp
      course_bearing
      cumulative_distance_to_segment
      headwind_m_per_s
      headwind_plus_2hr
      model_run
      predicted_arrival_time
      predicted_finishing_time
      predicted_power_watts
      segment_calories
      segment_duration_s
      segment_id
      segment_speed_km_per_h
      segment_tss
      wind_direction
      wind_direction_confidence_level
      wind_direction_plus_2hr
      wind_direction_plus_2hr_confidence_level
      wind_speed_confidence_level
      wind_speed_m_per_s
      wind_speed_plus_2hr
      wind_speed_plus_2hr_confidence_level
    }
    nextToken
  }
}
`;



export const listCostOfRests = `query ListCostOfRests {
  listCostOfRests {
    items {
      key
      prediction_tstamp
      cost_of_rest_s
      model_run
      segment_id
    }
  }
}
`;
