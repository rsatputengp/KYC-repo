var app = angular.module("loginApp", []);
            app.controller("loginController", function ($scope, $http, $timeout ) {
//            $scope.uRl = "http://118.185.131.13:9091/";
//            $scope.uRl = "http://123.63.89.76:9091/";   
//            $scope.uRl = "http://10.0.115.6:9091/"; 
//            $scope.uRl = "http://103.252.168.96:83/";
//            $scope.uRl = "http://10.20.20.14:9099/";
                
            
//              $scope.loadingImg = false;
            var protocal = window.location.protocol;
            var host = window.location.host;
            $scope.uRl = protocal+"//"+host+"/";
            console.log($scope.uRl);
            
            $scope.signUpContainerVisible = false;
            $scope.loginContainerVisible = true;
            $scope.resetContainerVisible = false;
            $scope.encryptedPassword = '';
            $scope.onShowSignUpPage = function () {
            $scope.signUpContainerVisible = true;
            $scope.loginContainerVisible = false;
            $scope.resetContainerVisible = false;
            };
            
            $scope.onShowLoginPage = function () {
            $scope.signUpContainerVisible = false;
            $scope.loginContainerVisible = true;
            $scope.resetContainerVisible = false;
            };
            
            $scope.onShowResetPage = function () {
            $scope.signUpContainerVisible = false;
            $scope.loginContainerVisible = false;
            $scope.resetContainerVisible = true;
            };
            
            $scope.onSignUpSubmit = function ()
            {
//            $scope.loadingImg = true;
            $scope.resData = null;
            $scope.url = $scope.uRl + "user/getuser/" + $scope.userName;
            $http.get($scope.url)
                    .then(function (response) {
                    $scope.resData = response.data;
                    if ($scope.resData.userName === $scope.userName) {
                    alert("Account already exist !");
                    $scope.onShowSignUpPage();
                    } else
                    {
                    // Encrypt the password using MD5 (you should use a more secure method on the server side)
                    $scope.encryptedPassword = CryptoJS.MD5($scope.userPassword).toString();                        
                    if ($scope.userPasswordC === $scope.userPassword) {
                    $scope.url = $scope.uRl +"user/add/" + $scope.userName + "/"
                            + $scope.encryptedPassword + "/" + $scope.branchName + "/" 
                            + $scope.userType + "/" + "Pending" + "/" + "Remark :";
                    $http.get($scope.url)
                            .then(function (response) {
                            },
                                    function (error) {
                                    console.log(error);
                                    });
                    alert("Account Succesfully Created.");
                    $scope.onShowLoginPage();
                    } else {
                    alert("Confirm Password should be match to Password.");
                    }
                    }
//                      $scope.loadingImg = false;
                    })
                    .catch(function (error) {
                        console.error("Error:", error);
                    });
            };
            
            $scope.onLoginSubmit = function ()
            {
            if ($scope.encryptedPassword === '') {
            
            // Encrypt the password using MD5 (you should use a more secure method on the server side)
            $scope.encryptedPassword = CryptoJS.MD5($scope.userPassword).toString();                 
            }
//            $scope.loadingImg = true;
            var url = $scope.uRl +"user/login/" + $scope.userName + "/" + $scope.encryptedPassword;
//            alert($scope.encryptedPassword);
            $http.get(url)
                    .then(function (response) {
                    var userRecord = response.data;
//                    alert(userRecord.userPassword);
//                    alert(userRecord.userName === $scope.userName && userRecord.userPassword === $scope.encryptedPassword);
                if (userRecord.userName === $scope.userName && userRecord.userPassword === $scope.encryptedPassword) {
                        
                    if(userRecord.userIdStatus === "Accept"){
                        
                    if (userRecord.userType === "COPs") {
                    //Admin 
                    window.location.href = $scope.uRl +"user_asCOPs.html";
                    localStorage.setItem("user_asCOPs", JSON.stringify(userRecord));
                    alert("Account Successfully Login.");
                    } else if (userRecord.userType === "BOM") {
                    window.location.href = $scope.uRl +"user_asBOM.html";
                    localStorage.setItem("user_asBOM", JSON.stringify(userRecord));
                    alert("Account Successfully Login.");
                    }else if (userRecord.userType === "Super User") {
                    window.location.href = $scope.uRl +"super_user.html";
                    localStorage.setItem("super_user", JSON.stringify(userRecord));
                    alert("Account Successfully Login.");
                    }
                    
                    }else if (userRecord.userIdStatus === "Pending") {
                        alert("User is not Activated by Super user yet!");
                        $scope.onShowLoginPage();
                    }else if (userRecord.userIdStatus === "Reject") {
                        alert("Please, check the username & password !");
                        $scope.onShowLoginPage();
                    }else if (userRecord.userIdStatus === "Terminate") {
                        alert("Please, check the username & password !");
                        $scope.onShowLoginPage();
                    }else if (userRecord.userIdStatus === "Reset_Password") {
                        alert("User is not Activated by Super user yet!");
                        $scope.onShowLoginPage();
                    }

                    } else {
//                    alert("" === response.data);    
//                    alert(response.data);    
//                    alert(response);    
                    alert("Please, check the username & password !");
                    $scope.onShowLoginPage();
                    }
//                    $scope.loadingImg = false;
                    
                    }, function (error) {
                    $scope.onShowLoginPage();
                    console.log(error);
//                    $scope.loadingImg = false;
                    });
                    
            $scope.loginContainerVisible = false;
            };
            
            $scope.onResetSubmit = function ()
            {
            if ($scope.encryptedPassword === '') {
            
            // Encrypt the password using MD5 (you should use a more secure method on the server side)
            $scope.encryptedPassword = CryptoJS.MD5($scope.userPassword).toString();                 
            }  
//            $scope.loadingImg = true;
            if ($scope.userPasswordC === $scope.userPassword) {
            var url = $scope.uRl +"user/reset/" + $scope.userName + "/" + $scope.encryptedPassword;
            $http.get(url)
                    .then(function (response) {
                    var userRecord = response.data;
                if (!(userRecord)) {
                    
                    alert("Please, check the username");
                    
                    } else {
                    alert("Password Updated");
                    $scope.onShowLoginPage();
                    }
//                   $scope.loadingImg = false;
                    }, function (error) {
                    $scope.onShowLoginPage();
                    console.log(error);
//                    $scope.loadingImg = false;
                    });
            $scope.loginContainerVisible = false;
            } else {
            alert("Confirm Password should be match to Password.");
            }    
            };
            
            });
