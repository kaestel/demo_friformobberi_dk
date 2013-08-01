Util.videoPlayer = function(e) {

	var player = u.ae(e, "div", "player");

	// test for HTML5 video
	player.video = u.ae(player, "video");


	// HTML5 support
	if(typeof(player.video.play) == "function") {


		player.load = function(src) {
//			u.e.removeEvent(this.video, "canplaythrough", this._canplaythrough);
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
//			u.bug("video player:" + this.className + "::" + this.video.src + "::" + typeof(this.audio));

			this.playing = true;
			position = position ? position : 0;
//			u.bug(this.video.currentTime + "::" + typeof(this.video.currentTime))
//			if(this.video.currentTime) {
//				this.video.currentTime = position;
//			}
//			u.e.addEvent(this.video, "canplaythrough", this._canplaythrough);
			if(this.video.src) {
				this.video.play();
			}
		}
		player.loadAndPlay = function(src, position) {
			// TODO: put position into a global var?
			this.load(src);
			// firefox does not throw canplaythrough event unless I call play when loading
			this.play(position);
		}

		player.pause = function() {
			this.playing = false;
			this.video.pause();
		}
		player.stop = function() {
			this.video.pause();
//			if(this.video.currentTime) {
//				this.video.currentTime = 0;
//			}
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
//			this.play();
		}
//		player.video.addEventListener('canplaythrough', player._canplaythrough, false);
		u.e.addEvent(player.video, "canplaythrough", player._canplaythrough);

		player._playing = function(event) {
			u.removeClass(this.parentNode, "loading")
			u.addClass(this.parentNode, "ready");
		}
		u.e.addEvent(player.video, "playing", player._playing);

		/*
		player._event = function(event) {
			 u.bug("3", "event:" + event.type);
		}
		player.video.addEventListener('progress', player._event, false);
		player.video.addEventListener('canplay', player._event, false);
		player.video.addEventListener('canplaythrough', player._event, false);
		player.video.addEventListener('suspend', player._event, false);
		player.video.addEventListener('abort', player._event, false);
		player.video.addEventListener('error', player._event, false);
		player.video.addEventListener('emptied', player._event, false);
		player.video.addEventListener('stalled', player._event, false);
		player.video.addEventListener('loadstart', player._event, false);
		player.video.addEventListener('loadeddata', player._event, false);
		player.video.addEventListener('loadedmetadata', player._event, false);
		player.video.addEventListener('waiting', player._event, false);
		player.video.addEventListener('playing', player._event, false);
		player.video.addEventListener('seeking', player._event, false);
		player.video.addEventListener('seeked', player._event, false);
		player.video.addEventListener('ended', player._event, false);
		player.video.addEventListener('durationchange', player._event, false);
		player.video.addEventListener('timeupdate', player._event, false);
		player.video.addEventListener('play', player._event, false);
		player.video.addEventListener('pause', player._event, false);
		player.video.addEventListener('ratechange', player._event, false);
		player.video.addEventListener('volumechange', player._event, false);
		*/

		player._loadedmetadata = function(event) {
			u.bug("1", "loadedmetadata:duration:" + this.duration);
			u.bug("1", "loadedmetadata:currentTime:" + this.currentTime);
		}
		//player.video.addEventListener('loadedmetadata', player._loadedmetadata, false);

		player._canplay = function(event) {
			u.bug("1", "canplay:" + this.buffered.end(0));
		}
		//player.video.addEventListener('canplay', player._canplay, false);

		player._timeupdate = function(event) {
			u.bug("2", this.currentTime);
		}
		//player.video.addEventListener('timeupdate', player._timeupdate, false);

		//vid.webkitEnterFullscreen();
		
	}
	// Flash support
	else if (document.all || (navigator.plugins && navigator.mimeTypes["application/x-shockwave-flash"])) {

		// remove HTML5 element
		player.removeChild(player.video);

		// add flash element
		player.video = u.flash(e, "media/flash/player.swf");


		// set up Flash API
		player.load = function(src) {
			this.video.load(src);
		}

		player.play = function(position) {
			// TODO: position

			this.video.play();
		}

		player.pause = function() {
			this.video.pause();
		}
	}
	// Other plugin? Create oldschool generic media player plugin
	else {

		alert("no HTML5 or flash")
	}

	// find the correct source for the browser
	player.correctSource = function(src) {
		src = src.replace(/.m4v|.mp4|.webm|.ogv|.3gp|.mov/, "");

		/*
		u.bug("cpt:m4v"+this.video.canPlayType("video/x-m4v"));
		u.bug("cpt:mp4"+this.video.canPlayType("video/mp4"));
		u.bug("cpt:webm"+this.video.canPlayType("video/webm"));
//		u.bug("cpt:ogg+"+this.video.canPlayType('video/ogg; codecs="theora"'));
		u.bug("cpt:ogg+"+this.video.canPlayType('video/ogg'));
		u.bug("cpt:3gpp"+this.video.canPlayType("video/3gpp"));
		u.bug("cpt:mov"+this.video.canPlayType("video/quicktime"));
		*/

		if(this.video.canPlayType("video/x-m4v")) {
			return src+".m4v";
		}
		else if(this.video.canPlayType("video/mp4")) {
			return src+".mp4";
		}
		else if(this.video.canPlayType("video/ogg")) {
			return src+".ogv";
		}
		//else if(this.video.canPlayType("video/webm")) {
		//	return src+".webm";
		//}
		else if(this.video.canPlayType("video/3gpp")) {
			return src+".3gp";
		}
		else {
		//else if(this.video.canPlayType("video/quicktime")) {
			return src+".mov";
		}

		// default fallback ??

	}



/*


	e.play = u.ae(e, "div", "play");
	e.play.e = e;
	u.e.click(e.play);
	e.play.clicked = function() {
		this.e.player.play();
	}

	e.stop = u.ae(e, "div", "stop");
	e.stop.e = e;
	u.e.click(e.stop);
	e.stop.clicked = function() {
		this.e.player.pause();
	}

	e.pause = u.ae(e, "div", "pause");
*/

	return player;

}