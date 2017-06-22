
function loadData() {

    /*
    The $ that shows up in variable names, like $body for example, is just a character like any other. In this case, it refers to the fact that the variable referenced by $body is a jQuery collection, not a DOM node.
    */
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    // load nytimes
    // obviously, replace all the "X"s with your own API key
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=fba759fb1b3d4ddbbc0b3178e182da29';
    $.getJSON(nytimesUrl, function(data){

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                '<p>' + article.snippet + '</p>'+
            '</li>');
        };

    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });


    // load wikipedia data
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ cityStr +
    '&format=json&callback=wikiCallback';
    // YOUR CODE GOES HERE!

    // jsonp请求失败处理的方法
     var wikiRequestTimeout = setTimeout(function() {
       $wikiElem.text('failed to get wikipedia resources');
     }, 5000);
    // 使用ajax的jsonp
    $.ajax({
      url: wikiUrl,
      dataType: 'jsonp',
      // jsonpCallback: '',
      success: function(data) {
        var articleList = data[1];

        for (var i = 0; i < articleList.length; i++) {
          articleStr = articleList[i];
          var url = 'https://en.wikipedia.org/wiki/' + articleStr;
          $wikiElem.append('<li><a href=">' + url +'">' +
            articleStr + '</a></li>');
          clearTimeout(wikiRequestTimeout);
        }
      }
    })
    return false;
};

$('#form-container').submit(loadData);
