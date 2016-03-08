<blognav>
	<nav>
		<ul>
			<li><a href="#home">Home</a></li>
			<li><a href="#about">About</a></li>
			<li><a href="#contact">Contact</a></li>
		</ul>
	</nav>

	<script>
		console.log('Blognav!');
	// onclick="{ routeHome }"
		// this.routeHome = function(event) {
		// 	debugger;
		// 	riot.route('/home');
		// };
	</script>

	<style scoped>
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: block;
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

	</style>
</blognav>