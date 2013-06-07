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


		// enable playlist
		var links = u.ges("li", e);
		for(i = 0; link = links[i]; i++) {
			link.player = e.player;
			u.hrefToClick(link);
			link.clicked = function() {
				u.ge("page").navigation(this);
			}
		}

		// disable teddy speak for iOS when using the "player" for video
//		if(segment == "desktop") {
			u.ge("teddy").setTeddy("/media/audio/speaks/dk_VD_bamse_2_1.mp3");
//		}
//		else {
//			u.ge("teddy").setTeddy(false);
//		}


		// prepare for effects
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


		// disable teddy speak for iOS when using the "player" for video
		u.ge("teddy").setTeddy(false);


		// INGEN DILEMMA SPØRGSMÅL SOM LYDFIL
		u.ge("teddy").setTeddy("/media/audio/dilemma/dk_DL_"+dilemma+"_1_1.mp3");

		// prepare for effects
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

		// create audio player
//		e.player = u.audioPlayer(e)
		e.player = u.ge("teddy").player;


		// enable back button
		var back = u.ge("li", u.ge("nav", e));
		u.hrefToClick(back);
		back.clicked = function() {
			u.ge("page").navigation(this);
		}

		// get evaluation board
		e.ev = u.ge("evaluate");
		e.ev.e = e;
		// set click to deselect all
		u.e.click(e.ev);
		e.ev.clicked = function(event) {
			u.removeClass(this.e, "show_[a-c]");
			u.addClass(this.e, "show");
		}


		// set dilemma speak
		e.dilemma = u.ge("dilemma", e);
		e.dilemma.e = e;
		// set click to deselect all
		u.hrefToClick(e.dilemma);
//		u.e.click(e.dilemma);
		e.dilemma.clicked = function(event) {
			this.e.player.loadAndPlay(this.url);
		}


		// enable options
		var options = u.ges("label", e);
		for(i = 0; option = options[i]; i++) {

//			u.a.translate(option, 0, 0);

			// get option value
			option.option = option.className.match(/option_([a-c])/)[1];
			option.e = e;

			// select option
			u.e.click(option);
			option.clicked = function() {
				// request the response
				u.XMLRequest(this.e.action, this.e, "ps=answer&options="+this.option);

				u.addClass(this.e, "show_"+this.option)
				u.removeClass(this.e, "show$|show ");
			}

			// sound button
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

		// get dilemma response
		e.XMLResponse = function(response) {
			// replace response
			this.ev.innerHTML = u.ge("evaluate", response).innerHTML;
//			u.bug();

			// initialize sound button
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