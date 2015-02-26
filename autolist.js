if (!RedactorPlugins) var RedactorPlugins = {};
//&#8203: Unicode Character 'ZERO WIDTH SPACE' (U+200B)   -> redactor editor inserts this at the first line
(function ($) {
  RedactorPlugins.autolist = function () {
    var flag = false;
    return {
      back: function () {
        flag = true;
      },
      init: function () {
		//adds functionality to existing shortcut
		$.extend(this.opts.shortcuts, {
			'ctrl+z': { func: 'autolist.back', params: [] }
        });
			  
        this.$editor.on('keyup.redactor-limiter', $.proxy(function (e) {
          var key = e.which;
		  
		  //check of autolist placeholder only when in 'standard' mode (not after a ctrl+z)
          if (key == this.keyCode.SPACE && flag === false) {
            var current = this.selection.getCurrent();
            var cloned = $(current).clone();
            var $div = $('<div>');
            $div.html(cloned);
            var text = $div.html();
            $div.remove();

            var listType = '';
            var replaced = false;

            //check for unordered list placeholder
            var regUnordered = new RegExp(/^[\*-]/);
            if (text.search(regUnordered) != -1) {
              listType = 'unorderedlist'
              replaced = true;
              this.selection.save();
            }

            //check for ordered list placeholder
            var regOrdered = new RegExp(/^1\./);
            if (text.search(regOrdered) != -1) {
              listType = 'orderedlist'
              replaced = true;
              this.selection.save();
            }

			//removes autolist placeholder and inserts list
            if (replaced) {
              text = text.replace(/(^[\*-]&nbsp;)|(^1\.&nbsp;)/, '');
              $div = $('<div>');
              $div.html(text);
              $div.append(this.selection.getMarker());
              $(current).replaceWith($div.html());
              $div.remove();

              this.list.insert(listType);
              this.selection.restore();
            }
          }
	
		  //if in not-standard mode (true for pressing ctrl+z for the latest autolist generation) and after pressing ENTER: set back to standard mode
          if (key == this.keyCode.ENTER && flag) {
            flag = false;
          }
        }, this));
      }
    }
  };
})(jQuery);


