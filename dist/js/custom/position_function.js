 //Global Variable
 var position_list;

//Ready the Documents
$(document).ready(function(){
    //Display Function
    position_list = $('#position_list').DataTable({
        "ajax": "php_action/position_display.php",
        "order" :[]            
     });

    //Load Function
   position_add();
   reset_form();

});

//Reset Form
function reset_form()
{
    $('#AddPositionBtn').on('click',function(){
        //Reset the Form
        $('form').trigger('reset');
    });
}


//Add Position
function position_add()
{
    $('#btnAddPosition').on('click',function(){
        var title = $('#title').val();
        var rate = $('#rate').val();
        var description = $('#description').val();

            //Validation
            if (title=="") {
                $('#title').closest('.form-control').addClass('is-invalid');
            } else {
                $('#title').closest('.form-control').removeClass('is-invalid');
            }
            if (rate=="") {
                $('#rate').closest('.form-control').addClass('is-invalid');
            } else {
                $('#rate').closest('.form-control').removeClass('is-invalid');
            }
            if (description=="") {
                $('#description').closest('.form-control').addClass('is-invalid');
            } else {
                 $('#description').closest('.form-control').removeClass('is-invalid');
            }  

            //If All fields are inputted
            if (title && rate && description) {
                //Request
                $.ajax({
                    url:'php_action/position_add.php',
                    type:'POST',
                    data:{
                        title:title,
                        rate:rate,
                        description:description
                    },
                    success:function(data){
                    //Hide Deduction Form
                    $('#AddPosition').modal('hide');
                    //Show Notification Success
                    $('#AddPositionSuccess').modal('show');
                    //Refresh the Table
                    position_list.ajax.reload(null, false);
                }
            });
        }
    });
}


//Delete Deduction
function position_delete(postID = null)
{
    if (postID) {
        $('#btndeletePosition').unbind('click').bind('click',function(){
             $.ajax({
                url:'php_action/position_delete.php',
                type: 'post',
                data:{postID:postID},
                //dataType:'json',
                success:function(data){

                    //Hide Deduction Form
                     $('#RemovePosition').modal('hide');
                    //Refresh the Table
                     position_list.ajax.reload(null, false);
                    //Show Notification Success
                     $('#RemovePositionSuccess').modal('show');
            
                    }
            });
        });
    }else {
         alert('Error! Refresh the Page');
    }
}


//Edit Function
function position_edit(postID = null)
{
    if (postID) {
        //fetch deduct data
        $.ajax({
        url:'php_action/position_data.php',
        type:'post',
        data:{postID:postID},
        dataType:'json',
        success:function(response) {
            $('#up_id').val(response.postID);
            $('#up_title').val(response.posTitle);
            $('#up_rate').val(response.rate);
            $('#up_description').val(response.description);
            $('#EditpositionForm').unbind('submit').bind('submit',function(){

                //Handling
                var up_id = $('#up_id').val();
                var up_title = $('#up_title').val();
                var up_rate = $('#up_rate').val();
                var up_description = $('#up_description').val();

                //validation
                if (up_title=="") {
                    $('#up_title').closest('.form-control').addClass('is-invalid');
                } else {
                    $('#up_title').closest('.form-control').removeClass('is-invalid');
                }
                if (up_rate=="") {
                    $('#up_rate').closest('.form-control').addClass('is-invalid');
                } else {
                    $('#up_rate').closest('.form-control').removeClass('is-invalid');
                }
                if (up_description=="") {
                    $('#up_description').closest('.form-control').addClass('is-invalid');
                } else {
                    $('#up_description').closest('.form-control').removeClass('is-invalid');
                }  

                //If All fields are inputted
                if (up_title && up_rate && up_description) {
                    //Request
                    $.ajax({
                        url: 'php_action/position_edit.php',
                        type: 'post',
                        data: {up_id:up_id,
                            up_title:up_title,
                            up_rate:up_rate,
                            up_description:up_description},
                        success:function(data){
                            //hide the form edit position
                            $('#EditPosition').modal('hide');
                            //Show Edit success notificatoin
                            $('#EditPositionSuccess').modal('show');
                            //refresh the Table
                            position_list.ajax.reload(null, false);

                        }
                    });
                }
                        return false;
            });

        }

    })
 }else {
    alert('Error!');
    }
}
