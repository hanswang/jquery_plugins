/*
 * jquery.okColorPicker.js
 *
 * Copyright (c) 2010 Asher Van Brunt | http://www.okbreathe.com
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * Date: 05/12/2010
 *
 * @projectDescription Simplified Colour Picker
 * @author Asher Van Brunt
 * @mailto asher@okbreathe.com
 * @version 1.0
 *
 */

(function($){

  $.fn.colorPicker = function(opts){
    opts = $.extend({
      changeEvent  : "mouseenter", // Event that triggers a colour change
      selectEvent  : "click",      // Event that triggers selection
      afterChange  : null,         // Called after colour is changed
      afterSelect  : null,         // Called after colour is selected
      displayColor : true,         // Overlay the color value on top the selected colour
      displayHex   : true          // If true will display the colour in hex, otherwise an RGB value;
    },opts);
    var colors = [
        ["#f00","#ff0","#0f0","#0ff","#00f","#f0f","#fff","#ebebeb","#e1e1e1","#d7d7d7","#cccccc","#c2c2c2","#b7b7b7","#acacac","#a0a0a0","#959595"],
        ["#ee1d24","#fff100","#00a650","#00aeef","#2f3192","#ed008c","#898989","#7d7d7d","#707070","#626262","#555","#464646","#363636","#262626","#111","#000"],
        ["#f7977a","#fbad82","#fdc68c","#fff799","#c6df9c","#a4d49d","#81ca9d","#7bcdc9","#6ccff7","#7ca6d8","#8293ca","#8881be","#a286bd","#bc8cbf","#f49bc1","#f5999d"],
        ["#f16c4d","#f68e54","#fbaf5a","#fff467","#acd372","#7dc473","#39b778","#16bcb4","#00bff3","#438ccb","#5573b7","#5e5ca7","#855fa8","#a763a9","#ef6ea8","#f16d7e"],
        ["#ee1d24","#f16522","#f7941d","#fff100","#8fc63d","#37b44a","#00a650","#00a99e","#00aeef","#0072bc","#0054a5","#2f3192","#652c91","#91278f","#ed008c","#ee105a"],
        ["#9d0a0f","#a1410d","#a36209","#aba000","#588528","#197b30","#007236","#00736a","#0076a4","#004a80","#003370","#1d1363","#450e61","#62055f","#9e005c","#9d0039"],
        ["#790000","#7b3000","#7c4900","#827a00","#3e6617","#045f20","#005824","#005951","#005b7e","#003562","#002056","#0c004b","#30004a","#4b0048","#7a0045","#7a0026"]
      ],
      _table;

    function generateColorTable(){
      if (_table) { return _table; }
      _table = "<table class='ui-colorPicker'>";
      for (var i=0;i<colors.length;i++) {
        _table += "<tr>";
        for (var j=0,len=colors[i].length;j<len;j++) {
          _table += "<td style='background:"+colors[i][j]+"'></td>";
        }
        _table += "</tr>";
      }
      _table += "<tr class='selected'><td colspan=16 style='background:#fff'>";
      if (opts.displayColor) {_table += "<span class='hex'>#ffffff</span>";}
      _table += "</td></tr>";
      _table +=  "</table>";
      return _table; 
    }

    function rgbToHex(str) {
      var m = str.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      for (var i = 1; i <= 3; ++i) {
        m[i] = parseInt(m[i],10).toString(16);
        if (m[i].length == 1) { m[i] = '0' + m[i]; }
      }
      return '#'+m.slice(1).join(''); 
    } 

    function changeColor(e) {
      e.preventDefault();
      var target   = $(e.currentTarget),
          selected = target.closest("table").find("tr.selected td"),
          color    = target.css("backgroundColor");

      if (opts.displayColor) { selected.children().html(opts.displayHex ? rgbToHex(color) : color);}
      if (opts.afterChange)  { opts.afterChange.call(target,color); }
      return selected.css("backgroundColor", color);
    }

    function selectColor(e) {
      var selected  = $(e.currentTarget),
          color    = selected.css("backgroundColor");
      if (opts.afterSelect) { opts.afterSelect.call(selected,opts.displayHex ? rgbToHex(color) : color); }
    }

    return this.each(function(){
      $(this)
        .addClass("ui-colorPicker-container")
        .html(generateColorTable())
        .delegate("td", opts.changeEvent, changeColor)
        .delegate("td", opts.selectEvent, selectColor);
    });
  };

})(jQuery);
