const InlBirdIbsTh2 = require('inkbird_ibs-th2_plus');
let  blu_mac        = "XX:XX:XX:XX:XX:XX";
let  ble_ctl_path   = "/home/pi/homebridge-sensor/node_modules/inkbird_ibs-th2_plus/";

let wosendor = new InlBirdIbsTh2 (blu_mac, ble_ctl_path, function (error, value) {
    console.log (value);
    console.log (error);
});
