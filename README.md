##How can I add a section in the Admin Menu?
[This has been requested in the official NodeBB forums.](https://community.nodebb.org/topic/6057/how-can-i-add-a-section-in-the-admin-menu)

To do this you want to:
* Edit [/src/views/admin/partials/menu.tpl](https://github.com/NodeBB/NodeBB/blob/master/src/views/admin/partials/menu.tpl), as well as [/src/middleware/admin.js](https://github.com/NodeBB/NodeBB/blob/master/src/admin.js).
* Use the hook `filter:admin.header.build` in a plugin.

First, add
```html
<!-- IF custom_menu.length -->
  <div class="sidebar-nav">
    <ul class="nav nav-list">
      <li class="nav-header"><i class="fa fa-fw fa-th"></i>CUSTOM MENU</li>
      <!-- BEGIN custom_menu -->
      <li>
        <a href="{relative_path}/admin{custom_menu.route}">
        <!-- IF custom_menu.icon -->
        <i class="fa {custom_menu.icon}"></i>
        <!-- ENDIF custom_menu.icon -->
        {custom_menu.name}
        </a>
      </li>
    <!-- END custom_menu -->
    </ul>
  </div>
<!-- ENDIF custom_menu.length -->
```
to /src/views/admin/partials/menu.tpl.

Then, add
```js
custom_menu: results.custom_header.custom_menu,
```
to
```js
var data = {
  relative_path: nconf.get('relative_path'),
  configJSON: JSON.stringify(results.config),
  user: userData,
  userJSON: JSON.stringify(userData).replace(/'/g, "\\'"),
  plugins: results.custom_header.plugins,
  authentication: results.custom_header.authentication,
  scripts: results.scripts,
  'cache-buster': meta.config['cache-buster'] ? 'v=' + meta.config['cache-buster'] : '',
  env: process.env.NODE_ENV ? true : false,
};
```
(around line 100) in /src/middleware/admin.js.

As for the plugin: You are looking at it! :stuck_out_tongue:

In a nutshell, the same aproach as you would add a normal "Installed Plugins" entry, with the exception that you define your own collection, hence the need to change the two core files. :)
