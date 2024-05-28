 var app = angular.module("myApp", []);
 app.controller("cont", function ($scope, $http, $interval) {
     var protocal = window.location.protocol;
     var host = window.location.host;
     $scope.uRl = protocal + "//" + host + "/";
     console.log($scope.uRl);

     $scope.userRecord = JSON.parse(window.localStorage.getItem("user_asCOPs"));
     if (($scope.userRecord)) {
         $scope.panstatus = null;
         $scope.adharstatus = null;
         $scope.otherDocstatus = null;
         $scope.applicationFormstatus = null;
         $scope.notVisible_OnAccept = false;
         $scope.notVisible_OnAcceptP = false;
         $scope.formContainerVisible = false;
         $scope.listContainerVisible = true;

//                    //registration page
//                    $scope.onShowSignUpPage = function () {
//                    $scope.signUpContainerVisible = true;
//                            $scope.loginContainerVisible = false;
//                    };
//                    $scope.onShowLoginPage = function () {
//                    $scope.signUpContainerVisible = false;
//                            $scope.loginContainerVisible = true;
//                    };
//                    

         $scope.list = [];
         $scope.accout_Type = null;
         $scope.refresh = function () {
             $http.get($scope.uRl + "kyc/getAllBranchListOfCOPs/" + $scope.userRecord.userName)
                     .then(function (response) {
                         $scope.list = response.data;
                     },
                             function (error) {
                                 console.log(error);
                             });
         };
         $scope.logout = function () {
             alert("Logout Successfully.");
             window.location.href = $scope.uRl + "index.html";
             $scope.list = null;
             window.localStorage.removeItem("user_asCOPs");
         };
         $scope.messApprove = function (messageApprove) {
             if (messageApprove.endsWith("Approved")) {
                 $scope.notVisible_OnApprovalBOM = false;
                 $scope.notVisible_OnApprovalCOPs = false;
                 $scope.notVisible_OnAccept = true;
                 $scope.notVisible_OnAcceptP = true;
             } else if (messageApprove.endsWith("Pending at COPs")) {
                 $scope.notVisible_OnApprovalBOM = true;
                 $scope.notVisible_OnApprovalCOPs = false;
                 $scope.notVisible_OnAccept = false;
                 $scope.notVisible_OnAcceptP = true;
             } else if (messageApprove.endsWith("Pending at BOM")) {
                 $scope.notVisible_OnApprovalBOM = false;
                 $scope.notVisible_OnApprovalCOPs = true;
                 $scope.notVisible_OnAccept = false;
                 $scope.notVisible_OnAcceptP = false;
             }
         };
         $scope.openImageInPopup = function (imageUrl) {
             var largeImage = document.getElementById(imageUrl);
             var newWindow = window.open();
             newWindow.document.write('<html><body style="margin:0;"><img src="' + largeImage.src + '"></img></body></html>');
         };
         $scope.refresh();
         $scope.list1 = [];
         $scope.reco = null;
         $scope.panfile = [];
         $scope.adharfile = [];
         $scope.otherDocfile = [];
         $scope.applicationFormfile = [];
         $scope.recoPan = [];
         $scope.recoAdhar = [];
         $scope.recoApplicationForm = [];
         $scope.recoOtherDoc = [];

         $scope.editRecord = function (record) {
             $scope.checkFiled();
//            if ($scope.record.status === "update") {
             if (true) {
                 $scope.formContainerVisible = true;
                 $scope.listContainerVisible = false;
                 $http.get($scope.uRl + "kyc/get/" + record.id)
                         .then(function (response) {
                             $scope.list1 = response.data;
                             $scope.reco = $scope.list1;
                             $scope.id = $scope.list1.id;
                             $scope.firstName = $scope.list1.firstName;
                             $scope.midName = $scope.list1.midName;
                             $scope.lastName = $scope.list1.lastName;
                             $scope.adharNo = $scope.list1.adharNo;
                             $scope.mobileNo = $scope.list1.mobileNo;
                             $scope.accout_Type = $scope.list1.accountType;
                             $scope.accountType = $scope.list1.accountType;
                             $scope.branchName = $scope.list1.branchName;
                             $scope.status = $scope.list1.status;
                             $scope.oldRemark = $scope.list1.remark;
                             $scope.approvedBy = $scope.list1.approvedBy;
                             $scope.uploadedBy = $scope.list1.uploadedBy;
                             $scope.messApprove($scope.list1.status);
                             //
                             var loopForPan = $scope.list1.pan.length;
                             for (var i = 0; i < loopForPan; i++) {
                                 var panfile = $scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.list1.pan[i], "pan_" + i);
                                 $scope.recoPan.push(URL.createObjectURL(panfile));
                             }

                             var loopForAdhar = $scope.list1.adhar.length;
                             for (var i = 0; i < loopForAdhar; i++) {
                                 var adharfile = $scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.list1.adhar[i], "adhar_" + i);
                                 $scope.recoAdhar.push(URL.createObjectURL(adharfile));
                             }
                             var loopForApplication = $scope.list1.applicationForm.length;
                             for (var i = 0; i < loopForApplication; i++) {
                                 var aplicationfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.list1.applicationForm[i], "applicationForm_" + i);
                                 $scope.recoApplicationForm.push(URL.createObjectURL(aplicationfile));
                             }

                             var loopForOtherDoc = $scope.list1.otherDoc.length;
                             for (var i = 0; i < loopForOtherDoc; i++) {
                                 var otherDocfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.list1.otherDoc[i], "otherDoc_" + i);
                                 $scope.recoOtherDoc.push(URL.createObjectURL(otherDocfile));
                             }
                             //
                             if ($scope.reco.panStatus === "Accept" && $scope.reco.adharStatus === "Accept"
                                     && $scope.reco.otherDocStatus === "Accept" &&
                                     $scope.reco.applicationFormStatus === "Accept") {
                                 $scope.notVisible_OnAccept = true;
                             }
                             //
                             if ($scope.reco.panStatus === "Accept") {
                                 $scope.panstatus = $scope.reco.panStatus;
                                 document.getElementById('onPanStatusAC').click();
                             } else if ($scope.reco.panStatus === "Reject") {
                                 document.getElementById('onPanStatusRE').click();
                             }

                             if ($scope.reco.adharStatus === "Accept") {
                                 $scope.adharstatus = $scope.reco.adharStatus;
                                 document.getElementById('onAdharStatusAC').click();
                             } else if ($scope.reco.adharStatus === "Reject") {
                                 document.getElementById('onAdharStatusRE').click();
                             }

                             if ($scope.reco.otherDocStatus === "Accept") {
                                 $scope.otherDocstatus = $scope.reco.otherDocStatus;
                                 document.getElementById('onOtherDocsStatusAC').click();
                             } else if ($scope.reco.otherDocStatus === "Reject") {
                                 document.getElementById('onOtherDocsStatusRE').click();
                             }

                             if ($scope.reco.applicationFormStatus === "Accept") {
                                 $scope.applicationFormstatus = $scope.reco.applicationFormStatus;
                                 document.getElementById('onapplicationFormStatusAC').click();
                             } else if ($scope.reco.applicationFormStatus === "Reject") {
                                 document.getElementById('onapplicationFormStatusRE').click();
                             }
                             //
                         },
                                 function (error) {
                                     console.log(error);
                                 });
             } else {
                 alert("Data already verified !");
             }
         };
         $scope.viewPan = function () {
             var loopsize = $scope.recoPan.length;
             for (var i = 0; i < loopsize; i++) {
                 window.open($scope.recoPan[i], '_blank');
             }
         };
         $scope.viewAadhar = function () {
             var loopsize = $scope.recoAdhar.length;
             for (var i = 0; i < loopsize; i++) {
                 window.open($scope.recoAdhar[i], '_blank');
             }

         };
         $scope.viewPdfApp = function () {
             var loopsize = $scope.recoApplicationForm.length;
             for (var i = 0; i < loopsize; i++) {
                 window.open($scope.recoApplicationForm[i], '_blank');
             }
         };
         $scope.viewPdfOther = function () {
             var loopsize = $scope.recoOtherDoc.length;
             for (var i = 0; i < loopsize; i++) {
                 window.open($scope.recoOtherDoc[i], '_blank');
             }

         };
         $scope.deleterecord = function (record) {
             $http.get($scope.uRl + "kyc/delete/" + record.id)
                     .then(function (response) {
                         alert("Data successfully deleted.");
                     },
                             function (error) {
                                 console.log(error);
                             });
         };
         //
         $scope.checkFiled = function () {
             if ($scope.panstatus === "Accept" && $scope.adharstatus === "Accept"
                     && $scope.otherDocstatus === "Accept"
                     && $scope.applicationFormstatus === "Accept") {
                 $scope.notVisible_OnAccept = true;
                 $scope.isButtonDisabled = false;
             } else {
                 $scope.notVisible_OnAccept = false;
                 $scope.isButtonDisabled = true;
             }
         };

         //
