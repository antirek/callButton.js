var css = '{{insertedCss}}'
var s = document.createElement('style');
s.setAttribute('type', 'text/css');

if (s.styleSheet) {
    s.styleSheet.cssText = css;
} else {
    s.appendChild(document.createTextNode(css));
}

document.head.appendChild(s);