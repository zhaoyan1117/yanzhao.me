$(document).ready(function() {

  current_food = 1;
  already_loading = false;
  total_food = parseInt($('.food_amount').data('value'));

  function check_all_loaded () {
    if (current_food > total_food) {
      var food_end = '<div class="food_end">----------- more will be served -----------</div>'
      $(food_end).hide().appendTo(".food_folio").fadeIn(1000);
      $(window).unbind('scroll');
    }
  }

  function loading_food () {
    if (!already_loading && current_food <= total_food) {
      already_loading = true;
      var food_img = $("<img class='food_img' />").attr('src', '/culinary/images/'+current_food+'.png')
        .load(function() {
          $(food_img).hide().appendTo(".food_folio").fadeIn(1000);
          current_food++;
          already_loading = false;
      });
    }

    check_all_loaded();
  }

  function init_loading_food () {
    if (!already_loading && current_food <= total_food) {
      already_loading = true;
      var food_img_1 = $("<img class='food_img' />").attr('src', '/culinary/images/'+current_food+'.png')
        .load(function() {
          current_food++;
          var food_img_2 = $("<img class='food_img' />").attr('src', '/culinary/images/'+current_food+'.png')
            .load(function() {
              current_food++;
              $(food_img_1).hide().appendTo(".food_folio").fadeIn(1000);
              $(food_img_2).hide().appendTo(".food_folio").fadeIn(1000);
              already_loading = false;
            });
      });
    }

    check_all_loaded();
  }

  $(window).load(init_loading_food);
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height()*0.99) {
      loading_food();
    }
  });

});

