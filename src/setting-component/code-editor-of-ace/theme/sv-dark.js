/* eslint-disable */
var ace = require('brace')

ace.define(
  'ace/theme/sv-dark',
  ['require', 'exports', 'module', 'ace/lib/dom'],
  function(acequire, exports, module) {
    exports.isDark = true
    exports.cssClass = 'ace-sv-dark'
    exports.cssText =
      '.ace-sv-dark .ace_gutter {\
background: #ffffff;\
color: #8F908A\
}\
.ace-sv-dark .ace_print-margin {\
width: 1px;\
background: #555651\
}\
.ace-sv-dark {\
background-color: #23292f;\
color: #F8F8F2\
}\
.ace-sv-dark .ace_cursor {\
color: #F8F8F0\
}\
.ace-sv-dark .ace_marker-layer .ace_selection {\
background: #49483E\
}\
.ace-sv-dark.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #272822;\
}\
.ace-sv-dark .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-sv-dark .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #49483E\
}\
.ace-sv-dark .ace_marker-layer .ace_active-line {\
background: #202020\
}\
.ace-sv-dark .ace_gutter-active-line {\
background-color: #272727\
}\
.ace-sv-dark .ace_marker-layer .ace_selected-word {\
border: 1px solid #49483E\
}\
.ace-sv-dark .ace_invisible {\
color: #52524d\
}\
.ace-sv-dark .ace_entity.ace_name.ace_tag,\
.ace-sv-dark .ace_keyword,\
.ace-sv-dark .ace_meta.ace_tag,\
.ace-sv-dark .ace_storage {\
color: #F92672\
}\
.ace-sv-dark .ace_punctuation,\
.ace-sv-dark .ace_punctuation.ace_tag {\
color: #fff\
}\
.ace-sv-dark .ace_constant.ace_character,\
.ace-sv-dark .ace_constant.ace_language,\
.ace-sv-dark .ace_constant.ace_numeric,\
.ace-sv-dark .ace_constant.ace_other {\
color: #AE81FF\
}\
.ace-sv-dark .ace_invalid {\
color: #F8F8F0;\
background-color: #F92672\
}\
.ace-sv-dark .ace_invalid.ace_deprecated {\
color: #F8F8F0;\
background-color: #AE81FF\
}\
.ace-sv-dark .ace_support.ace_constant,\
.ace-sv-dark .ace_support.ace_function {\
color: #66D9EF\
}\
.ace-sv-dark .ace_fold {\
background-color: #A6E22E;\
border-color: #F8F8F2\
}\
.ace-sv-dark .ace_storage.ace_type,\
.ace-sv-dark .ace_support.ace_class,\
.ace-sv-dark .ace_support.ace_type {\
font-style: italic;\
color: #66D9EF\
}\
.ace-sv-dark .ace_entity.ace_name.ace_function,\
.ace-sv-dark .ace_entity.ace_other,\
.ace-sv-dark .ace_entity.ace_other.ace_attribute-name,\
.ace-sv-dark .ace_variable {\
color: #A6E22E\
}\
.ace-sv-dark .ace_variable.ace_parameter {\
font-style: italic;\
color: #FD971F\
}\
.ace-sv-dark .ace_string {\
color: #E6DB74\
}\
.ace-sv-dark .ace_comment {\
color: #75715E\
}\
.ace-sv-dark .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
}'
    var dom = acequire('../lib/dom')
    dom.importCssString(exports.cssText, exports.cssClass)
  }
)
