<loginbox>
	<span></span>
	<button type="button" class="close" onclick="{ close }" title="Close">×</button>
	<form name="loginform" class="loginform" onsubmit="{ submit }">
		<input name="username" type="text" placeholder="User"></input>
		<input name="password" type="text" placeholder="Password"></input>
		<button type="submit">Login</button>
	</form>

	<script>
        
		this.toggle = function() {
            if (this.isOpen()) {
                this.close();
            } else {
                this.open();
            }
		};

		this.submit = function(a,b,c) {
			debugger;
			console.log('submit');
		};
        
        this.isOpen = function() {
            return (this.root.style.display != 'none');
        };
        
        this.open = function() {
            this.root.style.display = '';
            setTimeout(function() { document.addEventListener('click', hideBox); }, 0);
        };
        
        this.close = function() {
            document.removeEventListener('click', hideBox);
            this.root.style.display = 'none';
        };
        
        var box = this;
        function hideBox(event) {
            if (box.isOpen()) {
                if (event.path.every((function(node) { return node != box.root; })) ) {
                    box.close();
                }
            }
        }
        
	</script>

	<style scoped>
		:scope {
			display: block;
			position: absolute;
			right: 0;
			width: 300px;
			/*height: 200px;*/
			background-color: #28c;
            border: 2px solid #39d;
		}

		@media (max-width: 700px) {
			:scope {
				width: 100%;
			}
		}

		.close {
            /*display: block;*/
			font-weight: bold;
		    position: absolute;
		    right: 0;
		    margin: 0.5em;
			height: 1.5em;
			line-height: 0.7em;
		}

		.loginform {
			margin: 0.5em;
		}

		.loginform input[type=text] {
			width: 60%;
			margin-bottom: 0.6em;
		}
        
        .loginform button[type=submit] {
            position: absolute;
            height: 70%;
            width: 20%;
            display: block;
            left: 65%;
            top: 10%;
        }
	</style>
</loginbox>