//  Copyright (c) 2018 Readium Foundation and/or its licensees. All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without modification,
//  are permitted provided that the following conditions are met:
//  1. Redistributions of source code must retain the above copyright notice, this
//  list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//  this list of conditions and the following disclaimer in the documentation and/or
//  other materials provided with the distribution.
//  3. Neither the name of the organization nor the names of its contributors may be
//  used to endorse or promote products derived from this software without specific
//  prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
//  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
//  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
//  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
//  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
//  OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
//  OF THE POSSIBILITY OF SUCH DAMAGE.

//'text!empty:'
import Globals from './globals';
import '../lib/console_shim';
import 'es6-collections';
import EventEmitter from 'eventemitter3';
import PluginsController from './plugins_controller';

// TODO: refactor client code to use emit instead of trigger?
EventEmitter.prototype.trigger = EventEmitter.prototype.emit;

// Plugins bootstrapping begins
Globals.Plugins = PluginsController;
Globals.on(Globals.Events.READER_INITIALIZED, function(reader) {

    Globals.logEvent("READER_INITIALIZED", "ON", "globalsSetup.js");

    try {
        PluginsController.initialize(reader);
    } catch (ex) {
        console.error("Plugins failed to initialize:", ex);
    }

    _.defer(function() {
        Globals.logEvent("PLUGINS_LOADED", "EMIT", "globalsSetup.js");
        Globals.emit(Globals.Events.PLUGINS_LOADED, reader);
    });
});

//TODO: plugins replacement
// if (window._RJS_isBrowser) {
//     // If under a browser env and using RequireJS, dynamically require all plugins
//     var pluginsList = window._RJS_pluginsList;
//     console.log("Plugins included: ", pluginsList.map(function(v) {
//         // To stay consistent with bundled output
//         return v.replace('readium_plugin_', '');
//     }));
//
//     require(pluginsList);
// } else {
//     // Else list which plugins were included when using almond and bundle(s)
//     setTimeout(function() {
//         // Assume that in the next callback all the plugins have been registered
//         var pluginsList = Object.keys(PluginsController.getLoadedPlugins());
//         console.log("Plugins included: ", pluginsList);
//     }, 0);
// }
// // Plugins bootstrapping ends
