var app = angular.module("myApp", []);
app.controller("cont", function ($scope, $http) {
    var protocal = window.location.protocol;
    var host = window.location.host;
    $scope.uRl = protocal + "//" + host + "/";
    console.log($scope.uRl);

    $scope.userRecord = JSON.parse(window.localStorage.getItem("user_asBOM"));
    if (($scope.userRecord)) {
        $scope.list = [];
        $scope.visibelForAadharDetails = [];
        $scope.branchlist = [];

//       form button for add applicant and aadhar

        $scope.addApplicantButton = false;
        $scope.showApp2 = false;
        $scope.showApp3 = false;
        $scope.showAadhar2 = false;
        $scope.showAadhar3 = false;
        $scope.showAadharforInd = true; 
        $scope.showAdharforjoint = false;



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



        $scope.addApplicant = function () {
           
            $scope.showApp3 = true;
            $scope.showAadhar3 = true;
        };

        $scope.changeForm = function (selectedOption) {
            var jointType = selectedOption.startsWith("Joint");
            if (jointType) {
                $scope.addApplicantButton = true;
                $scope.showApp2 = true;
                $scope.showAadhar2 = true;
                $scope.showAadharforInd = false; 
                $scope.showAdharforjoint = true;
                $scope.showAadhar3 = false;
                $scope.showApp3 = false;

            } else if ("Sole Proprietorship" === selectedOption || "Partnership Module" === selectedOption ||
                    "Public/Private LTD Company" === selectedOption || "TASC" === selectedOption) {
                $scope.addApplicantButton = true;
                $scope.showApp2 = true;
                $scope.showAadhar2 = true;
                $scope.showAadharforInd = false; 
                $scope.showAdharforjoint = true;
                $scope.showAadhar3 = false;
                $scope.showApp3 = false;
            } else {
                $scope.addApplicantButton = false;
                $scope.showApp2 = false;
                $scope.showApp3 = false;
                $scope.showAadhar2 = false;
                $scope.showAadhar3 = false;
                $scope.showAadharforInd = true; 
                 $scope.showAdharforjoint = false;

            }

        };


//         $scope.cancelForm =  function(){
//            window.location.href = $scope.uRl + "user_asBOM.html";
//            alert($scope.uRl + "user_asBOM.html");
//         };


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
//                             var panf = document.getElementById("pan").files[0];
//                             $scope.panfile = panf;
//                             var adharf = document.getElementById("adhar").files[0];
//                             $scope.adharfile = adharf;
//                             var applicationFormf = document.getElementById("applicationForm").files[0];
//                             $scope.applicationFormfile = applicationFormf;


                            var form = new FormData();
                            var loopForPan = document.getElementById("pan").files.length;
                            for (let i = 0; i < loopForPan; i++) {
                                form.append("pan", document.getElementById("pan").files[i], document.getElementById("pan").localName);
                            }

                            var loopForAadhar = document.getElementById("adhar").files.length;
                            for (let i = 0; i < loopForAadhar; i++) {
                                form.append("adhar", document.getElementById("adhar").files[i], document.getElementById("adhar").localName);
                            }

                            var loopForApplicationForm = document.getElementById("applicationForm").files.length;
                            for (let i = 0; i < loopForApplicationForm; i++) {
                                form.append("applicationForm", document.getElementById("applicationForm").files[i], document.getElementById("applicationForm").localName);
                            }

                            var loopForOtherDoc = document.getElementById("otherDoc").files.length;
                            for (let i = 0; i < loopForOtherDoc; i++) {
                                form.append("otherDoc", document.getElementById("otherDoc").files[i], document.getElementById("otherDoc").localName);
                            }

//                             switch (loopsize) {
//                                 case 5:
////            alert(loopsize === "5");
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[0], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[1], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[2], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[3], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[4], document.getElementById("otherDoc").localName);
//                                     break;
//                                 case 4:
////            alert(loopsize === "4");
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[0], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[1], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[2], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[3], document.getElementById("otherDoc").localName);
//                                     break;
//                                 case 3:
////            alert(loopsize === "3");
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[0], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[1], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[2], document.getElementById("otherDoc").localName);
//                                     break;
//                                 case 2:
////            alert(loopsize === "2");
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[0], document.getElementById("otherDoc").localName);
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[1], document.getElementById("otherDoc").localName);
//                                     break;
//                                 case 1:
////            alert(loopsize === "1");
//                                     form.append("otherDoc", document.getElementById("otherDoc").files[0], document.getElementById("otherDoc").localName);
//                                     break;
//                             }



                            form.append("firstName", $scope.firstName);
                            if ($scope.midName !== undefined) {
                                form.append("midName", $scope.midName);
                            } else {
                                form.append("midName", " ");
                            }
                            form.append("lastName", $scope.lastName);
                            form.append("adharNo", $scope.adharNo);
                            form.append("mobileNo", $scope.mobileNo);
                            form.append("accountType", $scope.accountType);
                            form.append("branchName", $scope.branchName);
                            form.append("status", "Pending at COPs");

                            if (response.data.length === 0) {
                                form.append("remark", "BOM : Data Submitted");
                            } else {
                                form.append("remark", "BOM : Existing Customer KYC Verification for " + $scope.accountType + "");
                            }

                            form.append("panStatus", "");
                            form.append("adharStatus", "");
                            form.append("otherDocStatus", "");
                            form.append("applicationFormStatus", "");
                            form.append("approvedBy", "");
                            form.append("uploadedBy", $scope.userRecord.userName + "(BOM)");
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
                                var Ack = $scope.forId[17];
                                if ("" === response) {
                                    alert("Already have an Account Type for this Aadhar number !");
                                } else {
                                    alert("Data successfully submitted. Ack_No( " + Ack.substring(6) + " )");
                                    window.location.href = $scope.uRl + "user_asBOM.html";
                                }
                            });
                        }
                    }, function (error) {
                        console.log(error);
                    });

        };


    } else {
        window.location.href = $scope.uRl + "index.html";
    }
});




