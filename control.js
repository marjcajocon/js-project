var Button = function(label, color, type) {
    var label = label || ''; /* Label of the button */
    var color = color || ''; /* primary, danger, accent */
    var type = type || ''; /* flat, raised, fab */ /* fab is a circular button */

    var b = new JButton(label).addClass('mui-btn');
    if (color != '') {
        b.addClass('mui-btn');
        b.addClass('mui-btn--' + color);
    }
    if (type != '') {
        b.addClass('mui-btn--' + type);
    }

    this.control = function() {
        return b;
    };
};


var TextField = function(label, is_float) {
    var label = label || '';
    var is_float = is_float || ''; /* float or if not empty then auto matic to float */

    var panel = new JPanel();
    panel.addClass('mui-textfield');

    if (is_float != '') {
        panel.addClass('mui-textfield--float-label');
    }

    var tf = new JTextField();

    panel.add(tf);

    if (label != '') {
        var labelo = new JLabel(label);
        panel.add(labelo);
    }
    
    this.textfield = function() {
        return tf;
    };
    
    this.control = function() {
        return panel;
    };
};
