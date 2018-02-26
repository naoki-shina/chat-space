$(function() {
  var list_name = $('.chat-group-user__name')

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
    </div>`
    list_name.append(html);
  }
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user}</p>
    </div>`
  }
  function appendAddUser(id, name) {
    var html =`<div class="chat-group-user clearfix js-chat-memer" id="chat-group-user-8">
    <input name="group[user_ids][]" type="hidden" value=${id}>
    <p class="chat-group-user__name">${name}</p>
    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
    </div>`
    list_name.append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      url: '/users',
      type: 'GET',
      dataType: 'json',
      data: {keyword: input},
    })
    .done(function(users) {
      list_name.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致する名前はありません");
      }
    })
    .fail(function() {
      alert("error");
    });
  });
  $('.chat-group-user').on('click', '.chat-group-user__btn--add', function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    $(this).parent().remove();
    appendAddUser(id, name);
  });
  $('.chat-group-user').on('click', '.js-remove-btn', function() {
    $(this).parent().remove();
  });
});




