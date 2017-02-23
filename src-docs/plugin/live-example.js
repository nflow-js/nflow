
exports.defineTags = function (dictionary) {
  dictionary.defineTag('demo', {
    onTagged: function (doclet, tag) {
      var caption
      var code
      if (!doclet.demo) { doclet.demo = [] }
      if (tag.value.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
        caption = RegExp.$1
        code = RegExp.$3
      }
      doclet.demo.push({
        caption: caption || '',
        code: code || tag.value
      })
    }
  })
}
