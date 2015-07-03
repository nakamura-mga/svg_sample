(function($){
	$(function(){
		$("#symbol").load("img/symbol.svg");
		var $play = $('#playList').find('.play').find('a');
		var $logo = $('#playList').find('.logo');
		$play.html('<svg><use xlink:href="#play"></use></svg>');
		$logo.html('<svg><use xlink:href="#logo"></use></svg>');
	});
})(jQuery);
