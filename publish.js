// -----------------------------------------------------------------------------------------
// Table of Content for Blogger with Pagination
// Original: http://vagabundia.blogspot.com/2011/04/resumen-de-entradas-con-paginacion.html
// Modified by Taufik Nurrohman
// On 3 March 2012
// Visit: http://www.dte.web.id
// -----------------------------------------------------------------------------------------

var minpage = 6; // Minimum number to display the page
var maxpage = 10; // The maximum number of pages to display
var firstpage = 0; // Detect the first time it is executed
var pagernum = 0; // Contain the page number where we
var postsnum = 0; // Start the first page
var actualpage = 1; // Starting value of the current page (it will change if you click the pagination).

// This is the container template that will be used to insert the posts template, pagination and the posts count
document.write('<div class="section-content blog-posts hfeed cf"><div id="results"></div></div><div id="itempager" style="position:relative;margin-top:10px;"><div id="pagination"></div><div id="totalposts"></div></div>');

var _results = document.getElementById('results');
var _pagination = document.getElementById('pagination');
var _totalposts = document.getElementById('totalposts');

// Build the table of contents framework

function showPagePosts(json) {

    var entry, posttitle, posturl, postimg, postsumm, replies, monthnames, timepub, output = "";

    if (pagernum === 0) {
        postsnum = parseInt(json.feed.openSearch$totalResults.$t);
        pagernum = parseInt(postsnum / postPerPage) + 1;
    }

    for (var i = 0; i < postPerPage; i++) {

		if ("entry" in json.feed) {

			if (i == json.feed.entry.length) break;

			entry = json.feed.entry[i];
			postid = entry.id.$t;
			posttitle = entry.title.$t; // Get the post title

			// Get rel="alternate" for truly post url
			for (var k = 0, elen = entry.link.length; k < elen; k++) {
				if (entry.link[k].rel == "alternate") {
					posturl = entry.link[k].href; // This is your real post URL!
					break;
				}
			}

			// Get the comments count
			for (var l = 0, clen = entry.link.length; l < clen; l++) {
				if (entry.link[l].rel == "replies" && entry.link[l].type == "text/html") {
					var commentsnum = entry.link[l].title.split(" ")[0]; // This is your comments count
					break;
				}
			}

			// If the Blogger-feed is set to SHORT, then the content is in the summary-field
			postsumm = ("summary" in entry) ? entry.summary.$t.replace(/<br ?\/?>/ig, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "") : ""; // Get the post summary

			// Reduce post summaries to "numChars" characters.
			// "numChars" is a variable. You determine the value
			if (postsumm.length > numChars) {
				postsumm = (numChars > 0 && numChars !== false) ? postsumm.substring(0, numChars) + '...' : "";
			}

			// Get the post date (e.g: 2012-02-07T12:56:00.000+07:00)
			var _postdate = entry.published.$t,
				_cdyear = _postdate.substring(0, 4), // Take 4 characters from the "postdate" beginning, it means the year (2012)
				_cdmonth = _postdate.substring(5, 7), // Take 2 character 5 step from "postdate" beginning, it mean the month (02)
				_cdday = _postdate.substring(8, 10); // Take 2 character 8 step from "postdate" beginning. it means the day (07)

			// Month array template
			monthnames = (idMode) ? ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

			// The final product of the post date = (07 Feb 2012) (cdday monthnames cdyear)
			timepub = (showPostDate) ? _cdday + ' ' + monthnames[parseInt(_cdmonth, 10) - 1] + ' ' + _cdyear + ' ' : '';

			// The final product of the comments count & comments label (10 Komentar) (commentsnum commentsLabel)
			replies = (showComments) ? commentsnum + ' ' + commentsLabel : '';

			// Get the post thumbnails
			postimg = ("media$thumbnail" in entry) ? entry.media$thumbnail.url : imgBlank;
			if (entry.content && postimg == imgBlank) {
            var image = /<img +(.*?)src=(['"])([^'"]+?)(['"])(.*?) *\/?>/i.exec(entry.content.$t);
            postimg = image && image[3] ? image[3] : imgBlank;
        }
			postimg = postimg.replace('/s72-c/', '/w300-h400-p-k-no-nu-rj-l80/');
			// Build the post template
			output += '<article class="post hentry cf bb" id="' + postid + '">';
			output += '<a class="permalink" href="' + posturl + '"></a>';
            output += '<header class="header post-header entry-header muted bb cf"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><img alt="' + posttitle + '" class="thumbnail post-thumbnail entry-thumbnail" data-src="' + postimg + '" height="600" title="' + posttitle + '" width="600" src="' + postimg + '"></header>';
            output += '<div class="main post-main entry-main muted bb cf">';
            output += '<h3 class="title post-title entry-title bb cf bold"><a class="cl" href="' + posturl + '"</a>' + posttitle + '</h3>';
            output += '<div class="category post-category entry-category cf">';
            output += '' + timepub + '';
            output += '</div>';
            output += '</div>';
            output += '</article>';

		}

    }

    // Put the whole template above into <div id="results"></div>
    _results.innerHTML = output;
    _create_pagination();

}

