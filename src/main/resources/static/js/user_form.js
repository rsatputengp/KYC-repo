            var app = angular.module("myApp", []);
            app.controller("cont", function ($scope, $http) {
//            $scope.uRl = "http://118.185.131.13:9091/"; 
//            $scope.uRl = "http://123.63.89.76:9091/";  
//            $scope.uRl = "http://10.0.115.6:9091/"; 
//            $scope.uRl = "http://103.252.168.96:83/";
//            $scope.uRl = "http://10.20.20.14:9099/";
            var protocal = window.location.protocol;
            var host = window.location.host;
            $scope.uRl = protocal+"//"+host+"/";
            console.log($scope.uRl);            

            $scope.userRecord = JSON.parse(window.localStorage.getItem("user_asBOM"));
            if (($scope.userRecord)){
            $scope.list = [];
            $scope.visibelForAadharDetails = [];
            $scope.branchlist = [];
            $scope.branchName = $scope.userRecord.branchName;
                $scope.url = "branch/getuser/" + $scope.userRecord.userName;
                $http.get($scope.uRl + $scope.url)
                        .then(function (response) {
                        $scope.branchlist = response.data.branchNameList;  
                        }, function (error) {
                        console.log(error);
                        });
                
            $scope.validateForm = function () {
            var accountTypeval = document.getElementById("accountType").value;
            if (accountTypeval === "Silver Saving" || accountTypeval === "Normal Saving" ||
                    accountTypeval === "Current Wealth" || accountTypeval === "Current Gold" ||
                    accountTypeval === "Normal Current") {
            return true;
            } else {
            alert("Please! select the Account Type.");
            return false;
            }
            };
            
            $scope.aadharcheck = function () {
                if (!($scope.adharNo)) {
                    alert("                             Please enter the Aadhar Number! \n\
                                                    OR \n\
                            Check the enter digit is 12 or not.");
                $scope.visibelForAadharDetails = false;
                $scope.list = null;
                } else {
                $scope.visibelForAadharDetails = false;    
                $scope.list = null;    
                $scope.url = "kyc/getAadhar/" + $scope.adharNo;
                $http.get($scope.uRl + $scope.url)
                        .then(function (response) {
                        $scope.list = response.data;  
                        if ($scope.list.length > 0) {
                        $scope.visibelForAadharDetails = true;
                        } else {
                        $scope.list = null;
                        $scope.visibelForAadharDetails = false;
                        alert("Aadhar not present in KYC.");
                        }
                        }, function (error) {
                        console.log(error);
                        });
                }
            };

            $scope.formdata = function () {
                $scope.url = "kyc/getAadhar/" + $scope.adharNo;
                $http.get($scope.uRl + $scope.url)
                        .then(function (response) {
                        $scope.list = response.data;  
//                        alert($scope.list.length);
//                        alert(response.data);
                        if ($scope.list.length === 0) {
                        $scope.visibelForAadharDetails = false;
                        } else {
                        $scope.list = null;
                        $scope.visibelForAadharDetails = false;
                        }
                        
            if ($scope.validateForm()) {
            var panf = document.getElementById("pan").files[0];
            $scope.panfile = panf;
            var adharf = document.getElementById("adhar").files[0];
            $scope.adharfile = adharf;
//            var otherDocf = document.getElementById("otherDoc").files[0];
//            $scope.otherDocfile = otherDocf;
            var applicationFormf = document.getElementById("applicationForm").files[0];
            $scope.applicationFormfile = applicationFormf;
            var form = new FormData();
            form.append("pan", document.getElementById("pan").files[0], document.getElementById("pan").localName);
            form.append("adhar", document.getElementById("adhar").files[0], document.getElementById("adhar").localName);
            
            var loopsize = document.getElementById("otherDoc").files.length;
//            alert("size :--"+loopsize);
//            for (let i = 0; i < loopsize; i++) {
//            form.append("otherDoc", item, document.getElementById("otherDoc").files[i]);
//            }

            switch (loopsize) {
            case 5:
//            alert(loopsize === "5");
            form.append("otherDoc", document.getElementById("otherDoc").files[0],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[1],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[2],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[3],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[4],document.getElementById("otherDoc").localName);
            break;
            case 4:
//            alert(loopsize === "4");
            form.append("otherDoc", document.getElementById("otherDoc").files[0],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[1],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[2],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[3],document.getElementById("otherDoc").localName);
            break;
            case 3:
//            alert(loopsize === "3");
            form.append("otherDoc", document.getElementById("otherDoc").files[0],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[1],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[2],document.getElementById("otherDoc").localName);
            break;
            case 2:
//            alert(loopsize === "2");
            form.append("otherDoc", document.getElementById("otherDoc").files[0],document.getElementById("otherDoc").localName);
            form.append("otherDoc", document.getElementById("otherDoc").files[1],document.getElementById("otherDoc").localName);
            break;
            case 1:
//            alert(loopsize === "1");
            form.append("otherDoc", document.getElementById("otherDoc").files[0],document.getElementById("otherDoc").localName);
            break;
            }
            
            
            form.append("applicationForm", document.getElementById("applicationForm").files[0], document.getElementById("applicationForm").localName);
            form.append("firstName", $scope.firstName);
            form.append("midName", $scope.midName);
            form.append("lastName", $scope.lastName);
            form.append("adharNo", $scope.adharNo);
            form.append("mobileNo", $scope.mobileNo);
            form.append("accountType", $scope.accountType);
            form.append("branchName", $scope.branchName);
            form.append("status", "Pending at COPs");
//            console.log("" === response);
//            console.log(null === response);
//            console.log("" === response.data);
//            console.log(null === response.data);
//            console.log(response.length);
//            console.log(response.data.length);
//            console.log(response.length === 0);
//            console.log(response.data.length === 0);
//            console.log(response.length === "0");
//            console.log(response.data.length === "0");
            if (response.data.length === 0) {
//                alert("remark"+ "BOM : Data Submitted");
            form.append("remark", "BOM : Data Submitted");
            } else {
//                alert("remark"+ "BOM : KYC Verification for "+$scope.accountType+ "");
            form.append("remark", "BOM : Existing Customer KYC Verification for "+$scope.accountType+ "");
            }
            
            form.append("panStatus", "");
            form.append("adharStatus", "");
            form.append("otherDocStatus", "");
            form.append("applicationFormStatus", "");
            form.append("approvedBy", "");
            form.append("uploadedBy", $scope.userRecord.userName+"(BOM)");
            console.log(form);
            var settings = {
            "url": $scope.uRl + "kyc/save",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
            };
            $.ajax(settings).done(function (response) {
            $scope.forId = response.split(",");    
            var Ack =$scope.forId[17];    
            if ("" === response) {
            alert("Already have an Account Type for this Aadhar number !");
            } else {
                    alert("Data successfully submitted. Ack_No( "+Ack.substring(6)+" )");
//                    console.log(response);
                    window.location.href = $scope.uRl + "user_asBOM.html";
            
            }
            });
            }
                        }, function (error) {
                        console.log(error);
                        });
            
            };
            
            
            } else{
            window.location.href = $scope.uRl + "index.html";
            }
            });
            
            function checkVal(message) {
            ///---> start
            var fileInput = document.getElementById(message);
            var fileName = fileInput.value;
            if (message === "pan" || message === "adhar"){

            // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
            var allowedFormats = ['.jpg', '.jpeg', '.png', '.webp'];
            var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
            if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === - 1) {
            // File format is not supported
            alert("Unsupported file format. \n Please choose a file with .jpg, .jpeg, .png, .webp extension.");
            // Clear the file input
            fileInput.value = '';
            } else {
            // File format is supported, check file size
            var maxSizeKB = 250; // Maximum file size in kilobytes
            var fileSize = fileInput.files[0].size / 1024; // Convert to kilobytes

            if (fileSize > maxSizeKB) {
            // File size exceeds the limit
            alert("File size exceeds the maximum allowed limit of 250KB.");
            // Clear the file input
            fileInput.value = '';
            } else {
            // File format and size are supported, you can proceed with the file
//                    alert('File format and size are supported.');
            }
            }
            ///--> end
            } else{
            ///---> start   
            ///--------------------> for 1024kb
            if (message === "otherDoc"){
            // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
            var allowedFormats = ['.pdf'];
            var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
            if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === - 1) {
            // File format is not supported
            alert("Unsupported file format.\n Please choose a file with .pdf extension.");
            // Clear the file input
            fileInput.value = '';
            } else {
//            alert(fileInput.files.length);    
//            alert(fileInput.files.length <= 5);    
            if(fileInput.files.length <= 5){
            // File format is supported, check file size
            var maxSizeKB = 1024; // Maximum file size in kilobytes
            var fileSize = 0 ; // Convert to kilobytes
            
            for (var i=0; i < fileInput.files.length; i++) {
                fileSize += fileInput.files[i].size;
            }
//            alert("size : "+fileSize);
            if (fileSize > maxSizeKB * maxSizeKB) {
            // File size exceeds the limit
            alert("File size exceeds the maximum allowed limit of 1024KB.");
            // Clear the file input
            fileInput.value = '';
            } else {
            // File format and size are supported, you can proceed with the file
//                    alert('File format and size are supported.');
            }
            
            }else {
              fileInput.value = '';  
              alert("You can only select up to 5 files.");
            }
            
            }
            
            }else {
	///---------------------------------------> for 500kb
            // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
            var allowedFormats = ['.pdf'];
            var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
            if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === - 1) {
            // File format is not supported
            alert("Unsupported file format.\n Please choose a file with .pdf extension.");
            // Clear the file input
            fileInput.value = '';
            } else {
            // File format is supported, check file size
            var maxSizeKB = 500; // Maximum file size in kilobytes
            var fileSize = fileInput.files[0].size / 1024; // Convert to kilobytes

            if (fileSize > maxSizeKB) {
            // File size exceeds the limit
            alert("File size exceeds the maximum allowed limit of 500KB.");
            // Clear the file input
            fileInput.value = '';
            } else {
            // File format and size are supported, you can proceed with the file
//                    alert('File format and size are supported.');
            }
            }
            }

            }
            //--> end
            }
