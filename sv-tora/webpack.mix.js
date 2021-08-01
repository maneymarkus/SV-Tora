const mix = require('laravel-mix');

/*
 | Only used for css bundling!
 |
 */

mix
    .disableNotifications()
    .css('resources/css/app.css', 'public/css');