// Build the pagination
function _create_pagination() {

    output = "";
    var starter = 0;

  output += ((actualpage > 1) ? '<a title="' + prevText + '" class="prevjson" href="javascript:_init_script(' + (actualpage - 1) + ')">' + prevText + '</a>' : '<span class="prevjson hidden">' + prevText + '</span>') + '<em style="font:inherit;color:inherit;" class="pagernumber">';

    if (pagernum < (maxpage + 1)) {
        for (starter = 1; starter <= pagernum; starter++) {
            output += (starter == actualpage) ? '<span class="actual">' + starter + '</span>' : '<a href="javascript:_init_script(' + starter + ')">' + starter + '</a>';
        }
    } else if (pagernum > (maxpage - 1)) {
        if (actualpage < minpage) {
            for (starter = 1; starter < (maxpage - 2); starter++) {
                output += (starter == actualpage) ? '<span class="actual">' + starter + '</span>' : '<a href="javascript:_init_script(' + starter + ')">' + starter + '</a>';
            }
            output += ' ... ';
            output += '<a href="javascript:_init_script(' + parseInt(pagernum - 1) + ')">' + parseInt(pagernum - 1) + '</a>';
            output += '<a href="javascript:_init_script(' + pagernum + ')">' + pagernum + '</a>';
        } else if (pagernum - (minpage - 1) > actualpage && actualpage > (minpage - 1)) {
            output += '<a href="javascript:_init_script(1)">1</a>';
            output += '<a href="javascript:_init_script(2)">2</a>';
            output += ' ... ';
            for (starter = actualpage - 2; starter <= actualpage + 2; starter++) {
                output += (starter == actualpage) ? '<span class="actual">' + starter + '</span>' : '<a href="javascript:_init_script(' + starter + ')">' + starter + '</a>';
            }
            output += ' ... ';
            output += '<a href="javascript:_init_script(' + (pagernum - 1) + ')">' + parseInt(pagernum - 1) + '</a>';
            output += '<a href="javascript:_init_script(' + pagernum + ')">' + pagernum + '</a>';
        } else {
            output += '<a href="javascript:_init_script(1)">1</a>';
            output += '<a href="javascript:_init_script(2)">2</a>';
            output += ' ... ';
            for (starter = pagernum - (minpage + 1); starter <= pagernum; starter++) {
                output += (starter == actualpage) ? '<span class="actual">' + starter + '</span>' : '<a href="javascript:_init_script(' + starter + ')">' + starter + '</a>';
            }
        }
    }

    output += '</em>' + ((actualpage < starter - 1) ? '<a title="' + nextText + '" class="nextjson" href="javascript:_init_script(' + (actualpage + 1) + ')">' + nextText + '</a>' : '<span class="nextjson hidden">' + nextText + '</span>');

    _pagination.innerHTML = output;
	_totalposts.innerHTML = totalPostLabel + ' ' + postsnum + ' - ' + jumpPageLabel + ' ' + ((actualpage * postPerPage) - (postPerPage - 1)) + ((actualpage < starter - 1) ? ' - ' + (actualpage * postPerPage) : "");

}

// Functions to remove and append the callback script that has been manipulated in the `start-index` parameter
function _init_script(n) {

    var parameter = (n * postPerPage) - (postPerPage - 1), old, s,
		head = document.getElementsByTagName('head')[0],
		url = (sortByLabel) ? siteUrl + '/feeds/posts/summary/-/Episode' + labelSorter + '?start-index=' + parameter : siteUrl + '/feeds/posts/summary/-/Episode?start-index=' + parameter; // Optional: Sort posts by a specific label

    if (firstpage == 1) {
		// Jump to top
		document.documentElement.scrollTop = _results.offsetTop - 30;
		document.body.scrollTop = _results.offsetTop - 30;
		// Remove the old callback script
        old = document.getElementById("TEMPORAL");
        old.parentNode.removeChild(old);
    }

    _results.innerHTML = '<div id="loadingscript">' + loadingText + '</div>';
    _pagination.innerHTML = '';
    _totalposts.innerHTML = '';

    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = url + '&max-results=' + postPerPage + '&orderby=published&alt=json-in-script&callback=showPagePosts';
    s.id = 'TEMPORAL';
    head.appendChild(s);
    firstpage = 1;
    actualpage = n;

}

// Execute the _init_script() function with parameter as `1` on page load
// So it will show the first page.
window.onload = function() {
    _init_script(1);
};
