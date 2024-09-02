(function (name, definition, context) {
    if (typeof context['module'] !== 'undefined' && context['module']['exports']) context['module']['exports'] = definition();
    else if (typeof context['define'] !== 'undefined' && context['define'] === 'function' && context['define']['amd']) define(name, definition);
    else context[name] = definition();
})('popper1111', function () {
	var _$self = {
		queue:[],
		isInit:false,
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
        Attr: function (el, name, value) {
            var _out = undefined;

            if (el instanceof Element) {
                if (value == undefined) {
                    var _tm = el.getAttribute(name);
                    if (_tm != null)
                        _out = _tm;
                }
                else {
                    el.setAttribute(name, value);
                }
            }

            return _out;
        },
        Parents: function (el, fn) {
            if (el != null && el instanceof Element && el.parentElement != null) {
                var _continue = fn(el.parentElement);
                if (false != _continue)
                    _$self.Parents(el.parentElement, fn);
            }
        },
        TriggerEvent: function (el, eventName) {
            if ("createEvent" in document) {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent(eventName, false, true);
                el.dispatchEvent(evt);
            }
            else {
                el.fireEvent("on" + eventName);
            }
        },
		getInstance: function(el) {
			let _out = undefined;
			
			if(el) {
				let _menuId = _$self.Attr(el, 'id');
				
				for(let i=0; i<_$self.queue.length; i++){
					let _q = _$self.queue[i];
					
					if(_$self.Attr(_q.menu, 'id') == _menuId){
						_out = _q.instance;
						break;
					}
				}
			}
			
			return _out;
		},
		createPopper: function(el) {
			if(el) {
				const _id = popper1111.Attr(el, 'data-toggle');
				
				//隱藏未使用
				popper1111.hideUnUsePopper(el);
				
				//
				if(_id?.length > 0) {
					//觸發選單
					const _menu = document.getElementById(_id);
					if(_menu) {
						if(!popper1111.Attr(_menu, 'data-init')?.length > 0) {
							popper1111.Attr(_menu, 'data-init', (new Date()).getTime());
							
							//
							let _placement = popper1111.Attr(_menu, 'data-popper-placement');
							if(!(_placement && _placement.length > 0))
								_placement = 'bottom';
							
							//popper1111.AddClass(_menu, 'show');
							popper1111.queue.push({
								menu: _menu,
								instance: new Popper(el, _menu, {
									placement: _placement,
									modifiers: [
										{ name: 'eventListeners', enabled: true }
									]
								})
							});
							
							popper1111.togglePopper(_menu);
						}
						else {
							popper1111.togglePopper(_menu);
						}
					}
				}
			}
		},
		togglePopper: function(el, isShow, instance) {
			if(el) {
				if(!instance)
					instance = _$self.getInstance(el);
				
				if(instance) {
					const _fn = (evType, opt) => new CustomEvent(evType, opt);
					const _opt = { bubbles: true, detail: { type:'', target:el, instance: instance }};
					
					if(isShow == undefined)
						isShow = !_$self.HasClass(el, 'show');
					
					if(isShow) {
						_$self.AddClass(el, 'show');
						_opt.detail.type = 'show';
						window.dispatchEvent(_fn('popper1111', _opt));
					}
					else {
						_$self.RemoveClass(el, 'show');
						_opt.detail.type = 'hide';
						window.dispatchEvent(_fn('popper1111', _opt));
					}
					
					for(const k in instance.options.modifiers){
						const o = instance.options.modifiers[k];
						if(o?.name == 'eventListeners') {
							o.enabled = isShow;	
							break;
						}
					}
					
					// Update its position
					if(isShow)
						instance.update();
				}
			}
		},
		hideUnUsePopper: function(el) {
			//選單外部點擊
			let _menuId = '';
			const _fn = function(el){
				if(_$self.HasClass(el, 'dropdown-menu')){
					_menuId = _$self.Attr(el, 'id');
					return false;
				}
				else
					return true;
			};
			
			//取得選單id
			_fn(el);
			if(!(_menuId?.length > 0))
				_$self.Parents(el, _fn);
			
			for(let i=0;i<_$self.queue.length; i++){
				let _q = _$self.queue[i];
				
				if(_$self.HasClass(_q.menu, 'show') 
					&& _$self.Attr(_q.menu, 'id') != _menuId) {
						_$self.togglePopper(_q.menu, false, _q.instance);
				}
			}
		},
		Init: function() {
			if(!_$self.isInit) {
				_$self.isInit = true;
				document.querySelector('body').addEventListener('click', function (ev){
					popper1111.createPopper(ev.srcElement);
				});
			}
		}
	};
	
    return _$self;
}, this);

/*
document.addEventListener('readystatechange', function () {
	if (document.readyState == "complete") {
		setTimeout(function () {
			popper1111.Init();
		}, 300);
	}
});
*/