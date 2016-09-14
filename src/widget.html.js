function loadScript() {
  var ak = queryString().ak || 'YIE3NeIyCU0OiZkcys9w8g7H9tKQ4KMf';
  var script = document.createElement("script");
  script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=initialize"; //此为v2.0版本的引用方式
  document.body.appendChild(script);
}

function queryString() {
  var e = window.location.href,
    r;
  var t = e.slice(e.indexOf("?") + 1).split("&");
  var a = [];
  for (i = 0; i < t.length; i++) {
    r = t[i].split("=");
    a.push(r[0]);
    a[r[0]] = decodeURI(r[1])
  }
  return a
}

function initialize() {
  var options = queryString();

  var mapElem = document.getElementById('map');
  if(options.height) {
    mapElem.style.height = options.height + 'px';
  }

  var map = new BMap.Map('map');

  if (options.center) {
    var d = options.center.split(',');
    var point = new BMap.Point(d[0], d[1])
    map.centerAndZoom(point, parseInt(d[2]));
  }

  if(options['control-navigation']) {
    var opt = anchorOption(options['control-navigation'])
    map.addControl(new BMap.NavigationControl(opt));
  }

  if(options['control-overview']) {
    var opt = anchorOption(options['control-overview'])
    map.addControl(new BMap.OverviewMapControl(opt));
  }

  if(options['control-scale']) {
    var opt = anchorOption(options['control-scale'])
    map.addControl(new BMap.ScaleControl(opt));
  }

  if(options['control-maptype']) {
    var opt = anchorOption(options['control-maptype'])
    map.addControl(new BMap.MapTypeControl(opt));
  }

  if(options['control-geolocation']) {
    var opt = anchorOption(options['control-geolocation'])
    map.addControl(new BMap.GeolocationControl(opt));
  }

  if (options.marker) {
    var d = options.marker.split(',');
    var point = new BMap.Point(d[0], d[1])

    var marker = new BMap.Marker(point);
    map.addOverlay(marker);

    if(options.markerlabel) {
      marker.setLabel(new BMap.Label(options.markerlabel, {
        offset: new BMap.Size(0, -18)
      }));
    }
  }

  if (options.infoWindow) {
    var infoWindow = new BMap.InfoWindow(label, {
      title: 'test'
    });
    marker.addEventListener("click", function() {
      map.openInfoWindow(infoWindow, point);
    });
    map.openInfoWindow(infoWindow, point);
  }

}

function anchorOption(anchor) {
  var anchorEnum = {
    'top left': BMAP_ANCHOR_TOP_LEFT,
    'top right': BMAP_ANCHOR_TOP_RIGHT,
    'bottom left': BMAP_ANCHOR_BOTTOM_LEFT,
    'bottom right': BMAP_ANCHOR_BOTTOM_RIGHT,
  }[anchor];

  if(anchorEnum != undefined) {
    return {anchor: anchorEnum}
  } else {
    return {};
  }
}

window.onload = loadScript;
