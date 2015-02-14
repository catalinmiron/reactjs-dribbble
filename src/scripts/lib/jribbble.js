/**
 * Jribbble v@VERSION
 * A jQuery-free version of the JavaScript Dribbble API wrapper
 * http://dribbble.com/api
 *
 * Copyright (c) 2013 Tyler Gaw
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Build Date: @DATE
 *
 */
var jribbble;

(function (exports) {
    // CommonJS
    if (typeof module !== "undefined" && module.exports) {
        module.exports = exports;
    }
    // AMD
    else if (typeof define === "function") {
        define(exports);
    }
    // <script>
    else {
        jribbble = exports;
    }
}((function () {
    'use strict';

    var exports = {};

    //Thanks to Kevin Hakanson
    //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/873856#873856
    var uuid = function () {
        var s = [],
            hexDigits = '0123456789ABCDEF',
            i = 0;

        for (i = 0; i < 32; i += 1) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }

        s[12] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
        s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

        return s.join('');
    };

    var jsonpGET = function (path, args) {
        var script = document.createElement('script'),
            callbackName = 'jribbble_' + uuid(),
            url = 'http://api.dribbble.com' + path + '?callback=' + callbackName;

        // Looking for the paging options so we can add them to the query string
        if (args.length > 1) {
            for (var opt in args[1]) {
                url += '&' + opt + '=' + args[1][opt];
            }
        }

        window[callbackName] = function (data) {
            if (typeof (data) === 'undefined') {
                args[0]({error: true});
            }
            else {
                args[0](data);
            }

            // Garbage collect
            script.parentNode.removeChild(script);
            window[callbackName] = undefined;
        };

        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    var methods = {
        'getShotById': '/shots/$/',
        'getReboundsOfShot': '/shots/$/rebounds/',
        'getShotsByList': '/shots/$/',
        'getShotsByPlayerId': '/players/$/shots/',
        'getShotsThatPlayerFollows': '/players/$/shots/following/',
        'getPlayerById': '/players/$/',
        'getPlayerFollowers': '/players/$/followers/',
        'getPlayerFollowing': '/players/$/following/',
        'getPlayerDraftees': '/players/$/draftees/',
        'getCommentsOfShot': '/shots/$/comments/',
        'getShotsThatPlayerLikes': '/players/$/shots/likes/'
    };

    var createAPIMethod = function (urlPattern) {
        return function () {
            var // Convert arguments to a real Array
                args = [].slice.call(arguments),

                // We run shift() on args here because we don't need to send
                // the first argument to jsonpGET.
                url = urlPattern.replace('$', args.shift());

            jsonpGET(url, args);
        };
    };

    for (var method in methods) {
        exports[method] = createAPIMethod(methods[method]);
    }

    return exports;
}())));
