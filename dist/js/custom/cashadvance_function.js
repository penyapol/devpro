 //Global Variable
 var cashadv_list;

//Ready the Documents
$(document).ready(function(){
    //Display Function
    cashadv_list = $('#cashadv_list').DataTable({
        "ajax": "php_action/cashadvance_display.php",
        "order" :[]            
     });

    //Load Function

});



//Delete Deduction
function cashadvance_delete(cashadID = null)
{
    if (cashadID) {
        $('#btndeleteCashAdv').unbind('click').bind('click',function(){
             $.ajax({
                url:'php_action/cashadvance_delete.php',
                type: 'post',
                data:{cashadID:cashadID},
                //dataType:'json',
                success:function(data){

                    //Hide Deduction Form
                     $('#RemoveCashAdv').modal('hide');
                    //Refresh the Table
                      cashadv_list.ajax.reload(null, false);
                    //Show Notification Success
                     $('#RemoveCashAdvSuccess').modal('show');
            
                    }
            });
        });
    }else {
         alert('Error! Refresh the Page');
    }
}

//Edit Function
function cashadvance_edit(cashadID = null)
{
    if (cashadID) {
        //fetch deduct data
        $.ajax({
        url:'php_action/cashadvance_data.php',
        type:'post',
        data:{cashadID:cashadID},
        dataType:'json',
        success:function(response) {
            $('#up_id').val(response.cashadID);
            $('#up_rate').val(response.cashadvAmount);
            $('#up_description').val(response.cashadvDescription);
            $('#EditcashadvanceForm').unbind('submit').bind('submit',function(){

                //Handling
                var up_id = $('#up_id').val();
                var up_rate = $('#up_rate').val();
                var up_description = $('#up_description').val();

                //validation
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
                if ( up_rate && up_description) {
                    //Request
                    $.ajax({
                        url: 'php_action/cashadvance_edit.php',
                        type: 'post',
                        data: {up_id:up_id,
                            up_rate:up_rate,
                            up_description:up_description},
                        success:function(data){
                            //hide the form edit position
                            $('#EditCashAdv').modal('hide');
                            //Show Edit success notificatoin
                            $('#EditCashAdvSuccess').modal('show');
                            //refresh the Table
                            cashadv_list.ajax.reload(null, false);

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
