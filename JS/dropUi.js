$(document).ready(function()
{   /*Väljer ut class med draggable och gör de dragbar */
    $(".draggable").draggable(); /*Väljer ut class med draggable och gör de dragbar */
  
    /* Väljer ut class med droppable och gör de dropbar(osäker ordval) men droppable*/
    $(".droppable").droppable({

        drop: function(event, ui) 
        {
            ui.helper.appendTo(this).css({top: 0, left: 0});
            ui.helper.addClass("dropped");

            //Gömmer både dragable och droppable elements
            $(".draggable, .droppable").hide();
    

            //Visar Pop-up dialog med bild
            $("#myModal").dialog
            ({
                modal:true,
                width:500, 
                open: function() 
                {
                    $(".draggable, .droppable").hide();
                    $("#myModal img").show();
                },
                close: function()
                {   
                    alert("You did it!");
                    location.reload ();
                }
                
            });
        }
    })
});
