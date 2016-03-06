### Lessons learned ###

#### Q: Nothing happens. At all. :( I have included the Riot script and mount a couple of tags from inside my script. The tags themselves are included as in the docs. ####

A: Make sure you include the riot+compiler.js file. I had included the ``riot.js`` one, which does not compile the tags, hence it doesn't know what to do. An error message would have been useful here (especially as I wasn't using the minified version), if the framework can't find the compiled version of the specified tag.

#### Q: Tried a simple databinding example, but nothing happens when I push the button ####

A: I had named my function ``update``, which is also a function in Riot that updates the markup section from the script section. Just renamed it to ``go`` and everything started working!

#### Q: Just having set up Browserify, bundle task is working fine but default task is failing due to the starting point for the relative paths being different. ####

A: Stop using references to individual scripts in ``index.html``. Instead go all in on the CommonJS approach by requiring modules from inside the scripts themselves. The only script file in ``index.html`` should be your bundle.

#### Q: But requiring Riot as a CommonJS module from inside my scripts results in nothing being rendered. It is as if the mount step is being ignored (see previous question). ####

A: Yes, that is correct. The ``riot`` package exports the ``riot`` object, which doesn't include the compiler. To access the compiler version of Riot, you will probably have to link to the ``riot+compiler.js`` by path (which is quite long and messy) or copy it to a ``vendor``/``lib`` folder. It is most likely not the best solution.

What I did was installing ``riotify`` and adding it as a transform step during bundling. Then I got rid of the Riot tags in ``index.html``, and instead required them in ``app.js``. While I still need file paths here for my custom Riot tags, I am now compiling my Riot tags server side and is down to 4 file transfers to the client -- ``index.html``, ``bundle.js``, ``bundle.js.map`` and ``app.css``. Minimizing the number of (script) files sent to the client is what Browserify is all about.

#### Q: So I tried a boilerplate gulpfile with Babel, but the browser is complaining on my syntax not being valid for different reasons, and looking at my bundle shows it isn't transpiled. Why? ####

A: Chances are that if you have recently started setting up your project, you are using Babel 6 which is the latest version at the time of writing. Many gulpfiles found in blogs posts and gists are from earlier versions of Babel and/or might not include ``.babelrc``. Since Babel 6 you will need to tell it which transformations you want it to perform on your source files.

Do ``npm install babel-preset-es2015 --save-dev``. Then either create a ``.babelrc`` file in your project directory and add:

	{ 
		presets: ['es2015'] 
	}

Or, as I did, just add a transformation step to your Browserify bundle:

	var bundler = browserify(paths.scripts.bundleEntry, { debug: true })
        .transform(babelify.configure({ presets: ['es2015'] }));

#### Q: How do I translate my CommonJS modules to ES2015 modules? ####

A: The syntax for ES2015 modules is a bit tricky to get right at first, coming from working CommonJS exports/imports. One might think a certain way would work, but it always don't The following examples show some sample code of the patterns I used.

	// export.js - CommonJS
	var foo = { hello: 'hi' };
	module.exports = foo;

	// import.js - CommonJS
	var foo = require('./export');

This was translated to:

	// export.js - ES2015 modules
	const foo = { hello: 'hi' };
	export { foo };

	// import.js - ES2015 modules
	import { foo } from './export';

If ``foo`` is the default export of the module, you could do:

	// export.js - ES2015 modules with default
	export default { hello: 'hi' };

	// import.js - ES2015 modules with default
	import foo from './export';

---

#### Q: ####

A: