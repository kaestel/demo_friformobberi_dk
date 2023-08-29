// diploma - 2_0
Util.Objects["friends"] = new function() {
	this.init = function(e) {

		e.preload = ({
			0 : ({"image":"/img/bg_canvas_white.png"}),
			1 : ({"image":"/img/bg_header_2_0.png"}),
			2 : ({"image":"/img/bg_2_0.png"})
		});

		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);


		var menu_items = u.ges("li", e);
		for(i = 0; menu_item = menu_items[i]; i++) {
			u.hrefToClick(menu_item);
			menu_item.clicked = function() {
				u.ge("page").navigation(this.url);
			}
		}
		e.onsubmit = function(){
			return false;
		}
		
		e.bl = function() {
			var blur = u.ae(u.ge("page"), "div", "blur");
			var close_button = u.ae(blur, "div", "close");
			close_button.blur = blur;
			var form = this.parentNode.removeChild(this);
			blur.appendChild(form)
			var name = u.ge("name");
			name.e = this;
			name_value = u.ge("namelabel", this.e).innerHTML
			name.value = name_value;
			name.onfocus = function() {
				this.value = "";
				if(u.ge("error") != false) {
					blur.removeChild(u.ge("error"))
				}
			}
			name.onblur = function() {
				if(this.value == "" || this.value == name_value) {
					this.value = name_value;
				}
			}
			
			e.su = function() {
				var name = u.ge("name", e);
				
				if(name.value == "" || name.value == name_value) {
					u.ae(blur, "p", "error").innerHTML = "Husk at skrive dit navn";
				} else {

					// show diploma
					this.XMLResponse = function(response) {
						// response contains a form, with data
						this.file = u.ge("file", response).value;
						this.download_form = u.ge("form", response);
						if(this.file) {
							u.addClass(blur, "show_preview");
							var diplom = u.ae(blur, "div", "diplom");
							var diplom_a = u.ae(diplom, "a");
							diplom_a.e = this;

							var diplom_preview = u.ae(diplom_a, "img", "diplom_preview");
							diplom_preview.src = this.file;

							// create save button
							var save = u.ae(diplom_a, "div", "save");

							// standalone cannot save, open file in new window
							if(navigator.standalone) {
								diplom_preview.parentNode.href = "2_0-download.php?file="+diplom_preview.src;
								diplom_preview.parentNode.target = "_new";
							}
							// iOS save information
							else if(segment == "tablet" || segment == "mobile_touch") {

								u.e.click(diplom_a);
								diplom_a.clicked = function(event) {
									var help = u.ae(u.ge("blur"), "p", ({"class":"error"}));
									help.innerHTML = "Hold din finger nede på billedet i 3 sekunder";

									this.help = help;
									u.e.hold(this);
									this.held = function(event) {
										this.help.parentNode.removeChild(this.help);
										this.held = null;
									}
								}
							}
							else {

								u.e.click(diplom_a);
								diplom_a.clicked = function(event) {
									// values needs to be posted - use response form
									var form = this.appendChild(this.e.download_form);
									form.submit();
								}
							}
						}

					}

					// create diploma
					u.XMLRequest("/2_0.php", this, "ps=create&name="+name.value+"&gender="+this.gender_value);
				}
			}
			
			// submit name
			var button = u.ge("button", this.e);
			u.e.click(button)
			button.clicked = function() {
				e.su()
			}

			// submit on enter
			name.onkeyup = function(event) {
				if(event.keyCode == 13) {
					e.su()
				}
			}
			
			u.e.click(close_button);
			close_button.clicked = function() {
				name.value = "";
				var form = this.blur.removeChild(u.ge("form", this.blur))
				u.ge("canvas").appendChild(form);
				this.blur.parentNode.removeChild(this.blur);
			}
		}

		var boy_chosen = u.ge("boy_div", e);
		boy_chosen.e = e;
		e.boy_radio = u.ge("boy", e);
		u.e.click(boy_chosen);
		boy_chosen.clicked = function() {
			this.e.gender_value = this.e.boy_radio.value;
			this.e.boy_radio.checked = true;
			this.e.bl();
			 
		}
		var girl_chosen = u.ge("girl_div", e);
		girl_chosen.e = e;
		e.girl_radio = u.ge("girl", e);
		u.e.click(girl_chosen);
		girl_chosen.clicked = function() {
			this.e.gender_value = this.e.girl_radio.value;
			this.e.girl_radio.checked = true;
			this.e.bl();
		}


		u.ge("teddy").setTeddy("/media/audio/speaks/dk_VD_bamse_3_1.mp3");

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
