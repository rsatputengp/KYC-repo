/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayogmultistate.it.kyc.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.sahayogmultistate.it.kyc.model.BranchAccess;
import com.sahayogmultistate.it.kyc.model.KYCRecord;
import com.sahayogmultistate.it.kyc.model.KYCRecordNew;
import com.sahayogmultistate.it.kyc.repository.IKYCRecordRepository;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author HP
 */
@Service
public class KYCRecordService {

    @Autowired
    private IKYCRecordRepository repository;

    @Autowired
    private BranchAccessService service;

    public KYCRecordService() {
        System.out.println("I am in KYCRecordService");
    }

    private final String ROOT_F = "//home//ritik//Sahayog";
//    private final String ROOT_F = "//home//sysadmin//Sahayog";

    public KYCRecord add(MultipartFile[] pan, MultipartFile[] adhar,
            MultipartFile[] otherDoc, MultipartFile[] applicationForm,
            String applicant, String adharNo,
            long mobileNo, String accountType, String branchName, String status,
            String remark, Date date, String panStatus, String adharStatus,
            String otherDocStatus, String applicationFormStatus,
            String approvedBy, String uploadedBy, String timeStam
    ) throws IOException {
        Integer codeNo;
        Integer codeNoOld = getBranchListSize(branchName);
        if (codeNoOld == null) {
            codeNo = 0;
        } else {
            codeNo = getBranchListSize(branchName);
        }
        String code = "CODE_0" + (1 + codeNo) + "_" + branchName;
        KYCRecord record = new KYCRecord();
        KYCRecordNew byAdhar;
        if ("Silver Saving".equals(accountType)
                || "Normal Saving".equals(accountType)
                || "Current Wealth".equals(accountType)
                || "Current Gold".equals(accountType)
                || "Normal Current".equals(accountType)
                || "Joint Silver Saving".equals(accountType)
                || "Joint Normal Saving".equals(accountType)
                || "Joint Current Wealth".equals(accountType)
                || "Joint Current Gold".equals(accountType)
                || "Joint Normal Current".equals(accountType)
                || "Sole Proprietorship".equals(accountType)
                || "Partnership Module".equals(accountType)
                || "Public/Private LTD Company".equals(accountType)
                || "TASC".equals(accountType)) {
            String aadharNo = "" + adharNo.indexOf(',');
            if (!aadharNo.equals("-1")) {
                String[] aadharNum = adharNo.split(",");
                byAdhar = getByAdharExist(aadharNum[0], accountType);
            } else {
                byAdhar = getByAdharExist(adharNo, accountType);
            }
        } else {
            byAdhar = new KYCRecordNew();
        }

        if (byAdhar == null) {

            record.setApplicant(applicant);
            record.setAdharNo(adharNo);
            record.setMobileNo(mobileNo);
            record.setAccountType(accountType);
            record.setBranchName(branchName);
            record.setStatus(status);
            record.setRemark(remark);
            ArrayList<Date> dates = new ArrayList<>();
            dates.add(date);
            record.setDate(dates);
            record.setPanStatus(panStatus);
            record.setAdharStatus(adharStatus);
            record.setOtherDocStatus(otherDocStatus);
            record.setApplicationFormStatus(applicationFormStatus);
            record.setApprovedBy(approvedBy);
            record.setUploadedBy(uploadedBy);
            record.setCode(code);
            ArrayList<String> tS = new ArrayList<>();
            tS.add(timeStam);
            record.setTimeStam(tS);

            record.setPan(null);

            record.setAdhar(null);

            record.setOtherDoc(null);

            record.setApplicationForm(null);

//            -->
            try {

//                String filePath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + accountType + "//" + firstName + lastName + "_" + adharNo;
                if (accountType.endsWith("Saving")) {
                    String directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Saving" + "//" + accountType + "//" + code;
                    File directory = new File(directoryPath);
                    File directoryForOtherDocs = new File(directoryPath + "//" + "otherDoc");
                    File directoryForPan = new File(directoryPath + "//" + "pan");
                    File directoryForAadhar = new File(directoryPath + "//" + "adhar");
                    File directoryForApplicationForm = new File(directoryPath + "//" + "applicationForm");
                    // Ensure parent directories exist
                    directory.mkdirs();
                    deleteDirectory(directoryForOtherDocs);
                    deleteDirectory(directoryForPan);
                    deleteDirectory(directoryForAadhar);
                    deleteDirectory(directoryForApplicationForm);

                    directoryForPan.mkdirs();
                    int loopPan = pan.length;
                    for (int i = 0; i < loopPan; i++) {
                        try (FileOutputStream fosPan = new FileOutputStream(new File(directoryForPan, "pan_" + i))) {
                            fosPan.write(pan[i].getBytes());
                        }
                    }

                    directoryForAadhar.mkdirs();
                    int loopAadhar = adhar.length;
                    for (int i = 0; i < loopAadhar; i++) {
                        try (FileOutputStream fosAdhar = new FileOutputStream(new File(directoryForAadhar, "adhar_" + i))) {
                            fosAdhar.write(adhar[i].getBytes());
                        }
                    }

                    directoryForOtherDocs.mkdirs();
                    int loopOtherDoc = otherDoc.length;
                    for (int i = 0; i < loopOtherDoc; i++) {
                        try (FileOutputStream fosOtherDoc = new FileOutputStream(new File(directoryForOtherDocs, "otherDoc_" + i))) {
                            fosOtherDoc.write(otherDoc[i].getBytes());
                        }
                    }

                    directoryForApplicationForm.mkdirs();
                    int loopApplicationForm = applicationForm.length;
                    for (int i = 0; i < loopApplicationForm; i++) {
                        try (FileOutputStream fosApplicationForm = new FileOutputStream(new File(directoryForApplicationForm, "applicationForm_" + i))) {
                            fosApplicationForm.write(applicationForm[i].getBytes());
                        }
                    }
                } else {
                    String directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Current" + "//" + accountType + "//" + code;
                    File directory = new File(directoryPath);
                    File directoryForOtherDocs = new File(directoryPath + "//" + "otherDoc");
                    File directoryForPan = new File(directoryPath + "//" + "pan");
                    File directoryForAadhar = new File(directoryPath + "//" + "adhar");
                    File directoryForApplicationForm = new File(directoryPath + "//" + "applicationForm");
                    // Ensure parent directories exist
                    directory.mkdirs();
                    deleteDirectory(directoryForOtherDocs);
                    deleteDirectory(directoryForPan);
                    deleteDirectory(directoryForAadhar);
                    deleteDirectory(directoryForApplicationForm);

                    directoryForPan.mkdirs();
                    int loopPan = pan.length;
                    for (int i = 0; i < loopPan; i++) {
                        try (FileOutputStream fosPan = new FileOutputStream(new File(directoryForPan, "pan_" + i))) {
                            fosPan.write(pan[i].getBytes());
                        }
                    }

                    directoryForAadhar.mkdirs();
                    int loopAadhar = adhar.length;
                    for (int i = 0; i < loopAadhar; i++) {
                        try (FileOutputStream fosAdhar = new FileOutputStream(new File(directoryForAadhar, "adhar_" + i))) {
                            fosAdhar.write(adhar[i].getBytes());
                        }
                    }

                    directoryForOtherDocs.mkdirs();
                    int loopOtherDoc = otherDoc.length;
                    for (int i = 0; i < loopOtherDoc; i++) {
                        try (FileOutputStream fosOtherDoc = new FileOutputStream(new File(directoryForOtherDocs, "otherDoc_" + i))) {
                            fosOtherDoc.write(otherDoc[i].getBytes());
                        }
                    }

                    directoryForApplicationForm.mkdirs();
                    int loopApplicationForm = applicationForm.length;
                    for (int i = 0; i < loopApplicationForm; i++) {
                        try (FileOutputStream fosApplicationForm = new FileOutputStream(new File(directoryForApplicationForm, "applicationForm_" + i))) {
                            fosApplicationForm.write(applicationForm[i].getBytes());
                        }
                    }
                }

            } catch (IOException e) {
                System.out.println("Failed to upload file: " + e.getMessage());
            }
//            <--
            repository.save(record);
            return record;
        } else {
            return null;
        }
    }

