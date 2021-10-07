 //Global Variable
 var employee_list;
 var disemployee_list;

//Ready the Documents
$(document).ready(function(){
    //Display Function
    employee_list = $('#employee_list').DataTable({
        "ajax": "php_action/employee_display.php",
        "order" :[]            
     });

    disemployee_list = $('#disempolyee_list').DataTable({
        "ajax": "php_action/disemployee_display.php",
        "order" :[]            
     });


});


//Delete Emplotee
function employee_delete(empID = null)
{
    if (empID) {
        $('#btndeleteemployee').unbind('click').bind('click',function(){
             $.ajax({
                url:'php_action/employee_delete.php',
                type: 'post',
                data:{empID:empID},
                //dataType:'json',
                success:function(data){

                    //Hide Deduction Form
                     $('#Removeemployee').modal('hide');
                    //Refresh the Table
                     employee_list.ajax.reload(null, false);
                      disemployee_list.ajax.reload(null, false);
                    //Show Notification Success
                    $('#RemoveEmployeeSuccess').modal('show');
            
                    }
            });
        });
    }else {
         alert('Error! Refresh the Page');
    }
}

//Active Employee
function disemployee_active(empID = null)
{
    if (empID) {
        $('#btnActiveEmployee').unbind('click').bind('click',function(){
             $.ajax({
                url:'php_action/employee_active.php',
                type: 'post',
                data:{empID:empID},
                //dataType:'json',
                success:function(data){

                    //Hide Deduction Form
                     $('#ReActiveemployee').modal('hide');
                    //Refresh the Table
                     employee_list.ajax.reload(null, false);
                    disemployee_list.ajax.reload(null, false);
                    //Show Notification Success
                    $('#ActiveEmployeeSuccess').modal('show');
            
                    }
            });
        });
    }else {
         alert('Error! Refresh the Page');
    }
}



