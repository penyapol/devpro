 //Global Variable
 var deductions_list;

//Ready the Documents
$(document).ready(function(){
    //Display Function
    deductions_list = $('#deductions_list').DataTable({
        "ajax": "php_action/deduction_display.php",
        "order" :[]            
     });

    //Load Function
    reset_position_form();
    deduction_add();
    

});

//Reset Form
function reset_position_form()
{
    $('#AddDeductionBtn').on('click',function(){
        //Reset the Form
        $('form').trigger('reset');
    });
}

//Add Deduction
function deduction_add()
{
    $('#btnAddDeduction').on('click',function(){
        var title = $('#title').val();
        var amount = $('#amount').val();
        var description = $('#description').val();

            //Validation
            if (title=="") {
                $('#title').closest('.form-control').addClass('is-invalid');
            } else {
                $('#title').closest('.form-control').removeClass('is-invalid');
            }
            if (amount=="") {
                $('#amount').closest('.form-control').addClass('is-invalid');
            } else {
                $('#amount').closest('.form-control').removeClass('is-invalid');
            }
            if (description=="") {
                $('#description').closest('.form-control').addClass('is-invalid');
            } else {
                 $('#description').closest('.form-control').removeClass('is-invalid');
            }  

            //If All fields are inputted
            if (title && amount && description) {
                //Request
                $.ajax({
                    url:'php_action/deduction_add.php',
                    type:'POST',
                    data:{
                        title:title,
                        amount:amount,
                        description:description
                    },
                    success:function(data){
                    //Hide Deduction Form
                    $('#AddDeduction').modal('hide');
                    //Show Notification Success
                    $('#AddDeductionSuccess').modal('show');
                    
                    //Refresh the Table
                    deductions_list.ajax.reload(null, false);
                }
            });
        }
    });
}


//Delete Deduction
function deduction_delete(deductID = null)
{
    if (deductID) {
        $('#btndelete').unbind('click').bind('click',function(){
             $.ajax({
                url:'php_action/deduction_delete.php',
                type: 'post',
                data:{deductID:deductID},
                //dataType:'json',
                success:function(data){

                    //Hide Deduction Form
                     $('#RemoveDeduction').modal('hide');
                    //Refresh the Table
                      deductions_list.ajax.reload(null, false);
                    //Show Notification Success
                     $('#RemoveDeductionSuccess').modal('show');
            
                    }
            });
        });
    }else {
         alert('Error! Refresh the Page');
    }
}

//Edit Function
function deduction_edit(deductID = null)
{
    if (deductID) {
        //fetch deduct data
        $.ajax({
        url:'php_action/deduction_data.php',
        type:'post',
        data:{deductID:deductID},
        dataType:'json',
        success:function(response) {
            $('#up_id').val(response.deductID);
            $('#up_title').val(response.title);
            $('#up_amount').val(response.amount);
            $('#up_description').val(response.description);
            $('#EditDeductionForm').unbind('submit').bind('submit',function(){

                //Handling
                var up_id = $('#up_id').val();
                var up_title = $('#up_title').val();
                var up_amount = $('#up_amount').val();
                var up_description = $('#up_description').val();

                //validation
                if (up_title=="") {
                    $('#up_title').closest('.form-control').addClass('is-invalid');
                } else {
                    $('#up_title').closest('.form-control').removeClass('is-invalid');
                }
                if (up_amount=="") {
                    $('#up_amount').closest('.form-control').addClass('is-invalid');
                } else {
                    $('#up_amount').closest('.form-control').removeClass('is-invalid');
                }
                if (up_description=="") {
                    $('#up_description').closest('.form-control').addClass('is-invalid');
                } else {
                    $('#up_description').closest('.form-control').removeClass('is-invalid');
                }  

                //If All fields are inputted
                if (up_title && up_amount && up_description) {
                    //Request
                    $.ajax({
                        url: 'php_action/deduction_edit.php',
                        type: 'post',
                        data: {up_id:up_id,
                            up_title:up_title,
                            up_amount:up_amount,
                            up_description:up_description},
                        success:function(data){
                            //hide the form edit deduction
                            $('#EditDeduction').modal('hide');
                            //Show Edit success notificatoin
                            $('#EditDeductionSuccess').modal('show');
                            //refresh the Table
                            deductions_list.ajax.reload(null, false);

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