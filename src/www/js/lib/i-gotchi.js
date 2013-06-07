// 6_0
Util.Objects["gotchi"] = new function() {
	this.init = function(e) {

		e.preload = ({
			0 : ({"image":"/img/bg_6_0_clothes_big.png"}),
			1 : ({"image":"/img/bg_header_6_0.png"}),
			2 : ({"image":"/img/bg_canvas_white.png"}),
			3 : ({"image":"/img/bg_6_0_teddy.png"}),
			4 : ({"image":"/img/bg_6_0_clothes_mini.png"})
		});
		
		e.start = function() {
			u.addClass(document.body, "ready");
		}
		u.preload(e, e.preload);


		var clothes_big = u.ge("clothes_big", e.parentNode);
		
		var menu_items = u.ges("li", e)
		for(i = 0; menu_item = menu_items[i]; i++) {
			menu_item.e = e;
			u.hrefToClick(menu_item);
			menu_item.clicked = function() {
				var target = u.ge(this.className.match(/t[0-9]+/)[0], clothes_big);
				var item = this.className.match(/i[0-9]+/)[0];

				if(target.className.match(item)) {
					u.removeClass(target, "i[0-9]+");
				}
				else {
					u.removeClass(target, "i[0-9]+");
					u.addClass(target, item);
				}
			}
		}

		u.ge("teddy").setTeddy("/media/audio/speaks/dk_BP_bamse_6_1.mp3");

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
