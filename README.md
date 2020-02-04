# myRecipesBook

Keep track of your favourite recipes

https://nisida-book-recipes-react.herokuapp.com/#/

## The Tech

- React
- Express
- Knex
- Bootstrap
- JWT Auth
- Authenticare - JWT helper library

## User Stories

As a non-registered user:

- I want to be able to register as a user
- I want to be able to see public recipes shared by other users

As a user:

- I want to be able to log in to my own account and see my profile
- I want to be able to add a new recipe
- I want to be able to update and delete my own recipe
- I want to be able to set a recipe to public or private
- I want to be able to filter recipes by category, by ingredient/s, by last entry
- I want to be able to search recipes by keyword

## Heroku!!!

### Creating your app

Create your app with `heroku create [name]`

You can check that this was successful by running `heroku apps` to view a list of your apps

### Adding postgres

Add postgresql (hobby dev) to your app at `https://dashboard.heroku.com/apps/[APP NAME HERE]/resources`

Check that pg has been added by running `heroku addons` to ensure the postgresql db is on your app

### Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

To push your local master branch to your heroku app:

```sh
npm run h:deploy
```

Run heroku migrations:

```sh
npm run h:migrate
```

Run heroku seeds:

```sh
npm run h:seed
```

If ever you need to rollback, you can also:

```sh
npm run h:rollback
```

### Ta-Da!

Your app should be deployed!
