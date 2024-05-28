/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayogmultistate.it.kyc.controller;

import com.sahayogmultistate.it.kyc.model.KYCRecord;
import com.sahayogmultistate.it.kyc.model.KYCRecordNew;
import com.sahayogmultistate.it.kyc.service.KYCRecordService;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author HP
 */
@RestController
@RequestMapping("kyc")
public class KYCRecordController {

    @Autowired
    private KYCRecordService service;

    public KYCRecordController() {
        System.out.println("I am in KYCRecordController");
    }

    @PostMapping("/save")
    public KYCRecord saveIMageOrFile(@RequestParam("pan") MultipartFile[] pan,
            @RequestParam("adhar") MultipartFile[] adhar,
            @RequestParam("otherDoc") MultipartFile[] otherDoc,
            @RequestParam("applicationForm") MultipartFile[] applicationForm,
            @RequestParam("applicant") String applicant,
            @RequestParam("adharNo") long adharNo,
            @RequestParam("mobileNo") long mobileNo,
            @RequestParam("accountType") String accountType,
            @RequestParam("branchName") String branchName,
            @RequestParam("status") String status,
            @RequestParam("remark") String remark,
            @RequestParam("panStatus") String panStatus,
            @RequestParam("adharStatus") String adharStatus,
            @RequestParam("otherDocStatus") String otherDocStatus,
            @RequestParam("applicationFormStatus") String applicationFormStatus,
            @RequestParam("approvedBy") String approvedBy,
            @RequestParam("uploadedBy") String uploadedBy
    ) throws IOException {

        long currentTimeMillis = System.currentTimeMillis();
        TimeZone indianTimeZone = TimeZone.getTimeZone("Asia/Kolkata");
        TimeZone.setDefault(indianTimeZone);
        Date date = new Date(currentTimeMillis);
        String timeStamp = " Uploaded By - " + uploadedBy + " : " + date.toString();
        KYCRecord record = new KYCRecord();
        record = service.add(pan, adhar, otherDoc, applicationForm, applicant,
                adharNo, mobileNo, accountType, branchName, status,
                remark, date, panStatus, adharStatus, otherDocStatus,
                applicationFormStatus, approvedBy, uploadedBy, timeStamp);
//        for (int i = 0; i < 500; i++) {
//            
//        record = service.add(pan, adhar, otherDoc, applicationForm, firstName,
//                midName, lastName, adharNo, mobileNo, accountType, branchName,
//                status, remark, date, panStatus, adharStatus, otherDocStatus,
//                applicationFormStatus, approvedBy, uploadedBy, timeStamp);
//        }
        return record;
    }

//    @PostMapping("/savekyc")
//    public String saveIMageOrFileKyc(@RequestParam("pan") MultipartFile pan,
//            @RequestParam("adhar") MultipartFile adhar,
//            @RequestParam("otherDoc") MultipartFile[] otherDoc,
//            @RequestParam("applicationForm") MultipartFile applicationForm,
//            @RequestParam("firstName") String firstName,
//            @RequestParam("midName") String midName,
//            @RequestParam("lastName") String lastName,
//            @RequestParam("adharNo") long adharNo,
//            @RequestParam("mobileNo") long mobileNo,
//            @RequestParam("accountType") String accountType,
//            @RequestParam("branchName") String branchName,
//            @RequestParam("status") String status,
//            @RequestParam("remark") String remark,
//            @RequestParam("panStatus") String panStatus,
//            @RequestParam("adharStatus") String adharStatus,
//            @RequestParam("otherDocStatus") String otherDocStatus,
//            @RequestParam("applicationFormStatus") String applicationFormStatus,
//            @RequestParam("approvedBy") String approvedBy,
//            @RequestParam("uploadedBy") String uploadedBy
//    ) throws IOException {
//
//        long currentTimeMillis = System.currentTimeMillis();
//        TimeZone indianTimeZone = TimeZone.getTimeZone("Asia/Kolkata");
//        TimeZone.setDefault(indianTimeZone);
//        Date date = new Date(currentTimeMillis);
//        String timeStamp = " Uploaded By - " + uploadedBy + " : " + date.toString();
//        KYCRecord record = service.add(pan, adhar, otherDoc, applicationForm, firstName,
//                midName, lastName, adharNo, mobileNo, accountType, branchName,
//                status, remark, date, panStatus, adharStatus, otherDocStatus,
//                applicationFormStatus, approvedBy, uploadedBy, timeStamp);
//        return record.getCode();
//    }
//    @RequestMapping("add/{file}/{firstName}/{lastName}/{accountNumber}/{accountType}")
//    public KYCRecord add(@PathVariable MultipartFile file, @PathVariable String firstName,
//            @PathVariable String lastName,
//            @PathVariable long accountNumber, @PathVariable String accountType) {
//
//        KYCRecord record = service.add(file, firstName, lastName, accountNumber, accountType);
//        return record;
//    }
    @RequestMapping("getAllBranchListOfCOPs/{userName}")
    public List<KYCRecord> getAllBranchListOfCOPs(@PathVariable String userName) {
        List<KYCRecord> list = service.getAllBranchListForDB(userName);
        return list;
    }

