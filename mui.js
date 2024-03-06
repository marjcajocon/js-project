var MButton = function(text, _color, _variant, _size) {
	var mui = "mui-btn--";

	var color = _color || "";
	var type = _type || "";
	var size = _size || "";

	color = mui + _color;
	type = mui + _variant;
	size = mui + _size;

	var btn = new JButton(text);
	btn.setAttr({
			"class": "mui-btn " + color + " " + type + " " + size
		});
	return  btn;
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

        return  div;
};

var MPanel = function() {
	return new JPanel().addClass("mui-panel");
};
