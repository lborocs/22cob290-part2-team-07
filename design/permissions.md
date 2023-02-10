# Permissions

[Discord Permission System](https://discord.com/developers/docs/topics/permissions) The basis of how the permissions will roughly work e.g. inheritance.
The system will use bitfields as I like C++. It may use multiple bitfields for different areas of permissions.

- Create/Delete a topic
- Create/Delete a project
- Create/Delete a client
- Manage role permissions
- Topic
  - Create/Delete a post
  - Read posts
- Post
  - Read post
  - Edit post
  - Delete post
- Project
  - Create/Delete task
  - Assign to task
- Access manager dashboard
