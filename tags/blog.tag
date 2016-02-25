<blog-app>
	<h1 class="main-header">Riot blog</h1>
	
	<post each={ posts }>

	<script>
		/**/
		this.posts = app.loadPosts();
	</script>
	<style scoped>
		:scope {
			display: block;
			margin: 0 auto;
			padding: 15px;
			height: 100%;
			width: 600px;
			background-color: #eee;
		}

		.main-header {
			margin-top: 0;
		}
	</style>
	
</blog-app>