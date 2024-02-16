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

            $scope.userRecord = JSON.parse(window.localStorage.getItem("user_asCOPs"));
            if(($scope.userRecord)){ 
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
                    $http.get($scope.uRl + "kyc/getAllBranchListOfCOPs/"+$scope.userRecord.userName)
                            .then(function (response) {
                            $scope.list = response.data;
                            },
                                    function (error) {
                                    console.log(error);
                                    });
                    }
            $scope.logout = function () {
            alert("Logout Successfully.");
                    window.location.href = $scope.uRl + "index.html";
                    $scope.list = null;
                    window.localStorage.removeItem("user_asCOPs");
            }
            $scope.messApprove = function (messageApprove) {
            if (messageApprove.endsWith("Approved")) {
            $scope.notVisible_OnApprovalBOM = false;
            $scope.notVisible_OnApprovalCOPs = false;
            $scope.notVisible_OnAccept = true;
            $scope.notVisible_OnAcceptP = true;
            }else if (messageApprove.endsWith("Pending at COPs")) {
            $scope.notVisible_OnApprovalBOM = true;
            $scope.notVisible_OnApprovalCOPs = false;
            $scope.notVisible_OnAccept = false;
            $scope.notVisible_OnAcceptP = true;            
            }else if (messageApprove.endsWith("Pending at BOM")) {
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
            }
            $scope.refresh();
                    $scope.list1 = [];
                    $scope.reco = null;
                    $scope.panfile = null;
                    $scope.adharfile = null;
                    $scope.otherDocfile = [];
                    $scope.applicationFormfile = null;
                    $scope.recoApplicationForm = null;
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
                    var aaplicationfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.list1.applicationForm, "applicationForm");
                    $scope.recoApplicationForm = URL.createObjectURL(aaplicationfile);
                    
                    var loopsize = $scope.list1.otherDoc.length;
                    for (var i = 0; i < loopsize; i++) {
                    var otherDocfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.list1.otherDoc[i] , "otherDoc_"+i);
                    $scope.recoOtherDoc.push(URL.createObjectURL(otherDocfile));
                    }
                    
                                    //
                            if ($scope.reco.panStatus === "Accept" && $scope.reco.adharStatus === "Accept"
                                && $scope.reco.otherDocStatus === "Accept" &&
                                $scope.reco.applicationFormStatus === "Accept"){
                            $scope.notVisible_OnAccept = true;
                            }
                            //
                            if ($scope.reco.panStatus === "Accept") {
                            $scope.panstatus = $scope.reco.panStatus;
                            }
                            if ($scope.reco.adharStatus === "Accept") {
                            $scope.adharstatus = $scope.reco.adharStatus;
                            }
                            if ($scope.reco.otherDocStatus === "Accept") {
                            $scope.otherDocstatus = $scope.reco.otherDocStatus;
                            }
                            if ($scope.reco.applicationFormStatus === "Accept") {
                            $scope.applicationFormstatus = $scope.reco.applicationFormStatus;
                            }
                            //
                            },
                                    function (error) {
                                    console.log(error);
                                    });
                    } else {
                    alert("Data already verified !");
                    }
                    }
            $scope.viewPdfApp = function (){
                window.open($scope.recoApplicationForm ,'_blank');
            };
            $scope.viewPdfOther = function (){
                
                var loopsize = $scope.recoOtherDoc.length;
                    for (var i = 0; i < loopsize; i++) {
                        window.open($scope.recoOtherDoc[i],'_blank');
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
            }
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
            }

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
            }

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
            }
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
            }

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
            }
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
            }

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
            }
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
            }

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
            }
            //

            ///
            $scope.searchByFiled = function (message) {
            $scope.search = message;
            }
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
                    alert("Downloading Data Excel file.");
                    var jsonData  = $scope.list;
                    /////
                        // Format the date column
            jsonData.forEach(function (item) {
                if (item.date instanceof Date) {
                    item.date = formatDate(item.date);
                } else if (typeof item.date === 'string') {
                    item.date = formatDate(new Date(item.date));
                }
                item.timeStam = item.timeStam.join(', ');
            });
            
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
                    hour12: true,
                };
                var timePart = date.toLocaleTimeString('en-IN', options);
                
                return `${datePart} ${timePart.replace(/\b(?:am|pm)\b/g, match => match.toUpperCase())}`;
            }

            var filteredData = jsonData.map(function (item) {
                return {
                    'code': item.code,
                    'firstName': item.firstName,
                    'midName': item.midName,
                    'lastName': item.lastName,
                    'adharNo': item.adharNo,
                    'mobileNo': item.mobileNo,
                    'accountType': item.accountType,
                    'branchName': item.branchName,
                    'status': item.status,
                    'remark': item.remark,
                    'date': item.date,
                    'panStatus': item.panStatus,
                    'adharStatus': item.adharStatus,
                    'otherDocStatus': item.otherDocStatus,
                    'applicationFormStatus': item.applicationFormStatus,
                    'timeStam': item.timeStam,
                    'approvedBy': item.approvedBy,
                    'uploadedBy': item.uploadedBy
                };
            });
            
            var ws = XLSX.utils.json_to_sheet(filteredData);
            // Format the 'adharNo' column as a number
            var adharNoColumnIndex = filteredData.length > 0 && 'adharNo' in filteredData[0]
                ? filteredData[0]['adharNo'].length - 1
                : 0;
                
            for (var row = 1; row <= filteredData.length; ++row) {
                var cellAddress = { c: adharNoColumnIndex, r: row };
                XLSX.utils.format_cell(ws[cellAddress], '0'); // '0' format code for numbers
            }
            
            // Add table properties
            var range = XLSX.utils.decode_range(ws['!ref']);
            ws['!autofilter'] = { ref: XLSX.utils.encode_range(range) };
            ws['!cols'] = [
                    { width: 30 }, // Adjust column widths as needed
                    { width: 15 }, 
                    { width: 15 },
                    { width: 15 },
                    { width: 15 },
                    { width: 15 },
                    { width: 15 },
                    { width: 15 },
                    { width: 15 },
                    { width: 25 },
                    { width: 25 },
                    { width: 15 },
                    { width: 15 },
                    { width: 15 },
                    { width: 15 },
                    { width: 30 },
                    { width: 15 },
                    { width: 15 },
                ];
                
                // Apply table style
                ws['!theme'] = {
                    'tableStyles': {
                        '1': {
                            'name': 'TableStyleMedium9',
                            'showFirstColumn': false,
                            'showLastColumn': false,
                            'showRowStripes': true,
                            'showColumnStripes': true
                        }
                    }
                };
            
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Save the Excel file
            XLSX.writeFile(wb, $scope.userRecord.userName+'_report.xlsx');        
            }

            $scope.dataURLtoFilefunction = function (dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                    while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
            }
 
            $scope.validateForm = function () {
                    var remarkVal = document.getElementById("remark").value;
                    if (remarkVal === "") {
                        alert("Please! Put the Remark.");
                        return false;
                    } else {
                        return true;
                    }

            }
            
            $scope.isRemarkTooLong = false;
