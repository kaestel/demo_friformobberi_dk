
/*u.js*/
var u, Util = u = new function() {}
u.version = 0.3;

/*u-debug.js*/
Util.testURL = function(url) {
	return true;
	return url.match(/http\:\/\/mkn\.|http\:\/\/w\.|\.local/i);
}
Util.debug = function(output) {
	if(Util.testURL(location.href)) {
		var element, br;
		if(Util.debugWindow && Util.debugWindow.document) {
			element = Util.debugWindow.document.createTextNode(output);
			br = Util.debugWindow.document.createElement('br');
			Util.debugWindow.document.body.appendChild(element);
			Util.debugWindow.document.body.appendChild(br);
			Util.debugWindow.scrollBy(0,1000);
		}
		else {
			Util.openDebugger();
			if(!Util.debugWindow) {
				alert("Disable popup blocker!");
			}
			else {
				Util.debug(output);
			}
		}
	}
}
Util.debugWindow = false;
Util.openDebugger = function() {
	Util.debugWindow = window.open("", "debugWindow", "width=600, height=400, scrollbars=yes, resizable=yes");
	Util.debugWindow.document.body.style.fontFamily = "Courier";
	var element = Util.debugWindow.document.createTextNode("--- new session ---");
	var br = Util.debugWindow.document.createElement('br');
	Util.debugWindow.document.body.appendChild(br);
	Util.debugWindow.document.body.appendChild(element);
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
}
Util.tracePointer = function(e) {
	if(Util.testURL(location.href)) {
		var position = document.createElement("div");
		document.body.appendChild(position);
		position.id = "debug_pointer";
		position.style.position = "absolute";
		position.style.backgroundColor = "#ffffff";
		position.style.color = "#000000";
		this.trackMouse = function(event) {
			u.ge("debug_pointer").innerHTML = event.pageX+"x"+event.pageY;
			u.ge("debug_pointer").style.left = 7+event.pageX+"px";
			u.ge("debug_pointer").style.top = 7+event.pageY+"px";
		}
		u.e.addEvent(e, "mousemove", this.trackMouse);
	}
}
Util.bug = function(target, message) {
	if(Util.testURL(location.href)) {
		var option, options = new Array(new Array(0, "auto", "auto", 0), new Array(0, 0, "auto", "auto"), new Array("auto", 0, 0, "auto"), new Array("auto", "auto", 0, 0));
		if(!message) {
			message = target;
			target = options[0];
		}
		if(!u.ge("debug_"+target)) {
			for(var i = 0; option = options[i]; i++) {
				if(!u.ge("debug_id_"+i)) {
					var d_target = document.createElement("div");
					document.body.appendChild(d_target);
					d_target.style.position = "absolute";
					d_target.style.zIndex = 100;
					d_target.style.top = option[0];
					d_target.style.right = option[1];
					d_target.style.bottom = option[2];
					d_target.style.left = option[3];
					d_target.style.backgroundColor = "#ffffff";
					d_target.style.color = "#000000";
					d_target.style.padding = "3px";
					d_target.id = "debug_id_"+i;
					d_target.className = "debug_"+target;
					break;
				}
			}
		}
		u.ge("debug_"+target).innerHTML += message+"<br>";
	}
}

/*u-url.js*/
Util.getVar = function(s) {
	var p = location.search;
	var start_index = (p.indexOf("&" + s + "=") > -1) ? p.indexOf("&" + s + "=") + s.length + 2 : ((p.indexOf("?" + s + "=") > -1) ? p.indexOf("?" + s + "=") + s.length + 2 : false);
	var end_index = (p.substring(start_index).indexOf("&") > -1) ? p.substring(start_index).indexOf("&") + start_index : false;
	var return_string = start_index ? p.substring(start_index,(end_index ? end_index : p.length)): "";
	return return_string;
}
Util.getHashVar = function(s) {
	var h = location.hash;
	var values, index, list;
	values = h.substring(1).split("&");
	for(index in values) {
		list = values[index].split("=");
		if(list[0] == s) {
			return list[1];
		}
	}
	return false;
}
Util.getUniqueId = function() {
	return ("id" + Math.random() * Math.pow(10, 17) + Math.random());
}
Util.getHashPath = function(n) {
	var h = location.hash;
	var values;
	if(h.length) {
		values = h.substring(2).split("/");
		if(n && values[n]) {
			return values[n];
		}
	}
	return values ? values : false;
}
Util.setHashPath = function(path) {
	location.hash = path;
	return Util.getHashPath();
}

/*u-dom.js*/
Util.ge = function(id, target) {
	var e, i, regexp, t;
	t = target ? target : document;
	if(document.getElementById(id)) {
		return document.getElementById(id);
	}
	regexp = new RegExp("(^|\\s)" + id + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			return e;
		}
	}
	return t.getElementsByTagName(id).length ? t.getElementsByTagName(id)[0] : false;
}
Util.ges = function(id, target) {
	var e, i, regexp, t;
	var elements = new Array();
	t = target ? target : document;
	regexp = new RegExp("(^|\\s)" + id + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			elements.push(e);
		}
	}
	return elements.length ? elements : t.getElementsByTagName(id);
}
Util.gs = function(e, direction) {
	var node_type = e.nodeType;
	var ready = false;
	var prev_node = false
	for(var i = 0; node = e.parentNode.childNodes[i]; i++) {
		if(node.nodeType == node_type) {
			if(ready) {
				return node;
			}
			if(node == e) {
				if(direction == "next") {
					ready = true;
				}
				else {
					return prev_node;
				}
			}
			else {
				prev_node = node;
			}
		}
	}
	return false;
}
Util.qs = function(query, target) {
	t = target ? target : document;
	return t.querySelector(query);
}
Util.qsa = function(query, target) {
	t = target ? target : document;
	return t.querySelectorAll(query);
}
Util.ae = function(e, node_type, attributes) {
	var node = e.appendChild(document.createElement(node_type));
	if(attributes) {
		if(typeof(attributes) == "object") {
			for(attribute in attributes) {
				node.setAttribute(attribute, attributes[attribute]);
			}
		}
		else {
			u.addClass(node, attributes)
		}
	}
	node.e = e;
	return node;
}
Util.ie = function(e, node_type, attributes) {
	var node = e.insertBefore(document.createElement(node_type), e.firstChild);
	if(attributes) {
		if(typeof(attributes) == "object") {
			for(attribute in attributes) {
				node.setAttribute(attribute, attributes[attribute]);
			}
		}
		else {
			u.addClass(node, attributes)
		}
	}
	node.e = e;
	return node;
}
Util.getIJ = function(e, id) {
	var regexp = new RegExp(id + ":[?=\\w/\\#~:.?+=?&%@!\\-]*");
	if(e.className.match(regexp)) {
		return e.className.match(regexp)[0].replace(id + ":", "");
	}
	return false;
}
Util.addClass = function(e, classname) {
	if(classname) {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(!regexp.test(e.className)) {
			e.className += e.className ? " " + classname : classname;
			e.offsetTop;
		}
	}
}
Util.removeClass = function(e, classname) {
	if(classname) {
		var regexp = new RegExp(classname + " | " + classname + "|" + classname);
		e.className = e.className.replace(regexp, "");
		e.offsetTop;
	}
}
Util.toggleClass = function(e, classname) {
	var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
	if(regexp.test(e.className)) {
		Util.removeClass(e, classname);
	}
	else {
		Util.addClass(e, classname);
	}
	e.offsetTop;
}
Util.wrapElement = function(e, wrap) {
	wrap = e.parentNode.insertBefore(document.createElement(wrap), e);
	wrap.appendChild(e);
	return wrap;
}

/*u-flash.js*/
Util.flash = function(e, url, id, w, h) {
	w = w ? w : e.offsetWidth;
	h = h ? h : e.offsetHeight;
	id = id ? id : "flash_" + new Date().getHours() + "_" + new Date().getMinutes() + "_" + new Date().getMilliseconds();
	var object = u.ae(e, "object");
	object.id = id;
	object.name = id;
	object.width = w;
	object.width = h;
	object.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
	object.setAttribute("codebase", "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0");
	u.ae(object, "param").setAttribute("allowScriptAccess") = "always";
	u.ae(object, "param").setAttribute("movie") = "url";
	u.ae(object, "param").setAttribute("quality") = "high";
	u.ae(object, "param").setAttribute("wmode") = "transparent";
	u.ae(object, "param").setAttribute("menu") = "false";
	u.ae(object, "param").setAttribute("scale") = "noscale";
	return object;
}

