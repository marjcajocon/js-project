var offsetX, offsetY;

dialog.on('touchstart', function(e) {
  var touch = e.originalEvent.touches[0];
  offsetX = touch.clientX - dialog.offset().left;
  offsetY = touch.clientY - dialog.offset().top;
});

dialog.on('touchmove', function(e) {
  var touch = e.originalEvent.touches[0];
  dialog.css({
      left: touch.clientX - offsetX,
      top: touch.clientY - offsetY
  });
});
