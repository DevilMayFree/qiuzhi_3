String.prototype.trim = function () { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };
String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); };
String.prototype.rtrim = function () { return this.replace(/\s+$/, ''); };
String.prototype.left = function (n) { return this.substr(0, n); };
String.prototype.right = function (n) { return this.substr(this.length - n, n); };
String.prototype.format = function () {
    var O_VAL = this;

    for (var i = 0; i < arguments.length; i++) {
        var re = new RegExp("\\{" + i + "\\}", "g");
        O_VAL = O_VAL.replace(re, arguments[i]);
    }

    return O_VAL;
};

(function (name, definition, context) {
    if (typeof context['module'] !== 'undefined' && context['module']['exports']) context['module']['exports'] = definition();
    else if (typeof context['define'] !== 'undefined' && context['define'] === 'function' && context['define']['amd']) define(name, definition);
    else context[name] = definition();
})('t1111bar', function () {
    var _$self = {
        isLogin: false,
        searchType: 'job',
        agent: '',
        args: {
            layout: { d: 'd', m: 'm' },
            mNo: 0,
            ckmNo: false,
            toplinkNoReferrer: false
        },
        lock: { nextpage: false, init:false },
        loginInfo: undefined,
        layoutType: '',
        bs: {
            Resource: {
                Map: {},
                Load: function (name, args, fn) {
                    var _map = _$self.bs.Resource.Map[name];
                    if (!_map) {
                        _$self.bs.Resource.Map[name] = {
                            $target: null
                            , args: args
                            , isLoad: false
                        };

                        var _el = document.createElement(args.tagName);
                        _el.addEventListener('load', function (ev) {
                            if (ev.target.tagName == 'SCRIPT') {
                                for (var k in _$self.bs.Resource.Map) {
                                    if (ev.target.src.indexOf(k) > -1) {
                                        _map = _$self.bs.Resource.Map[k];
                                        _map.isLoad = true;
                                        break;
                                    }
                                }

                                if (fn && _map)
                                    fn(_map);
                            }
                        });

                        for (var k in args) {
                            if (k != undefined && k != null && k != 'tagName')
                                _el[k] = args[k];
                        }

                        document.head.appendChild(_el);
                    }
                    else {
                        if (fn && _map.isLoad)
                            fn(_map);
                    }
                }
            },
            QueryParse: function (s) {
                var O_VAL = {};

                try {
                    var _ns = s.indexOf('?');
                    if (_ns > -1)
                        s = s.substring(_ns + 1);

                    var num = s.length;
                    for (var i = 0; i < num; i++) {
                        var num2 = i;
                        var num3 = -1;
                        while (i < num) {
                            var c = s.charAt(i);
                            if (c == '=') {
                                if (num3 < 0) {
                                    num3 = i;
                                }
                            }
                            else {
                                if (c == '&') {
                                    break;
                                }
                            }
                            i++;
                        }
                        var key = null;
                        var val;
                        if (num3 >= 0) {
                            key = s.substr(num2, num3 - num2);
                            val = decodeURIComponent(s.substr(num3 + 1, i - num3 - 1));
                        }
                        else {
                            val = decodeURIComponent(s.substr(num2, i - num2));
                        }

                        if (O_VAL[key] == undefined) {
                            O_VAL[key] = val;
                        }
                        else {
                            if (!(O_VAL[key] instanceof Array))
                                O_VAL[key] = [O_VAL[key]];

                            O_VAL[key].push(val);
                        }
                    }
                } catch (err) { }

                return O_VAL;
            },
            HasClass: function (el, className) {
				if(el) {
					if (el.classList)
						return el.classList.contains(className);
					else
						return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
				}
            },
            AddClass: function (el, className) {
				if(el) {
					if (el.classList)
						el.classList.add(className);
					else if (!_$self.bs.HasClass(el, className))
						el.className += " " + className;
				}
            },
            RemoveClass: function (el, className) {
				if(el) {
					if (el.classList)
						el.classList.remove(className);
					else if (_$self.bs.HasClass(el, className)) {
						var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
						el.className = el.className.replace(reg, ' ');
					}
				}
            },
			ToggleClass: function (el, className) {
				if(el) {
					if (_$self.bs.HasClass(el, className))
						_$self.bs.RemoveClass(el, className);
					else
						_$self.bs.AddClass(el, className);
				}
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
            ForEach: function (arr, fn) {
                for (var y = 0; y < arr.length; y++) {
                    var _continue = fn(arr[y], y);
                    if (false == _continue)
                        break;
                }
            },
            ObjToQuery: function () {
                var _out = '';

                //轉換 data to _rawData
                if (arguments.length > 0) {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i]) {
                            var _data = arguments[i];
                            if (_data instanceof Object) {
                                for (var k in _data)
                                    _out += '&' + k + '=' + encodeURIComponent(_data[k]);
                            }
                            else {
                                if (_data.length > 0)
                                    _out += '&' + _data;
                            }
                        }
                    }
                }

                if (_out.length > 0 && _out.indexOf('&') == 0)
                    _out = _out.substring(1);

                return _out;
            },
            UrlMerge: function (url) {
                var _out = '';
                var _url = '';
                var _q = '';
                var _rawData = '';
                var _num = url.indexOf('?');
                var _args = [];

                for (var i = 1; i < arguments.length; i++)
                    _args.push(arguments[i])

                _rawData = this.ObjToQuery.apply(this, _args);

                if (_num > -1) {
                    _url = url.substring(0, _num);
                    _q = url.substring(_num + 1);

                    if (_rawData.length > 0)
                        _q += '&' + _rawData;

                    if (_q.indexOf('&') == 0)
                        _q = _q.substring(1);
                }
                else {
                    _url = url;
                    _q = _rawData;
                }

                if (_q.length > 0)
                    _out = _url + '?' + _q;
                else
                    _out = _url;

                return _out;
            },
            Ajax: function (option) {
                var _req = new XMLHttpRequest();
                var _rawData = this.ObjToQuery(option.data);
                var _method = 'get';

                if (option.type != undefined)
                    _method = option.type.toLowerCase();

                if (option.success != undefined) {
                    _req.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            var _contentType = this.getResponseHeader("Content-Type");
                            var _result = this.responseText;

                            try {
                                if (_contentType.indexOf("application/json") > -1)
                                    _result = JSON.parse(_result);
                            } catch (err) { }

                            option.success(_result);
                        }
                    };
                }

                //get 必須轉換參數避免快取
                if ('get' == _method)
                    option.url = this.UrlMerge(option.url, _rawData, { v: (new Date()).getTime() });

                _req.open(option.type, option.url);

                if (option.dataType != undefined) {
                    _req.setRequestHeader("Content-Type", option.dataType);
                }
                else {
                    if ('post' == _method)
                        _req.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                }

                if ('post' == _method)
                    _req.send(_rawData);
                else
                    _req.send();
            },
            Jsonp: function (option) {
                var _tag = {};
                var _tagK = 'jsoncallback';
                var _tagV = 'jsonp_' + (new Date()).getTime();
                var _$script = document.createElement('script');
                var _url = '';

                _tag[_tagK] = _tagV;
                _url = this.UrlMerge(option.url, this.ObjToQuery(option.data), _tag);

                // Install callback
                window[_tagV] = function (result) {
                    option.success(result);
                    setTimeout(function () {
                        delete window[_tagV];
                    }, 300);
                };

                _$script.type = 'text/javascript';
                _$script.async = true;
                _$script.src = _url;
                _$script.onload = _$script.onreadystatechange = function (_, isAbort) {
                    if (isAbort || !_$script.readyState || /loaded|complete/.test(_$script.readyState)) {
                        // Handle memory leak in IE
                        _$script.onload = _$script.onreadystatechange = null;

                        // Remove the script
                        if (document.head && _$script.parentNode)
                            document.head.removeChild(_$script);

                        // Dereference the script
                        _$script = undefined;
                    }
                };

                document.head.appendChild(_$script);
            }
        },
        jq: {
            class2type: {},
            type: function (obj) {
                return obj == null ?
                    String(obj) :
                    this.class2type[toString.call(obj)] || "object";
            },
            isArray: Array.isArray || function (obj) {
                return this.type(obj) === "array";
            },
            isFunction: function (obj) {
                return this.type(obj) === "function";
            },
            isWindow: function (obj) {
                return obj && typeof obj === "object" && "setInterval" in obj;
            },
            isPlainObject: function (obj) {
                // Must be an Object.
                // Because of IE, we also have to check the presence of the constructor property.
                // Make sure that DOM nodes and window objects don't pass through, as well
                if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
                    return false;
                }

                try {
                    // Not own constructor property must be Object
                    if (obj.constructor &&
                        !hasOwn.call(obj, "constructor") &&
                        !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false;
                    }
                } catch (e) {
                    // IE8,9 Will throw exceptions on certain host objects #9897
                    return false;
                }

                // Own properties are enumerated firstly, so to speed up,
                // if last one is own, then all properties are own.

                var key;
                for (key in obj) { }

                return key === undefined || hasOwn.call(obj, key);
            },
            extend: function () {
                var options, name, src, copy, copyIsArray, clone,
                    target = arguments[0] || {},
                    i = 1,
                    length = arguments.length,
                    deep = false;

                // Handle a deep copy situation
                if (typeof target === "boolean") {
                    deep = target;
                    target = arguments[1] || {};
                    // skip the boolean and the target
                    i = 2;
                }

                // Handle case when target is a string or something (possible in deep copy)
                if (typeof target !== "object" && !this.isFunction(target)) {
                    target = {};
                }

                // extend jQuery itself if only one argument is passed
                if (length === i) {
                    target = this;
                    --i;
                }

                for (; i < length; i++) {
                    // Only deal with non-null/undefined values
                    if ((options = arguments[i]) != null) {
                        // Extend the base object
                        for (name in options) {
                            src = target[name];
                            copy = options[name];

                            // Prevent never-ending loop
                            if (target === copy) {
                                continue;
                            }

                            // Recurse if we're merging plain objects or arrays
                            if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && this.isArray(src) ? src : [];

                                } else {
                                    clone = src && this.isPlainObject(src) ? src : {};
                                }

                                // Never move original objects, clone them
                                target[name] = this.extend(deep, clone, copy);

                                // Don't bring in undefined values
                            } else if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }

                // Return the modified object
                return target;
            }
        },
        element: {
			header: undefined,
			mobileNav: undefined,
            login: undefined,
            notlogin: undefined,
            body: undefined,
            space: undefined,
            overlay: undefined,
            history: undefined,
			navbar: undefined,
			searchInput: undefined,
			dropdown_history: undefined,
        },
        d: {
            isInit: false,
            origin: '',
            url: {
                login: '',
                logout: '',
                regist: ''
            },
            element: {
                left: undefined,
                right: undefined
            },
            /**
             * 初始化 電腦版
             */
            init: function (fn) {
                var _obj = _$self.d;
                var _mNo = _$self.args.mNo;

                if (!_obj.isInit) {
                    _obj.isInit = true;

                    _$self.args.ckmNo = (_mNo == 0 || _mNo == 1 || _mNo == 2 || _mNo == 3) ? true : false;

                    //建立上稿項目
                    //_obj.menuToplink(_mNo);
                }

                _obj.updateLayout();
                if (fn)
                    fn();
            },
            checkLocation: function () {
                var _obj = _$self.d;
                var _q = _$self.bs.QueryParse(location.search);
                var _ref = (_q['ref'] != undefined && _q['ref'] != '') ? _q['ref'] : location.href;

                if (location.hostname.indexOf('.1111.com.tw') > -1 || location.hostname.left(8) == '192.168.' || location.hostname.left(7) == '172.16.' || location.hostname == 'localhost')
                    _obj.origin = '';
                else
                    _obj.origin = 'https://www.1111.com.tw';

                _obj.url.login = '{0}/login/index?ReturnUrl={1}'.format(_obj.origin, encodeURIComponent(_ref));
                _obj.url.logout = '{0}/Account/Logout?ReturnUrl={1}'.format(_obj.origin, encodeURIComponent(_ref));
                _obj.url.regist = '{0}/Registered/Index?ReturnUrl={1}'.format(_obj.origin, encodeURIComponent(_ref));
            },
            settingIconClick: function ($sender) {
                var _$el;

                //企業通知數
                _$el = _$self.element.login.querySelector('.navbar__link--bell');
                if (_$el)
                    _$self.bs.Attr(_$el, 'data-count', '0');

                //企業通知內容
                _$el = _$self.element.login.querySelector('.navbar__notice-data');
                _$el.innerHTML = '';
                if (_$self.isLogin)
                    _$self.d.loadNextPage(_$el, 1);
            },
            listScroll: function (ev) {
				const _el = ev.srcElement;
                const _scrollHeight = _el.scrollHeight; //內容高度
                const _scrollTop = _el.scrollTop; //滾動高度
                const _clientHeight = _el.clientHeight; //可見高度
                const _diff = _scrollHeight - _clientHeight - _scrollTop;
                if (_diff <= 30) {
                    const _obj = _$self.d;
                    const _page = _$self.bs.Attr(_el, 'data-nextpage');
                    _obj.loadNextPage(_el, _page);
                }
            },
            loadNextPage: function ($el, page) {
                var _isLoad = false;
                var _url = '/home/BWhiteBarAjax?Page=' + page;
                var _ls = [];

                if (!_$self.lock.nextpage) {
                    //先 lock 避免快速觸發多次
                    _$self.lock.nextpage = true;

                    //檢查是否已經讀取
                    _$self.bs.ForEach($el.children, function ($it) {
                        if (_$self.bs.Attr($it, 'data-page') == page) {
                            _isLoad = true;
                            return false;
                        }
                    });

                    //讀取下一頁
                    if (!_isLoad) {
                        //延遲一段時間再釋放
                        setTimeout(function () {
                            _$self.bs.Attr($el, 'data-page', page);
							
							_$self.bs.Ajax({
								type: 'get',
								url: _url,
								success: function(result) {									
                                    if (result.TalentNo > 0) {
                                        if (result.PageCount == 1 && result.NotifyList.length == 0) {
											//沒有通知
                                            _$self.bs.RemoveClass($el, 'navbar__notice-body--active');
                                        }
                                        else {
                                            if (result.PageNext > page)
                                                _$self.bs.Attr($el, 'data-nextpage', result.PageNext);

                                            //企業通知
                                            _$self.bs.ForEach(result.NotifyList, function (r) {												
                                                _ls.push(`<a class="navbar__notice-body--link" href="${_$self.d.origin}/CorpNotification/Index?mno=${r['MailNo']}" target="_blank" title="${r['MailTypeN']}">
	<span class="navbar__notice-body--time" data-after="${r['oDateSend']}"></span>
	<span class="navbar__notice-body--name" data-after="${r['Position0']}"></span>
	<span class="navbar__notice-body--text" data-after="${r['Organ']}"></span>
</a>`);
                                            });

                                            $el.appendChild(document.createElement('div'))
                                                .outerHTML = `<div data-page="${page}">${_ls.join('')}</div>`;
                                        }
                                    }
                                    else {
                                        _$self.bs.RemoveClass($el, 'navbar__notice-body--active');
                                    }

                                    _$self.lock.nextpage = false;									
								}
							});
							
                        }, 300);
                    }
                    else {
                        _$self.lock.nextpage = false;
                    }
                }
            },
            /**
             * 更新 ui
             */
            updateLayout: function () {
                var _obj = _$self.d;
                var _name = '';
                var _organLogin = false;

                if (_$self.loginInfo != undefined) {
                    _name = _$self.loginInfo.name;
                    _organLogin = _$self.loginInfo.organ.isLogin;
                }

				//是否顯示APP下載
				const _app = document.querySelector('.download__app');
				if(_app && !(localStorage.getItem("AppDownloadHome") == '1')) 
					_$self.bs.AddClass(_app, 'download__app--active');
					
				//_organLogin = true;

                if (_$self.isLogin) {
					//初始化通知
					_$self.notifi.init();
			
                    _$self.bs.RemoveClass(document.querySelector('.navbar__login--active'), 'navbar__login--active');
				
                    //設定連結
                    _$self.bs.Attr(_$self.element.login.querySelector('.navbar__talents-footer'), 'href', _obj.url.logout);
                    
					//設定名稱
					_$self.bs.ForEach(_$self.element.login.querySelectorAll('.navbar__link--login,.navbar__talents-head--name'), function ($el) {
						_$self.bs.Attr($el, 'aria-label', _name);
					});
					
					//設定通知捲動
					const _notice = document.querySelector('.navbar__notice-data');
					if(_notice)
						_notice.addEventListener('scroll', t1111bar.d.listScroll);

                    //設定圖片
                    setTimeout(function () {
						_$self.bs.Ajax({
							type: 'get',
							url: '/home/BWhiteBarAjax?Page=1',
							success: function(result) {															
                               if (result != undefined) {
                                    if (result.TalentNo > 0) {
                                        //求職圖片
                                        _$self.bs.ForEach(document.querySelectorAll('.navbar__link--user,.navbar__talents-head--user'), function ($el) {
                                            _$self.bs.Attr($el, 'src', result.UserPhoto);
                                        });

                                        //我的捷徑
                                        if (result.SortableList.length > 0) {
                                            var _html = [];

                                            for (var i = 0; i < result.SortableList.length; i++) {
                                                var _r = result.SortableList[i];

                                                _html.push('<a class="navbar__talents-body--link" href="{1}" title="{0}"></a>'.format(_r['Des'], _r['Url']));
                                            }

                                            if (_html.length > 0)
                                                _$self.element.login.querySelector('.navbar__talents-body-links').innerHTML = _html.join('');
                                        }
                                    }
                                }	
							}
						});
                    }, 300);
                }
                else {
                    //設定登入登出連結
                    _$self.bs.Attr(_$self.element.notlogin.querySelector('.navbar__link--notlogin'), 'href', _obj.url.login);
                }

                //求才狀態
                if (_organLogin) {
					const _el = document.querySelector('.navbar__corp-login--active');
					if(_el)
						_$self.bs.RemoveClass(_el, 'navbar__corp-login--active');
                }
            },
        },
		/* 關閉APP下載提醒 */
		appClose: function(sender) {
			const _el = document.querySelector('.download__app');
			if(_el) {
				_$self.bs.RemoveClass(_el, 'download__app--active');
				localStorage.setItem("AppDownloadHome", "1");
			}
		},
		/* 放大鏡(是否顯示搜尋列) */
		searchBar: function(sender) {
			const _el = document.querySelector('.header__search');
			if(_el)
				_$self.bs.ToggleClass(_el, 'header__search--active');
		},
        setHrefTopLink: function (lNo) {
            _$self.bs.Ajax({
                type: 'post',
                url: '/includes_xml/linkRedirMain.asp',
                data: { lNo: lNo }
            });
        },
        getCookie: function (cookieName) {
            var name = cookieName + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }

            return "";
        },
        checkSize: function (fn) {
            var _$el = _$self.element.body;

            //if (window.innerWidth < 768)
            //    _$self.layoutType = _$self.args.layout['m'];
            //else
            //    _$self.layoutType = _$self.args.layout['d'];

            //if (_$self.layoutType == 'm') {
            //    _$self.bs.RemoveClass(_$el, 'd');
            //    _$self.bs.AddClass(_$el, 'm');
            //    _$self.m.init(fn);
            //} else {
            //    _$self.bs.RemoveClass(_$el, 'm');
            //    _$self.bs.AddClass(_$el, 'd');
            //    _$self.d.init(fn);
            //}
        },
        getLoginInfo: function (origin, fn) {
            _$self.bs.Jsonp({
                url: '{0}/includesU/mobileWeb/incMobileHeaderApi.asp'.format(origin),
                data: { act: 'loginInfo' },
                success: function (result) {
                    _$self.loginInfo = result;
                    if (result.isLogin != undefined)
                        _$self.isLogin = result.isLogin;

                    if (fn != undefined)
                        fn();
                }
            });
        },
        notifi: {
            isInit: false,
            tNo: '',
            hub: {
                notification: undefined
            },
            init: function () {
                if (_$self.isLogin && !_$self.notifi.isInit) {
                    _$self.notifi.isInit = true;

                    try {
						const _host = 'https://www.1111.com.tw';
                        const _v = (new Date()).getTime();
                        const _fn = {
                            jquery: function () {
                                if (!window.jQuery)
                                    _$self.bs.Resource.Load("jquery-1.9.1.min.js", { tagName: 'script', src: _host + '/includesU/jquery/jquery-1.9.1.min.js' }, _fn.signalR);
                                else
                                    _fn.signalR();
                            },
                            signalR: function () {
                                if (!window.jQuery.signalR)
                                    _$self.bs.Resource.Load("jquery.signalR-2.4.1.min.js", { tagName: 'script', src: _host + '/includesU/SignHandler/jquery.signalR-2.4.1.min.js' }, _fn.promise);
                                else
                                    _fn.promise();
                            },
                            promise: function () {
                                if (!window.Promise)
                                    _$self.bs.Resource.Load("polyfill.js", { tagName: 'script', src: _host + '/includesU/SignHandler/polyfill.js' }, _fn.signHandler);
                                else
                                    _fn.signHandler();
                            },
                            signHandler: function () {
								const _fnInit = function() {
									setTimeout(function () {
										var _ckmNo = _$self.args.ckmNo;
										_$self.notifi.showHubInfo(_$self.loginInfo.talentNo);
									}, 2000);
									
									_fn.im();
								};
								
                                if (!window.SignHandler)
                                    _$self.bs.Resource.Load("SignHandler.min.js", { tagName: 'script', src: _host + '/includesU/SignHandler/SignHandler.min.js?v=' + _v }, _fnInit);
                                else
                                    _fnInit();
                            },
							im: function() {
								_$self.bs.Resource.Load("talk.js", { tagName: 'script', src: _host + '/chat_plugin/js/talk.js?v=' + _v });
							},
                        };
						
						//
                        _fn.jquery();
						
                    } catch (err) { }
                }
            },
            showHubInfo: function (tNo) {
                try {
                    this.tNo = tNo;

                    var _signHandler = SignHandler();
                    var _notificationHub = this.hub.notification = _signHandler.CreateHub('notificationhub', "https://push.1111.com.tw/SignalRServer45", 'ver=20150326&tNo=' + tNo, {
                        isAutoStop: false,
                        delegate: {
                            onReceived: function (hub, M, args) {
                                //console.log(JSON.stringify({ hub: hub.name, event: M, args: args })); 

                                if (_$self.notifi[M] != undefined)
                                    _$self.notifi[M].apply(_$self.notifi, args);
                            }
                        }
                    });

                    _notificationHub.invokeNoUUid("YouGetMail", 0);
                    _notificationHub.invokeNoUUid("OnlineUpdate", tNo, this.getUpdateTime());
                }
                catch (err) { }
            },
            UserOnline: function (dtNextUpdate) {
                var _updateTime = (new Date()).toLocaleString('zh-TW', { hour12: false });

                this.saveUpdateTime(dtNextUpdate);
                this.hub.notification.invokeNoUUid("OnlineUpdate", this.tNo, _updateTime);
            },
            showNotify: function (msg, mode) {
                var _data = undefined;
                var _$el;

                switch (mode) {
                    case 1:
                        //企業通知數
                        _$el = _$self.element.login.querySelector('.navbar__link--bell');
                        if (_$el)
                            _$self.bs.Attr(_$el, 'data-count', msg);

                        _data = { 'notifycount': msg };
                        break;

                    case 2:
                        //企業瀏覽數
                        //_$el = document.getElementById('setting__count-browse');
                        //if (_$el)
                        //    _$self.bs.Attr(_$el, 'data-count', msg);

                        //_data = { 'previewcount': msg };
                        break;
                }

                if (_data != undefined) {
                    _$self.bs.Ajax({
                        type: "post",
                        url: '/includesU/toplink/topLinkCookies.asp',
                        data: _data
                    });
                }
            },
            saveUpdateTime: function (val) {
                localStorage.setItem('OnLineTime', val);
            },
            getUpdateTime: function () {
                var _out = '';
                var _now = new Date();
                var _isUpdate = false;
                var _saveTime = undefined;

                try {
                    _out = localStorage.getItem('OnLineTime') + '';

                    if (_out.length == 0
                        || _out == null
                        || _out == 'null'
                        || !(isNaN(_out))
                        || (_out + '').indexOf(',') >= 0
                    ) {
                        _out = _now.toLocaleString('zh-TW', { hour12: false });
                        _isUpdate = true;
                    }
                    else {
                        var dtUpdate = new Date(_out);
                        if (dtUpdate < _now) {
                            _out = _now.toLocaleString('zh-TW', { hour12: false });
                            isUpdate = true;
                        }
                    }

                    if (_isUpdate) {
                        _now.setSeconds(_now.getSeconds() + 3600);
                        _saveTime = _now.toLocaleString('zh-TW', { hour12: false });
                        this.saveUpdateTime(_saveTime);

                        //console.log('下次更新時間(儲存)：' + _saveTime);
                    }

                    //console.log('這次更新時間：' + _out);
                } catch (err) { }

                return _out;
            },
        },
        tCodeMenuClick: function (type) {
            switch (type) {
                case 'co':
                    open1111Menu('co', 'city_', '10', '', '', 't1111bar.updateSearchBar(\'co\', true)', '', '');
                    break;

                case 'c0':
                    open1111Menu('c0', 'city_', '10', '', '', 't1111bar.updateSearchBar(\'c0\', true)', '', '');
                    break;

                case 'd0':
                    open1111Menu('d0', 'duty_NM', '10', '', '', 't1111bar.updateSearchBar(\'d0\', true)', '', '');
                    break;

                case 't0':
                    open1111Menu('t0', 'trade_', '6', '', '', 't1111bar.updateSearchBar(\'t0\', true)', '', '');
                    break;
            }
        },
		/* 搜尋按鈕 */
        searchClick: function () {
			const w = window;
            if (w._srh) {
                //搜尋頁用
                w._srh.ui.search.click(_$self.searchType, '');
            }
            else {
                //
                var args = '';
                var _$el = {
                    ks: document.querySelector('[id="ks"]')
                    , co: document.querySelector('[id="co"]')
                    , c0: document.querySelector('[id="c0"]')
                    , d0: document.querySelector('[id="d0"]')
                    , t0: document.querySelector('[id="t0"]')
                };

                for (var k in _$el) {
                    if (_$el[k] && _$el[k].value.length > 0)
                        args += "&{0}={1}".format(k, encodeURIComponent(_$el[k].value));
                }

                if (args.length > 0)
                    args = '?' + args.substring(1);

                top.location.href = '/search/{0}'.format(_$self.searchType) + args;
            }
        },
		/* 搜尋紀錄 */
        searchLog: {
			/* 初始化 */
            init: function () {
                //設定搜尋紀錄
				_$self.element.history = document.querySelector(".search__history");
                if (_$self.element.history) {
					const _html = [];
                    var _logs = undefined;
                    try { _logs = JSON.parse(localStorage.getItem("AdvSearchLog")); } catch (err) { }
                    if (_logs == undefined)
                        _logs = [];

                    if (_logs.length > 0) {
                        for (var i = 0; i < _logs.length; i++) {
                            var _log = _logs[i];

                            if (i < 5) {
                                if (_log['c'].length > 50) { _log['c'] = _log['c'].substring(1, 50) + "..."; }
								_html.push(`<a class="search__history--link" href="${_log['q']}" title="${_log["searchType"]}－${_log['c']}"><i class="search__history--close" onclick="t1111bar.searchLog.del(this)"></i></a>`);
                            }
                        }
						
						if(_html.length > 0)
							_$self.element.history.innerHTML = _html.join('');
                    } else {
						_$self.bs.Attr(_$self.element.history, 'data-before', '無搜尋紀錄！');
                    }                    
                }
            },
			/* 刪除 */
            del: function (sender) {
				event.preventDefault();
				
                var _result = [];
                var _logs = undefined;
                var _q = _$self.bs.Attr(sender.parentNode, 'href');

                if (_q.length > 0) {
                    try { _logs = JSON.parse(localStorage.getItem("AdvSearchLog")); } catch (err) { }
                    if (_logs == undefined)
                        _logs = [];

                    for (var i = 0; i < _logs.length; i++) {
                        var _log = _logs[i];
                        if (_q != _log['q'])
                            _result.push(_log);
                    }

                    try { localStorage.setItem("AdvSearchLog", JSON.stringify(_result)); } catch (err) { }
                }

                _$self.searchLog.init();
            }
        },
		/* */
        updateSearchBar: function (type, updateTarget) {
            var _$ks = [];
            var _$els = [];
			
            if (updateTarget == undefined)
                updateTarget = false;

            switch (type) {
                case 'ks':
                    if (updateTarget) {
                        _$ks = [
                            document.querySelector('[name="ks"]')
                            , document.querySelector('[name="_job_ks"]')
                            , document.querySelector('[name="_corp_ks"]')
                        ];

                        if (_$ks[1]) {
                            _$ks[1].value = _$ks[0].value;
                            _$ks[2].value = _$ks[0].value;
                        }
                    }
                    break;

                case 'c0':
                case 'd0':
                case 'co':
                case 't0':
                    _$els = [
                        document.querySelector("#{0}".format(type))
                        , document.querySelector("#{0}Cht".format(type))
                        , document.querySelector("#_job_{0}".format(type))
                        , document.querySelector("#_job_{0}Cht".format(type))
                        , document.querySelector("#_corp_{0}".format(type))
                        , document.querySelector("#_corp_{0}Cht".format(type))
                    ];

                    if (_$els[0]) {
                        var _k = _$els[0].value.trim();
                        var _v = _$els[1].value.trim();

                        //更新數量
                        _$self.bs.Attr(document.querySelector('.tb-{0}'.format(type))
                            , 'data-count'
                            , _k.trim() == '' ? '0' : _k.split(',').length);

                        //更新目標內容
                        if (updateTarget) {
                            if (_$els[2]) {
                                _$els[2].value = _k;
                                _$els[3].value = _v;
                            }

                            if (_$els[4]) {
                                _$els[4].value = _k;
                                _$els[5].value = _v;
                            }
                        }
                    }
                    break;
            }
        },
		autocomplete: {
			isInit: false,
			run:function(){				
				if(!_$self.autocomplete.isInit){
					_$self.autocomplete.isInit = true;
					
					if(!_$self.element.searchInput)
						_$self.element.searchInput = document.querySelector(".search__bar-input--input");
					
					const _searchInput = _$self.element.searchInput;
					if(_searchInput) {
						$(_searchInput).autocomplete({
							paramName: 'q'
							, width: 290
							, serviceUrl: "https://webapi.1111.com.tw/gqlApi/api/searchExt/KeyWordAutoComplete"
						});
					}
				}
			},
		},
		/* 延遲載入套件 */
		lazyLoadLib: function() {
			try {
				var _v = (new Date()).getTime();
				
				var _fn = {
					jquery: function () {
						if (!window.jQuery)
							_$self.bs.Resource.Load("jquery-1.9.1.min.js", { tagName: 'script', src: '/includesU/jquery/jquery-1.9.1.min.js?v=' + _v }, _fn.tcodeMenu);
						else
							_fn.tcodeMenu();
					},
					tcodeMenu: function () {
						const _fnInit = function() {
							if (typeof open1111Menu !== 'function')
								open1111Menu = _open1111Menu;
							
							_fn.popper_min();
						};
						if (!window.tCodeMenu) {
							_$self.bs.Resource.Load("tCodeMenu.min.js", { tagName: 'script', src: '/includesU/tcodeMenu/tCodeMenu.min.js?v=' + _v }, _fnInit);
							_$self.bs.Resource.Load("tCodeMenu.min.css", { tagName: 'link', rel: "stylesheet", href: '/includesU/tcodeMenu/tCodeMenu.min.css?v=' + _v });
						}
						else
							_fnInit();
					},
					popper_min: function () {
						//載入跳窗套件依賴
						if (!window.Popper)
							_$self.bs.Resource.Load("popper.min.js", { tagName: 'script', src: '/includesU/mobileWeb/search/header/202405/popper.min.js?v=' + _v }, _fn.popper1111);
						else
							_fn.popper1111();
					},
					popper1111: function () {
						const _fnInit = function() {
							//初始化套窗套件
							window.popper1111.Init();
							
							//
							_fn.autocomplete();
						};
						
						//載入跳窗套件
						if (!window.popper1111)
							_$self.bs.Resource.Load("popper.js", { tagName: 'script', src: '/includesU/mobileWeb/search/header/202405/popper.js?v=' + _v }, _fnInit);
						else
							_fnInit();
					},
					autocomplete: function () {
						const _fnInit = function() {
							//關鍵字提示			
							_$self.autocomplete.run();
							
							//
							_fn.google_translate();
						};
						
						if (!window.jQuery.Autocomplete)
							_$self.bs.Resource.Load("jquery.autocomplete.min.js", { tagName: 'script', src: '/includesU/jquery/autocomplete/1.4.11/jquery.autocomplete.min.js?v=' + _v }, _fnInit);
						else
							_fnInit();
					},
					google_translate: function() {
						//載入多國語系
						if (!(window.google && window.google.translate))
							_$self.bs.Resource.Load("element.js", { tagName: 'script', src: 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' });
					}
				};

				_fn.jquery();
			} catch (err) { }
		},
		/* 延遲性初始化 */ 
		init: function(ev) {
			if(!_$self.lock.init) {
				_$self.lock.init = true;
		
				//搜尋紀錄
				_$self.searchLog.init();
					
				//放到外面 服務總攬
				const _els = ['header__service', 'navbar__mobile'];
				const _html = [];
				
				for(let i=0; i<_els.length; i++) {
					const _class = _els[i];
					const _el = document.querySelector('.' + _class);
					if(_el) {
						_html.push(_el.outerHTML + (_class == 'header__service' ? '<div class="header__service--mask" onclick="t1111bar.service.close(this)"></div>' : ''));
						_el.parentElement.removeChild(_el);
					}
				}
				
				document.querySelector('body').appendChild(document.createElement('div')).outerHTML = _html.join('');
				
				//延遲載入套件
				_$self.lazyLoadLib();			
			}
			
			//header捲動處理
			if(ev.type == 'scroll') {
				const _target = ev.currentTarget;
				const _position = _target.pageYOffset !== undefined ? _target.pageYOffset : _target.scrollY;
				
				if(_$self.element.mobileNav == undefined)
					_$self.element.mobileNav = document.querySelector(".navbar__mobile");
				
				if(_position < 100)
					_$self.bs.RemoveClass(_$self.element.header, 'header--fixed');
				else
					_$self.bs.AddClass(_$self.element.header, 'header--fixed');
			}
		}, 
		/* 服務總攬 */
		service: {
			/* 開啟 */
			open: function(sender) {
				const _body = document.querySelector('body');
				const _el = document.querySelector('.header__service');
				_$self.bs.AddClass(_body, 'header__service--open');
				_$self.bs.AddClass(_el, 'header__service--active');
			},
			/* 開啟 */
			close: function(sender) {				
				const _body = document.querySelector('body');
				const _el = document.querySelector('.header__service');
				_$self.bs.RemoveClass(_body, 'header__service--open');
				_$self.bs.RemoveClass(_el, 'header__service--active');
			},
			/* 大綱切換 */
			tabItemChange: function(sender) {
				const _id = _$self.bs.Attr(sender, 'data-tab');
				const _el = document.getElementById(_id);
				let _className = 'header__service-nav--active';
				
				//tab class
				_$self.bs.ForEach(sender.parentElement.children, function ($it) {
					if (_$self.bs.HasClass($it, _className)) {
						_$self.bs.RemoveClass($it, _className);
						return false;
					}
				});
				
				_$self.bs.AddClass(sender, _className);
				
				if(_el) {
					//item class
					_className = 'header__service-item--active';
					_$self.bs.ForEach(_el.parentElement.children, function ($it) {
						if (_$self.bs.HasClass($it, _className)) {
							_$self.bs.RemoveClass($it, _className);
							return false;
						}
					});
					
					_$self.bs.AddClass(_el, _className);
					
				}
			},
			/* 明細切換 */
			collapseItemChange: function(sender) {
				const _el = sender;
				const _className = 'header__service-collapse--active';
				
				_$self.bs.ForEach(_el.parentElement.children, function ($it) {
					if ($it != _el && _$self.bs.HasClass($it, _className)) {
						_$self.bs.RemoveClass($it, _className);
						return false;
					}
				});
				
				_$self.bs.ToggleClass(_el, _className);
			},
		},
		/* 是否顯示搜尋紀錄 */ 
		search_input: function(sender){	
			if(!_$self.element.dropdown_history)
				_$self.element.dropdown_history = document.querySelector('#dropdown_history');
				
			const _dropdown_history = _$self.element.dropdown_history;
			if(_dropdown_history) {												
				if(sender.value.length > 0)
					_$self.bs.AddClass(_dropdown_history, 'search__history--hide');
				else {
					_$self.bs.RemoveClass(_dropdown_history, 'search__history--hide');
					
					//更新位置
					// setTimeout(function(){
						// if(popper1111) {
							// const _instance = popper1111.getInstance(_$self.element.dropdown_history);
							// if(_instance)
								// _instance.update();
						// }
					// }, 300);
				}
			}
		}
    };

    return _$self;
}, this);

