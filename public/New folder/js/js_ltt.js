$(function () {

  loadMap();

  $("input[type='checkbox'][name='restaurant_type[]']").click(function() {
     if($("input[type='checkbox'][name='restaurant_type[]']:checked").length > 0 && $("#checkbox_display_error").length !== 0){ 
        $("#checkbox_display_error").remove();
     }
  });


   $('#form_recommend_restaurant').validator().on('submit', function (e) {
     
     if($("input[type='checkbox'][name='restaurant_type[]']:checked").length > 0){ 
         return true;
     }else {
        if($("#checkbox_display_error").length == 0) {
           var restaurant_type_error = $('input[id="restaurant_type_error"]').val();
           $('#checkbox_handle_error').append('<p id="checkbox_display_error" style="color:#a94442">'+restaurant_type_error+'</p>');
        }
         return false;
     }

    }); 

   

	$('#selectall').click(function() { $(this.form.elements).filter(':checkbox').prop('checked', this.checked);
	});

	$('.timepicker').datetimepicker({
         format: 'HH:mm'
    });

  $("#DayHourBoxesGroup").on("focus", ".timepicker", function(){
     $(this).datetimepicker({
         format: 'HH:mm'
    });
  });

    $('.datepicker').datetimepicker({
          viewMode: 'days',
          format: 'YYYY-MM-DD'
    });

     tinymce.init({
            selector: "#other_description",
            height: "200"       
    });
  

  var mymaxFiles = 1;
  var file_location = 'server/index';
  var folder_name = 'logo';

  $('#fileupload').fileupload({
  url: file_location,
  // url: 'http://www.asahiarts.com/server/index.php',
  dataType: 'json',
  dropZone: $(this).find('.dropzone_fileupload'),
  // Enable image resizing, except for Android and Opera,
  // which actually support image resizing, but fail to
  // send Blob objects via XHR requests:
  disableImageResize: false,
  imageMaxWidth: 1096,
  imageMaxHeight: 745,
  acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
  maxNumberOfFiles:mymaxFiles,
/*  singleFileUploads: false,*/
  getNumberOfFiles: function(){
   // alert($('#fileupload .files div').size());
    return $('#fileupload .files div').size();
  },
done:function (e, data) {
fileuploadDone($(this).attr('id'), data, mymaxFiles, '', '', 'dropzone_fileupload', 'fileuploadinput', file_location,folder_name);
}
}).on("fileuploaddone", function (e, data) {
  // fileuploadDone($(this).attr('id'), data);  
}).on('fileuploadadd', function (e, data) {
  fileuploadAdd($(this).attr('id'), data, mymaxFiles);
}).on('fileuploadstart', function (e, data) {
 // alert("start");
  $(this).find(".fileupload-progress").show();
});

/*$('button.cancelUpload1').click(function () {
  jqXHR.abort();
  $(this).parent().hide();
});
*/



var mymaxFiles2 = 1000;
var file_location2 = 'server/index2';
  var folder_name2 = 'gallery';
  $('#fileupload2').fileupload({
  url: file_location2,
  // url: 'http://www.asahiarts.com/server/index.php',
  dataType: 'json',
  dropZone: $(this).find('.dropzone_fileupload2'),
  // Enable image resizing, except for Android and Opera,
  // which actually support image resizing, but fail to
  // send Blob objects via XHR requests:
  disableImageResize: false,
  imageMaxWidth: 1096,
  imageMaxHeight: 745,
  acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
  maxNumberOfFiles:mymaxFiles2,
/*  singleFileUploads: false,*/
  getNumberOfFiles: function(){
    return $('#fileupload2 .files div').size();
  },
done:function (e, data) {
fileuploadDone($(this).attr('id'), data, mymaxFiles2, '', '', 'dropzone_fileupload2', 'fileuploadinput2', file_location2,folder_name2);
}
}).on("fileuploaddone", function (e, data) {
  // fileuploadDone($(this).attr('id'), data);  
}).on('fileuploadadd', function (e, data) {
  fileuploadAdd($(this).attr('id'), data, mymaxFiles2);
}).on('fileuploadstart', function (e, data) {
 // alert("start");
  $(this).find(".fileupload-progress").show();
});

/*$('button.cancelUpload2').click(function () {
  jqXHR.abort();
  $(this).parent().hide();
});*/


  var email_counter = 1;
  $("#add_another_email_ltt").click(function () {

      var newEmailBoxDiv = $(document.createElement('div'))
           .attr("class", 'EmailBoxDiv');
                    
      newEmailBoxDiv.after().html('<br/><br/><div class=" col-md-offset-3 col-sm-9"> <div class="input-group"><input type="email" class="form-control" name="email['+email_counter+']"><div class="input-group-btn"><span class="btn btn-danger remove_email">×</span></div></div></div>');
                
      newEmailBoxDiv.appendTo("#EmailBoxesGroup");
      email_counter++;
            
  });

  $("#EmailBoxesGroup").on("click", ".remove_email", function(){
      $(this).parent().parent().parent().parent().remove();
  });



  var count_mobile = 1; 
  $("#add_another_mobile_ltt").click(function () {

      var newMobileBoxDiv = $(document.createElement('div'))
           .attr("class", 'MobileBoxDiv');
                    
      newMobileBoxDiv.after().html('<br/><br/><div class=" col-md-offset-3 col-sm-9"> <div class="input-group"><input type="type" class="form-control" name="mobile_no['+count_mobile+']"><div class="input-group-btn"><span class="btn btn-danger remove_mobile">×</span></div></div></div>');
                
      newMobileBoxDiv.appendTo("#MobileBoxesGroup");

      count_mobile++;
            
  });

  $("#MobileBoxesGroup").on("click", ".remove_mobile", function(){
      $(this).parent().parent().parent().parent().remove();
  });


   var count_office_no = 1; 
   $("#add_another_office_num_ltt").click(function () {

      var newOfficeBoxDiv = $(document.createElement('div'))
           .attr("class", 'OfficeNumBoxDiv');
                    
      newOfficeBoxDiv.after().html('<br/><br/><div class=" col-md-offset-3 col-sm-9"> <div class="input-group"><input type="type" class="form-control" name="office_no['+count_office_no+']"><div class="input-group-btn"><span class="btn btn-danger remove_office_num">×</span></div></div></div>');
                
      newOfficeBoxDiv.appendTo("#OfficeNumBoxesGroup");
      
      count_office_no++;
            
  });

  $("#OfficeNumBoxesGroup").on("click", ".remove_office_num", function(){
      $(this).parent().parent().parent().parent().remove();
  });


  var opening_counter = 1; 
  $("#add_more_days_hours").click(function () {

    var days = $('input[id="days_lang"]').val();
    var days_error = $('input[id="days_error_lang"]').val();
    var monday_lang = $('input[id="monday_lang"]').val();
    var tuesday_lang = $('input[id="tuesday_lang"]').val();
    var wednesday_lang = $('input[id="wednesday_lang"]').val();
    var thursday_lang = $('input[id="thursday_lang"]').val();
    var friday_lang = $('input[id="friday_lang"]').val();
    var saturday_lang = $('input[id="saturday_lang"]').val();
    var sunday_lang = $('input[id="sunday_lang"]').val();
    var time_from_lang = $('input[id="time_from_lang"]').val();
    var time_from_error_lang = $('input[id="time_from_error_lang"]').val();
    var time_to_lang = $('input[id="time_to_lang"]').val();
    var time_to_error_lang = $('input[id="time_to_error_lang"]').val();
    var remove_open_day_hour = $('input[id="remove_open_day_hour"]').val();

      var newDayHourBoxDiv = $(document.createElement('div'))
           .attr("class", 'DayHourBoxDiv');
                   
      newDayHourBoxDiv.after().html('<div class="open_day_hour_ltt"> <label class="col-sm-3"></label> <div class="col-sm-3 form-group" style="margin:0"> <b class="control-label">'+days+'</b> <select multiple class="form-control" name="days['+opening_counter+'][]" data-error="'+days_error+'" required> <option value="1">'+monday_lang+'</option> <option value="2">'+tuesday_lang+'</option> <option value="3">'+wednesday_lang+'</option> <option value="4">'+thursday_lang+'</option> <option value="5">'+friday_lang+'</option> <option value="6">'+saturday_lang+'</option> <option value="7">'+sunday_lang+'</option> </select> <div class="help-block with-errors"></div> </div><div class="col-sm-3 form-group" style="margin:0"> <b class="control-label">'+time_from_lang+'</b> <input type="text" class="form-control timepicker" name="time_from['+opening_counter+']" data-error="'+time_from_error_lang+'" required> <div class="help-block with-errors"></div> </div> <div class="col-sm-3 form-group" style="margin:0"> <b class="control-label">'+time_to_lang+'</b><input type="text" class="form-control timepicker" name="time_to['+opening_counter+']" data-error="'+time_to_error_lang+'" required><div class="help-block with-errors"></div> </div> <div class="col-sm-12" style="text-align: right"><span class="btn btn-link remove_open_day_hour" >x '+remove_open_day_hour+'</span></div> <div class="col-sm-offset-3 col-sm-9"><hr></div></div>');
                
      newDayHourBoxDiv.appendTo("#DayHourBoxesGroup");

      opening_counter++;

            
  });

  $("#DayHourBoxesGroup").on("click", ".remove_open_day_hour", function(){
      $(this).parent().parent().parent().remove();
 
  });



});




