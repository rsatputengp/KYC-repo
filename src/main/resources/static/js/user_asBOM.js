var app = angular.module("myApp", []);
app.controller("cont", function ($scope, $http, $interval) {
//            $scope.uRl = "http://118.185.131.13:9091/"; 
//            $scope.uRl = "http://123.63.89.76:9091/";  
//            $scope.uRl = "http://10.0.115.6:9091/"; 
//            $scope.uRl = "http://103.252.168.96:83/";
//            $scope.uRl = "http://10.20.20.14:9099/";
    var protocal = window.location.protocol;
    var host = window.location.host;
    $scope.uRl = protocal + "//" + host + "/";
    console.log($scope.uRl);

    $scope.userRecord = JSON.parse(window.localStorage.getItem("user_asBOM"));
    if (($scope.userRecord)) {
//            $scope.loadingImg = false;
        $scope.panstatus = null;
        $scope.adharstatus = null;
        $scope.otherDocstatus = null;
        $scope.applicationFormstatus = null;
        $scope.formContainerVisible = false;
        $scope.listContainerVisible = true;
        $scope.onShowSignUpPage = function () {
            $scope.signUpContainerVisible = true;
            $scope.loginContainerVisible = false;
        };
        $scope.onShowLoginPage = function () {
            $scope.signUpContainerVisible = false;
            $scope.loginContainerVisible = true;
        };
        $scope.list = [];
        $scope.list_Adhar = [];
        $scope.refresh = function () {
//            $scope.loadingImg = true;
            $http.get($scope.uRl + "kyc/getAllBranchListOfBOM/" + $scope.userRecord.userName)
                    .then(function (response) {
                        $scope.list = response.data;
//                    $scope.loadingImg = false;
                    }, function (error) {
                        console.log(error);
//                            $scope.loadingImg = false;
                    });
        };

        $scope.aadharcheck = function (adharNo) {
            if (!(adharNo)) {
                alert("    Please enter the Aadhar Number! \n\
                                                    OR \n\
                            Check the enter digit is 12 or not.");
                $scope.visibelForAadharDetails = false;
                $scope.list_Adhar = null;
            } else {
                $scope.visibelForAadharDetails = false;
                $scope.list_Adhar = null;
                $scope.url = "kyc/getAadhar/" + $scope.adharNo;
//                $scope.loadingImg = true;
                $http.get($scope.uRl + $scope.url)
                        .then(function (response) {
                            $scope.list_Adhar = response.data;
                            if ($scope.list_Adhar.length > 0) {
                                $scope.visibelForAadharDetails = true;
                            } else {
                                $scope.list_Adhar = null;
                                $scope.visibelForAadharDetails = false;
                                alert("Aadhar not present in KYC.");
                            }
//                        $scope.loadingImg = false;
                        }, function (error) {
                            console.log(error);
//                        $scope.loadingImg = false;
                        });
            }
        };

        $scope.logout = function () {
            alert("Logout Successfully.");
            window.location.href = $scope.uRl + "index.html";
            $scope.list = null;
            window.localStorage.removeItem("user_asBOM");
        };
        $scope.messApprove = function (messageApprove) {
            if (messageApprove.endsWith("Approved")) {
                $scope.notVisible_OnApprovalBOM = false;
                $scope.notVisible_OnApprovalCOPs = false;
                $scope.notVisible_OnApproval = false;
                $scope.Visible_OnApproval = true;
            } else if (messageApprove.endsWith("Pending at COPs")) {
                $scope.notVisible_OnApprovalBOM = true;
                $scope.notVisible_OnApprovalCOPs = false;
                $scope.notVisible_OnApproval = false;
                $scope.Visible_OnApproval = false;
            } else if (messageApprove.endsWith("Pending at BOM")) {
                $scope.notVisible_OnApprovalBOM = false;
                $scope.notVisible_OnApprovalCOPs = true;
                $scope.notVisible_OnApproval = true;
                $scope.Visible_OnApproval = false;
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
            if (true) {
                $scope.branchlist = [];
                $scope.branchName = $scope.userRecord.branchName;
                $scope.url = "branch/getuser/" + $scope.userRecord.userName;
//                $scope.loadingImg = true;
                $http.get($scope.uRl + $scope.url)
                        .then(function (response) {
//                        console.log(response);    
                            $scope.branchlist = response.data.branchNameList;
//                        $scope.loadingImg = false;
                        }, function (error) {
                            console.log(error);
//                        $scope.loadingImg = false;
                        });
                $scope.formContainerVisible = true;
                $scope.listContainerVisible = false;
                $http.get($scope.uRl + "kyc/get/" + record.id)
                        .then(function (response) {
                            $scope.list1 = response.data;


                            var applicantArray = $scope.list1.applicant;
                            var applicantloop = applicantArray.split(",");

                            var aadharArray = $scope.list1.adharNo;
                            var aadharloop = aadharArray.split(",");
                            var aadharloopsize = aadharloop.length;
                            if (aadharloopsize === 3) {
                                $scope.showApp2 = true;
                                $scope.showApp3 = true;
                                $scope.showAadhar1 = false;
                                $scope.showAadhar2 = false;
                                $scope.showAadhar3 = true;

                            } else if (aadharloopsize === 2) {
                                $scope.showApp2 = true;
                                $scope.showAadhar1 = false;
                                $scope.showAadhar2 = true;
                                $scope.showAadhar3 = false;

                            } else if (aadharloopsize === 1) {
                                $scope.showAadhar1 = true;
                                $scope.showAadhar2 = false;
                                $scope.showAadhar3 = false;

                            }

                            $scope.reco = $scope.list1;
                            $scope.id = $scope.list1.id;

                            if ($scope.showApp2 === true && $scope.showApp3 === true) {
                                $scope.adharNo1 = aadharloop[0];
                                $scope.adharNo2 = aadharloop[1];
                                $scope.adharNo3 = aadharloop[2];

                                $scope.applicant1 = applicantloop[0];
                                $scope.applicant2 = applicantloop[1];
                                $scope.applicant3 = applicantloop[2];

                            } else if ($scope.showApp2 === true) {
                                $scope.adharNo1 = aadharloop[0];
                                $scope.adharNo2 = aadharloop[1];

                                $scope.applicant1 = applicantloop[0];
                                $scope.applicant2 = applicantloop[1];

                            } else {
                                $scope.adharNo = aadharloop[0];
                                
                                $scope.applicant1 = applicantloop[0];
                            }

//                            $scope.firstName = $scope.list1.firstName;
//                            $scope.midName = $scope.list1.midName;
//                            $scope.lastName = $scope.list1.lastName;
//                            $scope.adharNo = $scope.list1.adharNo;
                            $scope.mobileNo = $scope.list1.mobileNo;
                            $scope.accountType = $scope.list1.accountType;
                            $scope.branchName = $scope.list1.branchName;
                            $scope.status = $scope.list1.status;
                            $scope.oldRemark = $scope.list1.remark;
                            $scope.approvedBy = $scope.list1.approvedBy;
                            $scope.uploadedBy = $scope.list1.uploadedBy;
                            $scope.messApprove($scope.list1.status);
                            $scope.panstatus = $scope.list1.panStatus;
                            $scope.adharstatus = $scope.list1.adharStatus;
                            $scope.otherDocstatus = $scope.list1.otherDocStatus;
                            $scope.applicationFormstatus = $scope.list1.applicationFormStatus;

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
                                var aaplicationfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.list1.applicationForm[i], "applicationForm_" + i);
                                $scope.recoApplicationForm.push(URL.createObjectURL(aaplicationfile));
                            }

                            var loopForOtherDoc = $scope.list1.otherDoc.length;
                            for (var i = 0; i < loopForOtherDoc; i++) {
                                var otherDocfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.list1.otherDoc[i], "otherDoc_" + i);
                                $scope.recoOtherDoc.push(URL.createObjectURL(otherDocfile));
                            }

//                    $scope.loadingImg = false;
                        }, function (error) {
                            console.log(error);
//                    $scope.loadingImg = false;
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
        $scope.deleterecord = function (id) {
            $http.get($scope.uRl + "kyc/delete/" + id)
                    .then(function (response) {
                        alert("Data succesfully deleted");
                    }, function (error) {
                        console.log(error);
                    });
        };
        $scope.searchByFiled = function (message) {
            $scope.search = message;
        };

//        ///// Json to Excel file
//        $scope.exportToExcel = function () {
//            alert("Downloading Data Excel file.");
//            var jsonData = $scope.list;
//            /////
//            // Format the date column
//            jsonData.forEach(function (item) {
//                if (item.date instanceof Date) {
//                    item.date = formatDate(item.date);
//                } else if (typeof item.date === 'string') {
//                    item.date = formatDate(new Date(item.date));
//                }
//                item.timeStam = item.timeStam.join(', ');
//            });
//
//            function formatDate(date) {
//                var options = {
//                    day: '2-digit',
//                    month: '2-digit',
//                    year: 'numeric'
//                };
//                var datePart = date.toLocaleDateString('en-IN', options);
//
//                options = {
//                    hour: '2-digit',
//                    minute: '2-digit',
//                    second: '2-digit',
//                    hour12: true
//                };
//                var timePart = date.toLocaleTimeString('en-IN', options);
//
//                return `${datePart} ${timePart.replace(/\b(?:am|pm)\b/g, match => match.toUpperCase())}`;
//            }
//
//            var filteredData = jsonData.map(function (item) {
//                return {
//                    'Code': item.code,
//                    'Name': item.firstName + " " + item.midName + " " + item.lastName,
//                    'Aadhar No': item.adharNo,
//                    'Mobile No': item.mobileNo,
//                    'Account Type': item.accountType,
//                    'Branch Name': item.branchName,
//                    'Status': item.status,
//                    'Remark': item.remark,
//                    'Date': item.date,
//                    'Pan Status': item.panStatus,
//                    'Aadhar_Status': item.adharStatus,
//                    'Other_Doc_Status': item.otherDocStatus,
//                    'Application_Form_Status': item.applicationFormStatus,
//                    'Time Stamp': item.timeStam,
//                    'Approved By': item.approvedBy,
//                    'Uploaded By': item.uploadedBy
//                };
//            });
//
//            var ws = XLSX.utils.json_to_sheet(filteredData);
//            // Format the 'adharNo' column as a number
//            var adharNoColumnIndex = filteredData.length > 0 && 'adharNo' in filteredData[0]
//                    ? filteredData[0]['adharNo'].length - 1
//                    : 0;
//
//            for (var row = 1; row <= filteredData.length; ++row) {
//                var cellAddress = {c: adharNoColumnIndex, r: row};
//                XLSX.utils.format_cell(ws[cellAddress], '0'); // '0' format code for numbers
//            }
//
//            // Add table properties
//            var range = XLSX.utils.decode_range(ws['!ref']);
//            ws['!autofilter'] = {ref: XLSX.utils.encode_range(range)};
//            ws['!cols'] = [
//                {width: 30}, // Adjust column widths as needed
//                {width: 30},
//                {width: 15},
//                {width: 15},
//                {width: 15},
//                {width: 15},
//                {width: 15},
//                {width: 15},
//                {width: 15},
//                {width: 25},
//                {width: 25},
//                {width: 15},
//                {width: 15},
//                {width: 15},
//                {width: 15},
//                {width: 30},
//                {width: 15},
//                {width: 15}
//            ];
//
//            // Apply table style
//            ws['!theme'] = {
//                'tableStyles': {
//                    '1': {
//                        'name': 'TableStyleMedium9',
//                        'showFirstColumn': false,
//                        'showLastColumn': false,
//                        'showRowStripes': true,
//                        'showColumnStripes': true
//                    }
//                }
//            };
//
//            var wb = XLSX.utils.book_new();
//            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//
//            // Save the Excel file
//            XLSX.writeFile(wb, $scope.userRecord.userName + '_report.xlsx');
//        };

// new code 

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


///


        $scope.dataURLtoFilefunction = function (dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
        };

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

        $scope.isRemarkTooLong = false;

        $scope.remark = '';

        $scope.checkLength = function () {
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
//            $scope.loadingImg = true;
            $scope.checkLength();
            if ($scope.validateForm() && $scope.isRemarkTooLong) {
                //
                if (document.getElementById("inputPan").files[0] === undefined && document.getElementById("inputPan").files.length === 0) {
                    var loopsize = $scope.reco.pan.length;
                    for (var i = 0; i < loopsize; i++) {
                        $scope.panfile.push($scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.pan, document.getElementById("imgPan").localName));
                    }
                } else {
                    var loopsizeinput = document.getElementById("inputPan").files.length;
                    for (var j = 0; j < loopsizeinput; j++) {
                        $scope.panfile.push(document.getElementById("inputPan").files[0]);
                    }
                    $scope.panstatus = "";
                }
                //
                if (document.getElementById("inputAdhar").files[0] === undefined && document.getElementById("inputAdhar").files.length === 0) {
                    var loopsize = $scope.reco.adhar.length;
                    for (var i = 0; i < loopsize; i++) {
                        $scope.adharfile.push($scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.adhar, document.getElementById("imgAdhar").localName));
                    }
                } else {
                    var loopsizeinput = document.getElementById("inputAdhar").files.length;
                    for (var j = 0; j < loopsizeinput; j++) {
                        $scope.adharfile.push(document.getElementById("inputAdhar").files[0]);
                    }
                    $scope.adharstatus = "";
                }
                //
                if (document.getElementById("inputotherDoc").files[0] === undefined && document.getElementById("inputotherDoc").files.length === 0) {
                    var loopsize = $scope.reco.otherDoc.length;
                    for (var i = 0; i < loopsize; i++) {
                        $scope.otherDocfile.push($scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.otherDoc[i], "otherDoc_" + i));
                    }

                } else {
                    var loopsizeinput = document.getElementById("inputotherDoc").files.length;
                    for (var j = 0; j < loopsizeinput; j++) {
                        $scope.otherDocfile.push(document.getElementById("inputotherDoc").files[j]);
                    }
                    $scope.otherDocstatus = "";

                }
                // 
                if (document.getElementById("inputapplicationForm").files[0] === undefined && document.getElementById("inputapplicationForm").files.length === 0) {
                    var loopsize = $scope.reco.applicationForm.length;
                    for (var i = 0; i < loopsize; i++) {
                        $scope.applicationFormfile.push($scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.applicationForm, "applicationForm"));
                    }
                } else {
                    var loopsizeinput = document.getElementById("inputapplicationForm").files.length;
                    for (var j = 0; j < loopsizeinput; j++) {
                        $scope.applicationFormfile.push(document.getElementById("inputapplicationForm").files[0]);
                    }
                    $scope.applicationFormstatus = "";
                }

                //
//                 var form = new FormData();
//                 var loopForPan = document.getElementById("pan").files.length;
//                 for (let i = 0; i < loopForPan; i++) {
//                     form.append("pan", document.getElementById("pan").files[i], document.getElementById("pan").localName);
//                 }
//
//                 var loopForAadhar = document.getElementById("adhar").files.length;
//                 for (let i = 0; i < loopForAadhar; i++) {
//                     form.append("adhar", document.getElementById("adhar").files[i], document.getElementById("adhar").localName);
//                 }
//
//                 var loopForApplicationForm = document.getElementById("applicationForm").files.length;
//                 for (let i = 0; i < loopForApplicationForm; i++) {
//                     form.append("applicationForm", document.getElementById("applicationForm").files[i], document.getElementById("applicationForm").localName);
//                 }
//
//                 var loopForOtherDoc = document.getElementById("otherDoc").files.length;
                //

                var form = new FormData();
//                 form.append("pan", $scope.panfile);
//                 form.append("adhar", $scope.adharfile);

                //
                if (document.getElementById("inputPan").files[0] !== undefined && document.getElementById("inputPan").files.length !== 0) {
                    //--->   
                    var loopsizeinputN = document.getElementById("inputPan").files.length;
                    for (let i = 0; i < loopsizeinputN; i++) {
                        form.append("pan", document.getElementById("inputPan").files[i], document.getElementById("inputPan").localName);
                    }
                } else {

                    var loopsize = $scope.panfile.length;
                    for (let j = 0; j < loopsize; j++) {
                        form.append("pan", $scope.panfile[j], $scope.panfile[j].localName);
                    }
                }
                //
                //
                if (document.getElementById("inputAdhar").files[0] !== undefined && document.getElementById("inputAdhar").files.length !== 0) {
                    //--->   
                    var loopsizeinputN = document.getElementById("inputAdhar").files.length;
                    for (let i = 0; i < loopsizeinputN; i++) {
                        form.append("adhar", document.getElementById("inputAdhar").files[i], document.getElementById("inputAdhar").localName);
                    }
                } else {
                    var loopsize = $scope.adharfile.length;
                    for (let j = 0; j < loopsize; j++) {
                        form.append("adhar", $scope.adharfile[j], $scope.adharfile[j].localName);
                    }
                }
                //
                //
                if (document.getElementById("inputapplicationForm").files[0] !== undefined && document.getElementById("inputapplicationForm").files.length !== 0) {
                    //--->   
                    var loopsizeinputN = document.getElementById("inputapplicationForm").files.length;
                    for (let i = 0; i < loopsizeinputN; i++) {
                        form.append("applicationForm", document.getElementById("inputapplicationForm").files[i], document.getElementById("inputapplicationForm").localName);
                    }
                } else {
                    var loopsize = $scope.applicationFormfile.length;
                    for (let j = 0; j < loopsize; j++) {
                        form.append("applicationForm", $scope.applicationFormfile[j], $scope.applicationFormfile[j].localName);
                    }
                }
                //
                if (document.getElementById("inputotherDoc").files[0] !== undefined && document.getElementById("inputotherDoc").files.length !== 0) {
                    //--->   
                    var loopsizeinputN = document.getElementById("inputotherDoc").files.length;
                    for (let i = 0; i < loopsizeinputN; i++) {
                        form.append("otherDoc", document.getElementById("inputotherDoc").files[i], document.getElementById("inputotherDoc").localName);
                    }
//                     switch (loopsizeinputN) {
//                         case 5:
////            alert(loopsize === "5");
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[1], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[2], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[3], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[4], document.getElementById("inputotherDoc").localName);
//                             break;
//                         case 4:
////            alert(loopsize === "4");
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[1], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[2], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[3], document.getElementById("inputotherDoc").localName);
//                             break;
//                         case 3:
////            alert(loopsize === "3");
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[1], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[2], document.getElementById("inputotherDoc").localName);
//                             break;
//                         case 2:
////            alert(loopsize === "2");
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[1], document.getElementById("inputotherDoc").localName);
//                             break;
//                         case 1:
////            alert(loopsize === "1");
//                             form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
//                             break;
//                     }
                    //--->
                } else {

                    var loopsize = $scope.otherDocfile.length;
                    for (let j = 0; j < loopsize; j++) {
                        form.append("otherDoc", $scope.otherDocfile[j], $scope.otherDocfile[j].localName);
                    }
//                     switch (loopsize) {
//                         case 5:
////            alert(loopsize === "5");
//                             form.append("otherDoc", $scope.otherDocfile[1], $scope.otherDocfile[1].localName);
//                             form.append("otherDoc", $scope.otherDocfile[2], $scope.otherDocfile[2].localName);
//                             form.append("otherDoc", $scope.otherDocfile[3], $scope.otherDocfile[3].localName);
//                             form.append("otherDoc", $scope.otherDocfile[4], $scope.otherDocfile[4].localName);
//                             break;
//                         case 4:
////            alert(loopsize === "4");
//                             form.append("otherDoc", $scope.otherDocfile[0], $scope.otherDocfile[0].localName);
//                             form.append("otherDoc", $scope.otherDocfile[1], $scope.otherDocfile[1].localName);
//                             form.append("otherDoc", $scope.otherDocfile[2], $scope.otherDocfile[2].localName);
//                             form.append("otherDoc", $scope.otherDocfile[3], $scope.otherDocfile[3].localName);
//                             break;
//                         case 3:
////            alert(loopsize === "3");
//                             form.append("otherDoc", $scope.otherDocfile[0], $scope.otherDocfile[0].localName);
//                             form.append("otherDoc", $scope.otherDocfile[1], $scope.otherDocfile[1].localName);
//                             form.append("otherDoc", $scope.otherDocfile[2], $scope.otherDocfile[2].localName);
//                             break;
//                         case 2:
////            alert(loopsize === "2");
//                             form.append("otherDoc", $scope.otherDocfile[0], $scope.otherDocfile[0].localName);
//                             form.append("otherDoc", $scope.otherDocfile[1], $scope.otherDocfile[1].localName);
//                             break;
//                         case 1:
////            alert(loopsize === "1");
//                             form.append("otherDoc", $scope.otherDocfile[0], $scope.otherDocfile[0].localName);
//                             break;
//                     }
//                    form.append("otherDoc", $scope.otherDocfile);                
                }

