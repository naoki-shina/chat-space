json.array! @messages.each do |message|
  json.user_name message.user.name
  json.created_at message.created_at
  json.body message.body
  json.image message.image_url
  json.id message.id
end