/*u-xmlrequest.js*/
Util.createRequestObject = function() {
	var request_object = false;
		try {
			request_object = new XMLHttpRequest();
		}
		catch(e){
			request_object = new ActiveXObject("Microsoft.XMLHTTP");
		}
	return typeof(request_object.send) == 'undefined' ? false : request_object;
}
Util.XMLRequest = function(url, node, parameters, async, method) {
	parameters = parameters ? parameters : "";
	async = async ? async : true;
	method = method ? method : "POST";
	var XMLRequest = new Object();
	XMLRequest.Http = this.createRequestObject();
	if(!XMLRequest.Http) {
		node.XMLResponse(u.validateResponse(false, false));
		return;
	}
	if(async) {
		XMLRequest.Http.node = node ? node : Util;
		XMLRequest.Http.onreadystatechange = function() {
			if(XMLRequest.Http.readyState == 4) {
				if(!this.node) {
					u.bug("Lost track of node: " + XMLRequest.Http.statusText);
				}
				else {
					this.node.XMLResponse(u.validateResponse(this, true));
				}
			}
		}
	}
	try {
		XMLRequest.Http.open(method, url, async);
		XMLRequest.Http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		XMLRequest.Http.send(parameters);
	}
	catch(e) {
		node.XMLResponse(u.validateResponse(XMLRequest, false));
		return;
	}
	if(!async) {
		node.XMLResponse(u.validateResponse(XMLRequest, true));
	}
}
Util.XMLResponse = function(response) {
	alert("base responder")
}
Util.validateResponse = function(request, state){
	var e = document.createElement("div");
	if(state) {
		try {
			request.status;
			if(request.status == 200) {
				e.innerHTML = request.responseText;
			}
			else {
				e.innerHTML = '<div class="error">Response error:'+request.status+ ':'+request.url + request.parameters +'</div>';
				u.bug("status NOT 200:" + request.status);
				u.bug(request.statusText);
			}
		}
		catch(e) {
			e.innerHTML = '<div class="error">Response error: no status</div>';
			u.bug("NO status exceptions:" + e);
			u.bug(request.statusText);
		}
	}
	else {
		e.innerHTML = '<div class="error">Request error:'+request.url + request.parameters + '</div>';
		u.bug("Request error:" + request.url + request.parameters);
	}
	return e;
}

