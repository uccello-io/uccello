webpackJsonp([3],{2:function(n,e,t){n.exports=t("95Ql")},"95Ql":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(n){var e=t("cSW6"),o=function(){function n(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}();new(function(){function t(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.lazyLoad()}return o(t,[{key:"lazyLoad",value:function(){switch(n('meta[name="page"]').attr("content")){case"index":new e.a}}}]),t}())}.call(e,t("7t+N"))},cSW6:function(n,e,t){"use strict";(function(n){t.d(e,"a",function(){return a});var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}();var a=function(){function e(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.initCheckboxListener()}return o(e,[{key:"initCheckboxListener",value:function(){var e=n('meta[name="domain"]').attr("content");n("input[type='checkbox'].module-activation").on("click",function(t){var o=t.currentTarget,a=n(o).data("module"),r=!0===n(o).is(":checked")?"1":"0";document.location.href=laroute.route("uccello.module.activation",{domain:e,src_module:a,active:r})})}}]),e}()}).call(e,t("7t+N"))}},[2]);