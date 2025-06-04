if (window.finevision === undefined) {
    finevisionExp = function () {
        this.debug = false;
        this.path_to = {
            baseUrl: "finevision.ru",
            bootstrap_custom: {
                css:"https://finevision.ru/static/css/bootstrap-custom.css",
                js:"https://finevision.ru/static/js/bootstrap-custom.js",
            },
            bootstrap_cdn: {
                css:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
                js:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
            },
            jscookies:"http://finevision.ru/static/js/jsCookies.js",
            jquery:"https://code.jquery.com/jquery-1.12.4.min.js",
            finevision_css:"https://finevision.ru/static/css/finevision.css",

        };

        this.example_banner =  {
            style: {
                "z-index": "9999",
                background: "#fff",
                position: "fixed",
                right: "0",
                bottom: "0",
                border: "2px solid #000"
            },
            id: "finevision_banner",
            itemprop: "Copy",
            a: {
                href: "?finevision=true"
            },
            img: {
                src: "https://finevision.ru/static/banner2.jpg",
                width: "128px",
                height: "64px"
            }
        };

        this.banner = {
            id: "finevision_banner"
        };

        this.log = function(log) { if (this.debug) console.log(log); }

        this.urlParam = function(name){var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);if (results==null){return null;}else{return results[1] || 0;}}

        this.EventUtil = {
            addHandler: function( element, type, handler ) {
                if ( element.addEventListener ) {
                    element.addEventListener ( type, handler, false );
                } else if ( element.attachEvent ) {
                    element.attachEvent ( "on" + type, handler );
                } else {
                    element["on" + type] = handler;
                }
            },

            getEvent: function ( event ) {
                return event ? event : window.event;
            },

            getTarget: function ( event ) {
                return event.target || event.srcElement;
            },

            preventDefault: function ( event ) {
                if ( event.preventDefault ) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            },

            removeHandler: function( element, type, handler ) {
                if ( element.removeEventListener ) {
                    element.removeEventListener ( type, handler, false );
                } else if ( element.detachEvent ) {
                    element.detachEvent ( "on" + type, handler );
                } else {
                    element["on" + type] = null;
                }
            },

            stopPropagation: function ( event ) {
                if ( event.stopPropagation ) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            }

        };


        this.getCookie = function (name) {
	    return localStorage.getItem(name);
        };

        this.setCookie = function setCookie(name, value, options) {
            localStorage.setItem(name, value);
        };

        this.add_container = function () {
            if (document.getElementById("finevision_container") == null){
                var div = document.createElement('div');
                div.id="finevision_container";
                document.body.insertBefore(div, document.body.firstChild);
            }
            else {
                document.getElementById("finevision_container").innerHTML = "";
            }
        };

        this.check_url_flag = function () {
            if (this.urlParam('finevision')=="true") {
                return true
            }
            else
            {
                return false
            }
        };

        this.check_cookies_flag = function () {

        };

        this.create_example_banner = function () {
            banner = "<div onclick=\"finevision.activate_navbar()\" id=\"" + this.example_banner.id + "\"style=\"z-index:9999;background:#fff;position:fixed;right:0;bottom:0;border:2px solid #000;\"><img width=128 height=64 src=\"" + this.example_banner.img.src + "\"></img></div>"
            return $('#finevision_container').append(banner)
        };

        this.deactivate_finevision_navbar = function() {
            this.log("deactivate finevision navbar function");
            this.setCookie("navbarOn","false");
            this.init();
//	    location.reload();
        };

        this.activate_navbar = function() {
            this.log("deactivate finevision navbar function");
            this.setCookie("navbarOn","true","path=/");
            this.init();
            //location.reload();
        };

        this.jquery_code = function () {
            jQuery('#finevision_container').load(document.location.protocol + '//' + window.finevision_baseUrl + '/navbar/' + '?hostname=' + window.finevision.client_hostname + '&path=' + window.finevision.client_pathname);
        };

        this.load_navbar_jquery = function () {
            this.add_container();
            if ((typeof window.finevision_baseUrl == "undefined") || (window.finevision_baseUrl == null)) {this.banner_is_present(); }
            var parser = document.createElement('a');
            parser.href = window.location.href
            finevision.client_hostname = parser.hostname; // => "example.com"
            finevision.client_pathname = parser.pathname; // => "/pathname/"


            this.log("load jquery")
            var headTag = document.getElementsByTagName("head")[0];
            var jqTag = document.createElement('script');
            jqTag.type = 'text/javascript';
            jqTag.src = document.location.protocol + "//" + this.path_to.baseUrl + '/static/js/jquery-1.12.0.min.js';
            headTag.appendChild(jqTag);
            jqTag.onload = this.jquery_code;
        };

        this.load_banner = function () {
            this.add_container();
            banner = "<div onclick=\"finevision.activate_navbar()\" id=\"" + this.example_banner.id + "\"style=\"z-index:9999;background:#fff;position:fixed;right:0;bottom:0;border:2px solid #000;\"><img width=128 height=64 src=\"" + this.example_banner.img.src + "\"></img></div>"
            document.getElementById('finevision_container').innerHTML=banner;
        };

        this.banner_is_present = function () {
            try {var banner = document.getElementById(this.banner.id);}
            catch (error) { window.finevision_baseUrl = finevision.path_to.baseUrl; return false;}
            if (banner===null) { window.finevision_baseUrl = finevision.path_to.baseUrl; return false;}
            else {
                var baseUrl=banner.dataset.baseurl;
                var debug=banner.dataset.debug;
                if ((typeof debug != "undefined")&&(this.urlParam("debug")==null)) {
                    this.debug = debug;
                    this.log("debug=" + debug);
                }

                if ((typeof baseUrl == "undefined")&&(this.urlParam("baseUrl"))==null) {
                    window.finevision_baseUrl = finevision.path_to.baseUrl;
                    this.log("get default baseUrl");}
                else {
                    if (this.urlParam("baseUrl")==null) {
                        window.finevision_baseUrl = baseUrl;
                        this.log("get baseUrl from banner");}
                }

                return true;}
        };

        this.check_url_params = function () {
            this.log("check url params");
            var debug = this.urlParam("debug");
            if (debug!=null) {
                this.log("get debug by url param")
                this.debug = debug;
            }

            var baseUrl = this.urlParam("baseUrl");
            if (baseUrl!=false) {
                this.log("get baseUrl from url param, baseUrl="+baseUrl);
                window.finevision_baseUrl=baseUrl;
            }


        };

        this.init = function () {
            this.check_url_params();
            if (this.getCookie("navbarOn") == 'true') {
                this.log("navbarOn flag is true");
                //this.add_container();
                //this.load_navbar();
                this.load_navbar_jquery();
            }
            else
            {

                if (this.banner_is_present()) {this.log("banner is present")}
                else {
                    this.log("load banner");
                    this.load_banner();
                }
            }
        }

    }; // finevisionExp

    finevision = new finevisionExp();

    finevision.EventUtil.addHandler(window, "load",function(event){
        finevision.window_is_loaded=true;
        finevision.init();
    });


}


