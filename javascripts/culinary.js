$(document).ready(function() {
  $(".food_container").hover(
    function(){
      $(this).stop().animate({
        boxShadow: '0 0 30px rgba(38, 142, 212, 1.0)'
      })
    },
    function() {
      $(this).stop().animate({
        boxShadow: '0px 0px 10px rgba(150,150,150,1.0)'
      });
  });
});