//            $scope.onPanStatus = function (event) {
//            var button = event.target;
//            var button1 = document.getElementById("onPanStatusAC");
//            var button1Cl = window.getComputedStyle(button1).backgroundColor;
//            var button2 = document.getElementById("onPanStatusRE");
//            var button2Cl = window.getComputedStyle(button2).backgroundColor;
//            if (button1Cl === button2Cl) {
//            
//            } else {
//            }
//            button.style.backgroundColor = "blue";
//            button.style.color = "white";
//            $scope.panstatus = button.textContent;
//            $scope.checkFiled();
//            }
//            //
//            $scope.onAdharStatus = function (event) {
//            var button = event.target;
//            button.style.backgroundColor = "blue";
//            button.style.color = "white";
//            $scope.adharstatus = button.textContent;
//            $scope.checkFiled();
//            }
//            //
//            $scope.onOtherDocsStatus = function (event) {
//            var button = event.target;
//            button.style.backgroundColor = "blue";
//            button.style.color = "white";
//            $scope.otherDocstatus = button.textContent;
//            $scope.checkFiled();
//            }

         //new logic 1
         //onPanStatus Accept
         $scope.onPanStatusA = function (message) {
             var buttonA = document.getElementById(message);
             var buttonR = document.getElementById("onPanStatusRE");
             buttonA.style.backgroundColor = "blue";
             buttonA.style.color = "white";
             buttonR.style.backgroundColor = "#BE4347";
             buttonR.style.color = "white";
             $scope.panstatus = buttonA.textContent;
             $scope.checkFiled();
         };