function fileuploadAdd(id, data, maxFiles){
  fileCount = $('#'+id+' .files').find('div').size();
  if(fileCount+data.files.length>maxFiles && maxFiles!=1){
   // alert("Over limit");
  }
  if (fileCount == maxFiles && maxFiles == 1) {
    $('#'+id+' .files div:first-child').remove();
  }
  // alert("add");
  // jqXHR = data;
}

// function fileuploadInitSaved(id,data,url){



function fileuploadDone(id, data, maxFiles, saved, url, dropzone, fileuploadinput, file_location, folder_name){
  $("#"+id+" .fileupload-progress").hide();
  var base_url = $('input[id="res_image_thumb_url"]').val();
/*  if(saved == "true"){
    $.each(data,function (index,file){
      $('#'+id+' .'+dropzone+' .files').append('<div class="preview_fileupload" id="'+file+'"><button type="button" class="btn btn-danger delete btn-xs deleteBtn_fileupload" data-type="delete" data-url="" fileuploadinput="'+fileuploadinput+'" file_location="'+file_location+'" onclick="deletefile($(this))"><i class="glyphicon glyphicon-remove"></i></button><span class="helper_fileupload"></span><img src="'+url + file + '" style="max-height:100%; max-width:100%;" /><input type="hidden" name="old_'+id+'[]" value="'+file+'"/></div>');
    });
  }else{*/
    $.each(data.result.files, function (index, file) {

      $('#'+id+' .'+dropzone+' .files').append('<div class="preview_fileupload" id="'+file.name+'" style="display:none"><button type="button" class="btn btn-danger delete btn-xs deleteBtn_fileupload" data-type="delete" file-name="'+file.name+'" data-url="'+file.deleteUrl+'" fileuploadinput="'+fileuploadinput+'"file_location="'+file_location+'" onclick="deletefile($(this))"><i class="glyphicon glyphicon-remove"></i></button><span class="helper_fileupload"></span><img src="'+base_url+'/upload/suggested_restaurant/'+folder_name+'/thumbnail/'+file.name+'" style="max-height:100%; max-width:100%;" /><input type="hidden" name="new_'+id+'[]" value="'+file.name+'"/></div>');
      $("div[id='"+file.name+"']").fadeIn();
    });
/*  }*/

  fileCount = $('#'+id+' .files').find('div').size();
  if (fileCount >= maxFiles) {
    if(fileCount==1){
      var change_img = $('input[id="change_image_lang"]').val();
      $("#"+id+" .fileinput-button span").html('<i class="glyphicon glyphicon-refresh"></i><span> '+change_img+'</span>');
    }else{
       $("#"+id+" .fileinput-button").attr('disabled','disabled');
     }
   }

   updatefilelist(id, fileuploadinput);
}

