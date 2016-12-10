var verbose = true;
$( document ).ready( function(){
  $( '#downloadButton' ).on( 'click', function(){
    //check for valid email address
    if( emailOK() ){
      if( verbose ) console.log( 'downloadButton on click' );
      // assemble object to send
      var objectToSend = {
        email: $( '#emailIn ').val(),
        windows: $( '#win' ).is(':checked')
      }; // end objectToSend
      if( verbose ) console.log( 'sending:', objectToSend );
      // let 'em know what's up
      $( '#infoOut').html( 'authenticating...' );
      // ajax call
      $.ajax({
        url: 'betaDownload.php',
        type: 'POST',
        data: objectToSend,
        success: function( data ){
          if( verbose ) console.log( 'back from ajax with:', data );
          if( data == 'false'){
            // let 'em know what's up
            $( '#infoOut').html( 'User not found.<br>Try again or sign up at <a href="http://devnari.com">devnari.com</a>' );
          } // end no user found
          else if( data.includes( "http" ) ){
            // let 'em know what's up
            $( '#infoOut').html( 'download starting...THANKS!' );
            location.href=data;
          }
          else {
            // let 'em know what's up
            $( '#infoOut').html( data );
          } // end user found
        }, // end success
        error: function( error ){
          if( verbose ) console.log( 'error:', error );
        } // end error
      }) // end ajax call
    } // end email OK
    else{
      // let 'em know what's up
      $( '#infoOut').html( 'please enter a valid email' );
    } // end email!OK
  }); // end downloadButton on click

  var emailOK = function(){
    var email = $( '#emailIn ').val();
    if( email.indexOf( '@' ) <= 0 || email.indexOf( '.' ) <= 0 || email.indexOf( '.' ) == email.length-1 ){
      return false;
    }
    else{
      return true;
    }
  }; //end emailOK
});
