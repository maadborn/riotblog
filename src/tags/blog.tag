<blog>
	<header>
		<a href="/home"><h1 class="main-heading">Riot blog</h1></a>
		<blognav></blognav>
	</header>

	<div id="content" class="content"></div>

	<footer></footer>

	<script>
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
			width: 700px;
			box-sizing: border-box;
			background-color: #eee;
		}

		@media (max-width: 700px) {
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