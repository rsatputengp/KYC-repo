var app = angular.module("myApp", []);
app.controller("cont", function ($scope, $http) {
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

        $scope.aadharcheck = function () {
            if (!($scope.adharNo)) {
                alert("                             Please enter the Aadhar Number! \n\
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
        $scope.panfile = null;
        $scope.adharfile = null;
        $scope.otherDocfile = [];
        $scope.applicationFormfile = null;
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
                            $scope.reco = $scope.list1;
                            $scope.id = $scope.list1.id;
                            $scope.firstName = $scope.list1.firstName;
                            $scope.midName = $scope.list1.midName;
                            $scope.lastName = $scope.list1.lastName;
                            $scope.adharNo = $scope.list1.adharNo;
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

                            var aaplicationfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.list1.applicationForm, "applicationForm");
                            $scope.recoApplicationForm.push(URL.createObjectURL(aaplicationfile));
                            var loopsize = $scope.list1.otherDoc.length;
                            for (var i = 0; i < loopsize; i++) {
                                var otherDocfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.list1.otherDoc[i], "otherDoc_" + i);
                                $scope.recoOtherDoc.push(URL.createObjectURL(otherDocfile));
//                    $scope.recoOtherDoc = URL.createObjectURL(otherDocfile);
//                    $scope.recoOtherDoc.push($scope.list1.otherDoc[i]);
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
        $scope.viewPdfApp = function () {
            window.open($scope.recoApplicationForm[0], '_blank');
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

        ///// Json to Excel file
        $scope.exportToExcel = function () {
            alert("Downloading Data Excel file.");
            var jsonData = $scope.list;
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
                    hour12: true
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
                var cellAddress = {c: adharNoColumnIndex, r: row};
                XLSX.utils.format_cell(ws[cellAddress], '0'); // '0' format code for numbers
            }

            // Add table properties
            var range = XLSX.utils.decode_range(ws['!ref']);
            ws['!autofilter'] = {ref: XLSX.utils.encode_range(range)};
            ws['!cols'] = [
                {width: 30}, // Adjust column widths as needed
                {width: 15},
                {width: 15},
                {width: 15},
                {width: 15},
                {width: 15},
                {width: 15},
                {width: 15},
                {width: 15},
                {width: 25},
                {width: 25},
                {width: 15},
                {width: 15},
                {width: 15},
                {width: 15},
                {width: 30},
                {width: 15},
                {width: 15}
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
            XLSX.writeFile(wb, $scope.userRecord.userName + '_report.xlsx');
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
            var maxLength = 900;

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
            alert(mess);
        };

        $scope.userEdit = function (message) {
//            $scope.loadingImg = true;
            $scope.checkLength();
            if ($scope.validateForm() && $scope.isRemarkTooLong) {
                //1111//
                if (document.getElementById("inputPan").files[0] === undefined) {
                    $scope.panfile = $scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.pan, document.getElementById("imgPan").localName);
                } else {
                    $scope.panfile = document.getElementById("inputPan").files[0];
                    $scope.panstatus = "";
                }
                //2222//
                if (document.getElementById("inputAdhar").files[0] === undefined) {
                    $scope.adharfile = $scope.dataURLtoFilefunction('data:image/png;base64,' + $scope.reco.adhar, document.getElementById("imgAdhar").localName);
                } else {
                    $scope.adharfile = document.getElementById("inputAdhar").files[0];
                    $scope.adharstatus = "";
                }
//           //3333// 
                if (document.getElementById("inputotherDoc").files[0] === undefined && document.getElementById("inputotherDoc").files.length === 0) {
//               alert("i am in if line no : 381"); 
//               alert(document.getElementById("inputotherDoc").files[0] === undefined); 
                    var loopsize = $scope.reco.otherDoc.length;
                    for (var i = 0; i < loopsize; i++) {
//                    var otherDocfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.otherDoc[i] , "otherDoc_"+i);
                        $scope.otherDocfile.push($scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.otherDoc[i], "otherDoc_" + i));
//                    $scope.otherDocfile.push(URL.createObjectURL(otherDocfile));
                    }

                } else {
//               alert("i am in else line no : 388"); 
                    var loopsizeinput = document.getElementById("inputotherDoc").files.length;
                    for (var j = 0; j < loopsizeinput; j++) {
                        $scope.otherDocfile.push(document.getElementById("inputotherDoc").files[j]);
                    }
                    $scope.otherDocstatus = "";

                }
//           //4444// 
                if (document.getElementById("inputapplicationForm").files[0] === undefined) {
                    $scope.applicationFormfile = $scope.dataURLtoFilefunction('data:application/pdf;base64,' + $scope.reco.applicationForm, "applicationForm");
                } else {
                    $scope.applicationFormfile = document.getElementById("inputapplicationForm").files[0];
                    $scope.applicationFormstatus = "";
                }
                var form = new FormData();
                form.append("pan", $scope.panfile);
                form.append("adhar", $scope.adharfile);


                if (document.getElementById("inputotherDoc").files[0] !== undefined && document.getElementById("inputotherDoc").files.length !== 0) {
                    //--->   
                    var loopsizeinputN = document.getElementById("inputotherDoc").files.length;
                    switch (loopsizeinputN) {
                        case 5:
//            alert(loopsize === "5");
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[1], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[2], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[3], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[4], document.getElementById("inputotherDoc").localName);
                            break;
                        case 4:
//            alert(loopsize === "4");
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[1], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[2], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[3], document.getElementById("inputotherDoc").localName);
                            break;
                        case 3:
//            alert(loopsize === "3");
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[1], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[2], document.getElementById("inputotherDoc").localName);
                            break;
                        case 2:
//            alert(loopsize === "2");
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[1], document.getElementById("inputotherDoc").localName);
                            break;
                        case 1:
//            alert(loopsize === "1");
                            form.append("otherDoc", document.getElementById("inputotherDoc").files[0], document.getElementById("inputotherDoc").localName);
                            break;
                    }
                    //--->
                } else {

                    var loopsize = $scope.otherDocfile.length;
                    switch (loopsize) {
                        case 5:
//            alert(loopsize === "5");
                            form.append("otherDoc", $scope.otherDocfile[0], $scope.otherDocfile[0].localName);
                            form.append("otherDoc", $scope.otherDocfile[1], $scope.otherDocfile[1].localName);
                            form.append("otherDoc", $scope.otherDocfile[2], $scope.otherDocfile[2].localName);
                            form.append("otherDoc", $scope.otherDocfile[3], $scope.otherDocfile[3].localName);
                            form.append("otherDoc", $scope.otherDocfile[4], $scope.otherDocfile[4].localName);
                            break;
                        case 4:
//            alert(loopsize === "4");
                            form.append("otherDoc", $scope.otherDocfile[0], $scope.otherDocfile[0].localName);
                            form.append("otherDoc", $scope.otherDocfile[1], $scope.otherDocfile[1].localName);
                            form.append("otherDoc", $scope.otherDocfile[2], $scope.otherDocfile[2].localName);
                            form.append("otherDoc", $scope.otherDocfile[3], $scope.otherDocfile[3].localName);
                            break;
                        case 3:
//            alert(loopsize === "3");
                            form.append("otherDoc", $scope.otherDocfile[0], $scope.otherDocfile[0].localName);
                            form.append("otherDoc", $scope.otherDocfile[1], $scope.otherDocfile[1].localName);
                            form.append("otherDoc", $scope.otherDocfile[2], $scope.otherDocfile[2].localName);
                            break;
                        case 2:
//            alert(loopsize === "2");
                            form.append("otherDoc", $scope.otherDocfile[0], $scope.otherDocfile[0].localName);
                            form.append("otherDoc", $scope.otherDocfile[1], $scope.otherDocfile[1].localName);
                            break;
                        case 1:
//            alert(loopsize === "1");
                            form.append("otherDoc", $scope.otherDocfile[0], $scope.otherDocfile[0].localName);
                            break;
                    }
//                    form.append("otherDoc", $scope.otherDocfile);                
                }

                form.append("applicationForm", $scope.applicationFormfile);
                form.append("id", $scope.id);
                form.append("firstName", $scope.firstName);
                form.append("midName", $scope.midName);
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

        $scope.dataToPDF = function (id) {
//            $scope.loadingImg = true;
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
                        </style>        
                        </head>
                        <body>
                            <div style="font-size: 16px; margin-left: 100px; padding: 10px; height: 1000px; margin-top: -150px;">
                                <h1 style="color: #0066cc;"><center>KYC Verification Details</center></h1><br><br>
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
                                <strong>Process Log : </strong> ${$scope.listpdf.timeStam}<br>
                            </div>
                        </body>
                    </html>`;

                        var element = document.createElement('div');
                        element.innerHTML = htmlContent;

                        // Use html2pdf to generate the PDF
                        html2pdf(element, {
                            margin: 10,
                            filename: $scope.listpdf.code + '.pdf',
                            backgroundImage: {url: 'image/LETTERHEAD.svg', width: 210, height: 297}, // Use backgroundImage option
                            html2canvas: {scale: 2},
                            jsPDF: {unit: 'mm', format: [210, 297], orientation: 'portrait'}
                        }).then(function (pdf) {
                            // Convert the PDF to a Blob
                            var blob = pdf.output('blob');

                            // Create a data URL from the Blob
                            var dataUrl = URL.createObjectURL(blob);

                            // Open the data URL in a new tab
                            window.open(dataUrl, '_blank');
                        });
//            $scope.loadingImg = false;
                    }, function (error) {
                        console.log('Error fetching data:', error);
//            $scope.loadingImg = false;
                    });


        };

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
    } else {
        ///---> start   
        ///--------------------> Other Docs for 1024kb
        if (message === "inputotherDoc") {
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
            ///--> end
        } else {
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
                // File format is supported, check file size
                var maxSizeKB = 1025; // Maximum file size in kilobytes
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
            }
        }

    }
    //--> end
}
