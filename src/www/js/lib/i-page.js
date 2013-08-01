Util.Objects["page"] = new function() {
	this.init = function(e) {

		// preload
		// ??
		e.preload = ({
			0 : ({"image":"/img/bg_0_1.png"}),
			1 : ({"image":"/img/bg_0_2.png"}),
			2 : ({"image":"/img/bg_0_2_1.png"}),
			3 : ({"image":"/img/bg_0_3.png"})
		});

		// start actions - invoked when image-preloading ís done
		e.start = function() {
			// if frontpage, get intro
			if(document.body.className.match(/front/g) && u.webkit(531.9, ">=")) {
				u.XMLRequest("0_0.html", e);
			}
			// set stage
			else {
				e.ready();
			}
		}
		u.preload(e, e.preload);


		u.e.drag(e, e, true);

		// manually init header - easier than adding a class initializer everywhere
		Util.Objects["header"].init(u.ge("header"));
		Util.Objects["footer"].init(u.ge("footer"));

		// ready to start page setup
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

		// intro loaded
		e.XMLResponse = function(response) {
			// append intro to page
			var intro = e.appendChild(u.ge("intro", response));
			var skip_intro = u.ae(this, "div", "skip_intro");
			skip_intro.intro = intro;
			intro.skip_intro = skip_intro;

			u.addClass(document.body, "intro");

			// set global ready when intro is done
			intro.done = function() {
				// remove intro
				this.parentNode.removeChild(this);
				
				this.skip_intro.parentNode.removeChild(this.skip_intro);

				// present page
				u.ge("page").ready();

				
				u.removeClass(document.body, "intro");
			}
			// skip intro
			u.e.click(skip_intro);
			skip_intro.clicked = function() {
				this.intro.done();
			}

			// intro animation done
			u.e.onAnimationEnd(intro, intro.done);
			u.e.onTransitionEnd(intro, intro.done);

			var clouds = u.ge("clouds", intro);
			u.e.onAnimationEnd(clouds, u.e.kill);
		}


		// global canvas element
		e.content = u.ge("content", e);

//		u.a.translate(e.content, 0, 0);
//		u.a.translate(u.ge("canvas"), 0, 0);

		// global content loader
		e.content.loadContent = function() {

			// reset stage
			u.e.transitionEnded(this, this.loadContent);
			u.e.animationEnded(this, this.loadContent);

			
			window.onkeydown = false;

			// explicit remove dilemma classes
			u.removeClass(document.body, "dilemma_[0-9]");
			// explicit remove puzzle classes
			u.removeClass(document.body, "puzzle_[0-9]");
			// remove sub classes
			u.removeClass(document.body, "front|massage|friends|snowboard|dance|puzzle|gotchi|dilemma|paint|jump");

			// set new class (and start loding background while waiting for response)
			u.addClass(document.body, this.node.className);


			// load new page
			u.XMLRequest(this.node.url, this);

		}

		// content responder
		e.content.XMLResponse = function(response) {

			// set title
			document.title = u.ge("h1", response).innerHTML;
			// replace canvas content
//			this.replaceChild(u.ge("canvas", response), u.ge("canvas", this)); // too slow
			u.ge("canvas", this).innerHTML = u.ge("canvas", response).innerHTML;
//			u.a.translate(this, 0, 0);
//			u.a.translate(u.ge("canvas", this), 0, 0);

			// init handles ready state
			u.init(this);

			// saving grace, slow down to prevent firefox rendering problem (might only be visible on a slower computer 1.6ghz)
			/*
			if(u.firefox()) {
				setTimeout(function() {u.addClass(document.body, "ready");}, 250);
			}
			else {
				u.addClass(document.body, "ready");
			}
			*/
		}

		// navigation controller
		e.navigation = function(node) {

			// remember url
			this.content.node = node;

			// load content on transition/animation end
			u.e.onAnimationEnd(this.content, this.content.loadContent);
			u.e.onTransitionEnd(this.content, this.content.loadContent);


			u.a.transition(u.ge("canvas"), "all 0.4s ease-in");
			
			// explicit removal of ready class to trigger "fade out"
			u.removeClass(document.body, "ready");
//			u.addClass(document.body, "transition");


			// start background loop if it is not already playing (could be stopped due to video playback)
			if(segment == "desktop" && !this.player.playing && !u.ge("toggle_music").className.match(/off/)) {
				this.player.play();
			}

		}

	}
}

Util.Objects["header"] = new function() {
	this.init = function(e) {

		// enable frontpage link
		var link = u.ge("front", e);
		u.hrefToClick(link);
		link.clicked = function() {
			u.ge("page").navigation(this);
		}
	}
}

Util.Objects["footer"] = new function() {
	this.init = function(e) {

		// inject audio-player
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
			// teddy can be disabled by setting src to false
			if(src) {
				this.player.load(this.current_audio);
			}
		}

	}
}









/* shorthand link translater function */
Util.hrefToClick = function(e) {
	a = u.ge("a", e);
	e.url = a.href;
	a.removeAttribute("href");
	u.e.click(e);
	e.clicked = function(event) {
		location.href = this.url;
	}
}