//            $scope.submitForm = function() {
//                alert( "22222 :" + $scope.remark !== undefined && ($scope.remark.length <=  240));
//                alert( "11111 :" + $scope.remark &&( $scope.remark.length <= 240));
//            if ($scope.remark !== undefined && ($scope.remark.length <=  240)) {
//                $scope.isRemarkTooLong = true;
//            } else {
//                $scope.isRemarkTooLong = false;
//                // Process the form data or perform any other actions
//                alert("Please enter a remark with a maximum of 240 characters .");
//                // Continue with form submission
//            }
//            }
            
            $scope.remark = '';

            $scope.checkLength = function() {
            var maxLength = 255;
            
            if ($scope.remark !== undefined) {
    
            if ($scope.remark.length > maxLength) {
                alert('Text length should not exceed ' + maxLength + ' characters.');
                // You can also update $scope.inputText or take other actions as needed.
                $scope.remark = $scope.remark.substring(0, maxLength);
                $scope.isRemarkTooLong = false;
            }else{
                $scope.isRemarkTooLong = true;
            }
            
            }else{
                alert('Text length should not exceed ' + maxLength + ' characters.');
            }
    
            
            }
            
            $scope.viewRemark = function(mess) {
                alert(mess);
            }
            $scope.userEdit = function (message) {
            if(message === "Pending at BOM"){
//          --->
            $scope.checkLength();
            if($scope.validateForm() && $scope.isRemarkTooLong){
            $scope.checkFiled();    
                    $scope.panfile = $scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.pan, document.getElementById("imgPan").localName);
                    $scope.adharfile = $scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.adhar, document.getElementById("imgAdhar").localName);
                    var len = $scope.reco.otherDoc.length;
                        for (var i = 0; i < len; i++) {
//                        $scope.otherDocfile.push(document.getElementById("inputotherDoc").files[j]);
                        $scope.otherDocfile.push($scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.otherDoc[i], "otherDoc"));
                        }
                    $scope.applicationFormfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.applicationForm, "applicationForm");
                    var form = new FormData();
                    form.append("pan", $scope.panfile);
                    form.append("adhar", $scope.adharfile);
            var loopsize = $scope.otherDocfile.length;        
            switch (loopsize) {
            case 5:
//            alert(loopsize === "5");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            form.append("otherDoc", $scope.otherDocfile[1],$scope.otherDocfile[1].localName);
            form.append("otherDoc", $scope.otherDocfile[2],$scope.otherDocfile[2].localName);
            form.append("otherDoc", $scope.otherDocfile[3],$scope.otherDocfile[3].localName);
            form.append("otherDoc", $scope.otherDocfile[4],$scope.otherDocfile[4].localName);
            break;
            case 4:
//            alert(loopsize === "4");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            form.append("otherDoc", $scope.otherDocfile[1],$scope.otherDocfile[1].localName);
            form.append("otherDoc", $scope.otherDocfile[2],$scope.otherDocfile[2].localName);
            form.append("otherDoc", $scope.otherDocfile[3],$scope.otherDocfile[3].localName);
            break;
            case 3:
//            alert(loopsize === "3");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            form.append("otherDoc", $scope.otherDocfile[1],$scope.otherDocfile[1].localName);
            form.append("otherDoc", $scope.otherDocfile[2],$scope.otherDocfile[2].localName);
            break;
            case 2:
//            alert(loopsize === "2");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            form.append("otherDoc", $scope.otherDocfile[1],$scope.otherDocfile[1].localName);
            break;
            case 1:
//            alert(loopsize === "1");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            break;
            }
