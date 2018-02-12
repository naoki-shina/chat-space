## membersTable

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user




## usersTable
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|


### Association
- has_many messages
- has_many members
- has_many groups, through: :members




## groupsTable
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|
|member_id|integer|null: false, foreign_key: true|

### Association
- has_many members
- has_many messages
- has_many users, through: :members





## messagesTable

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: :false, foreign_key: true|
|user_id|integer|null: :false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