/*u-events.js*/
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" ? "mouse" : "touch";
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.cancelBubble = true;
		}
	}
	this.addEvent = function(e, type, action) {
		try {
			e.addEventListener(type, action, false);
		}
		catch(exception) {
			if(document.all) {
				u.bug("exception:" + e + "," + type + ":" + exception);
			}
			else {
				u.bug("exception:" + e + "," + type + ":" + exception);
			}
		}
	}
	this.removeEvent = function(e, type, action) {
		try {
			e.removeEventListener(type, action, false);
		}
		catch(exception) {
		}
	}
	this.onStart = this.onDown = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.onMove = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.onEnd = this.onUp = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(e.snapback && u.e.event_pref == "mouse") {
			u.e.addEvent(e, "mouseout", this._snapback);
		}
		else if(e.drag && u.e.event_pref == "mouse") {
		}
	}
	this.transitioned = function(e) {
		if(typeof(e.style.webkitTransition) != "undefined") {
			u.e.addEvent(e, "webkitTransitionEnd", this._transitioned);
		}
		else {
			u.e.addEvent(e, "transitionend", this._transitioned);
		}
	}
	this._transitioned = function(event) {
		if(typeof(this.transitioned) == "function") {
			this.transitioned(event);
		}
	}
	this.animated = function(e) {
		if(typeof(e.style.webkitAnimation) != "undefined") {
			u.e.addEvent(e, "webkitAnimationEnd", this._animated);
		}
		else {
			u.e.addEvent(e, "animationend", this._animated);
		}
	}
	this._animated = function(event) {
		if(typeof(this.animated) == "function") {
			this.animated(event);
		}
	}
	this.onTransitionEnd = function(e, action) {
		u.e.addEvent(e, "webkitTransitionEnd", action);
		u.e.addEvent(e, "transitionend", action);
	}
	this.transitionEnded = function(e, action) {
		u.e.removeEvent(e, "webkitTransitionEnd", action);
		u.e.removeEvent(e, "transitionend", action);
	}
	this.onAnimationEnd = function(e, action) {
		u.e.addEvent(e, "webkitAnimationEnd", action);
		u.e.addEvent(e, "animationend", action);
	}
	this.animationEnded = function(e, action) {
		u.e.removeEvent(e, "webkitAnimationEnd", action);
		u.e.removeEvent(e, "animationend", action);
	}
	this.transform = function(e, x, y) {
		if(typeof(e.style.MozTransition) != "undefined" || typeof(e.style.webkitTransition) != "undefined") {
			e.style.MozTransform = "translate("+x+"px, "+y+"px)";
			e.style.webkitTransform = "translate3d("+x+"px, "+y+"px, 0)";
			e.element_x = x;
			e.element_y = y;
		}
		else {
			e.style.position = "absolute";
			u.bug("duration:" + e.duration);
			if(!e.duration) {
				e.style.left = x+"px";
				e.style.top = y+"px";
				e.element_x = x;
				e.element_y = y;
			}
			else {
				e.transitions = 15;
				e.transition_progress = 0;
				e.element_x = e.element_x ? e.element_x : 0;
				e.element_y = e.element_y ? e.element_y : 0;
				e.transitionTo = function() {
						++this.transition_progress;
						this.style.left =  this.end_x-(this.distance_x - (this.interval_x*this.transition_progress))+"px";
						this.style.top =  this.end_y-this.distance_y - this.interval_y*this.transition_progress+"px";
						this.element_x = this.end_x-(this.distance_x - (this.interval_x*this.transition_progress));
						this.element_y = this.end_y-(this.distance_y - (this.interval_y*this.transition_progress));
				}
				e.end_x = x;
				e.end_y = y;
				if(e.end_x > e.element_x) {
					if(e.end_x > 0 && e.element_x >= 0 || e.end_x >= 0 && e.element_x < 0) {
						e.distance_x = e.end_x - e.element_x;
					}
					else {
						e.distance_x = e.element_x - e.end_x;
					}
				}
				else if(e.end_x < e.element_x) {
					if(e.end_x <= 0 && e.element_x > 0 || e.end_x < 0 && e.element_x <= 0) {
						e.distance_x = e.end_x - e.element_x;
					}
					else {
						e.distance_x = e.element_x - e.end_x;
					}
				}
				else {
					e.distance_x = 0;
				}
				if(e.end_y > e.element_y) {
					if(e.end_y > 0 && e.element_y >= 0 || e.end_y >= 0 && e.element_y < 0) {
						e.distance_y = e.end_y - e.element_y;
					}
					else {
						e.distance_y = e.element_y - e.end_y;
					}
				}
				else if(e.end_y < e.element_y) {
					if(e.end_y <= 0 && e.element_y > 0 || e.end_y < 0 && e.element_y <= 0) {
						e.distance_y = e.end_y - e.element_y;
					}
					else {
						e.distance_y = e.element_y - e.end_y;
					}
				}
				else {
					e.distance_y = 0;
				}
				e.interval_x = e.distance_x/e.transitions;
				e.interval_y = e.distance_y/e.transitions;
				for(var i = 0; i < e.transitions; i++) {
					u.t.setTimer(e, e.transitionTo, (e.duration/e.transitions)*i);
				}
				if(typeof(e.transitioned) == "function") {
					u.t.setTimer(e, e.transitioned, e.duration);
				}
			}
		}
	}
	this.transition = function(e, transition) {
		if(typeof(e.style.MozTransition) != "undefined" || typeof(e.style.webkitTransition) != "undefined") {
			e.style.MozTransition = transition;
			e.style.webkitTransition = transition;
			if(typeof(e.transitioned) == "function") {
				this.onTransitionEnd(e, e.transitioned);
			}
		}
		else {
			var duration = transition.match(/[0-9.]+[ms]/g) ? transition.match(/[0-9.]+[ms]/g).toString() : false;
			e.duration = duration ? (duration.match("ms") ? parseFloat(duration) : parseFloat(duration) * 1000) : false;
		}
	}
	this.overlap = function(element, target, strict) {
		if(target.constructor.toString().match("Array")) {
			var target_start_x = Number(target[0]);
			var target_start_y = Number(target[1]);
			var target_end_x = Number(target[2]);
			var target_end_y = Number(target[3]);
		}
		else {
			var target_start_x = target.element_x ? target.element_x : 0;
			var target_start_y = target.element_y ? target.element_y : 0;
			var target_end_x = Number(target_start_x + target.offsetWidth);
			var target_end_y = Number(target_start_y + target.offsetHeight);
		}
		var element_start_x = Number(element.element_x);
		var element_start_y = Number(element.element_y);
		var element_end_x = Number(element_start_x + element.offsetWidth);
		var element_end_y = Number(element_start_y + element.offsetHeight);
		if(strict && element_start_x >= target_start_x && element_start_y >= target_start_y && element_end_x <= target_end_x && element_end_y <= target_end_y) {
			return true;
		}
		else if(strict) {
			return false;
		}
		else if(element_end_x < target_start_x || element_start_x > target_end_x || element_end_y < target_start_y || element_start_y > target_end_y) {
			return false;
		}
		return true;
	}
	this.resetEvents = function(e) {
		u.t.resetTimer(e.t_held);
		u.t.resetTimer(e.t_clicked);
		this.removeEvent(e, "mouseup", this._dblclicked);
		this.removeEvent(e, "touchend", this._dblclicked);
		this.removeEvent(e, "mousemove", this._inputClickMove);
		this.removeEvent(e, "touchmove", this._inputClickMove);
		this.removeEvent(e, "mousemove", this._pick);
		this.removeEvent(e, "touchmove", this._pick);
		this.removeEvent(e, "mousemove", this._drag);
		this.removeEvent(e, "touchmove", this._drag);
		this.removeEvent(e, "mouseup", this._drop);
		this.removeEvent(e, "touchend", this._drop);
		this.removeEvent(e, "mouseout", this._snapback);
		this.removeEvent(e, "mouseout", this._drop);
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = new Date().getTime();
		this.current_xps = 0;
		this.current_yps = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			u.e.onMove(this, u.e._inputClickMove);
			u.e.onEnd(this, u.e._dblclicked);
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.onMove(this, u.e._pick);
			u.e.onEnd(this, u.e._drop);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._inputClickMove = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.clickMoved) == "function") {
			this.clickMoved(event);
		}
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this.hold = function(e) {
		e.e_hold = true;
		u.e.onStart(e, this._inputStart);
	}
	this._held = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(e) {
		e.e_click = true;
		u.e.onStart(e, this._inputStart);
	}
	this._clicked = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(e) {
		u.bug("set dblclick:"+e.nodeName)
		e.e_dblclick = true;
		u.e.onStart(e, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			u.e.resetEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(!event) {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.drag = function(e, target, strict, snapback) {
		e.e_drag = true;
		e.strict = strict ? true : false;
		e.allowed_offset = e.strict ? 0 : 250;
		e.elastica = 2;
		e.snapback = snapback ? true : false;
		if(target.constructor.toString().match("Array")) {
			e.start_drag_x = Number(target[0]);
			e.start_drag_y = Number(target[1]);
			e.end_drag_x = Number(target[2]);
			e.end_drag_y = Number(target[3]);
		}
		else {
			e.start_drag_x = target.element_x ? target.element_x : 0;
			e.start_drag_y = target.element_y ? target.element_y : 0;
			e.end_drag_x = Number(e.start_drag_x + target.offsetWidth);
			e.end_drag_y = Number(e.start_drag_y + target.offsetHeight);
		}
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		e.locked = ((e.end_drag_x - e.start_drag_x == e.offsetWidth) && (e.end_drag_y - e.start_drag_y == e.offsetHeight));
		e.vertical = (!e.locked && e.end_drag_x - e.start_drag_x == e.offsetWidth);
		e.horisontal = (!e.locked && e.end_drag_y - e.start_drag_y == e.offsetHeight);
		u.e.onStart(e, this._inputStart);
	}
	this._pick = function(event) {
	    u.e.kill(event);
		this.move_timestamp = new Date().getTime();
		this.current_xps = 0;
		this.current_yps = 0;
		this.start_input_x = u.eventX(event) - this.element_x; // - u.absLeft(this);//(event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
		this.start_input_y = u.eventY(event) - this.element_y; // - u.absTop(this);//.targetTouches ? event.targetTouches[0].pageY : event.pageY);
		u.e.transition(this, "none");
		if(typeof(this.picked) == "function") {
			this.picked(event);
		}
		u.e.resetEvents(this);
		u.e.onMove(this, u.e._drag);
		u.e.onEnd(this, u.e._drop);
	}
	this._drag = function(event) {
			this.new_move_timestamp = new Date().getTime();
				var offset = false;
				this.current_x = u.eventX(event) - this.start_input_x;
				this.current_y = u.eventY(event) - this.start_input_y;
					this.current_xps = Math.round(((this.current_x - this.element_x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
					this.current_yps = Math.round(((this.current_y - this.element_y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
				this.move_timestamp = this.new_move_timestamp;
				if(this.vertical) {
					this.element_y = this.current_y;
				}
				else if(this.horisontal) {
					this.element_x = this.current_x;
				}
				else if(!this.locked) {
					this.element_x = this.current_x;
					this.element_y = this.current_y;
				}
				if(!this.locked) {
					if(u.e.overlap(this, new Array(this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y), true)) {
						if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.horisontal)) {
							if(this.current_xps < 0) {
								this.swiped = "left";
							}
							else {
								this.swiped = "right";
							}
						}
						else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.vertical)) {
							if(this.current_yps < 0) {
								this.swiped = "up";
							}
							else {
								this.swiped = "down";
							}
						}
						u.a.translate(this, this.element_x, this.element_y);
					}
					else {
						this.swiped = false;
						this.current_xps = 0;
						this.current_yps = 0;
						if(this.element_x < this.start_drag_x) {
							offset = this.element_x < this.start_drag_x - this.allowed_offset ? - this.allowed_offset : this.element_x - this.start_drag_x;
							this.element_x = this.start_drag_x;
							this.current_x = this.element_x + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_x + this.offsetWidth > this.end_drag_x) {
							offset = this.element_x + this.offsetWidth > this.end_drag_x + this.allowed_offset ? this.allowed_offset : this.element_x + this.offsetWidth - this.end_drag_x;
							this.element_x = this.end_drag_x - this.offsetWidth;
							this.current_x = this.element_x + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_x = this.element_x;
						}
						if(this.element_y < this.start_drag_y) {
							offset = this.element_y < this.start_drag_y - this.allowed_offset ? - this.allowed_offset : this.element_y - this.start_drag_y;
							this.element_y = this.start_drag_y;
							this.current_y = this.element_y + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_y + this.offsetHeight > this.end_drag_y) {
							offset = (this.element_y + this.offsetHeight > this.end_drag_y + this.allowed_offset) ? this.allowed_offset : (this.element_y + this.offsetHeight - this.end_drag_y);
							this.element_y = this.end_drag_y - this.offsetHeight;
							this.current_y = this.element_y + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_y = this.element_y;
						}
						if(offset) {
							u.a.translate(this, this.current_x, this.current_y);
						}
					}
				}
			if(typeof(this.moved) == "function") {
				this.moved(event);
			}
	}
	this._drop = function(event) {
		u.e.resetEvents(this);
		if(this.swipe && this.swiped) {
			if(this.swiped == "left") {
				if(typeof(this.swipedLeft) == "function") {
					this.swipedLeft(event);
				}
			}
			else if(this.swiped == "right") {
				if(typeof(this.swipedRight) == "function") {
					this.swipedRight(event);
				}
			}
			else if(this.swiped == "down") {
				if(typeof(this.swipedDown) == "function") {
					this.swipedDown(event);
				}
			}
			else if(this.swiped == "up") {
				if(typeof(this.swipedUp) == "function") {
					this.swipedUp(event);
				}
			}
		}
		else if(!this.locked && this.start_input_x && this.start_input_y) {
			this.start_input_x = false;
			this.start_input_y = false;
			this.current_x = this.element_x + (this.current_xps/2);
			this.current_y = this.element_y + (this.current_yps/2);
			if(this.current_x < this.start_drag_x) {
				this.current_x = this.start_drag_x;
			}
			else if(this.current_x + this.offsetWidth > this.end_drag_x) {
				this.current_x = this.end_drag_x - this.offsetWidth;
			}
			if(this.current_y < this.start_drag_y) {
				this.current_y = this.start_drag_y;
			}
			else if(this.current_y + this.offsetHeight > this.end_drag_y) {
				this.current_y = this.end_drag_y - this.offsetHeight;
			}
			if(!this.strict && (this.current_xps || this.current_yps)) {
				u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
			}
			else {
				u.a.transition(this, "all 0.1s cubic-bezier(0,0,0.25,1)");
			}
			u.a.translate(this, this.current_x, this.current_y);
		}
		if(typeof(this.dropped) == "function") {
			this.dropped(event);
		}
	}
	this.swipe = function(e, target, strict) {
		e.e_swipe = true;
		u.e.drag(e, target, strict);
	}
	this._swipe = function(event) {
	}
	this._snapback = function(event) {
	    u.e.kill(event);
		u.bug(2, "snap")
		if(this.start_input_x && this.start_input_y) {
			input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
			input_y = event.targetTouches ? event.targetTouches[0].pageY : event.pageY;
			offset_x = 0;
			offset_y = 0;
			if(this.vertical) {
				offset_y = input_y - this.current_y;
			}
			else if(this.horisontal) {
				offset_x = input_x - this.current_x;
			}
			else {
				offset_x = input_x - this.current_x;
				offset_y = input_y - this.current_y;
			}
			u.e.transform(this, (this.element_x+offset_x), (this.element_y+offset_y));
		}
	}
}

/*u-image.js*/
Util.Image = u.i = new function() {
	this.load = function(e, src) {
		var image = new Image();
		image.e = e;
		u.addClass(e, "loading");
	    image.addEventListener('load', u.i._loaded ,false);
		image.src = src;
	}
	this._loaded = function(event) {
		u.removeClass(this.e, "loading");
		if(typeof(this.e.loaded) == "function") {
			this.e.loaded(event);
		}
	}
	this._progress = function(event) {
		u.bug("progress")
		if(typeof(this.e.progress) == "function") {
			this.e.progress(event);
		}
	}
}

/*u-position.js*/
Util.absLeft = function(e) {
	if(e.offsetParent) {
		return e.offsetLeft + Util.absLeft(e.offsetParent);
	}
	return e.offsetLeft;
} 
Util.absTop = function(e) {
	if(e.offsetParent) {
		return e.offsetTop + Util.absTop(e.offsetParent);
	}
	return e.offsetTop;
}
Util.eventX = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageY : event.pageY);
}

/*u-timer.js*/
Util.Timer = u.t = new function() {
	this.actions = new Array();
	this.objects = new Array();
	this.timers = new Array();
	this.setTimer = function(object, action, timeout) {
		var id = this.actions.length;
		this.actions[id] = action;
		this.objects[id] = object;
		this.timers[id] = setTimeout("u.t.execute("+id+")", timeout);
		return id;
	}
	this.resetTimer = function(id) {
		clearTimeout(this.timers[id]);
		this.objects[id] = false;
	}
	this.execute = function(id) {
		this.objects[id].exe = this.actions[id];
		this.objects[id].exe();
		this.objects[id].exe = null;
		this.actions[id] = null;
		this.objects[id] = false;
		this.timers[id] = null;
	}
	this.valid = function(id) {
		return this.objects[id] ? true : false;
	}
}

/*u-animation.js*/
Util.Animation = u.a = new function() {
	this.variant = function(e) {
		if(this.implementation == undefined) {
			if(document.body.style.webkitTransition != undefined) {
				this.implementation = "webkit";
			}
			else if(document.body.style.MozTransition != undefined) {
				this.implementation = "Moz";
			}
			else if(document.body.style.oTransition != undefined) {
				this.implementation = "o";
			}
			else {
				this.implementation = "";
			}
		}
		return this.implementation;
	}
	this.translate = function(e, x, y) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px)";
		e.element_x = x;
		e.element_y = y;
		e.transition_timestamp = new Date().getTime();
	}
	this.rotate = function(e, deg) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg)";
		e.rotation = deg;
		e.transition_timestamp = new Date().getTime();
	}
	this.scale = function(e, scale) {
		e.style[this.variant() + "Transform"] = "scale("+scale+")";
		e.scale = scale;
		e.transition_timestamp = new Date().getTime();
	}
	this.rotateTranslate = function(e, deg, x, y) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg) translate("+x+"px, "+y+"px)";
		e.rotation = deg;
		e.element_x = x;
		e.element_y = y;
		e.transition_timestamp = new Date().getTime();
	}
	this.translateRotate = function(e, x, y, deg) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px) rotate("+deg+"deg)";
		e.element_x = x;
		e.element_y = y;
		e.rotation = deg;
		e.transition_timestamp = new Date().getTime();
	}
	this.transition = function(e, transition) {
		e.style[this.variant() + "Transition"] = transition;
		u.e.addEvent(e, this.variant() + "TransitionEnd", this._transitioned);
		var duration = transition.match(/[0-9.]+[ms]/g);
		if(duration) {
			var d = duration[0];
			e.duration = d.match("ms") ? parseFloat(d) : (parseFloat(d) * 1000);
		}
		else {
			e.duration = false;
		}
	}
	this.transitioned = function(e) {
		u.e.addEvent(e, this.variant()+"TransitionEnd", u.a._transitioned);
		u.e.addEvent(e, "transitionend", u.a._transitioned);
	}
	this._transitioned = function(event) {
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
		}
	}
}

