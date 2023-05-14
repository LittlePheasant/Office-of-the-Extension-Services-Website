import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!:FormGroup;
  hide:boolean=true;
  email:any;
  password:any;

  constructor(
    public _fb:FormBuilder,
    private _api:ApiService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(form: any){
    const credentials = {
      email: form.controls['email'].value,
      password: form.controls['password'].value
    }

    //console.log(credentials);

      this._api.toLogin(credentials)
    .subscribe((response: any) => {
      console.log(response);
      const data = response.data; // Assuming user_id and user_role are within a data object

      if (response.success === 1) {
        alert('Login successful');

        const userId = data.user_id;
        const role = data.user_role;
        // console.log('User ID:', data.user_id);
        // console.log('User Role:', data.user_role);
        // Redirect or perform any other actions

        if (role === 'Admin') {
          //this.router.navigate(['/admin-dashboard', userId]);
          this.router.navigate(['/main/dashboard']);
        } else {
          //this.router.navigate(['/user-dashboard', userId]);
          console.log('user');
        }


      } else {
        console.log('Login failed:', response.message);
        // Handle login error, such as displaying an error message to the user
      }
    }, (error: any) => {
      console.log(error);
      // Handle login error, such as displaying an error message to the user
    });
  };
  


}


//update your login.php
// <?php
//     header("Access-Control-Allow-Origin: *");
//     header("Access-Control-Allow-Headers: access");
//     header("Access-Control-Allow-Methods: POST");
//     header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
//     header("Content-Type: application/json; charset=UTF-8");

//     error_reporting(E_ERROR);
//     $method = $_SERVER['REQUEST_METHOD'];

//     if ($method == "OPTIONS") {
//         die();
//     }

    
//     if ($_SERVER['REQUEST_METHOD'] !== 'POST') :
//         http_response_code(405);
//         echo json_encode([
//             'success' => 0,
//             'message' => 'Bad Request!.Only POST method is allowed',
//         ]);
//         exit;
//     endif;
//     require 'db_connect.php';
//     $database = new Operations();
//     $conn = $database->dbConnection();

//     $data = json_decode(file_get_contents("php://input"), true);

//     //var_dump($data);
    
//     $email = $data['email'];
//     $password = $data['password'];

//     try {
//         $sql = "SELECT user_id, user_role FROM `user_tbl` WHERE username = '$email' AND user_password = '$password'";
//         $stmt = $conn->prepare($sql);
//         $stmt->execute();


//         if ($stmt->rowCount() > 0) {

//             $row = $stmt->fetch(PDO::FETCH_ASSOC);
//             $fetchedData = $row;

//             //http_response_code(201);
//             header('Content-Type: application/json');
//             echo json_encode([
//                 'success' => 1,
//                 'data' => $fetchedData,
//                 //'message' => 'Valid credentials',
//             ]);
//         } else {
//             header('Content-Type: application/json');
//             echo json_encode([
//                 'success' => 0,
//                 'message' => 'Invalid credentials'
//             ]);
//         }
        
//     } catch (PDOException $e) {
//         http_response_code(500);
//         echo json_encode([
//             'success' => false,
//             'message' => $e->getMessage(),
//         ]);
//         exit;
//     }
// ?>

