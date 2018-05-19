cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-sqlite-evcore-extbuild-free.SQLitePlugin",
        "file": "plugins/cordova-sqlite-evcore-extbuild-free/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-evcore-extbuild-free",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "id": "cordova-plugin-console.console",
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    },
    {
        "id": "cordova-plugin-console.logger",
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "id": "phonegap-plugin-push.PushNotification",
        "file": "plugins/phonegap-plugin-push/www/push.js",
        "pluginId": "phonegap-plugin-push",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata =
// TOP OF METADATA
{
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-dialogs": "1.2.1",
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-sqlite-evcore-extbuild-free": "0.9.0",
    "cordova-plugin-console": "1.0.7",
    "phonegap-plugin-push": "1.10.5",
    "cordova-plugin-splashscreen": "4.0.3"
};
// BOTTOM OF METADATA
});
