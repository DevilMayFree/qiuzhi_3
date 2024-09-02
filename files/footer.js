(function (name, definition, context) {
    if (typeof context['module'] !== 'undefined' && context['module']['exports']) context['module']['exports'] = definition();
    else if (typeof context['define'] !== 'undefined' && context['define'] === 'function' && context['define']['amd']) define(name, definition);
    else context[name] = definition();
})('footer', function () {
	const _footerSelf = {
        HasClass: function (el, className) {
            if (el == null)
                return false;

            if (el.classList)
                return el.classList.contains(className);
            else
                return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        },
        AddClass: function (el, className) {
            if (el == null)
                return;

            var _arrClass = className.split(' ');
            for (var _i = 0; _i < _arrClass.length; _i++) {
                var _className = _arrClass[_i];

                if (el.classList)
                    el.classList.add(_className);
                else if (!this.HasClass(el, _className))
                    el.className += " " + _className;
            }
        },
        RemoveClass: function (el, className) {
            if (el == null)
                return;

            if (el.classList)
                el.classList.remove(className);
            else if (this.HasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                el.className = el.className.replace(reg, ' ');
            }
        },
        ToggleClass: function (el, className) {
            if (this.HasClass(el, className))
                this.RemoveClass(el, className);
            else
                this.AddClass(el, className);
        },
	};
	
	return _footerSelf;
}, this);