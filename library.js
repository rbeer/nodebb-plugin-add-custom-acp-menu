'use strict';

var AddACPMenu = {};

AddACPMenu.addPluginMenu = function(header, callback) {
    header.custom_menu = [{
            "icon": 'fa-location-arrow',
            "route": '/link1.html',
            "name": 'Link1'
        },
        {
            'icon': 'fa-location-arrow',
            'route': '/link2.html',
            'name': 'Link2'
        }
    ];
    callback(null, header);
};
module.exports = AddACPMenu;
