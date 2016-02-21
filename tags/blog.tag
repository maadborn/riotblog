<blog-app>
	<h1 class="main-header">Riot blog</h1>
	<h2>{ apa }</h2>

	<input name="blogtext" type="text" value={ apa }></input>
	<button onclick={ go }>Update</button>
	
	<script>
		this.apa = "asdf";

		go(x) {
			// debugger;
			this.apa = this.blogtext.value;
		};
	</script>
	
	<style scoped>
		:scope {
			display: block;
			margin: 0 auto;
			padding-top: 15px;
			height: 100%;
			width: 600px;
			background-color: #eee;
		}

		.main-header {
			margin-top: 0;
		}
	</style>
	
</blog-app>