'use strict';
var request = require('request');
var qs = require('querystring');
var md5 = require('md5');

const OUTPUT_VALUES = ['json', 'xml'];

function BaiduMap(config) {
  this.ak = config.ak;
  this.sk = config.sk;
  this.output = OUTPUT_VALUES.indexOf(config.output) !== -1 ? config.output : 'json';
  this.apiBase = 'http://api.map.baidu.com';
}

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

function generateSn(url, data, sk) {
  const keys = qs.stringify(data, null, null, {
    encodeURIComponent: fixedEncodeURIComponent
  });
  return md5(fixedEncodeURIComponent(url + '?' + keys + sk));
}

BaiduMap.prototype.doGetSn = function(url, data, callback) {
  const defaultData = {
    output: this.output,
    ak: this.ak,
    timestamp: Date.now(),
  };
  Object.assign(data, defaultData);
  if (this.sk) {
    data.sn = generateSn(url, data, this.sk);
  }
  const opts = {
    baseUrl: this.apiBase,
    url: url,
    json: this.output === 'json',
    method: 'GET',
    qs: data,
    useQuerystring: true
  };

  request(opts, callback);
};

const api_list = {
  // TODO:
  // http://lbsyun.baidu.com/index.php?title=static
  // http://lbsyun.baidu.com/index.php?title=yingyan/api/all
  // http://lbsyun.baidu.com/index.php?title=viewstatic
  // http://lbsyun.baidu.com/index.php?title=uri
  geocoder: "/geocoder/v2/",
  direction: "/direction/v1",
  directionRouteMatrix: "/direction/v1/routematrix",
  locationIp: "/location/ip",
  geoconv: "/geoconv/v1/",
  placeSuggestion: "/place/v2/suggestion/",
  placeSearch: "/place/v2/search",
  placeDetail: "/place/v2/detail",
  placeEventSearch: "/place/v2/eventsearch",
  placeEventDetail: "/place/v2/eventdetail"
};

function addAPI(name, url) {
  BaiduMap.prototype[name] = function(params, callback) {
    this.doGetSn(url, params, callback);
  };
}

for (const api in api_list) {
  addAPI(api, api_list[api]);
}

module.exports = config => new BaiduMap(config);