function updatefilelist(id, fileuploadinput){
  fileCount = $('#'+id+' .files').find('div').size();
  // alert($('#'+id+' .files div:nth-child(1) input').val());
   var fileArray = [];
   for(i=1;i<=fileCount;i++){
      fileArray.push($('#'+id+' .files div:nth-child('+i+') input').val());
   }
   // alert(JSON.stringify(fileArray));
   if(fileArray.length!=0){
    $('#'+fileuploadinput).val(JSON.stringify(fileArray));
   }else{
    $('#'+fileuploadinput).val('');
   }
}

function deletefile(e){

  // alert(e.parent().children('input').attr('name').substring(0,3));
  id = e.parent().parent().parent().parent().attr('id');
  if(e.parent().children('input').attr('name').substring(0,3)=="new"){

    $.ajax({
      url: e.attr('file_location') + "/delete/image?file=" + e.attr('file-name'),
      data: {_token: $('input[name="_token"]').val()},
      type: 'DELETE',
      success: function(result) {
        e.parent().fadeOut("medium", function(){
          $(this).remove();
          updatefilelist(id, e.attr('fileuploadinput'));
        });
      }
    });
  }else{
    deletethisfile = e.parent().children('input').val();
    alert(deletethisfile);
    
    var deletedfiles = [];
    if($('#'+id+"delete").val()!=""){
      deletedfiles = $.parseJSON($('#'+id+"delete").val());
    }
    deletedfiles.push(deletethisfile);
    $('#'+id+"delete").val(JSON.stringify(deletedfiles));
    e.parent().fadeOut("medium", function() {
      $(this).remove();
      updatefilelist(id);
    });
  }

  var upload_img = $('input[id="upload_image_lang"]').val();
  e.parent().parent().parent().parent().find(".fileinput-button span").html('<i class="glyphicon glyphicon-plus"></i><span> '+upload_img+'</span>');
  e.parent().parent().parent().parent().find(".fileinput-button").removeAttr('disabled');
}

function loadMap()
      {
        var lat ;
        var lng;

        lat = 1.507048;
        lng = 110.360696;
      
        var center = new google.maps.LatLng(lat,lng);         
        var centerpoint = center;
        var mapcanvas = 'map_canvas';
        
        var myOptions = {
          zoom: 13,
          center: centerpoint,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        var map = new google.maps.Map(document.getElementById(mapcanvas),myOptions);
            
        var homemarker = new google.maps.Marker({
          position: center,
          map: map,
          draggable:true
        });   

        google.maps.event.addListener(homemarker, 'dragend', function() {
            // Get the Current position, where the pointer was dropped
            var point = homemarker.getPosition();
            // Center the map at given point
            homemarker.map.panTo(point);
            // Update
           document.getElementById('map_lat').value=point.lat();
           document.getElementById('map_long').value=point.lng();

        });

      }