//                 form.append("applicationForm", $scope.applicationFormfile);
                form.append("id", $scope.id);
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
                form.append("status", "By " + $scope.userRecord.userName + "(" + $scope.userRecord.userType + ")" + " :- " + message);
                form.append("remark", "BOM : " + $scope.remark);
                form.append("panStatus", $scope.panstatus);
                form.append("adharStatus", $scope.adharstatus);
                form.append("otherDocStatus", $scope.otherDocstatus);
                form.append("applicationFormStatus", $scope.applicationFormstatus);
                form.append("approvedBy", $scope.approvedBy);
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
//            $scope.loadingImg = false;
                    alert("Data successfully submitted.");
                    location.reload();
                });
            }
        };

//         $scope.dataToPDF = function (id) {
////            $scope.loadingImg = true;
//             $http.get($scope.uRl + "kyc/get/" + id)
//                     .then(function (response) {
//                         $scope.listpdf = response.data;
//                         var htmlContent = `
//                    <html lang="en">
//                        <head>
//                            <meta charset="UTF-8">
//                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                        <style>
//                            body {
//                                background-image: url('image/LETTERHEAD.svg');
//                                background-size: cover;
//                            }
//                        </style>        
//                        </head>
//                        <body>
//                            <div style="border: 2px black solid; font-size: 16px; width: 594px; margin-left: 60px; padding: 10px; height: 1123px; margin-top: -250px;">
//                                <h1 style="color: #0066cc;"><center>KYC Verification Details</center></h1><br><br>
//                                <strong>Ack_NO : </strong> ${$scope.listpdf.code}<br>
//                                <strong>First Name : </strong> ${$scope.listpdf.firstName}<br>
//                                <strong>Middle Name : </strong> ${$scope.listpdf.midName}<br>
//                                <strong>Last Name : </strong> ${$scope.listpdf.lastName}<br>
//                                <strong>Aadhar No : </strong> ${$scope.listpdf.adharNo}<br>
//                                <strong>Mobile No : </strong> ${$scope.listpdf.mobileNo}<br>
//                                <strong>Account Type : </strong> ${$scope.listpdf.accountType}<br>
//                                <strong>BranchName : </strong> ${$scope.listpdf.branchName}<br>
//                                <strong>Pan Card Status : </strong> ${$scope.listpdf.panStatus}<br>
//                                <strong>Aadhar Card Status : </strong> ${$scope.listpdf.adharStatus}<br>
//                                <strong>OtherDoc Status : </strong> ${$scope.listpdf.otherDocStatus}<br>
//                                <strong>Application Form Status : </strong> ${$scope.listpdf.applicationFormStatus}<br>
//                                <strong>Status : </strong> ${$scope.listpdf.status}<br>
//                                <strong>Approved By : </strong> ${$scope.listpdf.approvedBy}<br>
//                                <strong>Uploaded By : </strong> ${$scope.listpdf.uploadedBy}<br>
//                                <strong>Process Log : </strong> <div style="text-wrap: balance; width: 700px; height: 900px;"> 
//                                ${$scope.listpdf.timeStam.toString()} </div> <br>
//                            </div>
//                        </body>
//                    </html>`;
//
//                         var element = document.createElement('div');
//                         element.innerHTML = htmlContent;
//
//                         // Use html2pdf to generate the PDF
//                         html2pdf(element, {
//                             margin: 10,
//                             filename: $scope.listpdf.code + '.pdf',
//                             backgroundImage: {url: 'image/backpic.jpeg', width: 210, height: 297}, // Use backgroundImage option
//                             html2canvas: {scale: 2},
//                             jsPDF: {unit: 'mm', format: [210, 297], orientation: 'portrait'}
//                         }).then(function (pdf) {
//                             // Convert the PDF to a Blob
//                             var blob = pdf.output('blob');
//
//                             // Create a data URL from the Blob
//                             var dataUrl = URL.createObjectURL(blob);
//
//                             // Open the data URL in a new tab
//                             window.open(dataUrl, '_blank');
//                         });
////            $scope.loadingImg = false;
//                     }, function (error) {
//                         console.log('Error fetching data:', error);
////            $scope.loadingImg = false;
//                     });
//
//
//         };


        $scope.dataToPDF = function (id) {
            $http.get($scope.uRl + "kyc/get/" + id)
                    .then(function (response) {
                        $scope.listpdf = response.data;
                        var htmlContent = `
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                background-image: url('image/LETTERHEAD.svg');
                                background-size: cover;
                            }
                            .container {
                                font-size: 16px;
                                width: 780px;
                                margin-left: 80px;
                                padding: 10px;
                                height: 1200px;
                                margin-top: -200px;
                            }
                            h1 {
                                color: #0066cc;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>KYC Verification Details</h1><br><br>
                            <strong>Ack_NO : </strong> ${$scope.listpdf.code}<br>
                            <strong>First Name : </strong> ${$scope.listpdf.firstName}<br>
                            <strong>Middle Name : </strong> ${$scope.listpdf.midName}<br>
                            <strong>Last Name : </strong> ${$scope.listpdf.lastName}<br>
                            <strong>Aadhar No : </strong> ${$scope.listpdf.adharNo}<br>
                            <strong>Mobile No : </strong> ${$scope.listpdf.mobileNo}<br>
                            <strong>Account Type : </strong> ${$scope.listpdf.accountType}<br>
                            <strong>BranchName : </strong> ${$scope.listpdf.branchName}<br>
                            <strong>Pan Card Status : </strong> ${$scope.listpdf.panStatus}<br>
                            <strong>Aadhar Card Status : </strong> ${$scope.listpdf.adharStatus}<br>
                            <strong>OtherDoc Status : </strong> ${$scope.listpdf.otherDocStatus}<br>
                            <strong>Application Form Status : </strong> ${$scope.listpdf.applicationFormStatus}<br>
                            <strong>Status : </strong> ${$scope.listpdf.status}<br>
                            <strong>Approved By : </strong> ${$scope.listpdf.approvedBy}<br>
                            <strong>Uploaded By : </strong> ${$scope.listpdf.uploadedBy}<br>
                            <strong>Process Log : </strong> <div style="word-wrap: break-word; width: 720px;"> 
                            ${$scope.listpdf.timeStam.toString()} </div> <br>
                        </div>
                    </body>
                </html>`;

                        var element = document.createElement('div');
                        element.innerHTML = htmlContent;

                        // Use html2pdf to generate the PDF
                        html2pdf().from(element).set({
                            margin: 0,
                            filename: $scope.listpdf.code + '.pdf',
                            image: {type: 'jpeg', quality: 0.98},
                            html2canvas: {scale: 2},
                            jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
                        }).save().then(function (pdf) {
                            // Optional: If you want to open the PDF in a new tab instead of saving
                            var blob = pdf.output('blob');
                            var dataUrl = URL.createObjectURL(blob);
                            window.open(dataUrl, '_blank');
                        });
                    }, function (error) {
                        console.log('Error fetching data:', error);
                    });
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

//        function checkVal(message) {
//            ///---> start
//            var fileInput = document.getElementById(message);
//            var fileName = fileInput.value;
//            
//            if(message === "inputPan" || message === "inputAdhar"){
//            
//            // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
//            var allowedFormats = ['.jpg', '.jpeg', '.png', '.webp'];
//            var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
//            
//            if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === -1) {
//                // File format is not supported
//                alert("Unsupported file format. Please choose a file with .jpg, .jpeg, .png, .webp extension.");
//                // Clear the file input
//                fileInput.value = '';
//            } else {
//                // File format is supported, check file size
//                var maxSizeKB = 500; // Maximum file size in kilobytes
//                var fileSize = fileInput.files[0].size / 1024; // Convert to kilobytes
//                
//                if (fileSize > maxSizeKB) {
//                    // File size exceeds the limit
//                    alert("File size exceeds the maximum allowed limit of 500KB.");
//                    // Clear the file input
//                    fileInput.value = '';
//                } else {
//                    // File format and size are supported, you can proceed with the file
////                    alert('File format and size are supported.');
//                }
//            }
//            ///--> end
//            }else{
//            ///---> start    
//            
//            // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
//            var allowedFormats = ['.pdf'];
//            var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
//            
//            if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === -1) {
//                // File format is not supported
//                alert("Unsupported file format. Please choose a file with .pdf extension.");
//                // Clear the file input
//                fileInput.value = '';
//            } else {
//                // File format is supported, check file size
//                var maxSizeKB = 500; // Maximum file size in kilobytes
//                var fileSize = fileInput.files[0].size / 1024; // Convert to kilobytes
//                
//                if (fileSize > maxSizeKB) {
//                    // File size exceeds the limit
//                    alert("File size exceeds the maximum allowed limit of 500KB.");
//                    // Clear the file input
//                    fileInput.value = '';
//                } else {
//                    // File format and size are supported, you can proceed with the file
////                    alert('File format and size are supported.');
//                }
//            }    
//            }
//            //--> end
//        }

// Function to convert image to base64-encoded data URI
function getBase64Image(imageUrl) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = imageUrl;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL('image/jpg'); // You can specify the image format here
    return dataURL;
}

