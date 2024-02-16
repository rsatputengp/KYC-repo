/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayogmultistate.it.kyc.controller;

import com.sahayogmultistate.it.kyc.model.UserRecord;
import com.sahayogmultistate.it.kyc.service.UserRecordService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author HP
 */
@RestController
@RequestMapping("user")
public class UserRecordController {

    @Autowired
    private UserRecordService service;

    public UserRecordController() {
        System.out.println("I am in User RecordController");
    }

    @RequestMapping("add/{userName}/{userPassword}/{branchName}/{userType}/{userIdStatus}/{remark}")
    public UserRecord save(@PathVariable String userName, @PathVariable String userPassword,
            @PathVariable String branchName, @PathVariable String userType,
            @PathVariable String userIdStatus, @PathVariable String remark) {
        UserRecord userRecord = service.add(userName, userPassword, branchName, userType, userIdStatus, remark);
        return userRecord;
    }

    @RequestMapping("update/{id}/{userName}/{userPassword}/{branchName}/{userType}/{userIdStatus}/{remark}")
    public UserRecord update(@PathVariable int id, @PathVariable String userName,
            @PathVariable String userPassword, @PathVariable String branchName,
            @PathVariable String userType, @PathVariable String userIdStatus,
            @PathVariable String remark) {
        UserRecord userRecord = service.update(id, userName, userPassword, branchName, userType, userIdStatus, remark);
        return userRecord;
    }

    @RequestMapping("getallUser")
    public List<UserRecord> getAll() {
        List<UserRecord> list = service.getallUser();
        return list;
    }

    @RequestMapping("get/{id}")
    public UserRecord get(@PathVariable int id) {
        UserRecord userRecord = service.get(id);
        return userRecord;
    }

    @RequestMapping("login/{userName}/{userPassword}")
    public UserRecord login(@PathVariable String userName, @PathVariable String userPassword) {
        UserRecord userRecord = service.getUser(userName, userPassword);
        return userRecord;
    }
    
    @RequestMapping("reset/{userName}/{userPassword}")
    public UserRecord reset(@PathVariable String userName, @PathVariable String userPassword) {
        UserRecord userRecord = service.getUserRstPass(userName, userPassword);
        return userRecord;
    }

    @RequestMapping("delete/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }

    @RequestMapping("getuser/{username}")
    public UserRecord getUserRecord(@PathVariable String username) {
        return service.getUser(username);
    }
    
    @RequestMapping("getuser_accept_list_COPs")
    public List<UserRecord> accept_list_COPs() {
        List<UserRecord> list = service.getActiveRecordsCOPs();
        return list;
    }
    
    @RequestMapping("getuser_accept_list_BOM")
    public List<UserRecord> accept_list_BOM() {
        List<UserRecord> list = service.getActiveRecordsBOM();
        return list;
    }
    
    @RequestMapping("getuser_accept_list")
    public List<UserRecord> accept_list() {
        List<UserRecord> list = service.getActiveRecords();
        return list;
    }
    
    @RequestMapping("getuser_reject_list")
    public List<UserRecord> reject_list() {
        List<UserRecord> list = service.getInactiveRecords();
        return list;
    }

    @RequestMapping("getuser_pending_list")
    public List<UserRecord> pending_list() {
        List<UserRecord> list = service.getPendingRecords();
        return list;
    }
    
    @RequestMapping("getuser_terminate_list")
    public List<UserRecord> terminate_list() {
        List<UserRecord> list = service.getTerminateRecords();
        return list;
    }
    
    @RequestMapping("getuser_resetpassword_list")
    public List<UserRecord> resetpassword_list() {
        List<UserRecord> list = service.getResetPasswordRecords();
        return list;
    }
    
    @RequestMapping("getAllRecordsNumberList")
    public ArrayList<String> getAllRecordsNumberList() {
        ArrayList<String> allRecordsNumberList = service.getAllRecordsNumberList();
        return allRecordsNumberList;
    }


//    @RequestMapping("typecheck")
//    public String check(UserInfo userInfo) {
//        System.out.println("I am in typecheck");
//        System.out.println("111");
//        UserInfo user = service.getUser(userInfo.getUsername(), userInfo.getPassword());
//        int userTypeId = user.getUserTypeId();
//        System.out.println("2222");
//        List<UserInfo> all = service.getAll();
//        for (UserInfo userInfo1 : all) {
//
//            if (userTypeId == userInfo1.getUserTypeId()) {
//                System.out.println("3333");
//                return "admin_dashboard.html";
//            }
//        }
//        return null;
//    }
}
