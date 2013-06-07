Util.preload = function(node, content) {
	var i;
//	node.content = content;

	var p = u.ae(document.body, "ul", "preloader");

//	u.bug(content.length)
//	u.bug(action)

	p.preload_progress = 0;
	p.preload_items = 0;
	p.node = node;
//	p.node.action = action;

	for(i = 0; item = content[i]; i++) {
		var preload_item = u.ae(p, "li");
		preload_item.p = p;
		p.preload_items++;
		if(item.image) {
			u.i.load(preload_item, item.image);
		}

//		else if(item.audio) {
//			u.loadAudio(preload_item, item.audio);
//		}
		preload_item.loaded = function(event) {
			u.addClass(this, "loaded");
			this.e.loaded(event);
		}
	}

	p.loaded = function() {
		this.preload_progress++;

		if(this.preload_progress < this.preload_items) {

//			u.bug(this.preload_progress);
		}
		else {


//			u.bug("go" + this.node.action);
			this.node.start();

//			this.parentNode.removeChild(this);
		}
	}
}



/*
u.loadAudio = function(node, src) {




//	var audio = document.createElement("audio");
	var audio = u.ae(node, "audio");

	src = src.replace(/.mp3|.ogg|.wav/, "");

	if(audio.canPlayType("audio/mpeg")) {
		src = src+".mp3";
	}
	else if(audio.canPlayType("audio/ogg")) {
		src = src+".ogg";
	}
	else {
		src = src+".wav";
	}

//	u.e.addEvent(audio, "progress", u._progress);
//	u.e.addEvent(audio, "loadeddata", u._progress);
//	u.e.addEvent(audio, "canplaythrough", u._progress);
//	u.e.addEvent(audio, "timeupdate", u._progress);
//	u.e.addEvent(audio, "canplay", u._progress);
//	u.e.addEvent(audio, "durationchange", u._progress);
//	u.e.addEvent(audio, "loadedmetadata", u._progress);
//	u.e.addEvent(audio, "loaded", u._progress);

	u.e.addEvent(audio, 'progress', u._progress);
	u.e.addEvent(audio, 'canplay', u._progress);
	u.e.addEvent(audio, 'canplaythrough', u._progress);
	u.e.addEvent(audio, 'suspend', u._progress);
	u.e.addEvent(audio, 'abort', u._progress);
	u.e.addEvent(audio, 'error', u._progress);
	u.e.addEvent(audio, 'emptied', u._progress);
	u.e.addEvent(audio, 'stalled', u._progress);
	u.e.addEvent(audio, 'loadstart', u._progress);
	u.e.addEvent(audio, 'loadeddata', u._progress);
	u.e.addEvent(audio, 'loadedmetadata', u._progress);
	u.e.addEvent(audio, 'waiting', u._progress);
	u.e.addEvent(audio, 'playing', u._progress);
	u.e.addEvent(audio, 'seeking', u._progress);
	u.e.addEvent(audio, 'seeked', u._progress);
	u.e.addEvent(audio, 'ended', u._progress);
	u.e.addEvent(audio, 'durationchange', u._progress);
	u.e.addEvent(audio, 'timeupdate', u._progress);
	u.e.addEvent(audio, 'play', u._progress);
	u.e.addEvent(audio, 'pause', u._progress);
	u.e.addEvent(audio, 'ratechange', u._progress);
	u.e.addEvent(audio, 'volumechange', u._progress);

	u.e.addEvent(audio, 'readystatechange', u._progress);



//	u.e.addEvent(player.audio, "loadstart", player._loadstart);

	audio.autobuffer = "true";
	audio.autoplay = "true";
	audio.controls = "true";
	audio.src = src;
	u.bug(audio.src);
	audio.load();
	audio.play();

//	u.bug("audio.buffered:" + audio.buffered.length)

//	u.bug(audio.buffered.end(0));

}
u._progress = function(event) {
//	u.bug("pro:" + event.type)
	u.bug("type:"+ event.type);

	this.load();
	this.play();

	if(this.buffered.length) {
		u.bug("prog:"+ this.buffered.end(0) +"/"+this.duration + "::" + this.networkState + "::" + this.readyState);
	}
}
*/
//e.preloader();
