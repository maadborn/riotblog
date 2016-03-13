<blognav>
	<nav>
		<ul>
			<li><a href="#home">Home</a></li>
			<li><a href="#about">About</a></li>
			<li class="right"><a href="#" onclick="{ toggleLoginBox }">Login</a></li>
		</ul>
		<loginbox name="loginbox" hide="{ true }" />
	</nav>

	<script>
		// this.on('mount', function() {
		// 	this.tags.loginbox.toggle();
		// });

		this.toggleLoginBox = function(event) {
			this.tags.loginbox.toggle();
			return false;
		};
	</script>

	<style scoped>
		nav {
			position: relative;
		}

		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: block;
			position: relative;
			background-color: #28c;
		}

		li {
			display: inline-block;
			/*background-color: #*/
		}

		a {
			padding: 15px;
			color: white;
			display: inline-block;
			background-color: #28c;
		}

		a:hover {
			color: white;
			background-color: #17b;
		}

		.right {
			position: absolute;
			right: 0;
		}

	</style>
</blognav>