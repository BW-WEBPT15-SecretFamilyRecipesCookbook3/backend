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

| Method |      Endpoint      |       Body(required)      | Body(optional) |
| :----- | :----------------: | :-----------------------: | :------------: |
| GET    |  /api/recipes      |            N/A            |      N/A       |
| POST   |  /api/recipes      |     name, description     |    category    |
| PUT    |  /api/recipes/:id  |     name, description     |    category    |
| DELETE |  /api/recipes/:id  |            N/A            |      N/A       |

# Ingredients (TODO)

| Method |              Endpoint              |        Body(required)       | Body(optional) |
| :----- | :--------------------------------: | :-------------------------: | :------------: |
| GET    |  /api/recipes/:id/ingredients      |             N/A             |      N/A       |
| POST   |  /api/recipes/:id/ingredients      |     name, unit, quantity    |      N/A   
<!-- | PUT    |  /api/recipes/:id/ingredients/:id  |     name, unit, quantity    |      N/A       | -->
| DELETE |  /api/recipes/:id/ingredients/:id  |             N/A             |      N/A       |


# Steps (TODO)

| Method |           Endpoint           |        Body(required)       | Body(optional) |
| :----- | :--------------------------: | :-------------------------: | :------------: |
| GET    |  /api/recipes/:id/steps      |             N/A             |      N/A       |
| POST   |  /api/recipes/:id/steps      |  step_number, instructions  |      N/A   
| PUT    |  /api/recipes/:id/steps/:num |         instructions        |      N/A       |
| DELETE |  /api/recipes/:id/steps/:num |             N/A             |      N/A       |

# Categories (TODO)

| Method |         Endpoint        |    Body(required)   | Body(optional) |
| :----- | :---------------------: | :-----------------: | :------------: |
| GET    | /api/recipes/categories |         N/A         |      N/A       |
| POST   | /api/recipes/categories |         name        |      N/A       |
