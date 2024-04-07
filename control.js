var ControlConfig = {
    TextColor: ['dark', 'dark-secondary', 'dark-hint', 'light', 'light-secondary', 'light-hint', 'accent', 'accent-secondary', 'accent-hint', 'black', 'white', 'danger'],
    TextSize: ['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subhead', 'body2', 'body1', 'caption', 'menu', 'button'],
    Colors: ['primary', 'danger', 'accent'],
    ButtonType: ['flat', 'raised', 'fab'],
    TextFieldType: ['float'],
    TableType: ['bordered'],
    TabType: ['justified'],
    Direction: ['right', 'left', 'up', 'bottom'],
    GridType: ['md', 'xs', 'lg', 'sm', 'xl', 'md-offset', 'xs-offset', 'lg-offset', 'sm-offset', 'xl-offset'], //        var reg = new RegExp('^[md|xs|lg|sm|xl]\-$');
    tostr: function(ls) {
        var ret = '';
        for (var i in ls) {
            ret += ls[i] + ','
        }
        return ret;
    }
};
var __isValidConfig = function(n, ls) {
    for (var i in ls) {
        if (n == ls[i]) {
            return true;
        }
    }
    return false;
};

var Label = function(text, color, size) {
    /* for typography  */
    var color = color || 'dark';
    var size = size || 'caption';
    
    if (!__isValidConfig(color, ControlConfig.TextColor)) throw new TypeError('color ' + color + ' is not valid, Valid: ' + ControlConfig.tostr(ControlConfig.TextColor));
    if (!__isValidConfig(size, ControlConfig.TextSize)) throw new TypeError('Textsize ' + size + ' is not valid, Valid: ' + ControlConfig.tostr(ControlConfig.TextSize));

    var c = new JPanel().addClass('mui--text-' + color).addClass('mui--text-' + size);
    c.setText(text);

    this.control = function() {
        return c;
    };

};


var Container = function() {
    var panel = new JPanel().addClass('mui-container-fluid');


    this.setStyle = function(obj_dic) {
        panel.setStyle(obj_dic);
    };

    this.addClass = function(classname) {
        panel.addClass(classname);
    };

    this.control = function() {
        return panel;
    };

    this.add = function(j) {
        if (j instanceof JInterface) {
            panel.add(j);
        } else {
            panel.add(j.control());
        }
    };
};

var Panel = function() {
    var panel = new JPanel().addClass('mui-panel');


    var self = this;
    this.setStyle = function(obj_dic) {
        panel.setStyle(obj_dic);
        return self;
    };

    this.addClass = function(classname) {
        panel.addClass(classname);
    };

    this.control = function() {
        return panel;
    };

    this.add = function(j) {
        if (j instanceof JInterface) {
            panel.add(j);
        } else {
            panel.add(j.control());
        }
    };
};


var Button = function(label, color, type) {
    
    var label = label || ''; /* Label of the button */
    var color = color || ''; /* primary, danger, accent */
    var type = type || ''; /* flat, raised, fab */ /* fab is a circular button */

    /* checking error  */
    if (color != '') {
        if (!__isValidConfig(color, ControlConfig.Colors)) throw new TypeError(color + ' is not valid! valid input: ' + ControlConfig.tostr(ControlConfig.Colors));
    }
    if (type != '') {
        if (!__isValidConfig(type, ControlConfig.ButtonType)) throw new TypeError(type + ' is not valid! valid input: ' + ControlConfig.tostr(ControlConfig.ButtonType));
    }
    /* End error checking */

    var b = new JButton(label).addClass('mui-btn');
    if (color != '') {
        b.addClass('mui-btn');
        b.addClass('mui-btn--' + color);
    }
    if (type != '') {
        b.addClass('mui-btn--' + type);
    }

    this.addEvent = function(e, c) {
        b.addEvent(e, c);
    };
    this.button = function() {
        return b;
    }

    this.control = function() {
        return b;
    };
};

var ButtonLink = function(label) {
    var link = new JLink(label);
    
    this.control = function() {
        return link;
    };
};

var ButtonGroup = function(label, color, type, direction) {
    var panel = new JPanel().addClass('mui-dropdown');

    var direction = direction || '';

    var btn = new Button(label, color, type);
    btn.button().setAttr({'data-mui-toggle': 'dropdown'});
    panel.add(btn.control());

    var ul = new JUl().addClass('mui-dropdown__menu');

    if (direction != '') {
        if (!__isValidConfig(direction, ControlConfig.Direction)) throw new TypeError(direction + ' is invalid, Valid: ' + ControlConfig.tostr(ControlConfig.Direction));
        ul.addClass('mui-dropdown__menu--' + direction);
    }

    panel.add(ul);

    this.addButton = function() {

    };

    this.add = function(o) {
        var li = new JLi();
        
        if (o instanceof JInterface) {
            li.add(o);
        } else if (o instanceof Object) {
            li.add(o.control());
        } else {
            li.setText(o);
        }

        ul.add(li);
    };

    this.control = function() {
        return panel;
    };
};


