"use strict";

function AppForm(input_class) {
  this.input = input_class; 
  this.data = {};
  
  this.__process = function() {
    var input = App.class(this.input);
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
  var appForm = new AppForm(input_class);
  return appForm;
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
