"use strict";

var format = require('./format'),
    replace = format.replace;
var translations = require('./translations'),
    set = translations.set,
    fetch = translations.fetch;

module.exports = {
  install: function (Vue, translations) {
    set(translations);

    Vue.directive('locale', {
      params: ['key', 'replace'],

      update: function(locale) {
        var translated_substrings = this.vm.$t(this.params.key, this.params.replace).split('|');
        var children = this.el.children;

        for(var i = 0; i < children.length; i++) {
          if(translated_substrings[i]) {
            children[i].innerText = translated_substrings[i];
          }
        }
      }
    });

    Vue.prototype.$t = function(key, replacements) {
      if(typeof replacements !== 'object') {
          replacements = {};
      }

      var locale = replacements['locale'] || this.$root.locale;
      var translation = fetch(locale, key);

      return replace(translation, replacements);
    };

    Vue.filter('translate', function(key, replacements) {
      if(typeof replacements !== 'object') {
            replacements = {};
      }

      return this.$t(key, replacements)
    })
  }
};
