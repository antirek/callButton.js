var callButtonProto = function (key, settings) {
    var options = {};
    var width = '400px';

    if (!settings) var settings = {};

    var initOptions = function () {
        options.title = settings.title || 'Перезвонить Вам?';
        options.key = key;
        options.backgroundColor = settings.backgroundColor || '#0094d6';
        options.titleColor = settings.titleColor || '#FFFFFF';
        options.top = settings.top || '150px';
        options.icon = settings.icon || false;
        options.iconAnimated = settings.iconAnimated || false;
        options.intrusiveMode = settings.intrusiveMode || false;
        options.intrusiveTimeout = parseInt(settings.intrusiveTimeout + '000') || 30000;
        options.closeButtonTitle = settings.closeButtonTitle || 'закрыть';
        options.yandexMetrika = settings.yandexMetrika || null;
    }();

    var browser = (function () {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident/i.test(M[1])) {
            tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }

        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }

        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

        return {'browser': M[0], 'version': M[1]};
    })();

    var browserTrusted = function () {
        return browser.browser === 'Chrome' || browser.browser === 'Firefox';
    };

    var sheet = (function () {
        var style = document.createElement("style");
        style.setAttribute('type', 'text/css');

        style.appendChild(document.createTextNode(cssCallButton));
        document.head.appendChild(style);

        return style.sheet;
    })();

    var Layout = function () {
        var component = document.createElement("div");
        component.setAttribute("id", "webcallComponent");
        component.setAttribute("style", [
            'top: ' + options.top + ' !important;',
            'background: ' + options.backgroundColor + ' !important;'
            ].join(" "));

        var panel = document.createElement("div");
        panel.setAttribute("id", "webcallPanel");

        var iframe = document.createElement("iframe");        
        var url = '//call.mobilon.ru/' + options.key + '/remote2';

        iframe.setAttribute('src', url);
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('style', 'position:relative; top:0px; left:0px;');

        panel.appendChild(iframe);

        var closeButton = document.createElement("div");
        closeButton.setAttribute("id", "webcallCloseButton");
        closeButton.innerHTML = "<b>" + options.closeButtonTitle + "</b>"

        panel.appendChild(closeButton);


        var header = document.createElement("div");
        header.setAttribute("id", "webcallHeader");

        var text = document.createElement("div");
        text.setAttribute("id", "webcallText");
        text.setAttribute("style", [           
            'color: ' + options.titleColor + ' !important;',
            ].join(" "));
        
        text.textContent = options.title;
        header.appendChild(text);

        if (options.icon && browserTrusted()) {

            var icon = document.createElement("img");
            var iconSvg = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g><path clip-rule="evenodd" d="m6.47719,1.62291c1.21752,-0.22999 2.01542,1.14288 2.62266,2.09006c0.59111,0.91995 1.31839,1.99927 1.02485,3.19662c-0.16341,0.67181 -0.77066,1.03797 -1.22963,1.43439c-0.45291,0.39138 -1.14288,0.75048 -1.31032,1.35168c-0.27336,0.97543 0.32481,1.99927 0.69501,2.58231c0.84126,1.31738 1.85805,2.50464 3.15627,3.5648c0.62843,0.51445 1.50097,1.20138 2.37553,1.02485c1.30629,-0.26428 1.65127,-1.8752 3.07355,-2.09006c1.35369,-0.20477 2.26961,0.77671 3.03421,1.4344c0.73636,0.6365 1.92463,1.45154 1.84393,2.54196c-0.04741,0.62641 -0.54975,1.01477 -0.98552,1.39304c-0.44283,0.38634 -0.83118,0.82009 -1.26896,1.10555c-1.06016,0.69198 -2.36039,1.03091 -3.85329,0.98451c-1.46364,-0.04539 -2.62972,-0.54269 -3.68786,-1.10656c-2.06888,-1.10354 -3.704,-2.65595 -5.24431,-4.3859c-1.51509,-1.7007 -2.91418,-3.71409 -3.68786,-5.94032c-0.96534,-2.78002 -0.45493,-5.63569 1.10757,-7.41708c0.26428,-0.30261 0.68189,-0.61834 1.06419,-0.94315c0.38129,-0.32582 0.73434,-0.72022 1.26997,-0.82109z" fill="' + options.titleColor + '" fill-rule="evenodd"/></g></svg>';
            var iconEncoded = encodeURIComponent(iconSvg);
            icon.setAttribute('src', 'data:image/svg+xml;utf8,' + iconEncoded);
            icon.setAttribute('id', 'webcallIcon');


            if (options.iconAnimated) {
                var cssAnimationRules = {
                    webkit: [
                        ['@-webkit-keyframes flash {',
                            '0%, 50%, 100% { opacity: 1; }',
                            '25%, 75% { opacity: 0; }',
                        '}'].join(" ")
                    ],
                    other: [
                        ['@keyframes flash {',
                            '0%, 50%, 100% { opacity: 1; }',
                            '25%, 75% { opacity: 0; }',
                        '}'].join(" ")
                    ]
                };

                var animation;
                if (CSSRule.WEBKIT_KEYFRAMES_RULE) {
                    animation = cssAnimationRules.webkit;
                } else {
                    animation = cssAnimationRules.other;
                }

                animation.map(function (rule) {
                    sheet.insertRule(rule, 0);
                });

                icon.setAttribute('class', 'webcallanimated');
            }

            header.insertBefore(icon, header.firstChild);
        }

        component.appendChild(header);
        component.appendChild(panel);        

        document.body.appendChild(component);

    }();

    var helper = {
        toggleClass: function (element, className) {
            if (element.classList) {
              element.classList.toggle(className);
            } else {
                var classes = element.className.split(' ');
                var existingIndex = -1;
                for (var i = classes.length; i--;) {
                  if (classes[i] === className)
                    existingIndex = i;
                }
                if (existingIndex >= 0)
                  classes.splice(existingIndex, 1);
                else
                  classes.push(className);
              element.className = classes.join(' ');
            }
        },
        addClass: function (element, className) {
            if (element.classList)
              element.classList.add(className);
            else
              element.className += ' ' + className;
        },
        removeClass: function (element, className) {
            if (element.classList)
              element.classList.remove(className);
            else
              element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        hasClass: function (element, className) {
            if (element.classList)
              return element.classList.contains(className);
            else
              return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    };

    var addClickAction = function () {
        var button = document.getElementById("webcallComponent");
        var panel = document.getElementById("webcallPanel");

        button.addEventListener("click", function () {
            helper.toggleClass(button, 'open');
            helper.toggleClass(panel, 'open');
        });

    }();

    var addClickOnBodyAction = function () {
        document.addEventListener('click', function (e) {
            var panel = document.getElementById("webcallPanel");
            var button = document.getElementById("webcallComponent");
            var text = document.getElementById("webcallText")
            if (helper.hasClass(button, 'open') && !(
                e.target === text ||
                e.target === button)
            ) {
                helper.toggleClass(button, 'open');
                helper.toggleClass(panel, 'open');
                e.stopPropagation()
            }
        });
    }();
    
    var enableIntrusiveMode = function () {
        if (options.intrusiveMode) {
            setTimeout(function () {
                var button = document.getElementById("webcallComponent");
                var panel = document.getElementById("webcallPanel");

                if (!helper.hasClass(button, 'open')){
                    helper.addClass(button, 'open');
                    helper.addClass(panel, 'open');
                };

            }, options.intrusiveTimeout);
        }
    }();

    var bindYandexMetrika = function () {
        if (options.yandexMetrika) {
            //@todo: validate yaMetrika options
            try {
                var counterId = options.yandexMetrika.counterId || null;
                var goal = options.yandexMetrika.goal || 'CALLBUTTON';
                var callback = options.yandexMetrika.callback;
                if (counterId && window['yaCounter' + counterId]) {
                    window.addEventListener('message', function (evt) {
                        if (!callback) { 
                            window['yaCounter' + counterId].reachGoal(goal, evt.data);
                        } else {
                            callback(evt.data);
                        }
                    });
                } else { 
                    console.log('no yandex metrika settings'); 
                }
            } catch (e) {
                console.log('error', e);
            }
        }
    }();
};


var callButton = function (key, options) {
    var go = function () {
        callButtonProto(key, options);
    };
    
    var body = document.getElementsByTagName('BODY')[0];
    if ((body && body.readyState == 'loaded') || (body &&  body.readyState == 'complete')) {
        go();
    } else {            
        if (window.addEventListener) {
            window.addEventListener('load', go, false);
        } else {
            window.attachEvent('onload',go);
        }
    }   
};