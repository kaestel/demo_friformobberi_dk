// 9_0
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

		// prepare for effects
		var canvas = e.parentNode;
		canvas.e = e;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;

			// show start button
			this.e.startScreen();

			u.ge("teddy").player.play();
		}

		// remove standard fallback content
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


		// enable dragging of trampolin
		u.e.drag(e.trampolin, new Array(0, 0, e.offsetWidth, e.trampolin.offsetHeight));

		if(segment == "mobile_touch") {
			e.trampolin.moved = function() {
				u.a.translate(this, ((this.element_x-171)*2) + 171, 0);
			}
		}

		// game start screen
		e.startScreen = function() {

			window.onkeydown = false;

			u.a.transition(this.bear, "none")

			u.removeClass(this, "go");
			u.addClass(this, "wait");

			// slide trampolin in
			u.a.transition(this.trampolin, "all 0.8s ease-out")
			u.addClass(this.trampolin, "ready");
			u.a.translate(this.trampolin, 171, 0);

			// move bear to start point
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

		// begin game
		e.goScreen = function() {

			// move trampolin with arrow-keys
			window.onkeydown = function(event) {
				if(event.keyCode == 37 && !u.ge("game").t_trampolin) {
					u.ge("game").t_trampolin = u.t.setTimer(u.ge("game"), u.ge("game").moveTrampolinLeft, 40);
					
//					var trampolin = u.ge("trampolin");
//					u.a.translate(trampolin, trampolin.element_x - 10, trampolin.element_y);
				}
				else if(event.keyCode == 39 && !u.ge("game").t_trampolin) {
//					u.bug(u.ge("game").moveTrampolinRight + "::" + u.ge("game"))
					u.ge("game").t_trampolin = u.t.setTimer(u.ge("game"), u.ge("game").moveTrampolinRight, 40);
//					var trampolin = u.ge("trampolin");
//					u.a.translate(trampolin, trampolin.element_x + 10, trampolin.element_y);
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

			// game start settings
			this.bear.transitioned = function(event) {
				this.base_speed = (segment == "mobile_touch" ? 80 : 16);
				this.speed = this.base_speed;
				this.direction = -1;
				this.rotation_factor = 0;
				this.jumps = 0;
				this.timestamp = new Date().getTime();

				this.transitioned = false;
//				u.a.transition(this, "all 50ms linear");
				u.a.transition(this, "none");
				this.jump();
			}



			// jump loop
			this.bear.jump = function() {

				// start up - y is below bottom
				if(this.element_y >= 0) {

					// if bear is inside trampolin
					if(this.element_x+30 > this.e.trampolin.element_x && this.element_x-30+this.offsetWidth < this.e.trampolin.element_x+this.e.trampolin.offsetWidth) {

						// boing
						u.ge("teddy").player.play();

						// set new random jump height
						this.jump_height = (Math.random()*100) - 350;

						// set new random jump side offset
						this.jump_offset = ( ((Math.random()*500) - this.element_x) / 90);

						// adjust speed based on timelapse
						this.speed = this.base_speed + (new Date().getTime() - this.timestamp) / 10000;

						// calculate acceration
						this.acceleration = Math.abs(Math.pow(this.speed, 2) / (this.jump_height * 2));
						this.jumps++;

						// set scoreboard
						this.e.score_board.innerHTML = this.jumps;

						// start going back up
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
						// move bear out of the way
						u.a.transition(this, "all 0.2s linear");
						u.a.translate(this, this.element_x, this.element_y + 300);
						return;
					}
				}

				// start down - y is higher than top
				else if(this.element_y <= this.jump_height || this.speed <= 0) {

					this.direction = 1;
				}

				
				// up - decelerate
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
				// down - accelerate
				else if(this.direction > 0) {

					this.speed = this.speed+this.acceleration;

					// make sure rotation is ok
					this.rotation_factor = 0;
					this.rotation = 0;
				}

//				u.bug(this.jump_offset);
				u.a.translateRotate(this, this.element_x + this.jump_offset, this.element_y + (this.direction*this.speed), this.rotation+this.rotation_factor);

				// jump timer
				u.t.setTimer(this, this.jump, segment == "mobile_touch" ? 250 : 50);
			}
		}

	}
}