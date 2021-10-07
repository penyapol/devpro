

$(document).ready(function(){


add_dtr();
});

function add_dtr()
{
	$('#btn_submit_record').on('click',function(){

		var total_hr = parseInt($('#total_hr').val());
		var status = $('#status').val();
		var empID = $('#empID').val();
    var shift = $('#shiftID').val();
    var holiday = $('#holID').val();
    var restday = $('#restID').val();
    //var inhr = parseInt($('#total_hr').val());

		 //Validation
           if (total_hr=="") {
               $('#total_hr').closest('.form-control').addClass('is-invalid');
               $('#hrerr').html('<p class="text-danger">Please Enter the total hour <i class="fas fa-exclamation-triangle"></i></p>');

           } else {
               $('#total_hr').closest('.form-control').removeClass('is-invalid');
               $('#hrerr').html('');
           }
           
           if (empID=="") {
               $('#empID').closest('.form-control').addClass('is-invalid');
               $('#sgerr').html('<p class="text-danger">Please Select Secuirty Guard <i class="fas fa-exclamation-triangle"></i></p>');

           } else {
               $('#empID').closest('.form-control').removeClass('is-invalid');
               $('#sgerr').html('');
           }

           if (shift=="") {
               $('#shiftID').closest('.form-control').addClass('is-invalid');
               $('#Shifterr').html('<p class="text-danger">Please Select Shift mode <i class="fas fa-exclamation-triangle"></i></p>');

           } else {
               $('#shiftID').closest('.form-control').removeClass('is-invalid');
               $('#Shifterr').html('');
           }

            if (shift=="") {
               $('#holID').closest('.form-control').addClass('is-invalid');
               $('#holidayerr').html('<p class="text-danger">Please Select Holiday <i class="fas fa-exclamation-triangle"></i></p>');

           } else {
               $('#holID').closest('.form-control').removeClass('is-invalid');
               $('#holidayerr').html('');
           }

              if (restday=="") {
               $('#restID').closest('.form-control').addClass('is-invalid');
               $('#restdayerr').html('<p class="text-danger">Please Select Restday <i class="fas fa-exclamation-triangle"></i></p>');

           } else {
               $('#restID').closest('.form-control').removeClass('is-invalid');
               $('#restdayerr').html('');
           }



           if (empID && total_hr && shift  && holiday && restday) {
           		$.ajax({
           			url:'php_action/dtr_add.php',
                    type:'POST',
                    data:{
                        total_hr:total_hr,
                        status:status,
                        empID:empID,
                        shift:shift,
                        holiday:holiday,
                        restday:restday
                    },
                    success:function(data){
                    $('#sgsuccess').html(data);
                    $("#loginform").trigger('reset');
                    dtr_list.ajax.reload(null, false);
                    emp_dtr_list.ajax.reload(null, false);

                	}
           		});
           }

	});
}

//Delete Deduction
function DTR_delete(attID = null)
{
    if (attID) {
        $('#btndeletedtr').unbind('click').bind('click',function(){
             $.ajax({
                url:'php_action/dtr_delete.php',
                type: 'post',
                data:{attID:attID},
                //dataType:'json',
                success:function(data){

                    //Hide Deduction Form
                     $('#RemoveDTR').modal('hide');
                    //Refresh the Table
                    dtr_list.ajax.reload(null, false);
                    emp_dtr_list.ajax.reload(null, false);
                    //Show Notification Success
                     $('#RemoveDTRSuccess').modal('show');
                     $('#dtrform').trigger('reset');
            
                    }
            });
        });
    }else {
         alert('Error! Refresh the Page');
    }
}