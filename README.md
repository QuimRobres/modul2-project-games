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
- Num. of players.
- Game duration.
- Images.
- Ranking.
- Price.
- Publisher.



##### Buscador - Criteris:

- Game name.
- Num. of players.
- Game duration.
- Images.
- Ranking.
- Price.
- Publisher.



### User Stories:

404 - warn the user that this page doesn't exist.

500 - warn the user that there's a server error.

Homepage :  button for signup, button for login and search bar.

Homepage when user is signed up: button for logout and button for profile.

Display results: a general view of all the games searched by different criteria (alphabetical, time duration, etc.), and also ordered by different criteria.

Game details: show the information of the game you clicked on.

Sign up: allows user to register and gain acces to different features.

Log in: allows the user to acces the page if it's registered.

Log out: allows the user to log out the session.

Edit profile: allows user to change information (email, password). Also create a wishlist.

Own games: a list of the games that the user owns.

Pick game function: pick a random game of the list.

Create wishlist: list owner can edit it. Other users only read it.

Comments (optional): add comments and rating to different games.

 

### Routes

| Method | Route                 | Description                                                  | Request - Body               |
| ------ | --------------------- | ------------------------------------------------------------ | ---------------------------- |
| GET    | /                     | Main page route. Renders home index view.                    |                              |
| GET    | /games/most-popular/  | Renders games list                                           |                              |
| GET    | /games/kids           | Renders games list                                           |                              |
| GET    | /games/num-players    | Renders games list                                           |                              |
| GET    | /games/time           | Renders games list                                           |                              |
| GET    | /users/search-results | Renders users by provided name                               |                              |
| GET    | /games/random-pick    | Renders a random game                                        |                              |
| GET    | /game/:gameId         | Renders game details.                                        |                              |
| GET    | /signup               | Renders auth/signup form view.                               |                              |
| POST   | /signup               | Sends Sign Up info to the server and creates user in the DB. Renders auth/signup view. | {name, email, password}      |
| GET    | /login                | Renders auth/login form view.                                |                              |
| POST   | /login                | Sends Log in form data to the server and redirects to homepage. | {email, password}            |
| GET    | /logout               | Logout and redirects to index                                |                              |
| GET    | /profile/:userId      | Route that renders profile                                   |                              |
| GET    | /private/edit-user    | Renders view to edit User                                    |                              |
| POST   | /private/edit-user    | Sends edited-profile and renders user profile                | {name, email, password}      |
| POST   | /private/add-game     | Adds a game to the user's list owned.                        | {name, num of players, etc.} |
| POST   | /private/add-wish     | Adds a game to the user's wish-list                          | {name, num of players, etc.} |





### Models

##### User model

```javascript
{
    "name": String,
    "email": String,
    "password": String,
    "game-list": [String]
}

```



##### Game model

```javascript
{
    "name": String,
    "min_time": Number,
    "max_time": Number,
    "minimum_age": Number,
    "duration": Number,
    "genre": [String],
    "images": [{objects}],
    "valoration": Number,
    "publisher": String,
    "price": Number
}
```









