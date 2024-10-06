var xhttp = function(url, param) {
        var x_param = {
            "method": "GET",
            "body": null,
            "header": {}
        };

        if (typeof(param) == "object") {
            if ("method" in param) {
                x_param["method"] = param["method"].toUpperCase();
            }
            if ("body" in param) {
                if (typeof(param["body"]) == "object") {
                    x_param["body"] = JSON.stringify(param["body"]);
                } else {
                    x_param["body"] = param["body"];
                }
            }

            if ("header" in param && typeof(param["header"]) == "object") {
                // param must be an object
                x_param["header"] = param["header"];
            }
        }
        
        var xml = new XMLHttpRequest();
        xml.open(x_param["method"], url);

        if ("body" in param && typeof(param["body"]) == "object") {
            xml.setRequestHeader("Content-Type", "application/json");
        }

        for (var key in x_param["header"]) {
            xml.setRequestHeader(key, x_param["header"][key]);
        }

        xml.send(x_param["body"]);
        
        var ret = {
            then: function(fn) {
                xml.addEventListener("load", function() {
                    fn(this.response);
                });
                return this;
            },
            error: function(fn) {
                xml.addEventListener("error", function() {
                    fn(this);
                });
                return this;
            }
        };

        return ret;
    };
