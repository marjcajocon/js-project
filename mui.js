var MButton = function(text, _color, _variant, _size) {
	var mui = "mui-btn--";

	var color = _color || "";
	var type = _variant || "";
	var size = _size || "";

	color = mui + _color;
	type = mui + _variant;
	size = mui + _size;

	var btn = new JButton(text);
	btn.setAttr({
			"class": "mui-btn " + color + " " + type + " " + size
		});
	this.core = function() {return btn};
	this.container = function() {return btn};
};

var MInput = function(label_txt, type, variant) {

	var label_txt = label_txt || "";
	var type = type || "text";
	var variant = variant || ""; //float

	if (variant != "") {
		variant = "mui-textfield--" + variant + "-label";
	}

	var mui = "mui-textfield";

	var div = new JPanel().setAttr({
		"class": "mui-textfield" + " " + variant
	});

	var input = new JInput();
	var label = new JLabel().setText(label_txt);

	div.add(input).add(label);

    	this.core = function() {return input};
    	this.container = function() {return div};
};

var MPanel = function() {
	var panel = new JPanel().addClass("mui-panel");
	this.core = function() {return panel};
	this.container = function() {return panel};
};


var MDropDown = function(main_button, l_w, _dir) {

	var dir = "mui-dropdown--" + _dir || "";

	var panel = new JPanel();
	panel.addClass("mui-dropdown");
	panel.addClass(dir);

	main_button.setAttr({ "data-mui-toggle": "dropdown" });
	panel.add(main_button);

	var ul = new JUl();
	ul.addClass("mui-dropdown__menu");
	panel.add(ul);

	var len = l_w.length;
	for (var i = 0; i < len; i++) {
		var li = new JLi();
		li.add(l_w[i]);
		ul.add(li);
	}

	this.core = function() { return panel; };
	this.container = function() { return panel; };

};


var MTable = function(header, type) {
	var header = header || [];
	var type = "mui-table--" + type || null;
	var tbl = new JTable();
	tbl.addClass("mui-table");
	if (type != null) {
		tbl.addClass(type);
	}
	var hlen = header.length;
	var thead = new JThead();
	var tr = new JTr();
	thead.add(tr);
	for (var i = 0; i < hlen; i++) {
		var th = new JTh();
		th.setText(header[i]);
		tr.add(th);
	}
	tbl.add(thead);

	var tbody = new JTbody();
	tbl.add(tbody);
	this.core = function() {
		return tbl;
	};
	this.container = function() {
		return tbl;
	};

	this.addRow = function(data) {
		var data = data || [];
		var data_len = data.length;
		var tr = new JTr();
		for (var i = 0; i < data_len; i++) {
			var td = new JTd();
			if (typeof(data[i]) == "object") {
				td.add(data[i]);
			} else {
				td.setText(data[i]);
			}
			tr.add(td);
		}
		tbody.add(tr);
	};
};
