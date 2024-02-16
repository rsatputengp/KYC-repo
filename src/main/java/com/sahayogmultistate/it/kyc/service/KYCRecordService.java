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

    public KYCRecord add(MultipartFile pan, MultipartFile adhar,
            MultipartFile[] otherDoc, MultipartFile applicationForm,
            String firstName, String midName, String lastName, long adharNo,
            long mobileNo, String accountType, String branchName, String status,
            String remark, Date date, String panStatus, String adharStatus,
            String otherDocStatus, String applicationFormStatus,
            String approvedBy, String uploadedBy, String timeStam
    ) throws IOException {
        int codeNo;
        Integer codeNoOld = getBranchList(branchName).size();
        if (codeNoOld == null) {
            codeNo = 0;
        } else {
            codeNo = getBranchList(branchName).size();
        }
        String code = "CODE_0" + (1 + codeNo) + "_" + branchName;
        KYCRecord record = new KYCRecord();
        KYCRecordNew byAdhar = getByAdhar(adharNo, accountType);
        if (byAdhar == null) {

            record.setFirstName(firstName);
            record.setMidName(midName);
            record.setLastName(lastName);
            record.setAdharNo(adharNo);
            record.setMobileNo(mobileNo);
            record.setAccountType(accountType);
            record.setBranchName(branchName);
            record.setStatus(status);
            record.setRemark(remark);
            record.setDate(date);
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
                    // Ensure parent directories exist
                    directory.mkdirs();
                    deleteDirectory(directoryForOtherDocs);
//                    directoryForOtherDocs.delete();
                    directoryForOtherDocs.mkdirs();
                    try (FileOutputStream fosPan = new FileOutputStream(new File(directory, "pan"))) {
                        fosPan.write(pan.getBytes());
                    }
                    try (FileOutputStream fosAdhar = new FileOutputStream(new File(directory, "adhar"))) {
                        fosAdhar.write(adhar.getBytes());
                    }
                    int loop = otherDoc.length;
                    for (int i = 0; i < loop; i++) {
                        try (FileOutputStream fosOtherDoc = new FileOutputStream(new File(directoryForOtherDocs, "otherDoc_" + i))) {
                            fosOtherDoc.write(otherDoc[i].getBytes());
                        }
                    }

                    try (FileOutputStream fosApplicationForm = new FileOutputStream(new File(directory, "applicationForm"))) {
                        fosApplicationForm.write(applicationForm.getBytes());
                    }
                } else {
                    String directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Current" + "//" + accountType + "//" + code;
                    File directory = new File(directoryPath);
                    File directoryForOtherDocs = new File(directoryPath + "//" + "otherDoc");
                    // Ensure parent directories exist
                    directory.mkdirs();
                    deleteDirectory(directoryForOtherDocs);
//                    directoryForOtherDocs.delete();
                    directoryForOtherDocs.mkdirs();
                    try (FileOutputStream fosPan = new FileOutputStream(new File(directory, "pan"))) {
                        fosPan.write(pan.getBytes());
                    }
                    try (FileOutputStream fosAdhar = new FileOutputStream(new File(directory, "adhar"))) {
                        fosAdhar.write(adhar.getBytes());
                    }
                    int loop = otherDoc.length;
                    for (int i = 0; i < loop; i++) {
                        try (FileOutputStream fosOtherDoc = new FileOutputStream(new File(directoryForOtherDocs, "otherDoc_" + i))) {
                            fosOtherDoc.write(otherDoc[i].getBytes());
                        }
                    }
                    try (FileOutputStream fosApplicationForm = new FileOutputStream(new File(directory, "applicationForm"))) {
                        fosApplicationForm.write(applicationForm.getBytes());
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

    public KYCRecord update(MultipartFile pan, MultipartFile adhar,
            MultipartFile[] otherDoc, MultipartFile applicationForm,
            long id, String firstName, String midName, String lastName,
            long adharNo, long mobileNo, String accountType, String branchName,
            String status, String remark, Date date, String panStatus,
            String adharStatus, String otherDocStatus, String applicationFormStatus,
            String approvedBy, String uploadedBy, String timeStam)
            throws IOException {
        KYCRecordNew recordNew = get(id);
        String code = recordNew.getCode();
        ArrayList<String> timestam = recordNew.getTimeStam();
        timestam.add(timeStam);
        KYCRecord record = new KYCRecord(id, firstName, midName, lastName, adharNo, mobileNo, accountType, branchName, status, remark, date, panStatus, adharStatus, otherDocStatus, applicationFormStatus, approvedBy, uploadedBy, code, timestam, null, null, null, null);
        if (record != null) {
            try {

//                String filePath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + accountType + "//" + firstName + lastName + "_" + adharNo;
                if (accountType.endsWith("Saving")) {
                    String directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Saving" + "//" + accountType + "//" + code;
                    File directory = new File(directoryPath);
                    File directoryForOtherDocs = new File(directoryPath + "//" + "otherDoc");
                    // Ensure parent directories exist
                    directory.mkdirs();
                    deleteDirectory(directoryForOtherDocs);
//                    directoryForOtherDocs.delete();
                    directoryForOtherDocs.mkdirs();
                    try (FileOutputStream fosPan = new FileOutputStream(new File(directory, "pan"))) {
                        fosPan.write(pan.getBytes());
                    }
                    try (FileOutputStream fosAdhar = new FileOutputStream(new File(directory, "adhar"))) {
                        fosAdhar.write(adhar.getBytes());
                    }
                    int loop = otherDoc.length;
                    for (int i = 0; i < loop; i++) {
                        try (FileOutputStream fosOtherDoc = new FileOutputStream(new File(directoryForOtherDocs, "otherDoc_" + i))) {
                            fosOtherDoc.write(otherDoc[i].getBytes());
                        }
                    }
                    try (FileOutputStream fosApplicationForm = new FileOutputStream(new File(directory, "applicationForm"))) {
                        fosApplicationForm.write(applicationForm.getBytes());
                    }
                } else {
                    String directoryPath = ROOT_F + "//" + branchName + "//" + "CASA" + "//" + "Current" + "//" + accountType + "//" + code;
                    File directory = new File(directoryPath);
                    File directoryForOtherDocs = new File(directoryPath + "//" + "otherDoc");
                    // Ensure parent directories exist
                    directory.mkdirs();
                    deleteDirectory(directoryForOtherDocs);
//                    directoryForOtherDocs.delete();
                    directoryForOtherDocs.mkdirs();
                    try (FileOutputStream fosPan = new FileOutputStream(new File(directory, "pan"))) {
                        fosPan.write(pan.getBytes());
                    }
                    try (FileOutputStream fosAdhar = new FileOutputStream(new File(directory, "adhar"))) {
                        fosAdhar.write(adhar.getBytes());
                    }
                    int loop = otherDoc.length;
                    for (int i = 0; i < loop; i++) {
                        try (FileOutputStream fosOtherDoc = new FileOutputStream(new File(directoryForOtherDocs, "otherDoc_" + i))) {
                            fosOtherDoc.write(otherDoc[i].getBytes());
                        }
                    }
                    try (FileOutputStream fosApplicationForm = new FileOutputStream(new File(directory, "applicationForm"))) {
                        fosApplicationForm.write(applicationForm.getBytes());
                    }
                }

            } catch (IOException e) {
                System.out.println("Failed to upload file: " + e.getMessage());
            }
//            <--

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
                File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                try {
                    KYCRecordNew kycRecordNew = new KYCRecordNew();
                    kycRecordNew.setAccountType(accountType);
                    kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                    kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                    kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                    kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                    kycRecordNew.setBranchName(branchName);
                    kycRecordNew.setCode(code);
                    kycRecordNew.setDate(kYCRecord.getDate());
                    kycRecordNew.setFirstName(kYCRecord.getFirstName());
                    kycRecordNew.setId(kYCRecord.getId());
                    kycRecordNew.setLastName(kYCRecord.getLastName());
                    kycRecordNew.setMidName(kYCRecord.getMidName());
                    kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                    kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                    kycRecordNew.setPan(kYCRecord.getPan());
                    kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                    kycRecordNew.setRemark(kYCRecord.getRemark());
                    kycRecordNew.setStatus(kYCRecord.getStatus());
                    kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                    kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());
                    List<byte[]> arrayList = new ArrayList<>();
                    for (File file : retrieveFilesForOtherDoc) {
                        arrayList.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setOtherDoc(arrayList);
                    int length = retrieveFiles.length;
                    for (int i = 0; i < length; i++) {

                        if ("adhar".equals(retrieveFiles[i].getName())) {

                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
                        }
                        if ("applicationForm".equals(retrieveFiles[i].getName())) {

                            kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
                        }
                        if ("pan".equals(retrieveFiles[i].getName())) {

                            kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
                        }

                    }
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

//    public List<KYCRecordNew> getAllBranchListOfCOPs(String userName) {
//        ArrayList<KYCRecordNew> recordList = new ArrayList<>();
//        BranchAccess user = service.getUser(userName);
//        ArrayList<String> branchNameList = user.getBranchNameList();
//        List<KYCRecord> kYCRecords = getAll();
//        for (KYCRecord kYCRecord : kYCRecords) {
//            for (String branchname : branchNameList) {
//                if (branchname.equals(kYCRecord.getBranchName())) {
//                    String branchName = kYCRecord.getBranchName();
//                    String accountType = kYCRecord.getAccountType();
//                    String code = kYCRecord.getCode();
//                    File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
//                    File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
//                    try {
//                        KYCRecordNew kycRecordNew = new KYCRecordNew();
//                        kycRecordNew.setAccountType(accountType);
//                        kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
//                        kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
//                        kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
//                        kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
//                        kycRecordNew.setBranchName(branchName);
//                        kycRecordNew.setCode(code);
//                        kycRecordNew.setDate(kYCRecord.getDate());
//                        kycRecordNew.setFirstName(kYCRecord.getFirstName());
//                        kycRecordNew.setId(kYCRecord.getId());
//                        kycRecordNew.setLastName(kYCRecord.getLastName());
//                        kycRecordNew.setMidName(kYCRecord.getMidName());
//                        kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
//                        kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
//                        kycRecordNew.setPan(kYCRecord.getPan());
//                        kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
//                        kycRecordNew.setRemark(kYCRecord.getRemark());
//                        kycRecordNew.setStatus(kYCRecord.getStatus());
//                        kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
//                        kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());
//                        List<byte[]> arrayList = new ArrayList<>();
//                        for (File file : retrieveFilesForOtherDoc) {
//                            arrayList.add(Files.readAllBytes(file.toPath()));
//                        }
//                        kycRecordNew.setOtherDoc(arrayList);
//                        int length = retrieveFiles.length;
//                        for (int i = 0; i < length; i++) {
//
//                            if ("adhar".equals(retrieveFiles[i].getName())) {
//
//                                kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
//                            }
//                            if ("applicationForm".equals(retrieveFiles[i].getName())) {
//
//                                kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
//                            }
//                            if ("pan".equals(retrieveFiles[i].getName())) {
//
//                                kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
//                            }
//
//                        }
//                        recordList.add(kycRecordNew);
//                    } catch (IOException ex) {
//                        Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
//                    }
//                }
//            }
//        }
//        return recordList;
//    }
//
//    public List<KYCRecordNew> getAllBranchListOfBOM(String userName) {
//        ArrayList<KYCRecordNew> recordList = new ArrayList<>();
//        BranchAccess user = service.getUser(userName);
//        ArrayList<String> branchNameList = user.getBranchNameList();
//        List<KYCRecord> kYCRecords = getAll();
//        for (KYCRecord kYCRecord : kYCRecords) {
//            for (String branchname : branchNameList) {
//                if (branchname.equals(kYCRecord.getBranchName())) {
//                    String branchName = kYCRecord.getBranchName();
//                    String accountType = kYCRecord.getAccountType();
//                    String code = kYCRecord.getCode();
//                    File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
//                    File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
//                    try {
//                        KYCRecordNew kycRecordNew = new KYCRecordNew();
//                        kycRecordNew.setAccountType(accountType);
//                        kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
//                        kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
//                        kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
//                        kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
//                        kycRecordNew.setBranchName(branchName);
//                        kycRecordNew.setCode(code);
//                        kycRecordNew.setDate(kYCRecord.getDate());
//                        kycRecordNew.setFirstName(kYCRecord.getFirstName());
//                        kycRecordNew.setId(kYCRecord.getId());
//                        kycRecordNew.setLastName(kYCRecord.getLastName());
//                        kycRecordNew.setMidName(kYCRecord.getMidName());
//                        kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
//                        kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
//                        kycRecordNew.setPan(kYCRecord.getPan());
//                        kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
//                        kycRecordNew.setRemark(kYCRecord.getRemark());
//                        kycRecordNew.setStatus(kYCRecord.getStatus());
//                        kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
//                        kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());
//                        if ("adhar".equals(retrieveFiles[0].getName())) {
//
//                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[0].toPath()));
//                        }
//                        List<byte[]> arrayList = new ArrayList<>();
//                        for (File file : retrieveFilesForOtherDoc) {
//                            arrayList.add(Files.readAllBytes(file.toPath()));
//                        }
//                        kycRecordNew.setOtherDoc(arrayList);
//                        int length = retrieveFiles.length;
//                        for (int i = 0; i < length; i++) {
//
//                            if ("adhar".equals(retrieveFiles[i].getName())) {
//
//                                kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
//                            }
//                            if ("applicationForm".equals(retrieveFiles[i].getName())) {
//
//                                kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
//                            }
//                            if ("pan".equals(retrieveFiles[i].getName())) {
//
//                                kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
//                            }
//
//                        }
//                        recordList.add(kycRecordNew);
//                    } catch (IOException ex) {
//                        Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
//                    }
//                }
//            }
//        }
//        return recordList;
//    }
//    public List<KYCRecord> getAllBranchListt(String branchName) {
//        List<KYCRecord> all = repository.findAll();
//        ArrayList<KYCRecord> recordList = new ArrayList<>();
//        all.forEach((KYCRecord ele) -> {
//            if (branchName.equals(ele.getBranchName())) {
//                recordList.add(ele);
//            }
//        });
//        return recordList;
//    }
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
                    File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                    try {
                        KYCRecordNew kycRecordNew = new KYCRecordNew();
                        kycRecordNew.setAccountType(accountType);
                        kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                        kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                        kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                        kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                        kycRecordNew.setBranchName(branchName);
                        kycRecordNew.setCode(code);
                        kycRecordNew.setDate(kYCRecord.getDate());
                        kycRecordNew.setFirstName(kYCRecord.getFirstName());
                        kycRecordNew.setId(kYCRecord.getId());
                        kycRecordNew.setLastName(kYCRecord.getLastName());
                        kycRecordNew.setMidName(kYCRecord.getMidName());
                        kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                        kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                        kycRecordNew.setPan(kYCRecord.getPan());
                        kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                        kycRecordNew.setRemark(kYCRecord.getRemark());
                        kycRecordNew.setStatus(kYCRecord.getStatus());
                        kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                        kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());
                        if ("adhar".equals(retrieveFiles[0].getName())) {

                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[0].toPath()));
                        }
                        List<byte[]> arrayList = new ArrayList<>();
                        for (File file : retrieveFilesForOtherDoc) {
                            arrayList.add(Files.readAllBytes(file.toPath()));
                        }
                        kycRecordNew.setOtherDoc(arrayList);
                        int length = retrieveFiles.length;
                        for (int i = 0; i < length; i++) {

                            if ("adhar".equals(retrieveFiles[i].getName())) {

                                kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
                            }
                            if ("applicationForm".equals(retrieveFiles[i].getName())) {

                                kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
                            }
                            if ("pan".equals(retrieveFiles[i].getName())) {

                                kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
                            }

                        }
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
                    kycRecord.setAccountType(accountType);
                    kycRecord.setAdharNo(kYCRecord.getAdharNo());
                    kycRecord.setAdharStatus(kYCRecord.getAdharStatus());
                    kycRecord.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                    kycRecord.setApprovedBy(kYCRecord.getApprovedBy());
                    kycRecord.setBranchName(branchName);
                    kycRecord.setCode(code);
                    kycRecord.setDate(kYCRecord.getDate());
                    kycRecord.setFirstName(kYCRecord.getFirstName());
                    kycRecord.setId(kYCRecord.getId());
                    kycRecord.setLastName(kYCRecord.getLastName());
                    kycRecord.setMidName(kYCRecord.getMidName());
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
                File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                try {
                    KYCRecordNew kycRecordNew = new KYCRecordNew();
                    kycRecordNew.setAccountType(accountType);
                    kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                    kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                    kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                    kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                    kycRecordNew.setBranchName(branchName);
                    kycRecordNew.setCode(code);
                    kycRecordNew.setDate(kYCRecord.getDate());
                    kycRecordNew.setFirstName(kYCRecord.getFirstName());
                    kycRecordNew.setId(kYCRecord.getId());
                    kycRecordNew.setLastName(kYCRecord.getLastName());
                    kycRecordNew.setMidName(kYCRecord.getMidName());
                    kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                    kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                    kycRecordNew.setPan(kYCRecord.getPan());
                    kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                    kycRecordNew.setRemark(kYCRecord.getRemark());
                    kycRecordNew.setStatus(kYCRecord.getStatus());
                    kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                    kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());
                    List<byte[]> arrayList = new ArrayList<>();
                    for (File file : retrieveFilesForOtherDoc) {
                        arrayList.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setOtherDoc(arrayList);
                    int length = retrieveFiles.length;
                    for (int i = 0; i < length; i++) {

                        if ("adhar".equals(retrieveFiles[i].getName())) {

                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
                        }
                        if ("applicationForm".equals(retrieveFiles[i].getName())) {

                            kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
                        }
                        if ("pan".equals(retrieveFiles[i].getName())) {

                            kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
                        }

                    }
                    recordList.add(kycRecordNew);
                } catch (IOException ex) {
                    Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        return recordList;
    }

    @Transactional
    public List<KYCRecord> getAadhar(long adharNo) {
        return repository.findByAdharNo(adharNo);
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
            File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
            try {
                KYCRecordNew kycRecordNew = new KYCRecordNew();
                kycRecordNew.setAccountType(accountType);
                kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                kycRecordNew.setBranchName(branchName);
                kycRecordNew.setCode(code);
                kycRecordNew.setDate(kYCRecord.getDate());
                kycRecordNew.setFirstName(kYCRecord.getFirstName());
                kycRecordNew.setId(kYCRecord.getId());
                kycRecordNew.setLastName(kYCRecord.getLastName());
                kycRecordNew.setMidName(kYCRecord.getMidName());
                kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                kycRecordNew.setPan(kYCRecord.getPan());
                kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                kycRecordNew.setRemark(kYCRecord.getRemark());
                kycRecordNew.setStatus(kYCRecord.getStatus());
                kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());
                List<byte[]> arrayList = new ArrayList<>();
                for (File file : retrieveFilesForOtherDoc) {
                    arrayList.add(Files.readAllBytes(file.toPath()));
                }
                kycRecordNew.setOtherDoc(arrayList);
                int length = retrieveFiles.length;
                for (int i = 0; i < length; i++) {

                    if ("adhar".equals(retrieveFiles[i].getName())) {

                        kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
                    }
                    if ("applicationForm".equals(retrieveFiles[i].getName())) {

                        kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
                    }
                    if ("pan".equals(retrieveFiles[i].getName())) {

                        kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
                    }

                }
                return kycRecordNew;
            } catch (IOException ex) {
                Logger.getLogger(KYCRecordService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return null;
    }

    @Transactional
    public KYCRecordNew getByAdhar(long OldAdharNo, String OldAccountType) {
        List<KYCRecord> all = repository.findByAdharNoAndaccountType(OldAdharNo, OldAccountType);
        for (KYCRecord kYCRecord : all) {
            long adharno = kYCRecord.getAdharNo();
            String accounttype = kYCRecord.getAccountType();
            if (adharno == OldAdharNo && accounttype.equals(OldAccountType)) {
                String branchName = kYCRecord.getBranchName();
                String accountType = kYCRecord.getAccountType();
                String code = kYCRecord.getCode();
                File[] retrieveFiles = retrieveFiles(branchName, accountType, code);
                File[] retrieveFilesForOtherDoc = retrieveFilesForOtherDoc(branchName, accountType, code);
                try {
                    KYCRecordNew kycRecordNew = new KYCRecordNew();
                    kycRecordNew.setAccountType(accountType);
                    kycRecordNew.setAdharNo(kYCRecord.getAdharNo());
                    kycRecordNew.setAdharStatus(kYCRecord.getAdharStatus());
                    kycRecordNew.setApplicationFormStatus(kYCRecord.getApplicationFormStatus());
                    kycRecordNew.setApprovedBy(kYCRecord.getApprovedBy());
                    kycRecordNew.setBranchName(branchName);
                    kycRecordNew.setCode(code);
                    kycRecordNew.setDate(kYCRecord.getDate());
                    kycRecordNew.setFirstName(kYCRecord.getFirstName());
                    kycRecordNew.setId(kYCRecord.getId());
                    kycRecordNew.setLastName(kYCRecord.getLastName());
                    kycRecordNew.setMidName(kYCRecord.getMidName());
                    kycRecordNew.setMobileNo(kYCRecord.getMobileNo());
                    kycRecordNew.setOtherDocStatus(kYCRecord.getOtherDocStatus());
                    kycRecordNew.setPan(kYCRecord.getPan());
                    kycRecordNew.setPanStatus(kYCRecord.getPanStatus());
                    kycRecordNew.setRemark(kYCRecord.getRemark());
                    kycRecordNew.setStatus(kYCRecord.getStatus());
                    kycRecordNew.setTimeStam(kYCRecord.getTimeStam());
                    kycRecordNew.setUploadedBy(kYCRecord.getUploadedBy());
                    List<byte[]> arrayList = new ArrayList<>();
                    for (File file : retrieveFilesForOtherDoc) {
                        arrayList.add(Files.readAllBytes(file.toPath()));
                    }
                    kycRecordNew.setOtherDoc(arrayList);
                    int length = retrieveFiles.length;
                    for (int i = 0; i < length; i++) {

                        if ("adhar".equals(retrieveFiles[i].getName())) {

                            kycRecordNew.setAdhar(Files.readAllBytes(retrieveFiles[i].toPath()));
                        }
                        if ("applicationForm".equals(retrieveFiles[i].getName())) {

                            kycRecordNew.setApplicationForm(Files.readAllBytes(retrieveFiles[i].toPath()));
                        }
                        if ("pan".equals(retrieveFiles[i].getName())) {

                            kycRecordNew.setPan(Files.readAllBytes(retrieveFiles[i].toPath()));
                        }

                    }
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

}
