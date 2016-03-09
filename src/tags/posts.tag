<posts>
	
	<post each={ posts }></post>

	<script>

		this.posts = opts.posts;

		this.posts.on('fetched', function() {
			this.update();
		}.bind(this));

	</script>
</posts>