/*u-system.js*/
Util.explorer = function(version, scope) {
	if(document.all) {
		var undefined;
		var current_version = navigator.userAgent.match(/(MSIE )(\d+.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.safari = function(version, scope) {
	if(navigator.userAgent.indexOf("Safari") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(Safari\/)(\d+)(.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.webkit = function(version, scope) {
	if(navigator.userAgent.indexOf("AppleWebKit") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(AppleWebKit\/)(\d+.\d)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(!scope && version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.firefox = function(version, scope) {
	if(navigator.userAgent.indexOf("Firefox") >= 0) {
		var undefined;
		var current_version = navigator.userAgent.match(/(Firefox\/)(\d+\.\d+)(\.\d+)/i)[2];
		if(scope && !eval(current_version + scope + version)){
			return false;
		}
		else if(version && current_version != version) {
			return false;
		}
		else {
			return current_version;
		}
	}
	else {
		return false;
	}
}
Util.opera = function() {
	return (navigator.userAgent.indexOf("Opera") >= 0) ? true : false;
}
Util.windows = function() {
	return (navigator.userAgent.indexOf("Windows") >= 0) ? true : false;
}
Util.osx = function() {
	return (navigator.userAgent.indexOf("OS X") >= 0) ? true : false;
}

/*s-tablet.js*/
var segment = "tablet";
/*u-init.js*/
Util.Objects = u.o = new Array();
Util.init = function() {
	window.scrollTo(0,1);
	var i, e, elements, ij_value;
	elements = u.ges("i\:([_a-zA-Z0-9])+");
	for(i = 0; e = elements[i]; i++) {
		while((ij_value = u.getIJ(e, "i"))) {
			u.removeClass(e, "i:"+ij_value);
			if(ij_value && typeof(u.Objects[ij_value]) == "object") {
				u.Objects[ij_value].init(e);
			}
		}
	}
}
window.onload = u.init;
/*u-video.js*/
Util.videoPlayer = function(e) {
	var player = u.ae(e, "div", "player");
	player.video = u.ae(player, "video");
	if(typeof(player.video.play) == "function") {
		player.load = function(src) {
			if(this.playing) {
				this.stop();
			}
			if(src) {
				this.video.src = this.correctSource(src);
				this.video.load();
				this.video.controls = "hide";
			}
		}
		player.play = function(position) {
			this.playing = true;
			position = position ? position : 0;
			if(this.video.src) {
				this.video.play();
			}
		}
		player.loadAndPlay = function(src, position) {
			this.load(src);
			this.play(position);
		}
		player.pause = function() {
			this.playing = false;
			this.video.pause();
		}
		player.stop = function() {
			this.video.pause();
		}
		player.ff = function() {
			this.video.currentTime += 5;
		}
		player.rw = function() {
			this.video.currentTime -= 5;
		}
		player._loadstart = function(event) {
			u.removeClass(this.parentNode, "ready")
			u.addClass(this.parentNode, "loading");
		}
		player.video.addEventListener('loadstart', player._loadstart, false);
		player._canplaythrough = function(event) {
			u.removeClass(this.parentNode, "loading")
			u.addClass(this.parentNode, "ready");
		}
		u.e.addEvent(player.video, "canplaythrough", player._canplaythrough);
		player._playing = function(event) {
			u.removeClass(this.parentNode, "loading")
			u.addClass(this.parentNode, "ready");
		}
		u.e.addEvent(player.video, "playing", player._playing);
		player._loadedmetadata = function(event) {
			u.bug("1", "loadedmetadata:duration:" + this.duration);
			u.bug("1", "loadedmetadata:currentTime:" + this.currentTime);
		}
		player._canplay = function(event) {
			u.bug("1", "canplay:" + this.buffered.end(0));
		}
		player._timeupdate = function(event) {
			u.bug("2", this.currentTime);
		}
	}
	else if (document.all || (navigator.plugins && navigator.mimeTypes["application/x-shockwave-flash"])) {
		player.removeChild(player.video);
		player.video = u.flash(e, "media/flash/player.swf");
		player.load = function(src) {
			this.video.load(src);
		}
		player.play = function(position) {
			this.video.play();
		}
		player.pause = function() {
			this.video.pause();
		}
	}
	else {
		alert("no HTML5 or flash")
	}
	player.correctSource = function(src) {
		src = src.replace(/.m4v|.mp4|.webm|.ogv|.3gp|.mov/, "");
		if(this.video.canPlayType("video/x-m4v")) {
			return src+".m4v";
		}
		else if(this.video.canPlayType("video/mp4")) {
			return src+".mp4";
		}
		else if(this.video.canPlayType("video/ogg")) {
			return src+".ogv";
		}
		else if(this.video.canPlayType("video/3gpp")) {
			return src+".3gp";
		}
		else {
			return src+".mov";
		}
	}
	return player;
}
/*u-audio.js*/
Util.audioPlayer = function(e) {
	var player = u.ae(e, "div", "player");
	player.audio = u.ae(player, "audio");
	player.audio.controls = false;
	if(typeof(player.audio.play) == "function") {
		player.load = function(src) {
			if(this.playing) {
				this.stop();
			}
			if(src) {
				this.audio.src = this.correctSource(src);
				this.audio.load();
			}
		}
		player.play = function(position) {
			this.playing = true;
			position = position ? position : 0;
			if(this.audio.src) {
				this.audio.play();
			}
		}
		player.loadAndPlay = function(src, position) {
			this.load(src);
			this.play(position);
		}
		player.pause = function() {
			this.playing = false;
			this.audio.pause();
		}
		player.stop = function() {
			this.pause();
		}
		player._loadstart = function(event) {
			u.removeClass(this.parentNode, "ready")
			u.addClass(this.parentNode, "loading");
		}
		u.e.addEvent(player.audio, "loadstart", player._loadstart);
		player._canplaythrough = function(event) {
			u.removeClass(this.parentNode, "loading")
			u.addClass(this.parentNode, "ready");
		}
		u.e.addEvent(player.audio, "canplaythrough", player._canplaythrough);
		player._loadedmetadata = function(event) {
			u.bug("1", "loadedmetadata:duration:" + this.duration);
			u.bug("1", "loadedmetadata:currentTime:" + this.currentTime);
		}
	}
	else if (document.all || (navigator.plugins && navigator.mimeTypes["application/x-shockwave-flash"])) {
		player.removeChild(player.audio);
		player.audio = u.flash(e, "media/flash/player.swf");
		player.load = function(src) {
			this.audio.load(src);
		}
		player.play = function(position) {
			this.audio.play();
		}
		player.pause = function() {
			this.audio.pause();
		}
	}
	else {
		alert("no HTML5 or flash")
	}
	player.correctSource = function(src) {
		src = src.replace(/.mp3|.ogg|.wav/, "");
		if(this.audio.canPlayType("audio/mpeg")) {
			return src+".mp3";
		}
		else if(this.audio.canPlayType("audio/ogg")) {
			return src+".ogg";
		}
		else {
			return src+".wav";
		}
	}
	return player;
}
/*u-preload.js*/
Util.preload = function(node, content) {
	var i;
	var p = u.ae(document.body, "ul", "preloader");
	p.preload_progress = 0;
	p.preload_items = 0;
	p.node = node;
	for(i = 0; item = content[i]; i++) {
		var preload_item = u.ae(p, "li");
		preload_item.p = p;
		p.preload_items++;
		if(item.image) {
			u.i.load(preload_item, item.image);
		}
		preload_item.loaded = function(event) {
			u.addClass(this, "loaded");
			this.e.loaded(event);
		}
	}
	p.loaded = function() {
		this.preload_progress++;
		if(this.preload_progress < this.preload_items) {
		}
		else {
			this.node.start();
		}
	}
}

/*i-page.js*/
Util.Objects["page"] = new function() {
	this.init = function(e) {
		e.preload = ({
			0 : ({"image":"/img/bg_0_1.png"}),
			1 : ({"image":"/img/bg_0_2.png"}),
			2 : ({"image":"/img/bg_0_2_1.png"}),
			3 : ({"image":"/img/bg_0_3.png"})
		});
		e.start = function() {
			if(document.body.className.match(/front/g) && u.webkit(531.9, ">=")) {
				u.XMLRequest("0_0.html", e);
			}
			else {
				e.ready();
			}
		}
		u.preload(e, e.preload);
		u.e.drag(e, e, true);
		Util.Objects["header"].init(u.ge("header"));
		Util.Objects["footer"].init(u.ge("footer"));
		e.ready = function() {
			u.addClass(document.body, "transition");
			u.addClass(document.body, "externals");
			u.addClass(document.body, "ready");
			if(segment == "desktop") {
				var toggle_music = u.ae(this, "div", "toggle_music");
				this.player = u.audioPlayer(toggle_music);
				this.player.audio.loop = true;
				this.player.loadAndPlay("/media/audio/loop.mp3");
				u.e.click(toggle_music);
				toggle_music.clicked = function() {
					if(this.e.player.playing) {
						this.e.player.stop();
						u.addClass(this, "off");
					}
					else {
						this.e.player.play();
						u.removeClass(this, "off");
					}
				}
			}
		}
		e.XMLResponse = function(response) {
			var intro = e.appendChild(u.ge("intro", response));
			var skip_intro = u.ae(this, "div", "skip_intro");
			skip_intro.intro = intro;
			intro.skip_intro = skip_intro;
			u.addClass(document.body, "intro");
			intro.done = function() {
				this.parentNode.removeChild(this);
				this.skip_intro.parentNode.removeChild(this.skip_intro);
				u.ge("page").ready();
				u.removeClass(document.body, "intro");
			}
			u.e.click(skip_intro);
			skip_intro.clicked = function() {
				this.intro.done();
			}
			u.e.onAnimationEnd(intro, intro.done);
			u.e.onTransitionEnd(intro, intro.done);
			var clouds = u.ge("clouds", intro);
			u.e.onAnimationEnd(clouds, u.e.kill);
		}
		e.content = u.ge("content", e);
		e.content.loadContent = function() {
			u.e.transitionEnded(this, this.loadContent);
			u.e.animationEnded(this, this.loadContent);
			window.onkeydown = false;
			u.removeClass(document.body, "dilemma_[0-9]");
			u.removeClass(document.body, "puzzle_[0-9]");
			u.removeClass(document.body, "front|massage|friends|snowboard|dance|puzzle|gotchi|dilemma|paint|jump");
			u.addClass(document.body, this.node.className);
			u.XMLRequest(this.node.url, this);
		}
		e.content.XMLResponse = function(response) {
			document.title = u.ge("h1", response).innerHTML;
			u.ge("canvas", this).innerHTML = u.ge("canvas", response).innerHTML;
			u.init(this);
		}
		e.navigation = function(node) {
			this.content.node = node;
			u.e.onAnimationEnd(this.content, this.content.loadContent);
			u.e.onTransitionEnd(this.content, this.content.loadContent);
			u.a.transition(u.ge("canvas"), "all 0.4s ease-in");
			u.removeClass(document.body, "ready");
			if(segment == "desktop" && !this.player.playing && !u.ge("toggle_music").className.match(/off/)) {
				this.player.play();
			}
		}
	}
}
Util.Objects["header"] = new function() {
	this.init = function(e) {
		var link = u.ge("front", e);
		u.hrefToClick(link);
		link.clicked = function() {
			u.ge("page").navigation(this);
		}
	}
}
Util.Objects["footer"] = new function() {
	this.init = function(e) {
		var teddy = u.ge("teddy", e)
		teddy.player = u.audioPlayer(u.ge("teddy", e));
		u.addClass(teddy.player, "teddyplayer");
		teddy.current_audio = false;
		u.e.click(teddy);
		teddy.clicked = function(event) {
			if(this.current_audio) {
				this.player.play();
			}
		}
		teddy.setTeddy = function(src) {
			this.current_audio = src;
			if(src) {
				this.player.load(this.current_audio);
			}
		}
	}
}
Util.hrefToClick = function(e) {
	a = u.ge("a", e);
	e.url = a.href;
	a.removeAttribute("href");
	u.e.click(e);
	e.clicked = function(event) {
		location.href = this.url;
	}
}
/*i-front.js*/
Util.Objects["front"] = new function() {
	this.init = function(e) {
		e.preload = ({
			0 : ({"image":"/img/bg_sphere.png"}),
			1 : ({"image":"/img/bg_sphere_text.png"})
		});
		e.start = function() {
			if(document.body.className.match(/transition/)) {
				u.addClass(document.body, "ready");
			}
		}
		u.preload(e, e.preload);
		var i, menu_item;
		var menu_items = u.ges("li", e);
		for(i = 0; menu_item = menu_items[i]; i++) {
			menu_item.e = e;
			u.hrefToClick(menu_item);
			menu_item.clicked = function() {
				u.ge("page").navigation(this);
			}
		}
		u.ae(e.parentNode, "div", "center_text");
		u.ae(e, "li", "trampolin_bear");
		u.ae(e, "li", "baloon");
		u.ae(e, "li", "xfighter");
		u.ae(u.ae(e, "li", "birds green_bird green_bird_down"),"div", "birds green_bird green_bird_up");
		u.ae(u.ae(e, "li", "birds blue_bird blue_bird_down"),"div", "birds blue_bird blue_bird_up");
		u.ae(u.ae(e, "li", "birds brown_bird brown_bird_down"),"div", "birds brown_bird brown_bird_up");
		u.ge("teddy").setTeddy("/media/audio/speaks/dk_FS_bamse_6_1.mp3");
		var canvas = e.parentNode;
		canvas.e = e;
		canvas.c_x = Math.round(canvas.offsetWidth/2);
		canvas.c_y = Math.round(canvas.offsetHeight/2);
		canvas.o_x = u.absLeft(canvas);
		canvas.o_y = u.absTop(canvas);
		canvas.o_a = 0;
		canvas.interval = 50;
		canvas.start_speed = 0.1;
		canvas.default_speed = 0.3;
		u.a.transition(e, "rotate "+canvas.interval+"ms linear");
		u.a.rotate(e, 0);
		var teddy = u.ge("teddy");
		u.e.transitioned(teddy);
		u.e.animated(teddy);
		teddy.transitioned = teddy.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			this.player.play();
		}
		canvas.rotate = function() {
			u.t.resetTimer(this.t_rotate);
			this.t_rotate = u.t.setTimer(this, this.rotate, this.interval);
			if(!this.rotation_speed) {
				this.rotation_speed = this.start_speed;
			}
			else if(Math.abs(this.rotation_speed) < this.default_speed) {
				this.rotation_speed = Math.round((this.rotation_speed * 1.1) * 10) / 10;
			}
			else if(Math.abs(this.rotation_speed) > this.default_speed) {
				this.rotation_speed = Math.round((this.rotation_speed * 0.9) * 10) / 10;
			}
			u.a.rotate(this.e, this.e.rotation+this.rotation_speed);
		}
		canvas.rotate();
		u.e.drag(canvas, canvas, true);
		canvas.inputStarted = function(event) {
			u.t.resetTimer(this.t_rotate);
			this.current_dps = 0;
			this.o_a = this.e.rotation;
		}
		canvas.picked = function(event) {
			var s_x, s_y, s_a;
			var s_x = u.eventX(event) - this.o_x;
			var s_y = u.eventY(event) - this.o_y;
			s_a = Math.round(Math.atan2(s_x - this.c_x, this.c_y - s_y) * (360 / 6.28));
			s_a = s_a < 0 ? s_a + 360 : s_a;
			this.s_a = s_a;
		}
		canvas.moved = function(event) {
			var e_x, e_y, c_t, c_a;
			e_x = this.current_x + this.start_input_x - this.o_x;
			e_y = this.current_y + this.start_input_y - this.o_y;
			c_t = new Date().getTime();
			c_a = (Math.atan2(e_x - this.c_x, this.c_y - e_y) * (360 / 6.28));
			c_a = c_a < 0 ? c_a + 360 : c_a;
			this.current_dps = ((c_a - this.c_a)/(c_t - this.c_t)) * 1000;
			this.c_t = c_t;
			this.c_a = c_a;
			u.a.rotate(this.e, (Math.round(this.c_a)-this.s_a) + this.o_a);
		}
		canvas.dropped = function(event) {
			this.rotation_speed = this.current_dps / (1000 / this.interval);
			this.rotate();
		}
	}
}
/*i-massage.js*/
Util.Objects["massage"] = new function() {
	this.init = function(e) {
		e.preload = ({
			0 : ({"image":"/img/bg_canvas_white.png"}),
			1 : ({"image":"/img/bg_header_1_0.png"})
		});
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);
		e.player = u.videoPlayer(e);
		var links = u.ges("li", e);
		for(i = 0; link = links[i]; i++) {
			link.player = e.player;
			u.hrefToClick(link);
			link.clicked = function() {
				if(segment == "desktop") {
					u.ge("page").player.pause();
					u.ge("teddy").player.stop();
				}
				this.player.loadAndPlay(this.url);
			}
		}
		if(segment == "desktop") {
			u.ge("teddy").setTeddy("/media/audio/speaks/dk_BM_bamse_5_1.mp3");
		}
		else {
			u.ge("teddy").setTeddy(false);
		}
		link = links[links.length-1];
		u.a.transitioned(link);
		u.e.animated(link);
		link.transitioned = link.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			u.ge("teddy").player.play();
		}
		var splash = u.ae(e.player, "div", "splash");
		splash.link = links[0];
		splash.style.backgroundImage = "url("+splash.link.url.replace(".mov", ".jpg")+")";
		u.e.click(splash);
		splash.clicked = function(event) {
			splash.link.clicked(event);
		}
	}
}
/*i-friends.js*/
Util.Objects["friends"] = new function() {
	this.init = function(e) {
		e.preload = ({
			0 : ({"image":"/img/bg_canvas_white.png"}),
			1 : ({"image":"/img/bg_header_2_0.png"}),
			2 : ({"image":"/img/bg_2_0.png"})
		});
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);
		var menu_items = u.ges("li", e);
		for(i = 0; menu_item = menu_items[i]; i++) {
			u.hrefToClick(menu_item);
			menu_item.clicked = function() {
				u.ge("page").navigation(this.url);
			}
		}
		e.onsubmit = function(){
			return false;
		}
		e.bl = function() {
			var blur = u.ae(u.ge("page"), "div", "blur");
			var close_button = u.ae(blur, "div", "close");
			close_button.blur = blur;
			var form = this.parentNode.removeChild(this);
			blur.appendChild(form)
			var name = u.ge("name");
			name.e = this;
			name_value = u.ge("namelabel", this.e).innerHTML
			name.value = name_value;
			name.onfocus = function() {
				this.value = "";
				if(u.ge("error") != false) {
					blur.removeChild(u.ge("error"))
				}
			}
			name.onblur = function() {
				if(this.value == "" || this.value == name_value) {
					this.value = name_value;
				}
			}
			e.su = function() {
				var name = u.ge("name", e);
				if(name.value == "" || name.value == name_value) {
					u.ae(blur, "p", "error").innerHTML = "Husk at skrive dit navn";
				} else {
					this.XMLResponse = function(response) {
						this.file = u.ge("file", response).value;
						this.download_form = u.ge("form", response);
						if(this.file) {
							u.addClass(blur, "show_preview");
							var diplom = u.ae(blur, "div", "diplom");
							var diplom_a = u.ae(diplom, "a");
							diplom_a.e = this;
							var diplom_preview = u.ae(diplom_a, "img", "diplom_preview");
							diplom_preview.src = this.file;
							var save = u.ae(diplom_a, "div", "save");
							if(navigator.standalone) {
								diplom_preview.parentNode.href = "2_0-download.php?file="+diplom_preview.src;
								diplom_preview.parentNode.target = "_new";
							}
							else if(segment == "tablet" || segment == "mobile_touch") {
								u.e.click(diplom_a);
								diplom_a.clicked = function(event) {
									var help = u.ae(u.ge("blur"), "p", ({"class":"error"}));
									help.innerHTML = "Hold din finger nede på billedet i 3 sekunder";
									this.help = help;
									u.e.hold(this);
									this.held = function(event) {
										this.help.parentNode.removeChild(this.help);
										this.held = null;
									}
								}
							}
							else {
								u.e.click(diplom_a);
								diplom_a.clicked = function(event) {
									var form = this.appendChild(this.e.download_form);
									form.submit();
								}
							}
						}
					}
					u.XMLRequest("/2_0.php", this, "ps=create&name="+name.value+"&gender="+this.gender_value);
				}
			}
			var button = u.ge("button", this.e);
			u.e.click(button)
			button.clicked = function() {
				e.su()
			}
			name.onkeyup = function(event) {
				if(event.keyCode == 13) {
					e.su()
				}
			}
			u.e.click(close_button);
			close_button.clicked = function() {
				name.value = "";
				var form = this.blur.removeChild(u.ge("form", this.blur))
				u.ge("canvas").appendChild(form);
				this.blur.parentNode.removeChild(this.blur);
			}
		}
		var boy_chosen = u.ge("boy_div", e);
		boy_chosen.e = e;
		e.boy_radio = u.ge("boy", e);
		u.e.click(boy_chosen);
		boy_chosen.clicked = function() {
			this.e.gender_value = this.e.boy_radio.value;
			this.e.boy_radio.checked = true;
			this.e.bl();
		}
		var girl_chosen = u.ge("girl_div", e);
		girl_chosen.e = e;
		e.girl_radio = u.ge("girl", e);
		u.e.click(girl_chosen);
		girl_chosen.clicked = function() {
			this.e.gender_value = this.e.girl_radio.value;
			this.e.girl_radio.checked = true;
			this.e.bl();
		}
		u.ge("teddy").setTeddy("/media/audio/speaks/dk_VD_bamse_3_1.mp3");
		var canvas = e.parentNode;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			u.ge("teddy").player.play();
		}
	}
}

/*i-dance.js*/
Util.Objects["dance"] = new function() {
	this.init = function(e) {
		e.preload = ({
			0 : ({"image":"/img/bg_canvas_white.png"}),
			1 : ({"image":"/img/bg_header_4_0.png"})
		});
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);
		e.player = u.videoPlayer(e.parentNode);
		u.addClass(e.player, "dancevideo");
		var links = u.ges("li", e);
		for(i = 0; link = links[i]; i++) {
			link.player = e.player;
			u.hrefToClick(link);
			link.clicked = function() {
				if(segment == "desktop") {
					u.ge("page").player.pause();
					u.ge("teddy").player.stop();
				}
				this.player.loadAndPlay(this.url);
			}
			u.addClass(link, "go");
		}
		if(segment == "desktop") {
			u.ge("teddy").setTeddy("/media/audio/speaks/dk_RM_bamse_1_1.mp3");
		}
		else {
			u.ge("teddy").setTeddy(false);
		}
		link = links[links.length-1];
		u.e.transitioned(link);
		u.e.animated(link);
		link.transitioned = link.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			u.ge("teddy").player.play();
		}
		var splash = u.ae(e.player, "div", "splash");
		splash.player = e.player;
		splash.url = links[0].url;
		splash.style.backgroundImage = "url("+splash.url.replace(".mov", ".jpg")+")";
		u.e.click(splash);
		splash.clicked = function(event) {
			this.player.loadAndPlay(this.url);
		}
	}
}
/*i-puzzle.js*/
Util.Objects["puzzlestart"] = new function() {
	this.init = function(e) {
		e.preload = ({
			0 : ({"image":"/img/bg_canvas_wood.png"}),
			1 : ({"image":"/img/bg_header_5_0.png"}),
			2 : ({"image":"/img/bg_5_0_start.png"})
		});
		var i, link;
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);
		if(segment == "mobile_touch") {
			e.innerHTML = "";
			u.ae(e, "p", "error").innerHTML = "Spillet virker desværre ikke på en lille skærm";
			return;
		}
		u.ge("teddy").setTeddy("/media/audio/speaks/dk_BM_bamse_1_1.mp3");
		var canvas = e.parentNode;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			u.ge("teddy").player.play();
		}
		e.innerHTML = "";
		var pick_game = u.ae(e, "ul", "pick_game");
		for(i = 1; i < 6; i++) {
			link = u.ae(pick_game, "li");
			link.url = "5_"+i+".php"
			link.className = "puzzle puzzle_"+i;
			u.e.click(link)
			link.clicked = function() {
				u.ge("page").navigation(this);
			}
		}
		u.ae(e, "p", "error choose").innerHTML = "Vælg et puslespil";
	}
}
Util.Objects["puzzle"] = new function() {
	this.init = function(e) {
		e.puzzle = e.className.match(/puzzle_[0-9]?/);
		e.preload = ({
			0 : ({"image":"/img/bg_canvas_wood.png"}),
			1 : ({"image":"/img/bg_header_5_0.png"}),
			2 : ({"image":"/img/bg_5_0_"+e.puzzle+".png"})
		});
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);
		u.ge("teddy").setTeddy("/media/audio/speaks/dk_BM_bamse_1_1.mp3");
		var canvas = e.parentNode;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			u.ge("teddy").player.play();
		}
		var back = u.ge("li", u.ge("nav", e));
		u.hrefToClick(back);
		back.clicked = function() {
			u.ge("page").navigation(this);
			if(u.ge("blur") != false) {
				u.ge("page").removeChild(u.ge("blur"));
			}
			if(u.ge("done") != false) {
				u.ge("done").parentNode.removeChild(u.ge("done"));
			}
			u.ge("content").style.zIndex = "1";
		}
		var start = u.ae(e, "div", "start");
		start.e = e;
		u.e.click(start)
		start.clicked = function() {
			var blur = u.ae(u.ge("page"), "div", "blur");
			blur.e = this.e;
			u.a.transition(blur, "all 1.0s ease-in");
			u.ge("content").style.zIndex = "32";
			blur.transitioned = function(event) {
				this.e.splitPuzzle();
			}
			u.e.transitioned(blur);
			u.addClass(blur, "go");
			this.e.removeChild(this);
		}
		e.pieces = u.ges("piece", e);
		for(i = 0; piece = e.pieces[i]; i++) {
			u.a.transition(piece, "all 1.0s ease-in");
		}
		e.splitPuzzle = function() {
			if(this.puzzle == "puzzle_1") {
				var puzzle_left = new Array("-230", "230", "530", "-130", "-260", "210", "-370", "100", "-300", "370", "-370");
				var puzzle_top = new Array("-85", "-85", "-105", "-70", "-70", "100", "170", "110", "-420", "110", "110");
				this.enablePieces(puzzle_left, puzzle_top);
			}
			else if(this.puzzle == "puzzle_2") {
				var puzzle_left = new Array("260", "430", "-380", "-250", "390", "-240", "10", "235", "-450", "-120", "-300");
				var puzzle_top = new Array("125", "-85", "105", "-130", "120", "-190", "-220", "110", "120", "110", "-460");
				this.enablePieces(puzzle_left, puzzle_top);
			}
			else if(this.puzzle == "puzzle_3") {
				var puzzle_left = new Array("260", "-430", "-300", "620", "235", "490", "-440", "-165", "120", "120");
				var puzzle_top = new Array("-125", "-85", "20", "30", "-300", "90", "80", "340", "220", "-110");
				this.enablePieces(puzzle_left, puzzle_top);
			}
			else if(this.puzzle == "puzzle_4") {
				var puzzle_left = new Array("-520", "-360", "520", "-490", "350", "-25", "-300", "135", "-450", "420", "290");
				var puzzle_top = new Array("-125", "85", "-145", "65", "220", "240", "-250", "-310", "80", "-100", "-380");
				this.enablePieces(puzzle_left, puzzle_top);
			}
			else if(this.puzzle == "puzzle_5") {
				var puzzle_left = new Array("-260", "310", "-280", "-340", "-435", "340", "270", "195", "360", "320");
				var puzzle_top = new Array("75", "-100", "40", "270", "-160", "190", "-60", "70", "-170", "-350");
				this.enablePieces(puzzle_left, puzzle_top);
			}
		}
		e.enablePieces = function(puzzle_left, puzzle_top) {
			this.counter = 0;
			for(i = 0; piece = this.pieces[i]; i++) {
				piece.e = this;
				piece.start_x = puzzle_left[i];
				piece.start_y = puzzle_top[i];
				if(!piece.e_drag) {
					u.e.drag(piece, new Array(-(u.absLeft(piece)), (-u.absTop(piece)), (window.innerWidth-u.absLeft(piece)), (window.innerHeight-u.absTop(piece))))
				}
				else {
					piece.inputStarted = null;
				}
				piece.picked = function(event) {
					u.addClass(this, "picked");
				}
				piece.dropped = function(event) {
					if(Math.abs(this.element_x) < 35 && Math.abs(this.element_y) < 35) {
						u.a.transition(this, "all 1s ease-in");
						u.a.translate(this, 0, 0);
						u.addClass(this, "fixed");
						u.removeClass(this, "picked");
						this.inputStarted = function(event) {
							u.e.resetEvents(this);
						}
						this.e.counter = this.e.counter+1;
						if(this.e.counter == puzzle_left.length) {
							var done = u.ae(e, "div", "done");
							done.e = this.e;
							u.e.click(done)
							done.clicked = function() {
								this.e.rf();
								this.e.splitPuzzle();
								this.parentNode.removeChild(this);
							}
						}
					}
					else {
						u.a.translate(this, this.start_x, this.start_y);
						u.removeClass(this, "picked");
					}
				}
				u.a.translate(piece, piece.start_x, piece.start_y);
			}
		}
		e.rf = function() {
			var pieces = u.ges("piece");
			for(i = 0; piece = pieces[i]; i++) {
				u.removeClass(piece, "fixed");
			}
		}
	}	
}
/*i-gotchi.js*/
Util.Objects["gotchi"] = new function() {
	this.init = function(e) {
		e.preload = ({
			0 : ({"image":"/img/bg_6_0_clothes_big.png"}),
			1 : ({"image":"/img/bg_header_6_0.png"}),
			2 : ({"image":"/img/bg_canvas_white.png"}),
			3 : ({"image":"/img/bg_6_0_teddy.png"}),
			4 : ({"image":"/img/bg_6_0_clothes_mini.png"})
		});
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);
		var clothes_big = u.ge("clothes_big", e.parentNode);
		var menu_items = u.ges("li", e)
		for(i = 0; menu_item = menu_items[i]; i++) {
			menu_item.e = e;
			u.hrefToClick(menu_item);
			menu_item.clicked = function() {
				var target = u.ge(this.className.match(/t[0-9]+/)[0], clothes_big);
				var item = this.className.match(/i[0-9]+/)[0];
				if(target.className.match(item)) {
					u.removeClass(target, "i[0-9]+");
				}
				else {
					u.removeClass(target, "i[0-9]+");
					u.addClass(target, item);
				}
			}
		}
		u.ge("teddy").setTeddy("/media/audio/speaks/dk_BP_bamse_6_1.mp3");
		var canvas = e.parentNode;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			u.ge("teddy").player.play();
		}
	}
}

