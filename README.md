![npm download](https://img.shields.io/npm/dt/baidu_map.svg)
![npm version](https://img.shields.io/npm/v/baidu_map.svg)

nodejs sdk for http://lbsyun.baidu.com/index.php?title=webapi (Baidu map)

## APIs

See [Baidu Web API Doc](http://lbsyun.baidu.com/index.php?title=webapi)

## Installation

```sh
$ npm install baidu_map
```

## General Usage
```js
var BaiduMap = require('baidu_map');

// Get an api object for a certain ak/sk
var baiduMap = BaiduMap({ak: 'ak', sk: 'sk'});

// Supported API
{
  geocoder: "/geocoder/v2/",
  direction: "/direction/v1",
  directionRouteMatrix: "/direction/v1/routematrix",
  locationIp: "/location/ip",
  geoconv: "/geoconv/v1/",
  placeSuggestion: "/place/v2/suggestion/",
  placeSearch: "/place/v2/search",
  placeEventSearch: "/place/v2/eventsearch",
  placeEventDetail: "/place/v2/eventdetail"
}

// Sample call
baiduMap.geocoder({city: '深圳市', address: 'some where'}, (err, res, body) => {
  // do something with the response
});
```

## License

![license](https://img.shields.io/npm/l/deo-youzan.svg)