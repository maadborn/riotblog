<blognav>
	<nav>
		<ul>
			<li><a href="#home">Home</a></li>
			<li><a href="#about">About</a></li>
			<li class="right"><a href="#" onclick="{ showLoginBox }">Login</a></li>
		</ul>
		<loginbox name="loginbox" hidden />
	</nav>

	<script>
		this.showLoginBox = function(event) {
			// TODO add toggle
			// debugger;
			// this.loginbox
			return false;
		};
	</script>

	<style scoped>
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