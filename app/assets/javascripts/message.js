$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var html =
'<div class="contents__main__ajax__messagebox"' + 'data-message-id=' + message.id + '>' +
  '<div class="user_name">' +
  message.user_name +
  '</div>' +
  '<div class="date">'
  message.created_at +
  '</div>' +
  '<div class="message">' +
    '<p class="message__body">' +
    message.body +
    '</p>' +
    message.image == null? "" : + '<img src=' + message.image + 'class="image">' +
  '</div>' +
'</div>'
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

// Auto updationg
  function update(){
    if ($('.contents__main__ajax__messagebox')[0]){
      var lastMessageId = $('.contents__main__ajax__messagebox:last').data('message-id');
    } else {
      var lastMessageId = 0
    }
    $.ajax({
      url: location.href,
      type: "GET",
      data: { id: "message-id" },
      dataType: 'json'
    })
    .done(function(messages) {
      messages.forEach(function(message) {
        if (message.id > lastMessageId ) {
          var html =buildHTML(message);
          $('.contents__main__ajax').append(html);
          $('html,body').animate({scrollTop: $('.contents__main__ajax').height()}, 500, 'swing');
        }
      });
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
  }

  $(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var interval = setInterval(update, 5000);
    } else {
      clearInterval(interval);
    }
  })
});
