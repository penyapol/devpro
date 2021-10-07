$(document).ready(function(){

login_user();


});

function login_user()
{
	$(document).on('click','#btn_login',function(){
		var uname = $('#uname').val();
		var pword = $('#pword').val();

			if (uname =="" | pword =="") {
				$('#errmsg').html('<div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-triangle"></i><strong> Username and Password is Required!</strong></div>');
			} else {
				$.ajax({

					url: 'php_action/redirect_login.php',
					method: 'POST',
					data:{
						uname:uname,
						pword:pword
					},
					success:function(data) {
					$('#errmsg').html(data);
					}
				});
			}
	})

	$(document).on('click','#loginclose',function(){
		$('form').trigger('reset');
		$('#errmsg').html("");
	});

		$(document).on('click','#loginindex',function(){
		$('form').trigger('reset');
		$('#errmsg').html("");
	});


}



