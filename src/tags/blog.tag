<blog>
	<header>
		<h1 class="main-heading">Riot blog</h1>
		<blognav></blognav>
	</header>

	<!-- posts should be yielded here as a view.. lookup the riot router -->
	
	<div id="content" class="content">
		<posts></posts>
		<!-- <post each={ posts }></post> -->
	</div>

	<footer></footer>

	<script>
		// this.posts = opts.posts;
		console.log('Blog!');
		this.sayHello = function() {
			var message = 'hi!';
			console.log(message);
		};
	</script>
	<style scoped>
		:scope {
			display: block;
			margin: 0 auto;
			/*padding: 15px;*/
			height: 100%;
			width: 600px;
			box-sizing: border-box;
			background-color: #eee;
		}

		@media (max-width: 600px) {
			:scope {
				width: 100%;
			}
		}

		.main-heading {
			color: #069;
			margin-top: 0;
			margin-bottom: 0;
		}

		.content,
		.main-heading {
			padding: 15px;
		}

	</style>
	
</blog>