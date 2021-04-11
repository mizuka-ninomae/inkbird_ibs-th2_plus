const child_process = require ('child_process');
const path          = require ('path');
const AsyncLock     = require ('async-lock');


class InlBirdIbsTh2 {
  constructor (ble_mac, ble_ctl_path = '/usr/local/lib/node_modules/inkbird_ibs_th2_plus/', callback) {
    const lock = new AsyncLock ();
    lock.acquire ('ble_key', function () {
      const ble_ctl = child_process.fork (path.join (ble_ctl_path, 'noble_ctl.js'));

      ble_ctl.send (ble_mac);

      ble_ctl.on ('message', function (json) {
        let buf = json.message.manufacturerData.data;
        ble_ctl.kill ('SIGINT');
          callback (null, {
            te: Math.round ((buf[1] << 8 | buf[0]) / 10) / 10,
            hu: Math.round ((buf[3] << 8 | buf[2]) / 10) / 10,
            bt: buf[7]
          });
          return;
      })

      ble_ctl.on ('error', function (error) {
        callback (error, null);
        return;
      })
    }
  )}
}

if (require.main === module) {
  new InlBirdIbsTh2 (process.argv[2], process.argv[3], function (error, value) {
    console.log (value);
    console.log (error);
  });
}
else {
  module.exports = InlBirdIbsTh2;
}
