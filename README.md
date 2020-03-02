# Backend

# Authentication

| Method |      Endpoint      |   Body(required)   | Body(optional) |
| :----- | :----------------: | :----------------: | :------------: |
| POST   | /api/auth/register | email, password |      N/A       |
| POST   |  /api/auth/login   | email, password |      N/A       |

# Users

| Method |    Endpoint    | Body(required) | Body(optional) |
| :----- | :------------: | :------------: | :------------: |
| GET    |   /api/users   |      N/A       |      N/A       |
| DELETE | /api/users/:id |      N/A       |      N/A       |

# Recipes

| Method |    Endpoint    |   Body(required)  | Body(optional) |
| :----- | :------------: | :---------------: | :------------: |
| GET    |  /api/recipes  |        N/A        |      N/A       |
| POST    | /api/recipes  | name, description |      N/A       |
