$(function() {
  function buildHTML(message) {
    var html =
`<div class="contents__main__ajax__messagebox">
  <div class="user_name">
  ${message.user_name}
  </div>
  <div class="date">
  ${message.created_at}
  </div>
  <div class="message">
    <p class="message__body">
    ${message.body}
    </p>
    ${(message.image == null)? "" : `<img src="${message.image}" class="image">`}
  </div>
</div>`
    return html;
  };
  $('#textImage').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.contents__main__ajax').append(html);
      $('.textbox').val('');
      $('#textImage').val('');
      $('.send--button').prop('disabled', false);
      $('html,body').animate({scrollTop: $('.contents__main__ajax').height()}, 500, 'swing');
    })
    .fail(function(){
      alert('error');
    });
  });



  function update() {
    var message_id = $('.messages:last').data('id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: { id: message_id }
      },
      dataType: 'json'
    })
    .done(function(data) {
      $.each(data, function(i, data) {
        var html = buildHTML(data);
        $('.contents__main__ajax').append(html);
        $('html,body').animate({scrollTop: $('.contents__main__ajax').height()}, 500, 'swing');
      });
    });
    if($('.messages')[0]){
      var message_id = $('.messages:last').data('id');
    } else {
      var message_id = 0
    }
  }

  $(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var interval = setInterval(update, 50000);
    } else {
      clearInterval(interval)
    };
  });
});