    public KYCRecord update(MultipartFile[] pan, MultipartFile[] adhar,
            MultipartFile[] otherDoc, MultipartFile[] applicationForm,
            long id, String applicant, String adharNo, long mobileNo,
            String accountType, String branchName, String status,
            String remark, Date date, String panStatus,
            String adharStatus, String otherDocStatus,
            String applicationFormStatus, String approvedBy,
            String uploadedBy, String timeStam)
            throws IOException {
        KYCRecordNew recordNew = get(id);
        ArrayList<Date> dates = recordNew.getDate();
        dates.add(date);
        String oldRemark = recordNew.getRemark();
        String code = recordNew.getCode();
        ArrayList<String> timestam = recordNew.getTimeStam();
        timestam.add(timeStam);
        if (recordNew != null) {
            try {

//                String filePath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + accountType + "//" + firstName + lastName + "_" + adharNo;
                if (accountType.endsWith("Saving")) {
                    String directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Saving" + "//" + accountType + "//" + code;
                    File directory = new File(directoryPath);
                    File directoryForOtherDocs = new File(directoryPath + "//" + "otherDoc");
                    File directoryForPan = new File(directoryPath + "//" + "pan");
                    File directoryForAadhar = new File(directoryPath + "//" + "adhar");
                    File directoryForApplicationForm = new File(directoryPath + "//" + "applicationForm");
                    // Ensure parent directories exist
                    directory.mkdirs();
                    deleteDirectory(directoryForOtherDocs);
                    deleteDirectory(directoryForPan);
                    deleteDirectory(directoryForAadhar);
                    deleteDirectory(directoryForApplicationForm);

                    directoryForPan.mkdirs();
                    int loopPan = pan.length;
                    for (int i = 0; i < loopPan; i++) {
                        try (FileOutputStream fosPan = new FileOutputStream(new File(directoryForPan, "pan_" + i))) {
                            fosPan.write(pan[i].getBytes());
                        }
                    }

                    directoryForAadhar.mkdirs();
                    int loopAadhar = adhar.length;
                    for (int i = 0; i < loopAadhar; i++) {
                        try (FileOutputStream fosAdhar = new FileOutputStream(new File(directoryForAadhar, "adhar_" + i))) {
                            fosAdhar.write(adhar[i].getBytes());
                        }
                    }

                    directoryForOtherDocs.mkdirs();
                    int loopOtherDoc = otherDoc.length;
                    for (int i = 0; i < loopOtherDoc; i++) {
                        try (FileOutputStream fosOtherDoc = new FileOutputStream(new File(directoryForOtherDocs, "otherDoc_" + i))) {
                            fosOtherDoc.write(otherDoc[i].getBytes());
                        }
                    }

                    directoryForApplicationForm.mkdirs();
                    int loopApplicationForm = applicationForm.length;
                    for (int i = 0; i < loopApplicationForm; i++) {
                        try (FileOutputStream fosApplicationForm = new FileOutputStream(new File(directoryForApplicationForm, "applicationForm_" + i))) {
                            fosApplicationForm.write(applicationForm[i].getBytes());
                        }
                    }
                } else {
                    String directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Current" + "//" + accountType + "//" + code;
                    File directory = new File(directoryPath);
                    File directoryForOtherDocs = new File(directoryPath + "//" + "otherDoc");
                    File directoryForPan = new File(directoryPath + "//" + "pan");
                    File directoryForAadhar = new File(directoryPath + "//" + "adhar");
                    File directoryForApplicationForm = new File(directoryPath + "//" + "applicationForm");
                    // Ensure parent directories exist
                    directory.mkdirs();
                    deleteDirectory(directoryForOtherDocs);
                    deleteDirectory(directoryForPan);
                    deleteDirectory(directoryForAadhar);
                    deleteDirectory(directoryForApplicationForm);

                    directoryForPan.mkdirs();
                    int loopPan = pan.length;
                    for (int i = 0; i < loopPan; i++) {
                        try (FileOutputStream fosPan = new FileOutputStream(new File(directoryForPan, "pan_" + i))) {
                            fosPan.write(pan[i].getBytes());
                        }
                    }

                    directoryForAadhar.mkdirs();
                    int loopAadhar = adhar.length;
                    for (int i = 0; i < loopAadhar; i++) {
                        try (FileOutputStream fosAdhar = new FileOutputStream(new File(directoryForAadhar, "adhar_" + i))) {
                            fosAdhar.write(adhar[i].getBytes());
                        }
                    }

                    directoryForOtherDocs.mkdirs();
                    int loopOtherDoc = otherDoc.length;
                    for (int i = 0; i < loopOtherDoc; i++) {
                        try (FileOutputStream fosOtherDoc = new FileOutputStream(new File(directoryForOtherDocs, "otherDoc_" + i))) {
                            fosOtherDoc.write(otherDoc[i].getBytes());
                        }
                    }

                    directoryForApplicationForm.mkdirs();
                    int loopApplicationForm = applicationForm.length;
                    for (int i = 0; i < loopApplicationForm; i++) {
                        try (FileOutputStream fosApplicationForm = new FileOutputStream(new File(directoryForApplicationForm, "applicationForm_" + i))) {
                            fosApplicationForm.write(applicationForm[i].getBytes());
                        }
                    }
                }

            } catch (IOException e) {
                System.out.println("Failed to upload file: " + e.getMessage());
            }
//            <--

            KYCRecord record = new KYCRecord(id, applicant, adharNo, mobileNo, accountType, branchName, status, oldRemark + ", \n\n" + remark, dates, panStatus, adharStatus, otherDocStatus, applicationFormStatus, approvedBy, uploadedBy, code, timestam, null, null, null, null);
            repository.save(record);
            return record;
        }
        return null;
    }

