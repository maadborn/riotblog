### Lessons learned ###

#### Q: Nothing happens. At all. :( I have included the Riot script and mount a couple of tags from inside my script. The tags themselves are included as in the docs. ####

A: Make sure you include the riot+compiler.js file. I had included the ``riot.js`` one, which does not compile the tags, hence it doesn't know what to do. An error message would have been useful here (especially as I wasn't using the minified version), if the framework can't find the compiled version of the specified tag.

#### Q: Tried a simple databinding example, but nothing happens when I push the button ####

A: I had named my function ```update```, which is also a function in Riot that updates the markup section from the script section (see [Riot's reserved words](http://riotjs.com/api/#reserved-words)). Just renamed it to ``go`` and everything started working.

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

On another note concerning imports: make sure to use the _exactly_ same name when importing modules. Casing matters:
	
	// file1.js
	import foo from './mymodule';
	
	// file2.js
	import foo from './myModule'; 

While the following will work and almost look the same, the ```foo``` in file1 and ```foo``` in file2 will refer to different instances of ```mymodule```. This might not be an issue, but if you rely on them being used as a singleton, you will want to make sure to get the module name casing right in all occurances. This is why I recommend using lower case on all file names just to make it easier to remember how the module import should be written. Module imports are cached, so using different strings will probably result in different cache keys in the transpiled CommonJS code.  

#### Q: Reserved words... I named a custom attribute ```hide``` and passed ```{ true }``` into it as part of a nested custom tag. And guess what happened?  ####

A: Yup, it disappeared. I accidently stumbled onto a reserved attribute name, which in this case was quite fantastic. Good job, Riot team, using intuitive naming and good util attributes. Just be aware that you might as well give some custom attribute or script member the same name as a reserved word and hit some unwanted behavior that might be a bit tricky to track down.

#### Q: There seems to be some quirks to how child tags in each loops are being constructed. Any hints? ####

A: Each loops can be declared in more than one way, for example:

	<my-tag each="{ foos }"><my-tag />
	<my-tag each="{ foo in foos }"><my-tag />

The difference might seem cosmetic, especially if ```my-tag``` is declared elsewhere. But in reality, you will end up with different results.

In the first case, ```this``` inside ```my-tag``` will be bound to the currently looped item. When the tag is constructed, the loop item ```this``` will be merged with the tag instance, which might seem appealing at a first glance. But if you try to do:

	<my-tag>
		<span>{ foo }</span>

		<script>
			var tag = this;
			tag.foo = opts.foo;
		</script>
	</my-tag>

When we reach the first line in the script element, ```this``` will already have the ```foo``` property (assuming ```foo``` has such) and ```opts``` will be an empty object. So the second line will actually overwrite the value with ```undefined```. 

We could modify our code by deleting ```tag.foo = opts.foo;```, but then we are just pushing the problem to another place, as we have made our tag fit this specific situation and not caring about its general usability by removing the way to pass data via ```opts```.

In the second case, ```this``` inside ```my-tag``` will be our tag instance with an additional property called ``foo``, from ``foo in foos``. This is slightly better in my opinion, but we still don't have any real way of passing data and being general in our use of the tag.

So the solution I find most usable is:

	<my-tag each="{ foo in foos }" bar="{ foo }"><my-tag />

Which in non-loop situations could be used likewise:

	<my-tag bar="{ foo }"><my-tag />

I would also suggest the final changes to the tag itself:

	<my-tag>
		<span>{ opts.bar }</span>

		<script>
			var tag = this;
		</script>
	</my-tag>

#### Q: I need access to external libraries in my tag, but just adding them to the global scope, or on my app object, or by script elements looks iffy. Is there any other way? ####

A: Yes, mixins! Mixins are essentially the tag equivalent to ```_.extend``` or ```Object.assign```, allowing you to add properties and methods to your tags, but defined and maintained elsewhere in your code, resulting in multiple benefits in the long run. This is the core of composition used at component level, which is mentioned e.g. in [FIRST](https://addyosmani.com/first/) principle.     

Let's say you would like to add some MomentJS functionality to your tag. Start by creating a new file, ```momentmixin.js```:

	// momentmixin.js
	import _moment from 'moment';

	export default {
		moment: _moment,
		dateString(date): { 
			return _moment(date).format('YYYY-MM-DD');
		}
	};

Then you add it to Riot as shared mixin during your app initialization:

	// app.js
	import riot 	   from 'riot';
	import momentMixin from './momentmixin';
	...
	riot.mixin('momentMixin', momentMixin);

And finally you add the mixin to your tag:

	// my-tag.tag.html
	<my-tag>
		<span>{ dateString(opts.time) }</span>
		<script>
			this.mixin('momentMixin');
			// this.moment and this.dateString(...) are now available here :)
		</script>
	</my-tag>

---


#### Q: ####

A: