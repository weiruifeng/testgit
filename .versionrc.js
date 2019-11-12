/**
 * https://github.com/leonardoanalista/cz-customizable
 */
module.exports = {
  types: {
    "description": "An array of `type` objects representing the explicitly supported commit message types, and whether they should show up in generated `CHANGELOG`s.",
    "type": "array",
    "items": {
      "$ref": "#/definitions/type"
    },
    "default": [
      { "type": "feat", "section": "Features" },
      { "type": "fix", "section": "Bug Fixes" },
      { "type": "chore", "hidden": true },
      { "type": "docs", "section": "Document" },
      { "type": "style", "hidden": true },
      { "type": "refactor", "hidden": true },
      { "type": "perf", "hidden": true },
      { "type": "test", "hidden": true }
    ]
  }
  changelogHeader: '# Changelog'
};