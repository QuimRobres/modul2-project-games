# MODUL 2 PROJECT 

### MVP

Data Base platform where users can search for board games by different filters ("Name of the game", "duration", "players", etc.). When the user registers is allowed to create a list of the games that owns, and also create a wish list (visible for other users, only editable by the owner of the list.).

#### Backlog

- Add comments.
- User can add a new board game.
- Show game categories



##### User model.

- Name.
- Password.
- E-mail.
- Own games list.
- Wishlist (if not logged, redirects to login)



##### Game model.

- Game name.
- Year published.
- Minimum of players
- Maximum of players.
- Minimum playtime.
- Maximum playtime.
- Minimum age.
- Description.
- Image.
- Price.
- Rating.



### User Stories:

404 - warn the user that this page doesn't exist.

500 - warn the user that there's a server error.

Homepage :  button for sign up, button for login and search bar. Also, different options to search for a game.

Homepage when user is signed up: button for logout and button for profile.

Display results: a general view of all the games searched by different criteria (name, time duration, minimum of players, etc.).

Game details: show the information of the game you clicked on.

Sign up: allows user to register and gain access to different features.

Log in: allows the user to access the page if it's registered.

Log out: allows the user to log out the session.

User profile private: user can access to the option of editing the profile.

Edit profile: allows user to change information (email, password).

Public user profile: any person can see the games you have and your wish list.

Own games: a list of the games that the user owns.

Pick a random game of my collection: selects a random game of the users collection.

Create wish list: list owner can edit it. Other users only read it.

Comments (optional): add comments and rating to different games.

 

### Routes



| Method | Route                           | Description                                                  | Request - Body                                 |
| ------ | ------------------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| GET    | /                               | Main page route. Renders home index view.                    |                                                |
| GET    | /searchGameResult/rate          | Renders games list                                           |                                                |
| GET    | /searchGameResult/kids          | Renders games list                                           |                                                |
| GET    | /searchGamePlayers              | Renders view to search games by players                      |                                                |
| GET    | /searchGameTime                 | Renders view to search games by play time.                   |                                                |
| GET    | /searchGameList                 | Renders view to search for games                             |                                                |
| GET    | /searchGame                     | Renders games by provided characters                         | {name},{ search }                              |
| GET    | /searchGameResult/ownrandom     | Renders a random game form own collection                    | {owned_games}                                  |
| GET    | /searchGameResult/durationXtoY  | Renders games by time range                                  | {min_time, max_time}                           |
| GET    | /searchGameResult/numOfPLayersX | Renders games by age range                                   | {min_time, max_time}                           |
| GET    | /searchGameResult/random        | Renders a random game from the Data Base                     |                                                |
| POST   | /gameDetail/:id                 | Adds a game to the user's list owned.                        | {id: req.user._id}, {owned_games: req.body.id} |
| GET    | /signup                         | Renders signup form view.                                    |                                                |
| POST   | /signup                         | Sends Sign Up info to the server and creates user in the DB. Renders auth/signup view. | {name, email, password}                        |
| GET    | /login                          | Renders login form view.                                     |                                                |
| POST   | /login                          | Sends Log in form data to the server and redirects to homepage. | {username, password}                           |
| GET    | /logout                         | Logout and redirects to index                                |                                                |
| GET    | /profile                        | Route that renders user's profile                            |                                                |
| GET    | /profile/:Id                    | Route that renders other users profile                       |                                                |
| GET    | /private/edit-user              | Renders view to edit User                                    |                                                |
| POST   | /private/edit-user              | Sends edited-profile and renders user profile                | {name, email, password}                        |
| GET    | /searchUserResult               | Renders view to search for users                             |                                                |
| GET    | /search                         | Renders users by provided characters                         | {username},{ search }                          |
| GET    | /ownedGames                     | Renders view of user owned games.                            | {user_id, owned_games},{game_id}               |
| GET    | /wishlist                       | Renders view of user wishlist.                               | {user_id, wishlist}, {game_id}                 |
| GET    | /ownedGames/:id                 | Renders view of other user owned games.                      | {user_id, owned_games},{game_id}               |
| GET    | /wishlist/:id                   | Renders view of other user wishlist.                         | {user_id, wishlist}, {game_id}                 |
| POST   | /gameDetail/own                 | Adds game to owned list                                      | {user_id}, {game_id}                           |
| POST   | /gameDetail/wishlist            | Adds game to wish list                                       | {user_id}, {game_id}                           |
| POST   | /gameDetail/ownOut              | Remove game from owned list                                  | {user_id},{game_id}                            |
| POST   | /gameDetail/wishOut             | Remove game from wish list.                                  | {user_id},{game_id}                            |
|        |                                 |                                                              |                                                |







### Models

##### User model

```javascript
{
    "name": String,
    "email": String,
    "password": String,
    "owned_games": [],
    "wishlist": []    
}

```



##### Game model

```javascript
{
    "name": String,
    "year_published": Number,
    "min_players": Number,
    "max_players": Number,    
    "min_playtime": Number,
    "max_playtime": Number,
    "min_age": Number,
    "description_preview": String,
    "image_url": String,
    "price": Number,
    "average_user_rating": Number
}
```

### Links

#### Git

https://github.com/QuimRobres/modul2-project-games

https://boardgame-project.herokuapp.com/

#### Trello

https://trello.com/b/iblvdLH4/ironhack-project-2

#### Slides

https://lucid.app/lucidchart/5c0bf6b7-c9c2-49d5-8c39-e546884c08ee/edit?page=0_0#

https://lucid.app/lucidchart/828dabe4-70d8-4ed9-813c-4fefa934b908/edit?page=0_0#