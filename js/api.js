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

        // console.log(respData);
        var postAuthor = respData.title.rendered;
        var postContent = respData.content.rendered;
        var postSource = respData._qod_quote_source;
        var postSourceURL = respData._qod_quote_source_url;
        var postID = respData.id;
        var lastPage = '';

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

          // console.log(postURL);
          $('.quote-button').before(html);

          // var postHash = '#'+postAuthor;
          var postURL = respData.slug;

          history.pushState(null, null, postURL);

          $(window).on('popstate', function() {
            console.log("popstate fired!");
            if (window.location.hash.indexOf('qm-overview') === 1) {
              return false;
            }else {
              window.location.replace(lastPage);
            }
          });

      });//end Done

    }); //end quote-button click function


    $('#submit-quote').click(function(e){
      e.preventDefault();

      var author = $('#quote-author').val();
      var quote = $('#quote-content').val();
      var quoteSource = $('#quote-source').val();
      var quoteSourceURL = $('#quote-source-url').val();

      // console.log(author);
      // console.log(quote);
      // console.log(quoteSource);
      // console.log(quoteSourceURL);
      $.ajax({
        method: 'post',
        url: api_vars.root_url + 'wp/v2/posts/',
        data: {
            title: author, 
            content: quote,
            _qod_quote_source: quoteSource,
            _qod_quote_source_url: quoteSourceURL,
            status: 'pending'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce);
        }
    }).done(function () {
      $('#quote-submission-form').empty();
      $('.submit-success-message').append('Thanks! Your quote submission has been received.').toggle();
      

    });


    });// submit-quote 


  }); // end doc ready

})(jQuery)
