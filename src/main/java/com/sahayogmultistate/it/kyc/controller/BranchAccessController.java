/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayogmultistate.it.kyc.controller;

import com.sahayogmultistate.it.kyc.model.BranchAccess;
import com.sahayogmultistate.it.kyc.service.BranchAccessService;
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
@RequestMapping("branch")
public class BranchAccessController {

    @Autowired
    private BranchAccessService service;

    public BranchAccessController() {
        System.out.println("I am in User RecordController");
    }

    @RequestMapping("add/{userName}/{branchNameList}/{userType}/{userIdStatus}/{branchName}")
    public BranchAccess save(@PathVariable String userName,
            @PathVariable ArrayList branchNameList, @PathVariable String userType,
            @PathVariable String userIdStatus, @PathVariable String branchName) {
        BranchAccess branchAccess = service.add(userName, branchNameList, userType, userIdStatus, branchName);
        return branchAccess;
    }

    @RequestMapping("update/{id}/{userName}/{branchNameList}/{userType}/{userIdStatus}/{branchName}")
    public BranchAccess update(@PathVariable int id, @PathVariable String userName,
            @PathVariable ArrayList branchNameList, @PathVariable String userType,
            @PathVariable String userIdStatus, @PathVariable String branchName) {
        BranchAccess branchAccess = service.update(id, userName, branchNameList, userType, userIdStatus, branchName);
        return branchAccess;
    }

    @RequestMapping("getall")
    public List<BranchAccess> getAll() {
        List<BranchAccess> list = service.getAll();
        return list;
    }

    @RequestMapping("get/{id}")
    public BranchAccess get(@PathVariable int id) {
        BranchAccess branchAccess = service.get(id);
        return branchAccess;
    }

//    @RequestMapping("login/{userName}/{userPassword}")
//    public BranchAccess login(@PathVariable String userName, @PathVariable String userPassword) {
//        BranchAccess branchAccess = service.getUser(userName, userPassword);
//        return branchAccess;
//    }

    @RequestMapping("delete/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }

    @RequestMapping("getuser/{username}")
    public BranchAccess getUserRecord(@PathVariable String username) {
        return service.getUser(username);
    }

}
