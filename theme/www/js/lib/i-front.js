/* front element - index */
Util.Objects["front"] = new function() {
	this.init = function(e) {

		e.preload = ({
			0 : ({"image":"/img/bg_sphere.png"}),
			1 : ({"image":"/img/bg_sphere_text.png"})
		});

		e.start = function() {
			// only continue if the transition class exists - else wait for intro to finish
			if(document.body.className.match(/transition/)) {
				u.addClass(document.body, "ready");
			}
		}
		u.preload(e, e.preload);


		var i, menu_item;

		// prepare content
		var menu_items = u.ges("li", e);
		for(i = 0; menu_item = menu_items[i]; i++) {
			menu_item.e = e;
			u.hrefToClick(menu_item);
			menu_item.clicked = function() {
				u.ge("page").navigation(this);
			}
		}

		// add decorations
		u.ae(e.parentNode, "div", "center_text");
		u.ae(e, "li", "trampolin_bear");
		u.ae(e, "li", "baloon");
		u.ae(e, "li", "xfighter");
		u.ae(u.ae(e, "li", "birds green_bird green_bird_down"),"div", "birds green_bird green_bird_up");
		u.ae(u.ae(e, "li", "birds blue_bird blue_bird_down"),"div", "birds blue_bird blue_bird_up");
		u.ae(u.ae(e, "li", "birds brown_bird brown_bird_down"),"div", "birds brown_bird brown_bird_up");


		u.ge("teddy").setTeddy("/media/audio/speaks/dk_FS_bamse_6_1.mp3");



		// set rotation catching on canvas element - but rotate ul
		var canvas = e.parentNode;
		canvas.e = e;

		// center coordinates
		canvas.c_x = Math.round(canvas.offsetWidth/2);
		canvas.c_y = Math.round(canvas.offsetHeight/2);
		// offset coordinates (may change during rotation, so get initial values to use in calculations)
		canvas.o_x = u.absLeft(canvas);
		canvas.o_y = u.absTop(canvas);

		// offset angle
		canvas.o_a = 0;
		// speed
		canvas.interval = 50;
		canvas.start_speed = 0.1;
		canvas.default_speed = 0.3;

		// try to smooth rotation
		u.a.transition(e, "rotate "+canvas.interval+"ms linear");
		// start position
		u.a.rotate(e, 0);

		var teddy = u.ge("teddy");

		// prepare for effects
		u.e.transitioned(teddy);
		u.e.animated(teddy);
		teddy.transitioned = teddy.animated = function(event) {
			this.transitioned = false;
			this.animated = false;

			this.player.play();
		}



		// rotation handler
		canvas.rotate = function() {

			// make sure any existing rotation timers are cancelled
			u.t.resetTimer(this.t_rotate);

			// set next timer
			this.t_rotate = u.t.setTimer(this, this.rotate, this.interval);

			// handle de- and acceleration

			// 0 is invalid
			if(!this.rotation_speed) {
				this.rotation_speed = this.start_speed;
			}
			// accelerate
			else if(Math.abs(this.rotation_speed) < this.default_speed) {
//			else if((Math.round(Math.abs(this.rotation_speed) * 10) / 10) < this.default_speed) {
				this.rotation_speed = Math.round((this.rotation_speed * 1.1) * 10) / 10;
//				this.rotation_speed = this.rotation_speed * 1.02;
			}
			// decelerate
			else if(Math.abs(this.rotation_speed) > this.default_speed) {
//			else if((Math.round(Math.abs(this.rotation_speed) * 10) / 10) > this.default_speed) {
				this.rotation_speed = Math.round((this.rotation_speed * 0.9) * 10) / 10;
//				this.rotation_speed = this.rotation_speed * 0.98;
			}
//			else {
//				this.rotation_speed = Math.round(this.rotation_speed * 10) / 10;
//			}

			// execure rotation
			u.a.rotate(this.e, this.e.rotation+this.rotation_speed);

		}

		// start rotation timer loop
		canvas.rotate();

		// enable drag
		u.e.drag(canvas, canvas, true);

		// input start
		canvas.inputStarted = function(event) {
//			u.bug("canvas.inputStarted");
			// stop rotation
			u.t.resetTimer(this.t_rotate);

			// no speed
			this.current_dps = 0;

			// offset angle
			this.o_a = this.e.rotation;
		}

		// first move event
		canvas.picked = function(event) {
//			u.bug("canvas.picked");
			var s_x, s_y, s_a;

			// get pick-up coordinates
			var s_x = u.eventX(event) - this.o_x;
			var s_y = u.eventY(event) - this.o_y;

			// calculate pick-up start angle (0 = noon)
			s_a = Math.round(Math.atan2(s_x - this.c_x, this.c_y - s_y) * (360 / 6.28));
			s_a = s_a < 0 ? s_a + 360 : s_a;

			// remember for movement calculation
			this.s_a = s_a;
		}

		// rotation movement
		canvas.moved = function(event) {
			var e_x, e_y, c_t, c_a;

			// get event coordinates relative to element
			e_x = this.current_x + this.start_input_x - this.o_x;
			e_y = this.current_y + this.start_input_y - this.o_y;

			// current timestamp
			c_t = new Date().getTime();

			// calculate event angle (current angle)
			c_a = (Math.atan2(e_x - this.c_x, this.c_y - e_y) * (360 / 6.28));
			c_a = c_a < 0 ? c_a + 360 : c_a;

			// calculate degrees pr second
			this.current_dps = ((c_a - this.c_a)/(c_t - this.c_t)) * 1000;

			// remember values
			this.c_t = c_t;
			this.c_a = c_a;

			// execute rotation
			u.a.rotate(this.e, (Math.round(this.c_a)-this.s_a) + this.o_a);
		}

		// rotation ended, element dropped
		canvas.dropped = function(event) {

			// calculate exit speed
			this.rotation_speed = this.current_dps / (1000 / this.interval);

			// start rotation loop
			this.rotate();
		}

	}

}