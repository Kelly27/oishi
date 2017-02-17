$(document).ready(function(){
    $.ajaxSetup({
      headers: { 'X-CSRF-Token' : $('meta[name=_token]').attr('content') }
    });

    $(document).click(function (event)
    {
    var clickover = $(event.target);
    var $navbar = $(".navbar-collapse");
    var _opened = $navbar.hasClass("in");
    if (_opened === true && !clickover.hasClass("navbar-toggle"))
    {
      $navbar.collapse('hide');
    }
    });

  $("#home .navbar a[href$='index']").parent().addClass('active');
  $("#aboutUs .navbar a[href$='about-us']").parent().addClass('active');
  $("#blog .navbar a[href$='blog']").parent().addClass('active');
  $("#help .navbar a[href$='help']").parent().addClass('active');
  $("#contactUs .navbar a[href$='contact-us']").parent().addClass('active');

  $('.btn-help').on('click', function()
  {
    var $this = $(this),
    $next = $this.next();

    // Check if another text is open and close it
    var $last = $('.droptext:visible', $this.parents('#white_background'));

    if ($last.length)
    {
      $last.slideUp();
    }

    // Show the new text content only if we are opening a new text content
    if ($last.parents('.help').index() !== $this.parent().index())
    {
      $next.slideDown();
    }
  });

  var current_1 = $("#tab-1").hasClass('current_ac');
  if(current_1)
  {
    $(".checkbox1").css("display","inline");
    $(".checkbox2").css("display","none");
    $(".restaurant_types").css("display","inline");
    $(".dish_types").css("display","none");
  }
  else
  {
    $(".checkbox1").css("display","none");
    $(".checkbox2").css("display","inline");
    $(".restaurant_types").css("display","none");
    $(".dish_types").css("display","inline");
  }

  $('ul.tabs_ac li').click(function()
  {
    var tab_id = $(this).attr('data-tab');
    $('ul.tabs_ac li').removeClass('current_ac');
    $('.tab-content_ac').removeClass('current_ac');

    $(this).addClass('current_ac');
    $("#"+tab_id).addClass('current_ac');

    var current_1 = $("#tab-1").hasClass('current_ac');
    if(current_1)
    {
      $(".checkbox1").css("display","inline");
      $(".checkbox2").css("display","none");
      $(".restaurant_types").css("display","inline");
      $(".dish_types").css("display","none");
    }
    else
    {
      $(".checkbox1").css("display","none");
      $(".checkbox2").css("display","inline");
      $(".restaurant_types").css("display","none");
      $(".dish_types").css("display","inline");
    }
  });

  $(".btn-review").on("click", function()
  {
    $(".overlay").css("display","inline");
  });
  $(".btn-ads").on("click", function()
  {
    $(".overlay").css("display","inline");
  });
  $(".btn-close").click(function()
  {
    $(".overlay").css("display","none");
  });
  $(".already_download_ac").click(function()
  {
    $(".overlay").css("display","none");
  });
  $(".people_recommend").click(function()
  {
    $(".recommend_overlay_ac").css("display","inline");
  });
  $(".close_overlay").click(function()
  {
    $(".recommend_overlay_ac").css("display","none");
  });
  $(".read_review").click(function()
  {
    $(".overlay_read_all_review_ac").css("display","inline");
  });
  $(".close_review_overlay").click(function()
  {
    $(".overlay_read_all_review_ac").css("display","none");
  });

  $(".read_reply").click(function() {
    $(".overlay_read_all_reply_ac").css("display","inline");
  });
  $(".close_reply_overlay").click(function() {
    $(".overlay_read_all_reply_ac").css("display","none");
  });

  $(".add_more_res_details_btn").on("click", function(){
    $(".add_more_res_details").slideToggle();
  });

  $('#most_recomm').on("click", function() {
    var rest_div = $("#tab-1").hasClass('current_ac');
    if(rest_div) {
      $.ajax({
        url: "most_recommended_rest",
        type: "get",
        data: "",
        success: function(most_rest) {
          var prev_most_rest = $("#rest"+most_rest[0-1]);
          for(var i = 0; i < most_rest.length; i++) {
            if($("#rest"+most_rest[i]).length !== 0) {
              $("#rest"+most_rest[i]).insertAfter(prev_most_rest);
              prev_most_rest = $("#rest"+most_rest[i]);
            }
          }
          console.log(most_rest);
        }
      });
    } else {
      $.ajax({
        url: "most_recommended_dish",
        type: "get",
        data: "",
        success: function(most_dish) {
          var prev_most_dish = $("#dish"+most_dish[0-1]);
          for(var i = 0; i < most_dish.length; i++) {
            if($("#dish"+most_dish[i]).length !== 0) {
              $("#dish"+most_dish[i]).insertAfter(prev_most_dish);
              prev_most_dish = $("#dish"+most_dish[i]);
            }
          }
          console.log(most_dish);
        }
      });
    }
  });

$('#high_dis').on("click", function() {
    var check = $('#high_dis').is(":checked");
    if(check) {
      $.ajax({
        url: 'highest_discount',
        type: "get",
        data: "",
        success: function(dish_data) {
          // $(".dish_div").css("display", "none");
          var prev = $("#dish"+dish_data[0-1]);
          for (var i = 0; i < dish_data.length; i++) {
            if($("#dish"+dish_data[i]).length !== 0) {
              $("#dish"+dish_data[i]).insertAfter(prev);
              prev = $("#dish"+dish_data[i]);
            }
          }
          console.log(dish_data);
        }
      });
    }
  });

/*initial value of searching*/
var new_rest;
var food_arr = [];
var dish_arr = [];
var is_open;
var opening_hour;
/* *********************** */

  $('#new_rest').on("click", function() {
    var check_new = $('#new_rest').is(":checked");
    $('.new_rest').val(check_new);
  });

  $('input').keypress(function(event){
    if(event.which === 13){
      $('#setFilter').click();
  }
  });

  $('#setFilter').on('click', function(){
    var current_1 = $("#tab-1").hasClass('current_ac');
    var query = $('#search_').val();
    $('.query').val(query);
    var frm;
    if(current_1){
      console.log("1");
      console.log($('form#restaurant_types.restaurant_types'));
      console.log($('.tabs').val('rest'));
      // $('.tabs').val('rest');
        frm = $('form#restaurant_types.restaurant_types');
        submitForm(frm, query, food_arr, new_rest, is_open);
    } else {
      console.log("2");
      // $('.tabs').val('dish');
        frm = $('#dish_types');
        console.log($('#dish_types'));
        submitForm(frm, query, dish_arr, new_rest, is_open);
    }
  });

  function submitForm(data, query, array_){
    // console.log();
    console.log(data.attr('action'));
    data.submit();
    //  $.ajax({
    //   url: 'filter_results',
    //   type: "get",
    //   data: { food_arr: food_arr },
    //   success: function(rest_data) {
    //     $(".rest_div").css("display","none");
    //     for (var i = 0; i < rest_data.length; i++) {
    //       $("#rest"+rest_data[i]).css("display","inline");
    //       $("#rest"+rest_data[i]).after("#rest"+rest_data[i+1]);
    //     }
    //     console.log(rest_data);
    //   }
    // });
}

$('input[name="food[]"]').on('change', function() {
  var food_arr_ = [];
    $("input:checkbox[name='food[]']:checked").each(function()
    {
      food_arr_.push($(this).val());
      food_arr = food_arr_;
    });
    console.log(food_arr);
  });

  $('input[name="dish[]"]').on('change', function() {
    var dish_arr_ = [];
    $("input:checkbox[name='dish[]']:checked").each(function()
    {
      dish_arr_.push($(this).val());
      dish_arr = dish_arr_;
    });
  });

  $('#opening').on("click", function() {
    var open_checking = $('#opening').is(":checked");
    $('.is_open').val(open_checking);
  });

  $("#near_place").click(function() {
    $(".overlay").css("display","inline");
    $("#near_place").attr('checked', false);
  });

  $('#open_time').on('blur', function() {
    var open = $('#open_time').val();
    var close = $('#close_time').val();
    $('.opening_time').val(open);
  });
/*ending*/
});