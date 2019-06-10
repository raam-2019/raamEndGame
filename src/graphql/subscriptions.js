// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateTodo = `subscription OnCreateTodo {
  onCreateTodo {
    id
    name
    description
  }
}
`;
export const onUpdateTodo = `subscription OnUpdateTodo {
  onUpdateTodo {
    id
    name
    description
  }
}
`;
export const onDeleteTodo = `subscription OnDeleteTodo {
  onDeleteTodo {
    id
    name
    description
  }
}
`;
export const rider = `subscription Rider {
  rider {
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
    elevation
  }
}
`;
export const onCreateAssetTable6ce042e = `subscription OnCreateAssetTable6ce042e($id: String, $ts: Int) {
  onCreateAssetTable6ce042e(id: $id, ts: $ts) {
    id
    ts
  }
}
`;
export const onUpdateAssetTable6ce042e = `subscription OnUpdateAssetTable6ce042e($id: String, $ts: Int) {
  onUpdateAssetTable6ce042e(id: $id, ts: $ts) {
    id
    ts
  }
}
`;
export const onDeleteAssetTable6ce042e = `subscription OnDeleteAssetTable6ce042e($id: String, $ts: Int) {
  onDeleteAssetTable6ce042e(id: $id, ts: $ts) {
    id
    ts
  }
}
`;
