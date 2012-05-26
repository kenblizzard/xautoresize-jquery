<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script type="text/javascript" src="jquery.xautoresize.js"></script>
		<script type="text/javascript">
			function enable() {
				var t = Number(new Date());
				var len = $(".textarea").length;
				$(".textarea").xautoresize();
				t = Number(new Date()) - t;
				$("span#info").html(len + " elements are initiated in " + t + "ms");
			}
			function disable() {
				$(".textarea").xautoresize({action: "destroy"});
			}
			function resize() {
				var t = Number(new Date());
				var len = $(".textarea").length;
				$(".textarea").xautoresize({action: "resize"});
				t = Number(new Date()) - t;
				$("span#info").html(len + " elements are resized (without event binding) in " + t + "ms");
			}
		</script>
		<style type="text/css">
			.textarea {
				max-height: 500px;
				max-width: 500px;
				min-height: 50px;
				min-width: 250px;
				width: 0px;
				height: 0px;
				padding: 0px;
				margin: 0px;
				border: 1px solid red;
/*				overflow: auto;*/
			}
		</style>
    </head>
    <body>
		<button onclick="enable();">Enable Auto Resize</button>
		<button onclick="disable();">Disable Auto Resize</button>
		<button onclick="resize();">Resize</button>
		<span id="info"></span>
		<?php for ($i = 0; $i < 1; $i++) { ?>
		<br />
		<textarea id="textarea_<?php echo $i; ?>" class="textarea">
			Proin placerat scelerisque mattis. Duis ut sem augue, at tempor purus.
			Donec vestibulum ipsum non ligula mollis id bibendum massa lacinia.
			Praesent nunc risus, pellentesque pharetra aliquet nec, vulputate sed quam.
			Sed bibendum purus non magna sollicitudin tempor.
			Donec ac odio leo. Maecenas quis mollis risus.
		</textarea>
		<div class="textarea">
			Proin placerat scelerisque mattis. Duis ut sem augue, at tempor purus.
			Donec vestibulum ipsum non ligula mollis id bibendum massa lacinia.
			Praesent nunc risus, pellentesque pharetra aliquet nec, vulputate sed quam.
			Sed bibendum purus non magna sollicitudin tempor.
			Donec ac odio leo. Maecenas quis mollis risus.
		</div>
		<?php } ?>
    </body>
</html>
