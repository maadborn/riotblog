### Lessons learned ###

# Q: Nothing happens. At all :( #
A: Make sure you include the riot+compiler.js file. I had included the riot.js one, which does not compile the tags, hence it doesn't know what to do. An error message would have been useful here (especially as I wasn't using the minified version), if the framework can't find the compiled version of the specified tag.

# Q: Tried a simple databinding example, but nothing happens when I push the button #
A: I had named my function 'update', which is part of Riot's internals (?). Just renamed it to 'go' and everything started working!