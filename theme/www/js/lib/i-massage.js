// massage - 1_0
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

		// enable playlist
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

		// disable teddy speak for iOS when using the "player" for video
		if(segment == "desktop") {
			u.ge("teddy").setTeddy("/media/audio/speaks/dk_BM_bamse_5_1.mp3");
		}
		else {
			u.ge("teddy").setTeddy(false);
		}


		link = links[links.length-1];

		// prepare for effects
		u.a.transitioned(link);
		u.e.animated(link);
		link.transitioned = link.animated = function(event) {
//			u.bug("COOL")
			this.transitioned = false;
			this.animated = false;

			u.ge("teddy").player.play();
		}


		// show splash of first entry
		var splash = u.ae(e.player, "div", "splash");
		splash.link = links[0];
		splash.style.backgroundImage = "url("+splash.link.url.replace(".mov", ".jpg")+")";

		u.e.click(splash);
		splash.clicked = function(event) {
			splash.link.clicked(event);
		}

	}
}