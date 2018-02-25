$(function() {
  function buildHTML(message) {
    console.log(message)
    var html =
`<div class="contents__main__ajax__messagebox">
  <div class="user_name">
  ${message.user_name}
  </div>
  <div class="date">
  ${message.created_at}
  </div>
  <div class="message">
    ${(message.body == null)? "" : `<p class="message__body">${message.body}</p>`}
    ${(message.image == null)? "" : `<img src="${message.image}" class="image">`}
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
      // $('.message__body').remove()
      $('.textbox').val('');
      $('#textImage').val('');
      $('html,body').animate({scrollTop: $('.contents__main__ajax').height()}, 500, 'swing');
    })
    .fail(function(){
      alert('error');
    });
  });
});
