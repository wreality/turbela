/* eslint-env node */
module.exports = {
  vueFilesPath: './src/**', // The vue file(s) you want to extract i18n strings from. It can be a path to a folder or to a file. It accepts glob patterns. (ex. *, ?, (pattern|pattern|pattern)
  languageFilesPath: './src/i18n', //The language file(s) you want to compare your vue file(s) to. It can be a path to a folder or to a file. It accepts glob patterns (ex. *, ?, (pattern|pattern|pattern)
  options: {
    output: false, // false | string => Use if you want to create a json file out of your report. (ex. output.json)
    add: false,
    dynamic: false,
  },
}