//            ac = #85B87E; re = #BE4347;
         //onPanStatus Reject
         $scope.onPanStatusR = function (message) {
             var buttonR = document.getElementById(message);
             var buttonA = document.getElementById("onPanStatusAC");
             buttonR.style.backgroundColor = "blue";
             buttonR.style.color = "white";
             buttonA.style.backgroundColor = "#85B87E";
             buttonA.style.color = "white";
             $scope.panstatus = buttonR.textContent;
             $scope.checkFiled();
         };
         ///
         //onAdharStatusA Accept
         $scope.onAdharStatusA = function (message) {
             var buttonA = document.getElementById(message);
             var buttonR = document.getElementById("onAdharStatusRE");
             buttonA.style.backgroundColor = "blue";
             buttonA.style.color = "white";
             buttonR.style.backgroundColor = "#BE4347";
             buttonR.style.color = "white";
             $scope.adharstatus = buttonA.textContent;
             $scope.checkFiled();
         };

//            ac = #85B87E; re = #BE4347;
         //onAdharStatusR Reject
         $scope.onAdharStatusR = function (message) {
             var buttonR = document.getElementById(message);
             var buttonA = document.getElementById("onAdharStatusAC");
             buttonR.style.backgroundColor = "blue";
             buttonR.style.color = "white";
             buttonA.style.backgroundColor = "#85B87E";
             buttonA.style.color = "white";
             $scope.adharstatus = buttonR.textContent;
             $scope.checkFiled();
         };
         ///
         //onOtherDocsStatusA Accept
         $scope.onOtherDocsStatusA = function (message) {
             var buttonA = document.getElementById(message);
             var buttonR = document.getElementById("onOtherDocsStatusRE");
             buttonA.style.backgroundColor = "blue";
             buttonA.style.color = "white";
             buttonR.style.backgroundColor = "#BE4347";
             buttonR.style.color = "white";
             $scope.otherDocstatus = buttonA.textContent;
             $scope.checkFiled();
         };

