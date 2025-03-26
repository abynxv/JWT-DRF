# JWT-DjangoRestFramework
This project demonstrates a basic implementation of JWT (JSON Web Token) authentication using Django. It includes endpoints for user register, login, token refresh, and logout functionality. 
The JWT is used to secure the API and ensure that only authenticated users can access protected routes.

Setup Instructions

  ->Clone the Project-Create a directory, open a terminal in the directory path, and clone the  project:

      git clone https://github.com/abynxv/JWT-DjangoRestFramework.git
  ->Install Virtual Environment
  
      pip install virtualenv
      
  ->Create a virtual environment within the directory:

      python -m venv venv_name  # On Windows
      python3 -m venv venv_name  # On macOS/Linux

  ->Activate Virtual Environment

      venv_name\Scripts\activate       # On Windows
      source venv_name/bin/activate    # On macOS/Linux

  ->Install Requirements

      pip install django djangorestframework djangorestframework_simplejwt

  ->Open the project in VS Code:

      code .

  ->Open a terminal in VS Code, navigate to the project directory, and run the server:
  
      cd myproject
      python manage.py runserver
      
API Endpoints

1.Register

    Endpoint  : api/register/
    Method    : POST     - Register User
    Data      : JSON     - {"name": "string", "email": "email", "password": "password"}
    
2.Login

    Endpoint  : api/login/
    Method    : POST     - User Login
    Data      : JSON     - {"name": "string", "password": "password"}
    
3.Token Refresh

    Endpoint  : api/token/refresh/
    Method    : POST     - Refresh Token
    Data      : JSON     - {"refresh": "Refresh Token"} 
    
2.Logout

    Endpoint  : api/logout/
    Headers   - Key   :  Authorization
                Value :  Bearer "Your Access Token"
