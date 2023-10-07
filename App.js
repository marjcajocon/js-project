"use strict";

function FormInfo(input_class) {
  this.input = input_class; 
  this.data = {};
  
  this.__process = function() {
    var input = AppClass(this.input);
    var input_len = input.length;
    for (var i = 0;i < input_len; i++) {
      this.data[input[i].attributes.name.nodeValue] = input[i].value;
    }
  };

  this.getData = function() {
    return this.data;
  };

  this.__process();
}
// end class

var AppComponent = {};

var AppId = function(_id) {
  return document.getElementById(_id);
};

var AppClass = function(_class) {
  return document.getElementsByClassName(_class);
};

var AppAlert = function(_m) {
  alert(_m);
};

var AppRoute = function(_id, _html, _param) {
  var param = _param || {};
  if (typeof(_html) == "function") {
    AppId(_id).innerHTML = _html(true, param);
    _html(false, param);
  }
  else { 
    AppAlert("Invalid App gui");
  }
};

var AppForm = function(input_class) {
  var appForm = new FormInfo(input_class);
  return appForm.getData();
};

var AppFormClear = function(input_class) {
  var el = AppClass(input_class);
  for (var x of el) {
    x.value = "";
  }
};

var AppIdEvent = function(_el, _e, _calback) {
  var x = AppId(_el);
  x.addEventListener(_e, function(e) {
    _calback(e);
  });
};

var AppClassEvent = function(_el, _e, _calback) {
  var x = AppClass(_el);
  var callback = _calback || null;
  var evt = _e || null;
  if (evt == null) {
    alert("Invalid Event");
    return;
  } 
  if (callback == null) {
    alert("Invalid callback");
    return;
  }
  for (var y of x) {
    y.addEventListener(evt, function(e) {
      _calback(e);
    });
  }
};


var AppConfig = {
  url: "http://127.0.0.1:8083",
  token: null
};

var AppHttp = function(_url, _data, _param) {
  var url = _url || null;
  var data = _data || null;
  var param = _param || {};
  
  var method = param["method"] || "POST";
  var headers = param["headers"] || [];

  var xml = new XMLHttpRequest();
  xml.open(method, `${AppConfig["url"]}${url}`);
  if (data instanceof FormData) {
    //xml.setRequestHeader("Content-Type", "application/json");
  } else if (typeof(data) == "object") {
    xml.setRequestHeader("Content-Type", "application/json");
    data = JSON.stringify(data);
  }
  if (AppConfig.token != null) {
    xml.setRequestHeader("Auth", `_token=${AppConfig.token}`);
  }
  for (var h of headers) {
    xml.setRequestHeader(h[0], h[1]);
  }
  if (method.toLowerCase() == "get") {
    data = null;
  } 
  xml.send(data);
  return xml;
};