//            ac = #85B87E; re = #BE4347;
         //onOtherDocsStatusR Reject 
         $scope.onOtherDocsStatusR = function (message) {
             var buttonR = document.getElementById(message);
             var buttonA = document.getElementById("onOtherDocsStatusAC");
             buttonR.style.backgroundColor = "blue";
             buttonR.style.color = "white";
             buttonA.style.backgroundColor = "#85B87E";
             buttonA.style.color = "white";
             $scope.otherDocstatus = buttonR.textContent;
             $scope.checkFiled();
         };
         //
         ///
         //onapplicationFormStatusA Accept
         $scope.onapplicationFormStatusA = function (message) {
             var buttonA = document.getElementById(message);
             var buttonR = document.getElementById("onapplicationFormStatusRE");
             buttonA.style.backgroundColor = "blue";
             buttonA.style.color = "white";
             buttonR.style.backgroundColor = "#BE4347";
             buttonR.style.color = "white";
             $scope.applicationFormstatus = buttonA.textContent;
             $scope.checkFiled();
         };

//            ac = #85B87E; re = #BE4347;
         //onapplicationFormStatusR Reject 
         $scope.onapplicationFormStatusR = function (message) {
             var buttonR = document.getElementById(message);
             var buttonA = document.getElementById("onapplicationFormStatusAC");
             buttonR.style.backgroundColor = "blue";
             buttonR.style.color = "white";
             buttonA.style.backgroundColor = "#85B87E";
             buttonA.style.color = "white";
             $scope.applicationFormstatus = buttonR.textContent;
             $scope.checkFiled();
         };
         //

         ///
         $scope.searchByFiled = function (message) {
             $scope.search = message;
         };
         $scope.aadharcheck = function () {
             if (!($scope.adharNo) && !($scope.remark)) {
                 alert("Please enter the Aadhar Number!");
             } else {
                 $scope.url = "kyc/getAadhar/" + $scope.adharNo;
                 $http.get($scope.uRl + $scope.url)
                         .then(function (response) {
                             $scope.list_Adhar = response.data;
                         }, function (error) {
                             console.log(error);
                         });
             }
         };


         ///// Json to Excel file
         $scope.exportToExcel = function () {
             var jsonData = $scope.list;

             function formatDate(date) {
                 var options = {
                     day: '2-digit',
                     month: '2-digit',
                     year: 'numeric'
                 };
                 var datePart = date.toLocaleDateString('en-IN', options);

                 options = {
                     hour: '2-digit',
                     minute: '2-digit',
                     second: '2-digit',
                     hour12: true
                 };
                 var timePart = date.toLocaleTimeString('en-IN', options);

                 return `${datePart} ${timePart.replace(/\b(?:am|pm)\b/g, match => match.toUpperCase())}`;
             }

             // Format the date and timestamp columns
             jsonData.forEach(function (item) {
                 if (item.date instanceof Array) {
                     item.date = item.date.map(d => formatDate(new Date(d))).join(', ');
                 } else if (typeof item.date === 'string') {
                     item.date = formatDate(new Date(item.date));
                 }
                 item.timeStam = item.timeStam.join(', ');
             });



             var filteredData = jsonData.map(function (item) {
                 debugger;

                 var dateOfArray = item.date.split(",");
                 var dateLength = dateOfArray.length;
                 var noOfCycle = dateLength / 2;
                 var start = moment(dateOfArray[0], "DD/MM/YYYY hh:mm:ss A");
                 var end = moment(dateOfArray[dateLength - 1], "DD/MM/YYYY hh:mm:ss A");

                 var diff = moment.duration(end.diff(start));

                 var days = Math.floor(diff.asDays());
                 var hours = diff.hours();
                 var minutes = diff.minutes();
                 var seconds = diff.seconds();

                 var duration = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
                 var finalStatusCondition = item.status.endsWith("Approved");
                 var finalStatus = "";
                 var ApprovedDate = "";
                 if (true === finalStatusCondition) {
                     finalStatus = "Approved";
                     ApprovedDate = dateOfArray[dateLength - 1].substring(1, 11);
                 } else {
                     finalStatus = "Pending";
                 }
                 return {
                     'Code': item.code,
                     'Name': item.firstName + " " + item.midName + " " + item.lastName,
                     'Aadhar No': item.adharNo,
                     'Mobile No': item.mobileNo,
                     'Account Type': item.accountType,
                     'Branch Name': item.branchName,
                     'Status': item.status,
                     'Remark': item.remark,
                     'Form Filled Date': dateOfArray[0].substring(0, 10),
                     'Date': item.date,
                     'Pan Status': item.panStatus,
                     'Aadhar_Status': item.adharStatus,
                     'Other_Doc_Status': item.otherDocStatus,
                     'Application_Form_Status': item.applicationFormStatus,
                     'Time Stamp': item.timeStam,
                     'Approved By': item.approvedBy,
                     'Uploaded By': item.uploadedBy,
                     'No Of Cycle': noOfCycle,
                     'Duration': duration,
                     'Final Status': finalStatus,
                     'Approved Date': ApprovedDate
                 };
             });

             var ws = XLSX.utils.json_to_sheet(filteredData);

             // Initialize ws['!cols'] as an array
             ws['!cols'] = [];

             // Auto-detect column lengths
             var range = XLSX.utils.decode_range(ws['!ref']);
             for (var C = range.s.c; C <= range.e.c; ++C) {
                 var maxLength = filteredData.reduce((max, row) => {
                     var cell = row[XLSX.utils.encode_col(C)];
                     return cell ? Math.max(max, cell.length) : max;
                 }, 10);
                 ws['!cols'][C] = {width: maxLength};
             }

             // Adding auto filter and styling
             ws['!autofilter'] = {ref: XLSX.utils.encode_range(range)};

             var wb = XLSX.utils.book_new();
             XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

             // Save the Excel file
             XLSX.writeFile(wb, $scope.userRecord.userName + '_report.xlsx');
             alert("Downloading Data Excel file.");
             location.reload();
         };


         $scope.dataURLtoFilefunction = function (dataurl, filename) {
             var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                     bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
             while (n--) {
                 u8arr[n] = bstr.charCodeAt(n);
             }
             return new File([u8arr], filename, {type: mime});
         };

         $scope.validateForm = function () {
             var remarkVal = document.getElementById("remark").value;
             if (remarkVal === "") {
                 alert("Please! Put the Remark.");
                 return false;
             } else {
                 return true;
             }

         };

         $scope.isRemarkTooLong = false;

         $scope.remark = '';

         $scope.checkLength = function () {
             debugger;
             var maxLength = 4900;

             if ($scope.remark !== undefined) {

                 if ($scope.remark.length > maxLength) {
                     alert('Text length should not exceed ' + maxLength + ' characters.');
                     // You can also update $scope.inputText or take other actions as needed.
                     $scope.remark = $scope.remark.substring(0, maxLength);
                     $scope.isRemarkTooLong = false;
                 } else {
                     $scope.isRemarkTooLong = true;
                 }

             } else {
                 alert('Text length should not exceed ' + maxLength + ' characters.');
             }


         };

         $scope.viewRemark = function (mess) {
             var messRemark = mess.split(",");
             var messLength = messRemark.length;
             alert(messRemark[messLength - 1]);
         };

         $scope.userEdit = function (message) {
             debugger;
             if (message === "Pending at BOM") {
////          --->
                 $scope.checkLength();
                 if ($scope.validateForm() && $scope.isRemarkTooLong) {
                     $scope.checkFiled();
                     //
                     var loopForPan = $scope.reco.pan.length;
                     for (var i = 0; i < loopForPan; i++) {
                         $scope.panfile.push($scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.pan[i], "pan_" + i));
                     }

                     var loopForAdhar = $scope.reco.adhar.length;
                     for (var i = 0; i < loopForAdhar; i++) {
                         $scope.adharfile.push($scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.adhar[i], "adhar_" + i));
                     }
                     var loopForApplication = $scope.reco.applicationForm.length;
                     for (var i = 0; i < loopForApplication; i++) {
                         $scope.applicationFormfile.push($scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.applicationForm[i], "applicationForm_" + i));
                     }

                     var loopForOtherDoc = $scope.reco.otherDoc.length;
                     for (var i = 0; i < loopForOtherDoc; i++) {
                         $scope.otherDocfile.push($scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.otherDoc[i], "otherDoc_" + i));
                     }
                     //

                     var form = new FormData();

                     var loopForPanfile = $scope.panfile.length;
                     for (let j = 0; j < loopForPanfile; j++) {
                         form.append("pan", $scope.panfile[j], $scope.panfile[j].localName);
                     }

                     var loopForAadharfile = $scope.adharfile.length;
                     for (let j = 0; j < loopForAadharfile; j++) {
                         form.append("adhar", $scope.adharfile[j], $scope.adharfile[j].localName);
                     }

                     var loopForApplicationFormfile = $scope.applicationFormfile.length;
                     for (let j = 0; j < loopForApplicationFormfile; j++) {
                         form.append("applicationForm", $scope.applicationFormfile[j], $scope.applicationFormfile[j].localName);
                     }

                     var loopForOtherDocfile = $scope.otherDocfile.length;
                     for (let j = 0; j < loopForOtherDocfile; j++) {
                         form.append("otherDoc", $scope.otherDocfile[j], $scope.otherDocfile[j].localName);
                     }
                     form.append("id", $scope.id);
                     form.append("firstName", $scope.firstName);
                     form.append("midName", $scope.midName);
                     form.append("lastName", $scope.lastName);
                     form.append("adharNo", $scope.adharNo);
                     form.append("mobileNo", $scope.mobileNo);
                     form.append("accountType", $scope.accountType);
                     form.append("branchName", $scope.branchName);
                     form.append("status", "By " + $scope.userRecord.userName + "(COPs) : " + message);
                     if (message === "Approved") {
                         form.append("remark", "");
                     } else {
                         form.append("remark", "COPs : " + $scope.remark);
                     }

                     // List view image Accept Reject
                     if ($scope.panstatus === "Accept" || $scope.panstatus === "Reject") {
                         form.append("panStatus", $scope.panstatus);
                     } else {
                         form.append("panStatus", $scope.reco.panStatus);
                     }

                     if ($scope.adharstatus === "Accept" || $scope.adharstatus === "Reject") {
                         form.append("adharStatus", $scope.adharstatus);
                     } else {
                         form.append("adharStatus", $scope.reco.adharStatus);
                     }

                     if ($scope.otherDocstatus === "Accept" || $scope.otherDocstatus === "Reject") {
                         form.append("otherDocStatus", $scope.otherDocstatus);
                     } else {
                         form.append("otherDocStatus", $scope.reco.otherDocStatus);
                     }

                     if ($scope.applicationFormstatus === "Accept" || $scope.applicationFormstatus === "Reject") {
                         form.append("applicationFormStatus", $scope.applicationFormstatus);
                     } else {
                         form.append("applicationFormStatus", $scope.reco.applicationFormStatus);
                     }

                     //
                     if (message === "Approved") {
                         form.append("approvedBy", $scope.userRecord.userName + "(COPs)");
                     } else {
                         form.append("approvedBy", "");
                     }
                     //
                     form.append("uploadedBy", $scope.uploadedBy);
                     var settings = {
                         "url": $scope.uRl + "kyc/update",
                         "method": "POST",
                         "timeout": 0,
                         "processData": false,
                         "mimeType": "multipart/form-data",
                         "contentType": false,
                         "data": form
                     };

                     $.ajax(settings).done(function (response) {
                         alert("Data successfully submitted.");
                         location.reload();
                     });
                 }
