(function(d) {

  function queryClass(className) {
    if (d.querySelectorAll) {
      return d.querySelectorAll('.' + className)
    }
  }

  function queryDataAttributes(element) {
    var attributes = element.attributes;
    var data = {}
    for (var i = 0; i < attributes.length; i++) {
      var attr = attributes[i];
      if (attr.name.startsWith('data-')) {
        data[attr.name.substring(5, attr.name.length)] = attr.nodeValue;
      }
    }
    return data;
  }

  function toQueryString(options) {
    var params = []
    for(var key in options) {
      params.push(key + '=' + options[key]);
    }
    return params.join('&')
  }

  function render(widget) {
    var baseurl = 'http://baidu-map-widget.basten.me/widget.html';
    var options = queryDataAttributes(widget);

    var iframe = d.createElement('iframe');
    iframe.setAttribute('id', 'TODO');
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('scrolling', 0);
    iframe.setAttribute('allowtransparency', true);

    var url = baseurl + '?' + toQueryString(options);
    iframe.src = url;
    widget.parentNode.replaceChild(iframe, widget);
  }

  var widgets = queryClass('baidu-map-widget');
  for (var i = 0; i < widgets.length; i++) {
    render(widgets[i]);
  }
})(document)
