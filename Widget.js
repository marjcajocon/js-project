function Widget(c) {
            var l = document.createElement(c);

            this.add = function (widget) {
                l.appendChild(widget.get_widget());
                return this;
            };

            this.set_text = function (text) {
                l.innerHTML += text;
                return this;
            }
            this.clear = function () {
                l.innerHTML = '';
            }

            this.get_widget = function () {
                return l;
            };

        }
