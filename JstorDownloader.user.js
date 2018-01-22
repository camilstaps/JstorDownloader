// ==UserScript==
// @name        JstorDownloader
// @namespace   nl.camilstaps.jstordownloader
// @description Downloads articles from JSTOR as PDF
// @include     http://www.jstor.org/stable/*
// @require     https://code.jquery.com/jquery-3.3.1.slim.min.js
// @version     1
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function displayFinalInstructions(lastp) {
	$('#search-term-highlight-container').remove();
	var p = '<p>Now run:</p>';
	var c = '<p><code>convert $(seq -f \'%.0f.gif\' 1 ' + lastp + ') article.pdf</code></p>';
	var a = '<p><a href="javascript:document.location.reload();">Reload this page.</a></p>';
	$('.page-center')
		.append(p)
		.append(c)
		.append(a)
		.css({
			background: 'none',
			padding: '2em',
			textAlign: 'center'
		});
	$('.previous-page').css('visibility', 'hidden');
	$('.next-page').css('visibility', 'hidden');
}

function downloadNext(thisp, lastp) {
	if (thisp > lastp) {
		displayFinalInstructions(lastp);
		return;
	}

	var $page = $('.page-scan-container');
	var $a = $('<a>');
	$a.attr('href', $page.attr('src'));
	$a.attr('download', thisp + '.gif');
	$a.appendTo('body');
	$a[0].click();
	$a.remove();
	$('.next-page').click();

	var interval = window.setInterval(function(){
		if ($('.scan-image-wrapper').hasClass('loading'))
			return;
		window.clearInterval(interval);
		downloadNext(thisp+1, lastp);
	}, 500);
}

function download() {
	var $page = $('.page-scan-container');
	var thisp = $page.data('page');
	var lastp = $page.data('last');

	downloadNext(thisp, lastp);

	return false;
}

window.addEventListener('load', function() {
  var $scan = $('#page_scan_tab_contents');
  if ($scan.length) {
    var $button = $('<a href="#"></a>');
    $button
      .click(download)
      .text('Download')
      .css({
        float: 'right',
        margin: '10px 30px',
      }).addClass('button');
    $scan.find('.shelf-banner > .row').append($button);
  } else {
    console.log('Article not on shelf');
  }
});
