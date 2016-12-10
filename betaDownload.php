<?php
  $email_in = $_POST[ "email" ];
  $windows_in = $_POST[ "windows" ];
  require( "../scripts/config.php" );
  $connect = mysqli_connect( DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE );
   if( mysqli_connect_errno() ){
    echo "ERROR: failed to connect to server";
    $connect->close();
   }
   else{
      if( $windows_in == 'true' ){
        $platform = 'win';
      }
      else{
        $platform = 'mac';
      }
     $sql1 = "INSERT INTO betaDownloads ( `email`, `platform` )
     VALUES ( '$email_in', '$platform'  )";
     if( $connect->query( $sql1 ) === TRUE ){
       $sql = "SELECT * FROM fans WHERE email='$email_in' LIMIT 1";
       $result = $connect->query($sql);
       if( $result->num_rows != '0' )
       {
         if( $windows_in == 'true' ){
           echo 'http://devnari.com/downloads/newtone_playableBeta_1_1a2_PC.zip';
         }
         else{
           echo 'http://devnari.com/downloads/newtone_playableBeta_1_1a2_mac.zip';
         }
       } // end user found
       else {
         echo 'false';
       } // end no user
     }
     else{
       echo "ERROR: " . $connect->error;
     }

    $connect->close();
   }
?>