function setHref(lNo) {
    t1111bar.setHrefTopLink(lNo);
}

window.addEventListener('touchstart', t1111bar.init);
window.addEventListener('mousemove', t1111bar.init);
window.addEventListener('scroll', t1111bar.init);
window.addEventListener('resize', function () {
    t1111bar.checkSize();
});

document.addEventListener('readystatechange', function () {
    if (document.readyState == "complete") {
		setTimeout(function () {
			var _$tb = t1111bar;
			_$tb.element.header = document.querySelector("header.header");
			_$tb.element.navbar = document.querySelector(".header__navbar");
			_$tb.element.login = document.querySelector(".navbar__login-info").parentElement;
			_$tb.element.notlogin = document.querySelector(".navbar__link--notlogin").parentElement;
			
			//
			_$tb.agent = _$tb.getCookie("agent");
			
			//處理參數
			if (t1111BarArgs != undefined)
				_$tb.args = _$tb.jq.extend(_$tb.args, t1111BarArgs);

			//
			_$tb.d.checkLocation();
			
			window.addEventListener('popper1111', function(ev){
				switch(ev.detail.target.id) {
					case 'dropdown_history':
						if(ev.detail.type == 'show') {
							//設定 popper menu 寬度
							ev.detail.target.style.width = `${_$tb.element.navbar.offsetWidth - 60}px`;
							
							//更新位置
							setTimeout(function(){
								ev.detail.instance.update();
							}, 400);
						}
						break;
				}
			});

			//初始化外觀
			_$tb.getLoginInfo(_$tb.d.origin, function () {
				//假設狀態改變,重新初始化
				_$tb.d.init();
			});
		}, 300);
    }
});