    @RequestMapping("getAllBranchListOfBOM/{userName}")
    public List<KYCRecord> getAllBranchListOfBOM(@PathVariable String userName) {
        List<KYCRecord> list = service.getAllBranchListForDB(userName);
        return list;
    }

//    @RequestMapping("getBranchList/{branchName}")
//    public List<KYCRecordNew> getBranchList(@PathVariable String branchName) {
//        List<KYCRecordNew> list = service.getBranchList(branchName);
//        return list;
//    }
//    @RequestMapping("getBranchList")
//    public List<KYCRecordNew> getBranchList() {
//        List<KYCRecordNew> list = service.getBranchList();
//        return list;
//    }
    @RequestMapping("get/{id}")
    public KYCRecordNew get(@PathVariable long id) {
        KYCRecordNew record = service.get(id);
        return record;
    }

    @RequestMapping("delete/{id}")
    public void delete(@PathVariable long id) {
        service.delete(id);
    }

    @RequestMapping("getJsonFile")
    public String getJsonFile() {
        return service.getAllJson();
    }

    @RequestMapping("getAadhar/{adharNo}")
    public List<KYCRecord> getAadhar(@PathVariable long adharNo) {
        return service.getAadhar(adharNo);
    }

    @PostMapping("/update")
    public KYCRecord update(@RequestParam("pan") MultipartFile[] pan,
            @RequestParam("adhar") MultipartFile[] adhar,
            @RequestParam("otherDoc") MultipartFile[] otherDoc,
            @RequestParam("applicationForm") MultipartFile[] applicationForm,
            @RequestParam("id") long id,
            @RequestParam("applicant") String applicant,
            @RequestParam("adharNo") long adharNo,
            @RequestParam("mobileNo") long mobileNo,
            @RequestParam("accountType") String accountType,
            @RequestParam("branchName") String branchName,
            @RequestParam("status") String status,
            @RequestParam("remark") String remark,
            @RequestParam("panStatus") String panStatus,
            @RequestParam("adharStatus") String adharStatus,
            @RequestParam("otherDocStatus") String otherDocStatus,
            @RequestParam("applicationFormStatus") String applicationFormStatus,
            @RequestParam("approvedBy") String approvedBy,
            @RequestParam("uploadedBy") String uploadedBy
    ) throws IOException {
        long currentTimeMillis = System.currentTimeMillis();
        TimeZone indianTimeZone = TimeZone.getTimeZone("Asia/Kolkata");
        TimeZone.setDefault(indianTimeZone);
        Date date = new Date(currentTimeMillis);
        String timeStamp = "";
        if ("Approved".equals(status)) {
            timeStamp = " Approved By - " + approvedBy + " : " + date.toString();
        } else {
            timeStamp = status + " : " + date.toString();
        }
        KYCRecord record = service.update(pan, adhar, otherDoc, applicationForm,
                id, applicant, adharNo, mobileNo, accountType, branchName,
                status, remark, date, panStatus, adharStatus, otherDocStatus,
                applicationFormStatus, approvedBy, uploadedBy, timeStamp);
        return record;
    }

}