////            <-------
             } else if (message === "Approved") {
                 debugger;
////            --->    
                 $scope.checkFiled();
                 //
                 var loopForPan = $scope.reco.pan.length;
                 for (var i = 0; i < loopForPan; i++) {
                     $scope.panfile.push($scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.pan[i], "pan_" + i));
                 }

                 var loopForAdhar = $scope.reco.adhar.length;
                 for (var i = 0; i < loopForAdhar; i++) {
                     $scope.adharfile.push($scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.adhar[i], "adhar_" + i));
                 }
                 var loopForApplication = $scope.reco.applicationForm.length;
                 for (var i = 0; i < loopForApplication; i++) {
                     $scope.applicationFormfile.push($scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.applicationForm[i], "applicationForm_" + i));
                 }

                 var loopForOtherDoc = $scope.reco.otherDoc.length;
                 for (var i = 0; i < loopForOtherDoc; i++) {
                     $scope.otherDocfile.push($scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.otherDoc[i], "otherDoc_" + i));
                 }
                 //

                 var form = new FormData();

                 var loopForPanfile = $scope.panfile.length;
                 for (let j = 0; j < loopForPanfile; j++) {
                     form.append("pan", $scope.panfile[j], $scope.panfile[j].localName);
                 }

                 var loopForAadharfile = $scope.adharfile.length;
                 for (let j = 0; j < loopForAadharfile; j++) {
                     form.append("adhar", $scope.adharfile[j], $scope.adharfile[j].localName);
                 }

                 var loopForApplicationFormfile = $scope.applicationFormfile.length;
                 for (let j = 0; j < loopForApplicationFormfile; j++) {
                     form.append("applicationForm", $scope.applicationFormfile[j], $scope.applicationFormfile[j].localName);
                 }

                 var loopForOtherDocfile = $scope.otherDocfile.length;
                 for (let j = 0; j < loopForOtherDocfile; j++) {
                     form.append("otherDoc", $scope.otherDocfile[j], $scope.otherDocfile[j].localName);
                 }
                 form.append("id", $scope.id);
                 form.append("firstName", $scope.firstName);
                 form.append("midName", $scope.midName);
                 form.append("lastName", $scope.lastName);
                 form.append("adharNo", $scope.adharNo);
                 form.append("mobileNo", $scope.mobileNo);
                 form.append("accountType", $scope.accountType);
                 form.append("branchName", $scope.branchName);
                 form.append("status", "By " + $scope.userRecord.userName + "(COPs) : " + message);
                 if (message === "Approved") {
                     form.append("remark", "Approved");
                 } else {
                     form.append("remark", "COPs : " + $scope.remark);
                 }

                 // List view image Accept Reject
                 if ($scope.panstatus === "Accept" || $scope.panstatus === "Reject") {
                     form.append("panStatus", $scope.panstatus);
                 } else {
                     form.append("panStatus", $scope.reco.panStatus);
                 }

                 if ($scope.adharstatus === "Accept" || $scope.adharstatus === "Reject") {
                     form.append("adharStatus", $scope.adharstatus);
                 } else {
                     form.append("adharStatus", $scope.reco.adharStatus);
                 }

                 if ($scope.otherDocstatus === "Accept" || $scope.otherDocstatus === "Reject") {
                     form.append("otherDocStatus", $scope.otherDocstatus);
                 } else {
                     form.append("otherDocStatus", $scope.reco.otherDocStatus);
                 }

                 if ($scope.applicationFormstatus === "Accept" || $scope.applicationFormstatus === "Reject") {
                     form.append("applicationFormStatus", $scope.applicationFormstatus);
                 } else {
                     form.append("applicationFormStatus", $scope.reco.applicationFormStatus);
                 }

                 //
                 if (message === "Approved") {
                     form.append("approvedBy", $scope.userRecord.userName + "(COPs)");
                 } else {
                     form.append("approvedBy", "");
                 }
                 //
                 form.append("uploadedBy", $scope.uploadedBy);
                 var settings = {
                     "url": $scope.uRl + "kyc/update",
                     "method": "POST",
                     "timeout": 0,
                     "processData": false,
                     "mimeType": "multipart/form-data",
                     "contentType": false,
                     "data": form
                 };

                 $.ajax(settings).done(function (response) {
                     alert("Data successfully submitted.");
                     location.reload();
                 });
//            <----
             }

         };

         // Set up the interval to call refresh every 1 minute (60000 milliseconds)
         var intervalPromise = $interval(function () {
             $scope.refresh();
         }, 5000);

         // Optionally, you can cancel the interval when the scope is destroyed to prevent memory leaks
         $scope.$on('$destroy', function () {
             if (intervalPromise) {
                 $interval.cancel(intervalPromise);
             }
         });

     } else {
         window.location.href = $scope.uRl + "index.html";
     }
 });

 app.filter('continuousSubstringFilter', function () {
     return function (list, search, columns) {
         if (!search) {
             return list;
         }

         search = search.toLowerCase();

         return list.filter(function (record) {
             return columns.some(function (column) {
                 var columnValue = record[column] && record[column].toString().toLowerCase();
                 return columnValue && columnValue.includes(search);
             });
         });
     };
 });