//                    form.append("otherDoc", $scope.otherDocfile);
                    form.append("applicationForm", $scope.applicationFormfile);
                    form.append("id", $scope.id);
                    form.append("firstName", $scope.firstName);
                    form.append("midName", $scope.midName);
                    form.append("lastName", $scope.lastName);
                    form.append("adharNo", $scope.adharNo);
                    form.append("mobileNo", $scope.mobileNo);
                    form.append("accountType", $scope.accountType);
                    form.append("branchName", $scope.branchName);
                    form.append("status", "By "+$scope.userRecord.userName+"(COPs) : "+message);
                    if (message === "Approved") {
            form.append("remark", "");
            } else {
            form.append("remark", "COPs : "+$scope.remark);
            }

            // List view image Accept Reject
            if ($scope.panstatus === "Accept" || $scope.panstatus === "Reject") {
            form.append("panStatus", $scope.panstatus);
            } else{
            form.append("panStatus", $scope.reco.panStatus);
            }

            if ($scope.adharstatus === "Accept" || $scope.adharstatus === "Reject") {
            form.append("adharStatus", $scope.adharstatus);
            } else{
            form.append("adharStatus", $scope.reco.adharStatus);
            }

            if ($scope.otherDocstatus === "Accept" || $scope.otherDocstatus === "Reject") {
            form.append("otherDocStatus", $scope.otherDocstatus);
            } else{
            form.append("otherDocStatus", $scope.reco.otherDocStatus);
            }

            if ($scope.applicationFormstatus === "Accept" || $scope.applicationFormstatus === "Reject") {
            form.append("applicationFormStatus", $scope.applicationFormstatus);
            } else{
            form.append("applicationFormStatus", $scope.reco.applicationFormStatus);
            }

            //
            if (message === "Approved") {
            form.append("approvedBy", $scope.userRecord.userName);
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
//            <-------
            }else if(message === "Approved"){
//            --->    
            $scope.checkFiled();    
                    $scope.panfile = $scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.pan, document.getElementById("imgPan").localName);
                    $scope.adharfile = $scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.adhar, document.getElementById("imgAdhar").localName);
                    var len = $scope.reco.otherDoc.length;
                        for (var i = 0; i < len; i++) {
//                        $scope.otherDocfile.push(document.getElementById("inputotherDoc").files[j]);
                        $scope.otherDocfile.push($scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.otherDoc[i], "otherDoc"));
                        }
                    $scope.applicationFormfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.applicationForm, "applicationForm");
                    var form = new FormData();
                    form.append("pan", $scope.panfile);
                    form.append("adhar", $scope.adharfile);
            var loopsize = $scope.otherDocfile.length;        
            switch (loopsize) {
            case 5:
//            alert(loopsize === "5");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            form.append("otherDoc", $scope.otherDocfile[1],$scope.otherDocfile[1].localName);
            form.append("otherDoc", $scope.otherDocfile[2],$scope.otherDocfile[2].localName);
            form.append("otherDoc", $scope.otherDocfile[3],$scope.otherDocfile[3].localName);
            form.append("otherDoc", $scope.otherDocfile[4],$scope.otherDocfile[4].localName);
            break;
            case 4:
//            alert(loopsize === "4");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            form.append("otherDoc", $scope.otherDocfile[1],$scope.otherDocfile[1].localName);
            form.append("otherDoc", $scope.otherDocfile[2],$scope.otherDocfile[2].localName);
            form.append("otherDoc", $scope.otherDocfile[3],$scope.otherDocfile[3].localName);
            break;
            case 3:
//            alert(loopsize === "3");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            form.append("otherDoc", $scope.otherDocfile[1],$scope.otherDocfile[1].localName);
            form.append("otherDoc", $scope.otherDocfile[2],$scope.otherDocfile[2].localName);
            break;
            case 2:
//            alert(loopsize === "2");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            form.append("otherDoc", $scope.otherDocfile[1],$scope.otherDocfile[1].localName);
            break;
            case 1:
//            alert(loopsize === "1");
            form.append("otherDoc", $scope.otherDocfile[0],$scope.otherDocfile[0].localName);
            break;
            }