/*i-dilemma.js*/
Util.Objects["dilemmastart"] = new function() {
	this.init = function(e) {
		e.preload = ({
			0 : ({"image":"/img/bg_7_0_start.png"}),
			1 : ({"image":"/img/bg_header_7_0.png"})
		});
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);
		var links = u.ges("li", e);
		for(i = 0; link = links[i]; i++) {
			link.player = e.player;
			u.hrefToClick(link);
			link.clicked = function() {
				u.ge("page").navigation(this);
			}
		}
			u.ge("teddy").setTeddy("/media/audio/speaks/dk_VD_bamse_2_1.mp3");
		var canvas = e.parentNode;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			u.ge("teddy").player.play();
		}
	}
}
Util.Objects["dilemma"] = new function() {
	this.init = function(e) {
		var dilemma = e.className.match(/dilemma_[0-9]?/);
		u.addClass(document.body, dilemma);
		e.preload = ({
			0 : ({"image":"/img/bg_7_0_"+dilemma+".png"})
		});
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);
		u.ge("teddy").setTeddy(false);
		u.ge("teddy").setTeddy("/media/audio/dilemma/dk_DL_"+dilemma+"_1_1.mp3");
		var canvas = e.parentNode;
		canvas.e = e;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			u.addClass(this.e, "show");
			u.ge("teddy").player.play();
		}
		e.player = u.ge("teddy").player;
		var back = u.ge("li", u.ge("nav", e));
		u.hrefToClick(back);
		back.clicked = function() {
			u.ge("page").navigation(this);
		}
		e.ev = u.ge("evaluate");
		e.ev.e = e;
		u.e.click(e.ev);
		e.ev.clicked = function(event) {
			u.removeClass(this.e, "show_[a-c]");
			u.addClass(this.e, "show");
		}
		e.dilemma = u.ge("dilemma", e);
		e.dilemma.e = e;
		u.hrefToClick(e.dilemma);
		e.dilemma.clicked = function(event) {
			this.e.player.loadAndPlay(this.url);
		}
		var options = u.ges("label", e);
		for(i = 0; option = options[i]; i++) {
			option.option = option.className.match(/option_([a-c])/)[1];
			option.e = e;
			u.e.click(option);
			option.clicked = function() {
				u.XMLRequest(this.e.action, this.e, "ps=answer&options="+this.option);
				u.addClass(this.e, "show_"+this.option)
				u.removeClass(this.e, "show$|show ");
			}
			var sound = u.ge("sound", option);
			sound.url = sound.href;
			sound.removeAttribute("href");
			sound.e = e;
			u.e.click(sound)
			sound.clicked = function(event) {
				u.e.kill(event)
				this.e.player.loadAndPlay(this.url);
			}
		}
		e.XMLResponse = function(response) {
			this.ev.innerHTML = u.ge("evaluate", response).innerHTML;
			var sound = u.ge("sound", this.ev);
			sound.url = sound.href;
			sound.removeAttribute("href");
			sound.e = this;
			u.e.click(sound)
			sound.clicked = function(event) {
				u.e.kill(event)
				this.e.player.loadAndPlay(this.url);
			}
		}
	}
}
/*i-jump.js*/
Util.Objects["jump"] = new function() {
	this.init = function(e) {
		e.preload = ({
			0 : ({"image":"/img/bg_canvas_fuzzy.png"}),
			1 : ({"image":"/img/bg_header_9_0.png"})
		});
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);
		u.ge("teddy").setTeddy("/media/audio/speaks/dk_TS_bamse_2_1.mp3");
		var canvas = e.parentNode;
		canvas.e = e;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			this.e.startScreen();
			u.ge("teddy").player.play();
		}
		e.innerHTML = "";
		e.start_button = u.ae(e, "div", "start_button");
		e.start_button.innerHTML = "Flyt trampolinen med "+ (segment == "desktop" ? "musen eller piletasterne." : "fingeren");
		u.e.click(e.start_button);
		e.start_button.clicked = function() {
			u.ge("teddy").setTeddy("/media/audio/boing.mp3");
			this.e.goScreen();
		}
		e.score_board = u.ae(u.ae(e, "div", "score_board"), "span");
		e.score_board.innerHTML = "0";
		e.bear = u.ae(e, "div", "trampolinbear");
		e.trampolin = u.ae(e, "div", "trampolin");
		u.e.drag(e.trampolin, new Array(0, 0, e.offsetWidth, e.trampolin.offsetHeight));
		if(segment == "mobile_touch") {
			e.trampolin.moved = function() {
				u.a.translate(this, ((this.element_x-171)*2) + 171, 0);
			}
		}
		e.startScreen = function() {
			window.onkeydown = false;
			u.a.transition(this.bear, "none")
			u.removeClass(this, "go");
			u.addClass(this, "wait");
			u.a.transition(this.trampolin, "all 0.8s ease-out")
			u.addClass(this.trampolin, "ready");
			u.a.translate(this.trampolin, 171, 0);
			u.a.translate(this.bear, 191, -600);
		}
		e.moveTrampolinLeft = function() {
			u.a.translate(this.trampolin, this.trampolin.element_x - 5, this.trampolin.element_y);
			this.t_trampolin = u.t.setTimer(this, this.moveTrampolinLeft, 40);
		}
		e.moveTrampolinRight = function() {
			u.a.translate(this.trampolin, this.trampolin.element_x + 5, this.trampolin.element_y);
			this.t_trampolin = u.t.setTimer(this, this.moveTrampolinRight, 40);
		}
		e.goScreen = function() {
			window.onkeydown = function(event) {
				if(event.keyCode == 37 && !u.ge("game").t_trampolin) {
					u.ge("game").t_trampolin = u.t.setTimer(u.ge("game"), u.ge("game").moveTrampolinLeft, 40);
				}
				else if(event.keyCode == 39 && !u.ge("game").t_trampolin) {
					u.ge("game").t_trampolin = u.t.setTimer(u.ge("game"), u.ge("game").moveTrampolinRight, 40);
				}
			}
			window.onkeyup = function(event) {
				u.t.resetTimer(u.ge("game").t_trampolin);
				u.ge("game").t_trampolin = false
			}
			u.removeClass(this, "wait");
			u.addClass(this, "go");
			u.a.transition(this.bear, "all 1.2s ease-in")
			u.a.rotateTranslate(this.bear, 0, 191, 0);
			u.e.transitioned(this.bear);
			u.a.transition(this.trampolin, "none")
			this.bear.transitioned = function(event) {
				this.base_speed = (segment == "mobile_touch" ? 80 : 16);
				this.speed = this.base_speed;
				this.direction = -1;
				this.rotation_factor = 0;
				this.jumps = 0;
				this.timestamp = new Date().getTime();
				this.transitioned = false;
				u.a.transition(this, "none");
				this.jump();
			}
			this.bear.jump = function() {
				if(this.element_y >= 0) {
					if(this.element_x+30 > this.e.trampolin.element_x && this.element_x-30+this.offsetWidth < this.e.trampolin.element_x+this.e.trampolin.offsetWidth) {
						u.ge("teddy").player.play();
						this.jump_height = (Math.random()*100) - 350;
						this.jump_offset = ( ((Math.random()*500) - this.element_x) / 90);
						this.speed = this.base_speed + (new Date().getTime() - this.timestamp) / 10000;
						this.acceleration = Math.abs(Math.pow(this.speed, 2) / (this.jump_height * 2));
						this.jumps++;
						this.e.score_board.innerHTML = this.jumps;
						this.direction = -1;
					}
					else {
						u.ge("teddy").setTeddy("/media/audio/speaks/dk_TS_bamse_9_1.mp3");
						u.ge("teddy").player.play();
						var game_over = u.ae(this.e, "div", "game_over");
						game_over.innerHTML = "Du nåede at hoppe<br />"+this.jumps+" gang"+ (this.jumps == 1 ? "." : "e.");
						u.e.click(game_over);
						game_over.clicked = function() {
							this.parentNode.removeChild(this);
							this.e.startScreen();
						}
						u.a.transition(this, "all 0.2s linear");
						u.a.translate(this, this.element_x, this.element_y + 300);
						return;
					}
				}
				else if(this.element_y <= this.jump_height || this.speed <= 0) {
					this.direction = 1;
				}
				if(this.direction < 0) {
					this.speed = this.speed-this.acceleration;
					if(this.speed/this.acceleration < 8 && this.rotation <= 315 && segment != "mobile_touch") {
						if(this.jump_offset < 0) {
							this.rotation_factor = -45;
						}
						else {
							this.rotation_factor = 45;
						}
					}
					else {
						this.rotation_factor = 0;
						this.rotation = 0;
					}
				}
				else if(this.direction > 0) {
					this.speed = this.speed+this.acceleration;
					this.rotation_factor = 0;
					this.rotation = 0;
				}
				u.a.translateRotate(this, this.element_x + this.jump_offset, this.element_y + (this.direction*this.speed), this.rotation+this.rotation_factor);
				u.t.setTimer(this, this.jump, segment == "mobile_touch" ? 250 : 50);
			}
		}
	}
}