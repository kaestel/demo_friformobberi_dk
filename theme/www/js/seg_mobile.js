
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

/*u-init.js*/
Util.Objects = u.o = new Array();
Util.init = function() {
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

/*i-invalid.js*/
Util.Objects["validdevice"] = new function() {
	this.init = function(e) {
		e.innerHTML = "";
		u.ae(e, "div", "error").innerHTML = "<p>Your browser is too old to display the site properly. Please try using Chrome or Safari.</p>"
	}
}