function checkVal(message) {
    ///---> start
    var fileInput = document.getElementById(message);
    var fileName = fileInput.value;
    if (message === "pan" || message === "adhar") {

        // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
        var allowedFormats = ['.jpg', '.jpeg', '.png', '.webp'];
        var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
        if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === -1) {
            // File format is not supported
            alert("Unsupported file format. \n Please choose a file with .jpg, .jpeg, .png, .webp extension.");
            // Clear the file input
            fileInput.value = '';
        } else {
            if (fileInput.files.length <= 2) {
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
            } else {
                fileInput.value = '';
                alert("You can only select up to 2 files.");
            }
        }
        ///--> end
    } else if (message === "otherDoc") {
        ///---> start   
        ///--------------------> for 1024kb
        // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
        var allowedFormats = ['.pdf'];
        var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
        if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === -1) {
            // File format is not supported
            alert("Unsupported file format.\n Please choose a file with .pdf extension.");
            // Clear the file input
            fileInput.value = '';
        } else {
//            alert(fileInput.files.length);    
//            alert(fileInput.files.length <= 5);    
            if (fileInput.files.length <= 5) {
                // File format is supported, check file size
                var maxSizeKB = 1024; // Maximum file size in kilobytes
                var fileSize = 0; // Convert to kilobytes

                for (var i = 0; i < fileInput.files.length; i++) {
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

            } else {
                fileInput.value = '';
                alert("You can only select up to 5 files.");
            }

        }


    } else if (message === "applicationForm") {
        ///---------------------------------------> Client Form for 1024kb
        // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
        var allowedFormats = ['.pdf'];
        var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
        if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === -1) {
            // File format is not supported
            alert("Unsupported file format.\n Please choose a file with .pdf extension.");
            // Clear the file input
            fileInput.value = '';
        } else {
            if (fileInput.files.length <= 2) {
                // File format is supported, check file size
                var maxSizeKB = 1024; // Maximum file size in kilobytes
                var fileSize = fileInput.files[0].size / 1024; // Convert to kilobytes

                if (fileSize > maxSizeKB) {
                    // File size exceeds the limit
                    alert("File size exceeds the maximum allowed limit of 1024KB.");
                    // Clear the file input
                    fileInput.value = '';
                } else {
                    // File format and size are supported, you can proceed with the file
//                    alert('File format and size are supported.');
                }
            } else {
                fileInput.value = '';
                alert("You can only select up to 2 files.");
            }
        }

    }
    //--> end
}
