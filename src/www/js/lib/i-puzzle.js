// 5_0
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

		// prepare for effects
		var canvas = e.parentNode;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;

			u.ge("teddy").player.play();
		}

		// remove error message and build page
//		e.removeChild(u.ge("error"));
		e.innerHTML = "";

		// temp screen
//		u.ae(e, "p", "error").innerHTML = "Spillet kommer snart";
		//return;


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

		// prepare for effects
		var canvas = e.parentNode;
		u.e.transitioned(canvas);
		u.e.animated(canvas);
		canvas.transitioned = canvas.animated = function(event) {
			this.transitioned = false;
			this.animated = false;
			u.ge("teddy").player.play();
		}


		// enable back button
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



		// start game by clicking the puzzle
		var start = u.ae(e, "div", "start");
		start.e = e;
		u.e.click(start)
		start.clicked = function() {
			var blur = u.ae(u.ge("page"), "div", "blur");
			blur.e = this.e;
			u.a.transition(blur, "all 1.0s ease-in");
			u.ge("content").style.zIndex = "32";

			// split puzzle when blur is done
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

			// Choose the transitions for each puzzle
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
				// enable drag
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
				// move into place
				u.a.translate(piece, piece.start_x, piece.start_y);

			}


		}
		e.rf = function() {
			var pieces = u.ges("piece");
//			this.pieces = pieces;
			for(i = 0; piece = pieces[i]; i++) {
				u.removeClass(piece, "fixed");
			}
		}
	}	
}