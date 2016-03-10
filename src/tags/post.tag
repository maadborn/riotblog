<post>
	<h3>{ header }</h3>
	<div class="post-meta"></div>
	<div name="apa" class="post-content"></div>
	<div class="post-actions"></div>

	<script>
		this.header = opts.header;
		this.content = opts.content;

		this.on('update', function() { 
			this.apa.innerHTML = this.content;
		});
	</script>

	<style scoped></style>
</post>