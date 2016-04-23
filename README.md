##Riot.js blog##

Learning Riot.js by building a blog system with Riot.js (as front end)

#### Technologies ####

- Riot.js
- ES2015 with Babel 6
- Browserify
- Gulp
- Fetch polyfill
- SASS
- Node
- Express
- (TODO MongoDB?)
- ESLint

#### Rough project plan ####

- ~~Setup version control~~
- ~~Setup project structure~~
- ~~Setup basic build system and npm~~
	- ~~ES2015 features: Babel~~
	- ~~Script packaging: Browserify~~
	- ~~Task runner: Gulp~~
- Create tags:
	- ~~blog tag~~
	- ~~post tag~~
	- ~~editor tag~~
	- (preview tag)
	- comment tag
	- ~~menu tag~~
	- ~~toast tag~~
	- ~~spinner tag~~
	- user info tag
	- user creation tag
	- administration tag?
	- ...
- Application logic
	- state
	- user authentication
	- data transfer
- Node server
 	- ~~Express~~
- Persistance
	- ~~MongoDB~~
	- ~~Mongoose~~
- Testing strategy?

#### Todo ####

- Verify user login against db
- Extend login tag with create user possiblities, or create a new page for this?
- Create an extended message format for sending data from server to client
- Choose a logging package instead of using console. winston seems good?
- Fix regression that shows 'New post' even though user/author is logged in
- Choose a Flux implementation to replace the EventBus with
- Setup JWT authentication strategy
- Save/load state on startup/close
- Create install script and/or instructions
- ~~Create a db setup/reset script for mongo shell~~
- ~~Refactor tags to import logic from external script~~
- ~~Introduce SASS + build step~~
- ~~Refactor tags to use styles from external stylesheet with SASS~~
- ~~Setup back-end~~
- ~~Setup api/routing file for use in both server and client~~
- ~~Setup server config file~~

#### Install instructions ####

todo. npm install. npm install babel-core -g. gulp \*mumblemumble\* mongo ...
