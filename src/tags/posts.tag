<posts>
	<post each={ posts }></post>

	<script>
		this.posts = opts.posts;

		app.eventBus.on('data:posts:fetched', function() {
			this.update();
		}.bind(this));
	</script>
</posts>