$(document).ready(function() {

	$(document).foundation();

	$('nav a').on('click', function() {
		$('nav a').removeClass('selected');
		$(this).addClass('selected');
	});

});

