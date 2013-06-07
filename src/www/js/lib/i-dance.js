// dance - 4_0
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
			u.addClass(link, "go");
		}

		// disable teddy speak for iOS when using the "player" for video
		if(segment == "desktop") {
			u.ge("teddy").setTeddy("/media/audio/speaks/dk_RM_bamse_1_1.mp3");
		}
		else {
			u.ge("teddy").setTeddy(false);
		}

		link = links[links.length-1];

		// prepare for effects
		u.e.transitioned(link);
		u.e.animated(link);
		link.transitioned = link.animated = function(event) {
			this.transitioned = false;
			this.animated = false;

			u.ge("teddy").player.play();
		}


		// show splash of first entry
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