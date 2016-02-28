### Lessons learned ###

# Q: Nothing happens. At all. :( I have included the Riot script and mount a couple of tags from inside my script. The tags themselves are included as in the docs. #
A: Make sure you include the riot+compiler.js file. I had included the riot.js one, which does not compile the tags, hence it doesn't know what to do. An error message would have been useful here (especially as I wasn't using the minified version), if the framework can't find the compiled version of the specified tag.

# Q: Tried a simple databinding example, but nothing happens when I push the button #
A: I had named my function 'update', which is part of Riot's internals (?). Just renamed it to 'go' and everything started working!

# Q: Just having set up Browserify, bundle task is working fine but default task is failing due to paths are being different.
A: Stop using references to individual scripts in index.html. Instead go all in on the CommonJS approach by requiring modules from inside the scripts themselves. The only script file in index.html should be your bundle.

# Q: But requiring Riot as a CommonJS module from inside my scripts results in nothing being rendered. It is as if the mount step is being ignored (see previous question).
A: Yes, that is correct. The `riot` package exports the riot object, which doesn't include the compiler. To access the compiler version of Riot, you will probably have to link to the riot+compiler.js by path, which is quite long and messy, and is most likely not the best approach. 
What I did was installing `riotify` and adding it as a transform steg during bundling. Then I got rid of the tag referencing script tags in index.html, and instead required them in app.js. While I still need file paths here for my custom Riot tags, I am now compiling my Riot tags server side and is down to three file transfers to the client -- index.html, my bundle and my main css file -- which is what Browserify is all about.