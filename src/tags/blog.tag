<blog>
	<header>
		<h1 class="main-heading"><a href="/home">Riot blog</a></h1>
		<blognav></blognav>
	</header>

	<div id="content" class="content"></div>

	<footer></footer>

	<script>
		
	</script>

	<style scoped>
		:scope {
			display: block;
			margin: 0 auto;
			/*padding: 15px;*/
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			background-color: #f3f3f3;
		}

		@media (min-width: 700px) {
			:scope {
				width: 700px;
			}
		}

		.main-heading {
			color: #069;
			margin-top: 0;
			margin-bottom: 0;
		}

		.main-heading a {
			color: #069;
			background-color: transparent;
		}

		.content,
		.main-heading {
			padding: 15px;
		}
	</style>
</blog>