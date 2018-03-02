(function($){

  jQuery(document).ready(function(){

  //history api, history.pushState() -- also look into the popState
  // submit a new quote with the form using ajax


    $('.quote-button').click(function(){
      $('article').remove();

      //Fetch random quote
      $.ajax({
        method: 'get',
        url: api_vars.root_url + 'wp/v2/posts/?filter[orderby]=rand&filter[posts_per_page]=1' 

      }).done(function (response) {

        var respData = response[0];
        var postAuthor = respData.title.rendered;
        var postContent = respData.content.rendered;
        var postSource = respData._qod_quote_source;
        var postSourceURL = respData._qod_quote_source_url;
        var postID = respData.id;

        var html = '<article id="post-';
        html += postID;
        html += '"> <div class="entry-content">';
        html += postContent ;
        html += '</div><!-- .entry-content --> <div class="entry-meta"> <h2>' ;
        html += postAuthor;

        if(postSourceURL){
        html += '</h2> <span class="source"> <a href="';
        html += postSourceURL;
        html += '">';
        html += postSource;
        html += '</a> </span>';
      } else{
        html += '</h2> <span class="source">'
        html += postSource;
        html += '</a> </span>';
      }
        
        html +='</div><!-- .entry-meta --> </article><!-- #post-## -->';

          $('.quote-button').before(html);
          history.pushState(null, null, postAuthor);

      });//end Done

    }); //end quote-button click function


    // $('#submit-quote').click(function(e){
    //   e.preventDefault();

    //   $.ajax({
    //     method: 'post',
    //     url: redsprout_vars.rest_url + 'wp/v2/posts/',
    //     data: {
    //         title: author,
    //         content: content,
    //         _qod_source: quoteSource,
    //     },
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader('X-WP-Nonce', redsprout_vars.wpapi_nonce);
    //     }
    // }).done(function (response) {
    //     $('.comment-status').empty();
    //     $('#close-comments').after('<p class="comment-status">Comments are now ' + commentStatus + ' for this post.</p>');
    // });


    // });// submit-quote 


  }); // end doc ready

})(jQuery)
