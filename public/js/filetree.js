

var ft = {
init: function(el, json) {

    ft.root = $(el);
    ft.json = json;

    ft.populate(el, json);


    ft.dragging = false;
    ft.selected = {};


    $(document).on("dragstart", function(e) {
        ft.dragging = $(e.target).closest('.ft-item');

        $(e.target).addClass("ft-being-dragged");

    });

    $(document).on("dragend", function(e) {
        $(e.target).removeClass("ft-being-dragged");
    });

    $(document).on("dragover", function(e){
        e.preventDefault();
    });

    $(document).on("dragenter", function(e) {

        e = $(e.target).closest('.ft-item');

        if (e)
            e.addClass("ft-dragged-over")

    });

    $(document).on("dragleave", function(e) {
        e = $(e.target).closest('.ft-item');
        if (e)
            e.removeClass("ft-dragged-over")
    });


    $("#filetree").on("drop", function(e) {
        // prevent default action (open as link for some elements)
        e.preventDefault();


        if(e.originalEvent.clientX > 100){
          //subchild
          e = $(e.target).closest('.ft-item');
          if (e.length){
              if (!e.find('.ft-list').length)
                e.append("<div class='ft-list'>")

              e.find('.ft-list').append(ft.dragging);





          } else {
              $('#filetree > .ft-list > .ft-item:last').after(ft.dragging);

          }
          e.css("color", "none");

        } else{

            e = $(e.target).closest('.ft-item');

            e.after(ft.dragging);


        }





          var dragId = ft.dragging.find(".ft-name").attr("id");
          dragId = parseInt(dragId.substring(dragId.indexOf("_")+1));
          var dropId = e.find(".ft-name").attr("id");
          dropId = parseInt(dropId.substring(dropId.indexOf("_")+1));


          var headList = $("#editor h1, #editor h2, #editor h3");

          var dropHead = headList.eq(dropId+1);




          var dragHead = headList.eq(dragId)[0];
          var end = headList.eq(1+dragId).prev()[0];


          var range = document.createRange();
          range.selectNodeContents(dragHead);
          range.setEnd( end, end.childNodes.length);

          var div = $("<span>");

         div.append(range.extractContents());

        // alert( div.html() )



         dropHead.before(div)







    });


    $('.ft-name')
	.on('click', ft.click)
	.on('dblclick', ft.dblclick)
	.on('touchstart', function(){   e.preventDefault(); window.touchTimer = setTimeout(ft.dblclick, 2000);  })
	.on('touchend', function(){    clearTimeout(window.touchTimer);  });


    $("#file-new").click(function(){

      $("#file-new-modal").modal('show');
      $("#filename").focus();



     });


     $("#file-new-modal-submit").click(function(){

	       if ( $(".filetype:checked").val() == "file"){


	           var fileData = {
	             "class": "file",
	             "title": $("#filename").val(),
	             "text": ""
	           }


	           if (local){
	            	var id = 100000000000000000*Math.random()

			fileData.userid = "local";
			fileData.id = id;



	                localStorage["debate_"+fileid] = JSON.stringify(fileData);



	           u.index.push(fileData);



	          ft.populate(ft.root,u.index);



	           } else{
	                 $.get("/doc/create", fileData, function(id){


			fileData.id = id;



	           u.index.push(fileData);



	          ft.populate(ft.root,u.index);


			} )
	           }




	           $(".ft-name:last").click();


	       } else {

	         var folderData = {
	           "class": "folder",
	           "userid": "local",
	           "title": $("#filename").val()
	         }


	         u.index.push(folderData);

	         ft.populate(ft.root,u.index);

	         $(".ft-name:last").click();


	       }


	       $('.ft-name').on('click', ft.click);

	       $("#file-new-modal").modal('hide');




      });



	// on scroll, update selected header index
	$("#editor").on("scroll", function() {

	  var list= $("#editor").find("h1, h2, h3");

	 for(var i=0; i<list.length;i++)
	 	
	 	if ( list[i].textContent.length > 2 && list[i].getBoundingClientRect().bottom > 300 )
	  		break;
	  

	  $(".ft-selected").removeClass("ft-selected");
	  $("#" + ft.selected.id +"_"+(i-1)).addClass("ft-selected");
	  
	})






},


populate: function(div, json) {

    if (div[0].id == ft.root[0].id) 
      	div.empty();
  	

    	div.append('<div class="ft-list">')

    div = div.find('.ft-list');


    for (var i in json) {

        var item = $('<div class="ft-item" draggable="true"><div  id="' + json[i].id + '" class="ft-name ' + json[i].class + '">' + json[i].title + '</div> </div>');
        item.appendTo(div)

        if (json[i].children && json[i].children.length){

        	 item.find('.ft-name').prepend('<input  type="submit" value="+-">')
		        .find('input').click(function(e) {
		            $(e.target).closest('.ft-name').toggleClass("collapsed");
		            if ($(this).val() == '+-')
		                $(this).val('-')
		            else
		                $(this).val('+-')
		        });


            ft.populate(item, json[i].children);
        }
    }

},

toJSON: function(startLevel) {
    if (typeof startLevel === 'undefined')
        startLevel = $("#filetree .ft-list:first");

    var array = [];
    startLevel.children('.ft-item').each(function() {
        var itemName = $(this).find('.ft-name')[0];
        var item = {
            id: itemName.id,
            title: itemName.textContent,
            class: itemName.className.replace(/ft-name/gi,'').trim()
        };



        var sub = $(this).find('.ft-list:first');
        if (sub.length)
            item.children = ft.toJSON(sub);
        array.push(item);
    });

    return array;

},

update: function() {
	//if is editting a name
	if ( $(".aboutfile-title-edit-container").length )
		return;

    var treeJSON = ft.toJSON();


    //find the headings
    var headingList = [], i = 0, selectedId = -1;


    if ($(".ft-selected").hasClass("heading") )
    	selectedId = parseInt( $(".ft-selected").attr("id").substring( $(".ft-selected").attr("id").indexOf("_")+1 ) )


    $("#editor").find("h1, h2, h3").each(function() {

        if ($(this).text().length > 2){
            headingList.push({
                'id': ft.selected.id + "_" + i.toString(),
                'title': $(this).text().substring(0, 50),
                'class': 'heading '  + 'heading-'+$(this).prop("tagName").toLowerCase() + ( selectedId == i ? " ft-selected" : "")
            });
    
	    }

	    i++;

    });




    //add headings as children of current file
    for (var i in treeJSON)
        if (ft.selected && treeJSON[i].id == ft.selected.id){

          //for (var j in treeJSON[i].children)


          treeJSON[i].children = headingList;


        }



    u.index = treeJSON;



    //update db
    if (local){
        localStorage.debate = JSON.stringify(u.index);

        ft.selected.text = encodeURI($("#editor").html().replace(/\'/g, '&#39;'));
        localStorage["debate_" + ft.selected.id] = JSON.stringify(ft.selected);
    } else{
         $.post('/user/update', {index: JSON.stringify(u.index)});

		if (ft.selected)
            $.post('/doc/update', {
                text: encodeURI($("#editor").html().replace(/\'/g, '&#39;')),
                id: ft.selected.id
            });
    }


    ft.populate(ft.root,u.index);

    $('.ft-name').on('click', ft.click);

 	$('.ft-name').on('dblclick', ft.dblclick);

},

click: function(e) {
    e = typeof e == "string" ? $("#"+e) : $(e.target);

    var id = e.attr('id');



    $('.ft-selected').removeClass('ft-selected');
    e.closest('.ft-name').addClass('ft-selected');




    if (e.hasClass("heading")) {

		var headingId = id.substring(id.indexOf("_")+1);
		id = id.substring(0, id.indexOf("_"));

		if (ft.selected.id == id){
			$("#editor").find("h1, h2, h3")[headingId].scrollIntoView();
		} else {

			$.getJSON("/doc/read", {id: id}, function (r) {
                ft.selected = r;
               	$("#editor").html(ft.selected.text);
               	$("#editor").find("h1, h2, h3")[headingId].scrollIntoView();
           	})

		}

    } else if (e.hasClass("file")) {

  		if (!u.name) {

  	  		ft.selected = u.index[id];
           	$("#editor").html(ft.selected.text);

       	} else if (local){

           ft.selected = JSON.parse(localStorage["debate_" + id]);
           $("#editor").html(decodeURI(ft.selected.text));

       	} else {

           	$.getJSON("/doc/read", {id: id}, function (r) {
                ft.selected = r;
               	$("#editor").html(ft.selected.text);
               	ft.update();
           	})

       }

    } else if (e.hasClass("folder")) {

        $("#editor").html('');
        ft.selected = {};

    }

},

dblclick:function() {

	var editHtml = '<div class="aboutfile-title-edit-container input-group input-group-sm"><input id="aboutfile-title-edit" type="text" '+
			'class="form-control" placeholder="File name: "><span class="input-group-btn"><button id="aboutfile-delete" '+
			'class="btn btn-default glyphicon glyphicon-remove" data-toggle="tooltip" data-placement="bottom" title=""></button></span></div>';

    $(this).after(editHtml);

	$("#aboutfile-delete").click(function(){


        if (!confirm("Are you sure you want to delete the file \"" + ft.selected.title + "\"?"))
          return;

          if (local)
             localStorage.removeItem("debate_" + ft.selected.id);
         else
              $.get("/doc/delete", {id: ft.selected.id});


        $(".selected").closest(".ft-item").remove();

        ft.update();

     });



    $("#aboutfile-title-edit").blur(function(){
		setTimeout(function(){
        	$(".aboutfile-title-edit-container").remove();
        }, 500);
    })





	$("#aboutfile-title-edit")[0].placeholder='New name: ' + ft.selected.title;

	$("#aboutfile-title-edit").focus();
	$("#aboutfile-title-edit")[0].focus()

	$("#aboutfile-title-edit").change(function() {

	var fileTitle = $(this).val();

	$(".ft-selected").html(fileTitle);
	$(".aboutfile-title-edit-container").remove();

  if (local){
      ft.selected.title = fileTitle;
      localStorage["debate_" + ft.selected.id] = JSON.stringify(ft.selected);
  }else{
      $.post('/doc/update', {
      title: fileTitle,
              id: ft.selected.id
          });
  }


	});

},



setParent: function(div) {
    div.prepend('<input type="submit" value="-">');

    div.find('input').click(function(e) {

        $(e.target.parentNode).find('.ft-name').toggleClass("collapsed");
        if ($(this).val() == '+')
            $(this).val('-')
        else
            $(this).val('+')

    })

},

unsetParent: function(div) {
    div.find('input').remove();

}

};