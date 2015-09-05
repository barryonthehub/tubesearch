function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyDdLj2Hnb7YB8q_0ZEbsvZLh_salhI1qeQ');
    load();
}

function load(nextPage) {
    var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: "audiobooks",
        maxResults: 48,
        videoDuration: "long",
        pageToken: nextPage
    });

    var $tiles = $('#tiles');
    var tileTemplate = $('#tile-template').html();
    function addTile(item) {
        $tiles.append(Mustache.render(tileTemplate, item));
    };

    function scrollBottom(nextPage) {
        $(window).scroll(function bottom(){
            var windowHeight = $(window).height();
            var scrollPos = $(window).scrollTop() + windowHeight;
            var documentHeight = $(document).height();
            //documentHeight <= scrollPos + windowHeight
            if($('.more').visible()) {
                console.log("We hit d' Bass!");
                console.log(nextPage);
                load(nextPage);
            } else {
                console.log("difference: ", documentHeight - scrollPos);
            }
        });
    };

    request.then(function blueberries(response) {
        var results = response.result;
        var nextPage = results.nextPageToken;
        $.each(results.items, function(index, item) {
            addTile(item);
        });
        scrollBottom(nextPage);
    });
}

/*     
    $(window).on('scroll', function(){
        if( $(window).scrollTop() > $(document).height() - $(window).height() ) {
            $("#load-more").click();
        }
    }).scroll();

    //cancel button
    $orders.delegate('.cancelEdit', 'click', function() {
        $(this).closest('li').removeClass('edit');
    });
*/      