//                    form.append("otherDoc", $scope.otherDocfile);
                    form.append("applicationForm", $scope.applicationFormfile);
                    form.append("id", $scope.id);
                    form.append("firstName", $scope.firstName);
                    form.append("midName", $scope.midName);
                    form.append("lastName", $scope.lastName);
                    form.append("adharNo", $scope.adharNo);
                    form.append("mobileNo", $scope.mobileNo);
                    form.append("accountType", $scope.accountType);
                    form.append("branchName", $scope.branchName);
                    form.append("status", "By "+$scope.userRecord.userName+"(COPs) : "+message);
                    if (message === "Approved") {
            form.append("remark", "");
            } else {
            form.append("remark", "COPs : "+$scope.remark);
            }

            // List view image Accept Reject
            if ($scope.panstatus === "Accept" || $scope.panstatus === "Reject") {
            form.append("panStatus", $scope.panstatus);
            } else{
            form.append("panStatus", $scope.reco.panStatus);
            }

            if ($scope.adharstatus === "Accept" || $scope.adharstatus === "Reject") {
            form.append("adharStatus", $scope.adharstatus);
            } else{
            form.append("adharStatus", $scope.reco.adharStatus);
            }

            if ($scope.otherDocstatus === "Accept" || $scope.otherDocstatus === "Reject") {
            form.append("otherDocStatus", $scope.otherDocstatus);
            } else{
            form.append("otherDocStatus", $scope.reco.otherDocStatus);
            }

            if ($scope.applicationFormstatus === "Accept" || $scope.applicationFormstatus === "Reject") {
            form.append("applicationFormStatus", $scope.applicationFormstatus);
            } else{
            form.append("applicationFormStatus", $scope.reco.applicationFormStatus);
            }

            //
            if (message === "Approved") {
            form.append("approvedBy", $scope.userRecord.userName+"(COPs)");
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
            
            }else{
                window.location.href = $scope.uRl +"index.html";
            }
            });
            
            app.filter('continuousSubstringFilter', function() {
            return function(list, search, columns) {
            if (!search) {
            return list;
            }

            search = search.toLowerCase();
            
                    return list.filter(function(record) {
                    return columns.some(function(column) {
                            var columnValue = record[column] && record[column].toString().toLowerCase();
                            return columnValue && columnValue.includes(search);
                        });
                  });
                };
            });
