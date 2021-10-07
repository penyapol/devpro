$(document).ready(function(){

company_add();

});



function company_add()
{
	$('#AddCompanyBtn').on('click',function(){

		var compName = $('#compName').val();
		var photo = $('#photo').val();
		var compEmail = $('#compEmail').val();
		var compContact = $('#compContact').val();
		var compJoin = $('#compJoin').val();
		var compAddress = $('#compAddress').val();
		var compStatus = $('#compStatus').val();

			//Validation
            if (compName=="") {
                $('#compName').closest('.form-control').addClass('is-invalid');
            } else {
            	$('#compName').closest('.form-control').removeClass('is-invalid');
            }
            if (updp=="") {
                $('#updp').closest('.form-control').addClass('is-invalid');
            } else {
            	$('#updp').closest('.form-control').removeClass('is-invalid');
            }
            if (compEmail=="") {
                $('#compEmail').closest('.form-control').addClass('is-invalid');
            } else {
            	$('#compEmail').closest('.form-control').removeClass('is-invalid');
            }
            if (compContact=="") {
                $('#compContact').closest('.form-control').addClass('is-invalid');
            } else {
            	$('#compContact').closest('.form-control').removeClass('is-invalid');
            }
            if (compJoin=="") {
                $('#compJoin').closest('.form-control').addClass('is-invalid');
            } else {
            	$('#compJoin').closest('.form-control').removeClass('is-invalid');
            }
            if (compAddress=="") {
                $('#compAddress').closest('.form-control').addClass('is-invalid');
            } else {
            	$('#compAddress').closest('.form-control').removeClass('is-invalid');
            }
            if (compStatus=="") {
                $('#compStatus').closest('.form-control').addClass('is-invalid');
            } else {
            	$('#compStatus').closest('.form-control').removeClass('is-invalid');
            }

            //If All fields encoded
            if (compName&&updp&&compEmail&&compContact&&compJoin&&compAddress&&compStatus) {
            	$.ajax({
            		url:'php_action/company_add.php',
                    type:'POST',
                    data:{
                        compName:compName,
                        updp:updp,
                        compEmail:compEmail,
                        compContact:compContact,
                        compJoin:compJoin,
                        compAddress:compAddress,
                        compStatus:compStatus
     
                    },
                    success:function(data){
     					console.log(data);
                	}
            	});
            }

     });
}