// function checkVal(message) {
//     ///---> start
//     var fileInput = document.getElementById(message);
//     var fileName = fileInput.value;
//     if (message === "inputPan" || message === "inputAdhar") {
//
//         // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
//         var allowedFormats = ['.jpg', '.jpeg', '.png', '.webp'];
//         var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
//         if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === -1) {
//             // File format is not supported
//             alert("Unsupported file format. \n Please choose a file with .jpg, .jpeg, .png, .webp extension.");
//             // Clear the file input
//             fileInput.value = '';
//         } else {
//             // File format is supported, check file size
//             var maxSizeKB = 250; // Maximum file size in kilobytes
//             var fileSize = fileInput.files[0].size / 1024; // Convert to kilobytes
//
//             if (fileSize > maxSizeKB) {
//                 // File size exceeds the limit
//                 alert("File size exceeds the maximum allowed limit of 250KB.");
//                 // Clear the file input
//                 fileInput.value = '';
//             } else {
//                 // File format and size are supported, you can proceed with the file
////                    alert('File format and size are supported.');
//             }
//         }
//         ///--> end
//     } else {
//         ///---> start   
//         ///--------------------> Other Docs for 1024kb
//         if (message === "inputotherDoc") {
//             // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
//             var allowedFormats = ['.pdf'];
//             var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
//             if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === -1) {
//                 // File format is not supported
//                 alert("Unsupported file format.\n Please choose a file with .pdf extension.");
//                 // Clear the file input
//                 fileInput.value = '';
//             } else {
////            alert(fileInput.files.length);    
////            alert(fileInput.files.length <= 5);    
//                 if (fileInput.files.length <= 5) {
//                     // File format is supported, check file size
//                     var maxSizeKB = 1024; // Maximum file size in kilobytes
//                     var fileSize = 0; // Convert to kilobytes
//
//                     for (var i = 0; i < fileInput.files.length; i++) {
//                         fileSize += fileInput.files[i].size;
//                     }
////            alert("size : "+fileSize);
//                     if (fileSize > maxSizeKB * maxSizeKB) {
//                         // File size exceeds the limit
//                         alert("File size exceeds the maximum allowed limit of 1024KB.");
//                         // Clear the file input
//                         fileInput.value = '';
//                     } else {
//                         // File format and size are supported, you can proceed with the file
////                    alert('File format and size are supported.');
//                     }
//
//                 } else {
//                     fileInput.value = '';
//                     alert("You can only select up to 5 files.");
//                 }
//
//             }
//             ///--> end
//         } else {
//             ///---------------------------------------> Client Form for 1024kb
//             // Check if the file format is supported (in this example, .jpg, .jpeg, .png, .webp)
//             var allowedFormats = ['.pdf'];
//             var fileFormat = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
//             if (allowedFormats.indexOf('.' + fileFormat.toLowerCase()) === -1) {
//                 // File format is not supported
//                 alert("Unsupported file format.\n Please choose a file with .pdf extension.");
//                 // Clear the file input
//                 fileInput.value = '';
//             } else {
//                 // File format is supported, check file size
//                 var maxSizeKB = 1025; // Maximum file size in kilobytes
//                 var fileSize = fileInput.files[0].size / 1024; // Convert to kilobytes
//
//                 if (fileSize > maxSizeKB) {
//                     // File size exceeds the limit
//                     alert("File size exceeds the maximum allowed limit of 1024KB.");
//                     // Clear the file input
//                     fileInput.value = '';
//                 } else {
//                     // File format and size are supported, you can proceed with the file
////                    alert('File format and size are supported.');
//                 }
//             }
//         }
//
//     }
//     //--> end
// }

function checkVal(message) {
    ///---> start
    var fileInput = document.getElementById(message);
    var fileName = fileInput.value;
    if (message === "inputPan" || message === "inputAdhar") {

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
    } else if (message === "inputotherDoc") {
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


    } else if (message === "inputapplicationForm") {
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