var TextField = function(label, _float) {
    var label = label || '';
    var _float = _float || '';

    if (_float != '') {
        if (!__isValidConfig(_float, ControlConfig.TextFieldType)) throw new TypeError(type + ' is not valid! valid: ' + ControlConfig.TextFieldType);
    }

    var panel = new JPanel();
    panel.addClass('mui-textfield');

    if (_float != '') {
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



var TextBox = function(label, _float) {
    var label = label || '';
    var _float = _float || '';

    if (_float != '') {
        if (!__isValidConfig(_float, ControlConfig.TextFieldType)) throw new TypeError(type + ' is not valid! valid: ' + ControlConfig.TextFieldType);
    }

    var panel = new JPanel();
    panel.addClass('mui-textfield');

    if (_float != '') {
        panel.addClass('mui-textfield--float-label');
    }

    var tf = new JTextArea();

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


var Grid = function() {
    var panel = new JPanel().addClass('mui-row');


    this.cell = function(container, size) {
        
        /* Checking Errors  */
        if ( !(size instanceof Array) ) {
            throw new TypeError('function(container, size) {} the value of size must be a List or Array([]), example: md-5, md-3');
        }

        for (var index in size) {
            var n = size[index];
            var a = n.split('-');
            
            var t = '';
            if (a.length > 2) {
                n = a[0] + '-' + a[1] + '-' + a[2];
                t = a[0] + '-' + a[1];

                if (!__isValidConfig(t, ControlConfig.GridType)) throw new Error(t + ' is invalid: valid: ' + ControlConfig.tostr(ControlConfig.GridType));

                if (parseInt(a[2]) > 12) {
                    throw new Error('the Grid, col maximum of 12 only!');
                }
            } else {
                t = a[0];
                
                if (!__isValidConfig(t, ControlConfig.GridType)) throw new Error(t + ' is invalid: valid: ' + ControlConfig.tostr(ControlConfig.GridType));

                if (parseInt(a[1]) > 12) {
                    throw new Error('the Grid, col maximum of 12 only');
                }
            }

        };

        /* End Checking errors */

        /*  size must be a list or array of string ex.: md-1 */
        var size = size || []; /* md-no, sm-no, xs-no, lg-no  */ /* also : mui-col-md-offset-4  */
        var spanel = new JPanel();
        for (var x in size) {
            spanel.addClass('mui-col-' + size[x]);
            /* mui-col-md-offset-4  */
        }
        if (container instanceof JInterface) {
            spanel.add(container);
        } else {
            spanel.add(container.control());
        }
        
        panel.add(spanel);
    };

    this.control = function() {
        return panel;
    };
};


/* Table */

var Table = function(header, type) {
    var table = new JTable().addClass('mui-table');
    var type = type || '';

    if (!(header instanceof Array)) {
        throw new TypeError('Table Contructor header must a Array or List, example: ["no", "name", "age"..etc]');
    }

    if (type != '') {
        if (!__isValidConfig(type, ControlConfig.TableType)) throw new TypeError(type + ' is not valid: valid: ' + ControlConfig.tostr(ControlConfig.TableType));

        table.addClass('mui-table--' + type);
    }

    var thead = new JThead();

    var tr = new JTr();

    for (var i in header) {
        var th = new JTh();
        
        if (header[i] instanceof JInterface) {
            th.add(header[i]);
        } else if (header[i] instanceof Object) {
            th.add(header[i].control());
        } else {
            th.setText(header[i]);
        }

        tr.add(th);
    }
    thead.add(tr);
    table.add(thead);

    var tbody = new JTbody();
    table.add(tbody);

    this.clear = function() {
        tbody.clear();
    };

    this.addRow = function(arr) {
        if (!(arr instanceof Array)) throw new TypeError('Table.addRow must be an List or an array sample: [1, "argon", 23]');
        if (header.length != arr.length) throw new Error('Table header must match the size of the addRow or table data');

        var tr = new JTr();
        for (var i in arr) {
            var td = new JTd();

            if (arr[i] instanceof JInterface) {
                td.add(arr[i]);
            } else if (arr[i] instanceof Object) {
                td.add(arr[i].control());
            } else {
                td.setText(arr[i]);
            }

            tr.add(td);
        }
        tbody.add(tr);
    };

    this.control = function() {
        return table;
    }
};
/* End of Table  */

/* Tab  */
var Tab = function(ids, type) {
    var type = type || '';


    var c = new JPanel();

    var ul = new JUl().addClass('mui-tabs__bar');

    if (type != '') {
        if (!__isValidConfig(type, ControlConfig.TabType)) throw new TypeError(type + ' is not valid, valid: ' + ControlConfig.tostr(ControlConfig.TabType));
        ul.addClass('mui-tabs__bar--' + type);
    }

    var i = 1;
    c.add(ul);
    this.add = function(title, content) {
        var content = content || 'Tab ' + i.toString();

        var name = ids + '-pane-default-'+ i.toString();

        

        var li = new JLi();
        if (i == 1) {
            /* set active tab */
            li.addClass('mui--is-active');   
        }
        
        var link = new JLink().setAttr({"data-mui-toggle": "tab", 'data-mui-controls': name});
        link.setText(title);
        li.add(link);

        ul.add(li);

        var pan = new JPanel().addClass('mui-tabs__pane').setAttr({'id': name});
        if (i == 1) {
            pan.addClass('mui--is-active');
        }
        /* add the contents */
        
        if (content instanceof JInterface) {
            pan.add(content);
        } else if(content instanceof Object) {
            pan.add(content.control());
        } else {
            pan.setText(content);
        }

        c.add(pan);
        i += 1;
    };

    this.control = function() {
        return c;
    };
};
/* End of Tab  */