    public List<KYCRecord> getKYCRescordsall() {
        return repository.findAll();
    }

    public List<KYCRecordNew> getBranchList() {
        ArrayList<KYCRecordNew> recordList = new ArrayList<>();
        List<KYCRecord> findAll = getKYCRescordsall();
//        System.out.println("getall kine no 249 ==" + findAll.size());
        if (!findAll.isEmpty()) {

            for (KYCRecord kYCRecord : findAll) {
                String branchName = kYCRecord.getBranchName();
                String accountType = kYCRecord.getAccountType();
                String code = kYCRecord.getCode();
                File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
                File[] retrieveFilesForPan = retrieveFilesForPan(branchName, accountType, code);
                File[] retrieveFilesForAadhar = retrieveFilesForAadhar(branchName, accountType, code);
                File[] retrieveFilesForApplicationForm = retrieveFilesForApplicationForm(branchName, accountType, code);
                File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                try {
                    KYCRecordNew kycRecordNew = new KYCRecordNew();
                    kycRecordNew.setId(kYCRecord.getId());
                    kycRecordNew.setAccountType(accountType);
                    kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                    kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                    kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                    kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                    kycRecordNew.setBranchName(branchName);
                    kycRecordNew.setCode(code);
                    kycRecordNew.setDate(kYCRecord.getDate());
                    kycRecordNew.setApplicant(kYCRecord.getApplicant());
                    kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                    kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                    kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                    kycRecordNew.setRemark(kYCRecord.getRemark());
                    kycRecordNew.setStatus(kYCRecord.getStatus());
                    kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                    kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());

                    List<byte[]> arrayListForOtherDoc = new ArrayList<>();
                    for (File file : retrieveFilesForOtherDoc) {
                        arrayListForOtherDoc.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setOtherDoc(arrayListForOtherDoc);

                    List<byte[]> arrayListForPan = new ArrayList<>();
                    for (File file : retrieveFilesForPan) {
                        arrayListForPan.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setPan(arrayListForPan);

                    List<byte[]> arrayListForAadhar = new ArrayList<>();
                    for (File file : retrieveFilesForAadhar) {
                        arrayListForAadhar.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setAdhar(arrayListForAadhar);

                    List<byte[]> arrayListForApplication = new ArrayList<>();
                    for (File file : retrieveFilesForApplicationForm) {
                        arrayListForApplication.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setApplicationForm(arrayListForApplication);
//
//                    int length = retrieveFiles.length;
//                    for (int i = 0; i < length; i++) {
//
//                        if ("adhar".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("applicationForm".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("pan".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
////
//                    }
                    recordList.add(kycRecordNew);
                } catch (IOException ex) {
                    Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            return recordList;
        } else {
            return recordList;
        }
    }

    @Transactional
    public List<KYCRecordNew> getAllBranchList(String userName) {
        ArrayList<KYCRecordNew> recordList = new ArrayList<>();
        BranchAccess user = service.getUser(userName);
        ArrayList<String> branchNameList = user.getBranchNameList();
//         -->
        ArrayList<KYCRecord> kYCRecords = new ArrayList<>();
        for (String branchName : branchNameList) {
            List<KYCRecord> findAllByBranchName = repository.findAllByBranchName(branchName);
            for (KYCRecord kYCRecord : findAllByBranchName) {
                kYCRecords.add(kYCRecord);
            }
        }
//        <--
//        List<KYCRecord> kYCRecords = getKYCRescordsall();
        for (KYCRecord kYCRecord : kYCRecords) {
            for (String branchname : branchNameList) {
                if (branchname.equals(kYCRecord.getBranchName())) {
                    String branchName = kYCRecord.getBranchName();
                    String accountType = kYCRecord.getAccountType();
                    String code = kYCRecord.getCode();
                    File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
                    File[] retrieveFilesForPan = retrieveFilesForPan(branchName, accountType, code);
                    File[] retrieveFilesForAadhar = retrieveFilesForAadhar(branchName, accountType, code);
                    File[] retrieveFilesForApplicationForm = retrieveFilesForApplicationForm(branchName, accountType, code);
                    File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                    try {
                        KYCRecordNew kycRecordNew = new KYCRecordNew();
                        kycRecordNew.setId(kYCRecord.getId());
                        kycRecordNew.setAccountType(accountType);
                        kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                        kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                        kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                        kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                        kycRecordNew.setBranchName(branchName);
                        kycRecordNew.setCode(code);
                        kycRecordNew.setDate(kYCRecord.getDate());
                        kycRecordNew.setApplicant(kYCRecord.getApplicant());
                        kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                        kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                        kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                        kycRecordNew.setRemark(kYCRecord.getRemark());
                        kycRecordNew.setStatus(kYCRecord.getStatus());
                        kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                        kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());

                        List<byte[]> arrayListForOtherDoc = new ArrayList<>();
                        for (File file : retrieveFilesForOtherDoc) {
                            arrayListForOtherDoc.add(Files.readAllBytes(file.toPath()));
                        }
                        kycRecordNew.setOtherDoc(arrayListForOtherDoc);

                        List<byte[]> arrayListForPan = new ArrayList<>();
                        for (File file : retrieveFilesForPan) {
                            arrayListForPan.add(Files.readAllBytes(file.toPath()));
                        }
                        kycRecordNew.setPan(arrayListForPan);

                        List<byte[]> arrayListForAadhar = new ArrayList<>();
                        for (File file : retrieveFilesForAadhar) {
                            arrayListForAadhar.add(Files.readAllBytes(file.toPath()));
                        }
                        kycRecordNew.setAdhar(arrayListForAadhar);

                        List<byte[]> arrayListForApplication = new ArrayList<>();
                        for (File file : retrieveFilesForApplicationForm) {
                            arrayListForApplication.add(Files.readAllBytes(file.toPath()));
                        }
                        kycRecordNew.setApplicationForm(arrayListForApplication);
//
//                    int length = retrieveFiles.length;
//                    for (int i = 0; i < length; i++) {
//
//                        if ("adhar".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("applicationForm".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("pan".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
////
//                    }
                        recordList.add(kycRecordNew);
                    } catch (IOException ex) {
                        Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }
        }
        return recordList;
    }

    @Transactional
    public List<KYCRecord> getAllBranchListForDB(String userName) {
        ArrayList<KYCRecord> recordList = new ArrayList<>();
        BranchAccess user = service.getUser(userName);
        ArrayList<String> branchNameList = user.getBranchNameList();

//         -->
        ArrayList<KYCRecord> kYCRecords = new ArrayList<>();
        for (String branchName : branchNameList) {
            List<KYCRecord> findAllByBranchName = repository.findAllByBranchName(branchName);
            for (KYCRecord kYCRecord : findAllByBranchName) {
                kYCRecords.add(kYCRecord);
            }
        }
//        <--

//        List<KYCRecord> kYCRecords = getKYCRescordsall();
        for (KYCRecord kYCRecord : kYCRecords) {
            for (String branchname : branchNameList) {
                if (branchname.equals(kYCRecord.getBranchName())) {
                    String branchName = kYCRecord.getBranchName();
                    String accountType = kYCRecord.getAccountType();
                    String code = kYCRecord.getCode();
                    KYCRecord kycRecord = new KYCRecord();
                    kycRecord.setId(kYCRecord.getId());
                    kycRecord.setAccountType(accountType);
                    kycRecord.setAdharNo(kYCRecord.getAdharNo());
                    kycRecord.setAdharStatus(kYCRecord.getAdharStatus());
                    kycRecord.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                    kycRecord.setApprovedBy(kYCRecord.getApprovedBy());
                    kycRecord.setBranchName(branchName);
                    kycRecord.setCode(code);
                    kycRecord.setDate(kYCRecord.getDate());
                    kycRecord.setApplicant(kYCRecord.getApplicant());
                    kycRecord.setMobileNo(kYCRecord.getMobileNo());
                    kycRecord.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                    kycRecord.setPan(kYCRecord.getPan());
                    kycRecord.setPanStatus(kYCRecord.getPanStatus());
                    kycRecord.setRemark(kYCRecord.getRemark());
                    kycRecord.setStatus(kYCRecord.getStatus());
                    kycRecord.setTimeStam(kYCRecord.getTimeStam());
                    kycRecord.setUploadedBy(kYCRecord.getUploadedBy());
                    kycRecord.setAdhar(null);
                    kycRecord.setOtherDoc(null);
                    kycRecord.setApplicationForm(null);
                    kycRecord.setPan(null);
                    recordList.add(kycRecord);
                }
            }
        }
        return recordList;
    }

    public List<KYCRecordNew> getBranchList(String branchname) {
        ArrayList<KYCRecordNew> recordList = new ArrayList<>();
        List<KYCRecord> findAll = getKYCRescordsall();
        for (KYCRecord kYCRecord : findAll) {
            if (branchname.equals(kYCRecord.getBranchName())) {
                String branchName = kYCRecord.getBranchName();
                String accountType = kYCRecord.getAccountType();
                String code = kYCRecord.getCode();
                File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
                File[] retrieveFilesForPan = retrieveFilesForPan(branchName, accountType, code);
                File[] retrieveFilesForAadhar = retrieveFilesForAadhar(branchName, accountType, code);
                File[] retrieveFilesForApplicationForm = retrieveFilesForApplicationForm(branchName, accountType, code);
                File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                try {
                    KYCRecordNew kycRecordNew = new KYCRecordNew();
                    kycRecordNew.setId(kYCRecord.getId());
                    kycRecordNew.setAccountType(accountType);
                    kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                    kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                    kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                    kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                    kycRecordNew.setBranchName(branchName);
                    kycRecordNew.setCode(code);
                    kycRecordNew.setDate(kYCRecord.getDate());
                    kycRecordNew.setApplicant(kYCRecord.getApplicant());
                    kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                    kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                    kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                    kycRecordNew.setRemark(kYCRecord.getRemark());
                    kycRecordNew.setStatus(kYCRecord.getStatus());
                    kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                    kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());

                    List<byte[]> arrayListForOtherDoc = new ArrayList<>();
                    for (File file : retrieveFilesForOtherDoc) {
                        arrayListForOtherDoc.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setOtherDoc(arrayListForOtherDoc);

                    List<byte[]> arrayListForPan = new ArrayList<>();
                    for (File file : retrieveFilesForPan) {
                        arrayListForPan.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setPan(arrayListForPan);

                    List<byte[]> arrayListForAadhar = new ArrayList<>();
                    for (File file : retrieveFilesForAadhar) {
                        arrayListForAadhar.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setAdhar(arrayListForAadhar);

                    List<byte[]> arrayListForApplication = new ArrayList<>();
                    for (File file : retrieveFilesForApplicationForm) {
                        arrayListForApplication.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setApplicationForm(arrayListForApplication);
//
                    recordList.add(kycRecordNew);
                } catch (IOException ex) {
                    Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        return recordList;
    }

    public int getBranchListSize(String branchname) {
        ArrayList<KYCRecordNew> recordList = new ArrayList<>();
        List<KYCRecord> findAll = getKYCRescordsall();
        for (KYCRecord kYCRecord : findAll) {
            if (branchname.equals(kYCRecord.getBranchName())) {
                String branchName = kYCRecord.getBranchName();
                String accountType = kYCRecord.getAccountType();
                String code = kYCRecord.getCode();
                File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
                File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                KYCRecordNew kycRecordNew = new KYCRecordNew();
                kycRecordNew.setId(kYCRecord.getId());
                kycRecordNew.setAccountType(accountType);
                kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                kycRecordNew.setBranchName(branchName);
                kycRecordNew.setCode(code);
                kycRecordNew.setDate(kYCRecord.getDate());
                kycRecordNew.setApplicant(kYCRecord.getApplicant());
                kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                kycRecordNew.setRemark(kYCRecord.getRemark());
                kycRecordNew.setStatus(kYCRecord.getStatus());
                kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());
                kycRecordNew.setOtherDoc(null);
                kycRecordNew.setAdhar(null);
                kycRecordNew.setApplicationForm(null);
                kycRecordNew.setPan(null);
                recordList.add(kycRecordNew);
            }
        }
        return recordList.size();
    }

    public List<KYCRecord> getAadhar(String adharNo) {
        ArrayList<KYCRecord> recordList = new ArrayList<>();
        List<KYCRecord> findAll = getKYCRescordsall();
        for (KYCRecord kYCRecord : findAll) {
            String adharNoDB = kYCRecord.getAdharNo();
            String aadharNoExist = "" + adharNoDB.indexOf(',');
            if (!aadharNoExist.equals("-1")) {
                String[] aadharNum = adharNoDB.split(",");
                if (adharNo.equals(aadharNum[0])) {
                    recordList.add(kYCRecord);
                }
            } else {
                if (adharNo.equals(adharNoDB)) {
                    recordList.add(kYCRecord);
                }
            }
        }
        return recordList;
    }
//    public List<KYCRecord> getAadhar(long adharNo) {
//        ArrayList<KYCRecord> recordList = new ArrayList<>();
//        List<KYCRecord> findAll = repository.findAll();
//        for (KYCRecord kYCRecord : findAll) {
//            if (adharNo == kYCRecord.getAdharNo()) {
//                recordList.add(kYCRecord);
//            }
//        }
//        return recordList;
//    }
//    
//        if (recordList.isEmpty()) {
//            return null;
//        } else {
//        return recordList;
//        }

    public List<KYCRecord> getAllRecords() {
        List<KYCRecord> recordList = getKYCRescordsall();
        return recordList;
    }

    public String delete(long id) {
        repository.deleteById(id);
        return "Done";
    }

    public KYCRecordNew get(long id) {
        Optional<KYCRecord> optional = repository.findById(id);
        if (optional.isPresent()) {
            KYCRecord kYCRecord = optional.get();
            String branchName = kYCRecord.getBranchName();
            String accountType = kYCRecord.getAccountType();
            String code = kYCRecord.getCode();
            File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
            File[] retrieveFilesForPan = retrieveFilesForPan(branchName, accountType, code);
            File[] retrieveFilesForAadhar = retrieveFilesForAadhar(branchName, accountType, code);
            File[] retrieveFilesForApplicationForm = retrieveFilesForApplicationForm(branchName, accountType, code);
            File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
            try {
                KYCRecordNew kycRecordNew = new KYCRecordNew();
                kycRecordNew.setId(kYCRecord.getId());
                kycRecordNew.setAccountType(accountType);
                kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                kycRecordNew.setBranchName(branchName);
                kycRecordNew.setCode(code);
                kycRecordNew.setDate(kYCRecord.getDate());
                kycRecordNew.setApplicant(kYCRecord.getApplicant());
                kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                kycRecordNew.setRemark(kYCRecord.getRemark());
                kycRecordNew.setStatus(kYCRecord.getStatus());
                kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());

                List<byte[]> arrayListForOtherDoc = new ArrayList<>();
                for (File file : retrieveFilesForOtherDoc) {
                    arrayListForOtherDoc.add(Files.readAllBytes(file.toPath()));
                }
                kycRecordNew.setOtherDoc(arrayListForOtherDoc);

                List<byte[]> arrayListForPan = new ArrayList<>();
                for (File file : retrieveFilesForPan) {
                    arrayListForPan.add(Files.readAllBytes(file.toPath()));
                }
                kycRecordNew.setPan(arrayListForPan);

                List<byte[]> arrayListForAadhar = new ArrayList<>();
                for (File file : retrieveFilesForAadhar) {
                    arrayListForAadhar.add(Files.readAllBytes(file.toPath()));
                }
                kycRecordNew.setAdhar(arrayListForAadhar);

                List<byte[]> arrayListForApplication = new ArrayList<>();
                for (File file : retrieveFilesForApplicationForm) {
                    arrayListForApplication.add(Files.readAllBytes(file.toPath()));
                }
                kycRecordNew.setApplicationForm(arrayListForApplication);
//
//                    int length = retrieveFiles.length;
//                    for (int i = 0; i < length; i++) {
//
//                        if ("adhar".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("applicationForm".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("pan".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
////
//                    }
                return kycRecordNew;
            } catch (IOException ex) {
                Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return null;
    }

    @Transactional
    public KYCRecordNew getByAdhar(String OldAdharNo, String OldAccountType) {
        List<KYCRecord> all = findByAdharNoAndaccountType(OldAdharNo, OldAccountType);
        for (KYCRecord kYCRecord : all) {
            String adharno = kYCRecord.getAdharNo();
            String accounttype = kYCRecord.getAccountType();
            String aadharNo = "" + adharno.indexOf(',');
            String aadharNu;
            if (!aadharNo.equals("-1")) {
                String[] aadharNum = adharno.split(",");
                aadharNu = aadharNum[0];
            } else {
                aadharNu = adharno;
            }
            if (aadharNu == OldAdharNo && accounttype.equals(OldAccountType)) {
                String branchName = kYCRecord.getBranchName();
                String accountType = kYCRecord.getAccountType();
                String code = kYCRecord.getCode();
                File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
                File[] retrieveFilesForPan = retrieveFilesForPan(branchName, accountType, code);
                File[] retrieveFilesForAadhar = retrieveFilesForAadhar(branchName, accountType, code);
                File[] retrieveFilesForApplicationForm = retrieveFilesForApplicationForm(branchName, accountType, code);
                File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                try {
                    KYCRecordNew kycRecordNew = new KYCRecordNew();
                    kycRecordNew.setId(kYCRecord.getId());
                    kycRecordNew.setAccountType(accountType);
                    kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                    kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                    kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                    kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                    kycRecordNew.setBranchName(branchName);
                    kycRecordNew.setCode(code);
                    kycRecordNew.setDate(kYCRecord.getDate());
                    kycRecordNew.setApplicant(kYCRecord.getApplicant());
                    kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                    kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                    kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                    kycRecordNew.setRemark(kYCRecord.getRemark());
                    kycRecordNew.setStatus(kYCRecord.getStatus());
                    kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                    kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());

                    List<byte[]> arrayListForOtherDoc = new ArrayList<>();
                    for (File file : retrieveFilesForOtherDoc) {
                        arrayListForOtherDoc.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setOtherDoc(arrayListForOtherDoc);

                    List<byte[]> arrayListForPan = new ArrayList<>();
                    for (File file : retrieveFilesForPan) {
                        arrayListForPan.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setPan(arrayListForPan);

                    List<byte[]> arrayListForAadhar = new ArrayList<>();
                    for (File file : retrieveFilesForAadhar) {
                        arrayListForAadhar.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setAdhar(arrayListForAadhar);

                    List<byte[]> arrayListForApplication = new ArrayList<>();
                    for (File file : retrieveFilesForApplicationForm) {
                        arrayListForApplication.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setApplicationForm(arrayListForApplication);
//
//                    int length = retrieveFiles.length;
//                    for (int i = 0; i < length; i++) {
//
//                        if ("adhar".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("applicationForm".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("pan".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
////
//                    }
                    return kycRecordNew;
                } catch (IOException ex) {
                    Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        return null;
    }

    @Transactional
    public KYCRecordNew getByAdharExist(String OldAdharNo, String OldAccountType) {
        List<KYCRecord> all = findByAdharNoAndaccountType(OldAdharNo, OldAccountType);
        for (KYCRecord kYCRecord : all) {
            String adharno = kYCRecord.getAdharNo();
            String accounttype = kYCRecord.getAccountType();
            String aadharNo = "" + adharno.indexOf(',');
            String aadharNu;
            if (!aadharNo.equals("-1")) {
                String[] aadharNum = adharno.split(",");
                aadharNu = aadharNum[0];
            } else {
                aadharNu = adharno;
            }
            if (aadharNu.equals(OldAdharNo) && accounttype.equals(OldAccountType)) {
                String branchName = kYCRecord.getBranchName();
                String accountType = kYCRecord.getAccountType();
                String code = kYCRecord.getCode();
                File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
                File[] retrieveFilesForPan = retrieveFilesForPan(branchName, accountType, code);
                File[] retrieveFilesForAadhar = retrieveFilesForAadhar(branchName, accountType, code);
                File[] retrieveFilesForApplicationForm = retrieveFilesForApplicationForm(branchName, accountType, code);
                File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                try {
                    KYCRecordNew kycRecordNew = new KYCRecordNew();
                    kycRecordNew.setId(kYCRecord.getId());
                    kycRecordNew.setAccountType(accountType);
                    kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                    kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                    kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                    kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                    kycRecordNew.setBranchName(branchName);
                    kycRecordNew.setCode(code);
                    kycRecordNew.setDate(kYCRecord.getDate());
                    kycRecordNew.setApplicant(kYCRecord.getApplicant());
                    kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                    kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                    kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                    kycRecordNew.setRemark(kYCRecord.getRemark());
                    kycRecordNew.setStatus(kYCRecord.getStatus());
                    kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                    kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());

                    List<byte[]> arrayListForOtherDoc = new ArrayList<>();
                    for (File file : retrieveFilesForOtherDoc) {
                        arrayListForOtherDoc.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setOtherDoc(arrayListForOtherDoc);

                    List<byte[]> arrayListForPan = new ArrayList<>();
                    for (File file : retrieveFilesForPan) {
                        arrayListForPan.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setPan(arrayListForPan);

                    List<byte[]> arrayListForAadhar = new ArrayList<>();
                    for (File file : retrieveFilesForAadhar) {
                        arrayListForAadhar.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setAdhar(arrayListForAadhar);

                    List<byte[]> arrayListForApplication = new ArrayList<>();
                    for (File file : retrieveFilesForApplicationForm) {
                        arrayListForApplication.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setApplicationForm(arrayListForApplication);
//
//                    int length = retrieveFiles.length;
//                    for (int i = 0; i < length; i++) {
//
//                        if ("adhar".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("applicationForm".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
//                        if ("pan".equals(retrieveFiles[i].getName())) {
//
//                            kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
//                        }
////
//                    }
                    return kycRecordNew;
                } catch (IOException ex) {
                    Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        return null;
    }

    public String getAllJson() {
        List<KYCRecord> arrayList = getKYCRescordsall();
        // Configure ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        // Convert ArrayList to JSON
        try {
            // Convert ArrayList to JSON
            String json = objectMapper.writeValueAsString(arrayList);

            // Write JSON to a file
            objectMapper.writeValue(new File("output.json"), arrayList);

            // Return JSON response
            return json;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error processing request";
        }

    }

//    public KYCRecord getActiveRecord(int id) {
//        KYCRecord record = get(id);
//        if (record.isActive()) {
//            return record;
//        }
//        return null;
//    }
//    public List<KYCRecord> getActiveRecords() {
//        List<KYCRecord> all = getAll();
//        ArrayList<KYCRecord> list = new ArrayList<>();
//        all.forEach((KYCRecord ele) -> {
//            if (ele.isActive()) {
//                list.add(ele);
//            }
//        });
//        return list;
//    }
    public File[] retrieveFiles(String branchName, String accountType, String code) {
        String directoryPath = "";
        if (accountType.endsWith("Saving")) {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Saving" + "//" + accountType + "//" + code;
        } else {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Current" + "//" + accountType + "//" + code;
        }
        File directory = new File(directoryPath);
        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
            } else {
                System.out.println("No files found in the directory.");
            }
            return files;
        } else {
            System.out.println("Directory does not exist or is not a valid directory.");
        }
        return null;
    }

    public File[] retrieveFilesForOtherDoc(String branchName, String accountType, String code) {
        String directoryPath = "";
        if (accountType.endsWith("Saving")) {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Saving" + "//" + accountType + "//" + code + "//" + "otherDoc";
        } else {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Current" + "//" + accountType + "//" + code + "//" + "otherDoc";
        }
        File directory = new File(directoryPath);
        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
            } else {
                System.out.println("No files found in the directory.");
            }
            return files;
        } else {
            System.out.println("Directory does not exist or is not a valid directory.");
        }
        return null;
    }

    public File[] retrieveFilesForPan(String branchName, String accountType, String code) {
        String directoryPath = "";
        if (accountType.endsWith("Saving")) {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Saving" + "//" + accountType + "//" + code + "//" + "pan";
        } else {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Current" + "//" + accountType + "//" + code + "//" + "pan";
        }
        File directory = new File(directoryPath);
        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
            } else {
                System.out.println("No files found in the directory.");
            }
            return files;
        } else {
            System.out.println("Directory does not exist or is not a valid directory.");
        }
        return null;
    }

    public File[] retrieveFilesForAadhar(String branchName, String accountType, String code) {
        String directoryPath = "";
        if (accountType.endsWith("Saving")) {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Saving" + "//" + accountType + "//" + code + "//" + "adhar";
        } else {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Current" + "//" + accountType + "//" + code + "//" + "adhar";
        }
        File directory = new File(directoryPath);
        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
            } else {
                System.out.println("No files found in the directory.");
            }
            return files;
        } else {
            System.out.println("Directory does not exist or is not a valid directory.");
        }
        return null;
    }

    public File[] retrieveFilesForApplicationForm(String branchName, String accountType, String code) {
        String directoryPath = "";
        if (accountType.endsWith("Saving")) {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Saving" + "//" + accountType + "//" + code + "//" + "applicationForm";
        } else {
            directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Current" + "//" + accountType + "//" + code + "//" + "applicationForm";
        }
        File directory = new File(directoryPath);
        if (directory.exists() && directory.isDirectory()) {
            File[] files = directory.listFiles();

            if (files != null) {
            } else {
                System.out.println("No files found in the directory.");
            }
            return files;
        } else {
            System.out.println("Directory does not exist or is not a valid directory.");
        }
        return null;
    }

    public void deleteDirectory(File directory) {
        if (directory.exists()) {
            File[] files = directory.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isDirectory()) {
                        // Recursive call to delete subdirectories and their contents
                        deleteDirectory(file);
                    } else {
                        // Delete the file
                        file.delete();
                    }
                }
            }
            // Delete the empty directory
            directory.delete();
        } else {
//            System.out.println("Directory does not exist.");
        }
    }

    private List<KYCRecord> findByAdharNoAndaccountType(String OldAdharNo, String OldAccountType) {
        ArrayList<KYCRecord> recordList = new ArrayList<>();
        List<KYCRecord> findAll = getKYCRescordsall();
        if (!findAll.isEmpty()) {

            for (KYCRecord kYCRecord : findAll) {
                String accountType = kYCRecord.getAccountType();
                String adharNo = kYCRecord.getAdharNo();

                String aadharNo = "" + adharNo.indexOf(',');
                String aadharNu;
                if (!aadharNo.equals("-1")) {
                    String[] aadharNum = adharNo.split(",");
                    aadharNu = aadharNum[0];
                } else {
                    aadharNu = adharNo;
                }
                if (aadharNu.equals(OldAdharNo) && accountType.equals(OldAccountType)) {
                    recordList.add(kYCRecord);
                }
            }
            return recordList;
        } else {
            return recordList;
        }
    }

}
