function showPagePosts(a){var b,c,d,e,f,g,h,i,j="";0===pagernum&&(postsnum=parseInt(a.feed.openSearch$totalResults.$t),pagernum=parseInt(postsnum/postPerPage)+1);for(var k=0;k<postPerPage;k++)if("entry"in a.feed){if(k==a.feed.entry.length)break;b=a.feed.entry[k],postid=b.id.$t,c=b.title.$t;for(var l=0,m=b.link.length;l<m;l++)if("alternate"==b.link[l].rel){d=b.link[l].href;break}for(var n=0,o=b.link.length;n<o;n++)if("replies"==b.link[n].rel&&"text/html"==b.link[n].type){var p=b.link[n].title.split(" ")[0];break}f="summary"in b?b.summary.$t.replace(/<br ?\/?>/gi," ").replace(/<.*?>/g,"").replace(/[<>]/g,""):"",f.length>numChars&&(f=numChars>0&&numChars!==!1?f.substring(0,numChars)+"...":"");var q=b.published.$t,r=q.substring(0,4),s=q.substring(5,7),t=q.substring(8,10);if(h=idMode?["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"]:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i=showPostDate?t+" "+h[parseInt(s,10)-1]+" "+r+" ":"",g=showComments?p+" "+commentsLabel:"",e="media$thumbnail"in b?b.media$thumbnail.url:imgBlank,b.content&&e==imgBlank){var u=/<img +(.*?)src=(['"])([^'"]+?)(['"])(.*?) *\/?>/i.exec(b.content.$t);e=u&&u[3]?u[3]:imgBlank}e=e.replace("/s72-c/","/w300-h400-p-k-no-nu-rj-l80/"),j+='<article class="post hentry cf bb" id="'+postid+'">',j+='<a class="permalink" href="'+d+'"></a>',j+='<header class="header post-header entry-header muted bb cf"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><img alt="'+c+'" class="thumbnail post-thumbnail entry-thumbnail" data-src="'+e+'" height="600" title="'+c+'" width="600" src="'+e+'"></header>',j+='<div class="main post-main entry-main muted bb cf">',j+='<h3 class="title post-title entry-title bb cf bold"><a class="cl" href="'+d+'"</a>'+c+"</h3>",j+='<div class="category post-category entry-category cf">',j+=""+i,j+="</div>",j+="</div>",j+="</article>"}_results.innerHTML=j,_create_pagination()}function _create_pagination(){output="";var a=0;if(output+=(actualpage>1?'<a title="'+prevText+'" class="prevjson" href="javascript:_init_script('+(actualpage-1)+')">'+prevText+"</a>":'<span class="prevjson hidden">'+prevText+"</span>")+'<em style="font:inherit;color:inherit;" class="pagernumber">',pagernum<maxpage+1)for(a=1;a<=pagernum;a++)output+=a==actualpage?'<span class="actual">'+a+"</span>":'<a href="javascript:_init_script('+a+')">'+a+"</a>";else if(pagernum>maxpage-1)if(actualpage<minpage){for(a=1;a<maxpage-2;a++)output+=a==actualpage?'<span class="actual">'+a+"</span>":'<a href="javascript:_init_script('+a+')">'+a+"</a>";output+=" ... ",output+='<a href="javascript:_init_script('+parseInt(pagernum-1)+')">'+parseInt(pagernum-1)+"</a>",output+='<a href="javascript:_init_script('+pagernum+')">'+pagernum+"</a>"}else if(pagernum-(minpage-1)>actualpage&&actualpage>minpage-1){for(output+='<a href="javascript:_init_script(1)">1</a>',output+='<a href="javascript:_init_script(2)">2</a>',output+=" ... ",a=actualpage-2;a<=actualpage+2;a++)output+=a==actualpage?'<span class="actual">'+a+"</span>":'<a href="javascript:_init_script('+a+')">'+a+"</a>";output+=" ... ",output+='<a href="javascript:_init_script('+(pagernum-1)+')">'+parseInt(pagernum-1)+"</a>",output+='<a href="javascript:_init_script('+pagernum+')">'+pagernum+"</a>"}else for(output+='<a href="javascript:_init_script(1)">1</a>',output+='<a href="javascript:_init_script(2)">2</a>',output+=" ... ",a=pagernum-(minpage+1);a<=pagernum;a++)output+=a==actualpage?'<span class="actual">'+a+"</span>":'<a href="javascript:_init_script('+a+')">'+a+"</a>";output+="</em>"+(actualpage<a-1?'<a title="'+nextText+'" class="nextjson" href="javascript:_init_script('+(actualpage+1)+')">'+nextText+"</a>":'<span class="nextjson hidden">'+nextText+"</span>"),_pagination.innerHTML=output,_totalposts.innerHTML=totalPostLabel+" "+postsnum+" - "+jumpPageLabel+" "+(actualpage*postPerPage-(postPerPage-1))+(actualpage<a-1?" - "+actualpage*postPerPage:"")}function _init_script(a){var c,d,b=a*postPerPage-(postPerPage-1),e=document.getElementsByTagName("head")[0],f=sortByLabel?siteUrl+"/feeds/posts/summary/-/Episode"+labelSorter+"?start-index="+b:siteUrl+"/feeds/posts/summary/-/Episode?start-index="+b;1==firstpage&&(document.documentElement.scrollTop=_results.offsetTop-30,document.body.scrollTop=_results.offsetTop-30,c=document.getElementById("TEMPORAL"),c.parentNode.removeChild(c)),_results.innerHTML='<div id="loadingscript">'+loadingText+"</div>",_pagination.innerHTML="",_totalposts.innerHTML="",d=document.createElement("script"),d.type="text/javascript",d.src=f+"&max-results="+postPerPage+"&orderby=published&alt=json-in-script&callback=showPagePosts",d.id="TEMPORAL",e.appendChild(d),firstpage=1,actualpage=a}var minpage=6,maxpage=10,firstpage=0,pagernum=0,postsnum=0,actualpage=1;document.write('<div class="section-content blog-posts hfeed cf"><div id="results"></div></div><div id="itempager" style="position:relative;margin-top:10px;"><div id="pagination"></div><div id="totalposts"></div></div>');var _results=document.getElementById("results"),_pagination=document.getElementById("pagination"),_totalposts=document.getElementById("totalposts");window.onload=function(){_init_script(1)};
