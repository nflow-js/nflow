// exports.handlers = {
//     newDoclet: function(e) {
//         // e.doclet will refer to the newly created doclet
//         // you can read and modify properties of that doclet if you wish
//         if (typeof e.doclet.description === 'string') {
//             e.doclet.description = e.doclet.description.toUpperCase()+'!!!';
//         }
//     }
// };
exports.defineTags = function (dictionary) {
  dictionary.defineTag('codepen', {
    onTagged: function (doclet, tag) {
      if (!doclet.codepen) { doclet.codepen = [] }
      doclet.codepen.push(tag.value)

      doclet.description += '<p data-height="300" data-theme-id="light" data-slug-hash="' + tag.value + '" data-default-tab="js,result" data-user="nflow" data-embed-version="2" data-preview="false" data-editable="true" class="codepen">See the Pen <a href="http://codepen.io/nflow/pen/' + tag.value + '/">nflow example</a> by Ⓩⓞⓛⓣⓐⓝ Bourne (<a href="http://codepen.io/nflow">@nflow</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="http://assets.codepen.io/assets/embed/ei.js"></script>'
    }
  })
}
