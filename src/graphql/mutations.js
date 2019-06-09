// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTodo = `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const updateTodo = `mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const deleteTodo = `mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const rider = `mutation Rider(
  $id: String!
  $ts: Int!
  $watchPower: Float
  $radarBattery: Float
  $pcrr: Float
  $totalVehicles: Float
  $palt: Float
  $hemoTotal: Float
  $hemoPercent: Float
  $watchBattery: Float
  $watchSpeed: Float
  $watchAltitude: Float
  $aeroBattery: Float
  $enduranceZone: Float
  $ptot: Float
  $watchHeartRate: Float
  $watchPressure: Float
  $cda: Float
  $intervalZone: Float
  $pacc: Float
  $watchHeading: Float
  $longitude: Float
  $latitude: Float
  $watchLocationQuality: Float
  $eqBreathingRate: Float
  $watchCadence: Float
  $pair: Float
  $eqCoreTemp: Float
  $eqSkinTemp: Float
  $eqHeartRate: Float
  $aeroPressure: Float
  $androidBattery: Float
  $watchTemperature: Float
  $mo2Battery: Float
) {
  rider(
    id: $id
    ts: $ts
    watchPower: $watchPower
    radarBattery: $radarBattery
    pcrr: $pcrr
    totalVehicles: $totalVehicles
    palt: $palt
    hemoTotal: $hemoTotal
    hemoPercent: $hemoPercent
    watchBattery: $watchBattery
    watchSpeed: $watchSpeed
    watchAltitude: $watchAltitude
    aeroBattery: $aeroBattery
    enduranceZone: $enduranceZone
    ptot: $ptot
    watchHeartRate: $watchHeartRate
    watchPressure: $watchPressure
    cda: $cda
    intervalZone: $intervalZone
    pacc: $pacc
    watchHeading: $watchHeading
    longitude: $longitude
    latitude: $latitude
    watchLocationQuality: $watchLocationQuality
    eqBreathingRate: $eqBreathingRate
    watchCadence: $watchCadence
    pair: $pair
    eqCoreTemp: $eqCoreTemp
    eqSkinTemp: $eqSkinTemp
    eqHeartRate: $eqHeartRate
    aeroPressure: $aeroPressure
    androidBattery: $androidBattery
    watchTemperature: $watchTemperature
    mo2Battery: $mo2Battery
  ) {
    id
    ts
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
}
`;
export const createAssetTable6ce042e = `mutation CreateAssetTable6ce042e($input: CreateAssetTable6ce042eInput!) {
  createAssetTable6ce042e(input: $input) {
    id
    ts
  }
}
`;
export const updateAssetTable6ce042e = `mutation UpdateAssetTable6ce042e($input: UpdateAssetTable6ce042eInput!) {
  updateAssetTable6ce042e(input: $input) {
    id
    ts
  }
}
`;
export const deleteAssetTable6ce042e = `mutation DeleteAssetTable6ce042e($input: DeleteAssetTable6ce042eInput!) {
  deleteAssetTable6ce042e(input: $input) {
    id
    ts
  }
}
`;
