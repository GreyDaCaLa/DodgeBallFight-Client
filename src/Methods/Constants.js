
const GLOBAL_SETTINGS = {
    onlineserver: false,
    ENDPOINTonline:  'https://ghk-cpminecraft.herokuapp.com/',
    ENDPOINToffline: "http://localhost:5000",
    ENDPOINT: "http://localhost:5000",

    mapsizeWidth: 20,
    mapsizeHeight: 10,
    mapBorderThinkness: 2,

    WorldConstants: {
        acc: [0, -0.01, 0],
        vel: [0, 0, 0],
        speedHoz: 0.1,
        speedVert: 0.1,
        jumpAcc: [0, 1, 0],
      },

}

  GLOBAL_SETTINGS.ENDPOINT = GLOBAL_SETTINGS.onlineserver?GLOBAL_SETTINGS.ENDPOINTonline:GLOBAL_SETTINGS.ENDPOINToffline


export default GLOBAL_SETTINGS