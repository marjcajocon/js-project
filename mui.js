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
	return  {
		core: function() { return btn; },
		container: function() { return btn; }
	}
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

    return  {
    	core: function() { return input; },
    	container: function() { return div; }
    };
};

var MPanel = function() {
	var panel = new JPanel().addClass("mui-panel");
	return {
		core: function() { return panel; },
		container: function() { return panel; }
	};
};


var MDropDown = function(main_button, l_w) {

	// <div class="mui-dropdown">
	//   <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
	//     Dropdown
	//     <span class="mui-caret"></span>
	//   </button>
	//   <ul class="mui-dropdown__menu">
	//     <li><a href="#">Option 1</a></li>
	//     <li><a href="#">Option 2</a></li>
	//     <li><a href="#">Option 3</a></li>
	//     <li><a href="#">Option 4</a></li>
	//   </ul>
	// </div>

	var panel = new JPanel();
	panel.addClass("mui-dropdown");
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

	return {
		core: function() { return panel; },
		container: function() { return panel; }
	};
};