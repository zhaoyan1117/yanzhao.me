$(document).ready(function() {

  current_food = 1;
  already_loading = false;
  total_food = parseInt($('.food_amount').data('value'));

  function loading_food () {
    if (!already_loading && current_food <= total_food) {
      $('.food_loading').fadeIn(250);
      already_loading = true;
      $.ajax({
        url:"/culinary/"+current_food+"/",
        success:function(result) {
          $('.food_loading').fadeOut(500);
          $(result).hide().appendTo(".food_folio").delay(500).fadeIn(1000);
          current_food++;
          already_loading = false;
        }
      });
    }
  }

  $(window).load(loading_food);
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      loading_food();
    }
  });

});

