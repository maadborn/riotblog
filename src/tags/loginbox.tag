<loginbox>
	<span></span>
	<span class="close" onclick="{ toggle }" title="Close">×</span>
	<form name="loginform" class="loginform" onsubmit="{ submit }">
		<input name="username" type="text" placeholder="User"></input>
		<input name="password" type="text" placeholder="Password"></input>
		<button type="submit">Login</button>
	</form>

	<script>
		this.toggle = function() {
			this.root.style.display = (this.root.style.display == 'none') ? '' : 'none';
		};

		this.submit = function(a,b,c) {
			debugger
			console.log('submit');
		};
	</script>

	<style scoped>

		:scope {
			display: block;
			position: absolute;
			right: 0;
			width: 200px;
			/*height: 200px;*/
			background-color: #28c;
		}

		@media (max-width: 700px) {
			:scope {
				width: 100%;
			}
		}


		.close {
			display: block;
			color: white;
			font-size: 1em;
			font-weight: bold;
			line-height: 1.2em;
			height: 1.2em;
			width: 1.2em;
			background-color: #17b;
			/*border-radius: 1em;*/
			cursor: pointer;
			text-align: center;
		    position: absolute;
		    right: 0;
		    margin: 0.5em;
		}

		.loginform {
			margin: 0.5em;
		}

		.loginform input[type=text] {
			width: 80%;
			margin-bottom: 0.5em;
		}
	</style>
</loginbox>