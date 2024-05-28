/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayogmultistate.it.kyc.model;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 *
 * @author HP
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@ToString
public class KYCRecordNew {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String applicant;
    private long adharNo;
    private long mobileNo;
    private String accountType;
    private String branchName;
    private String status;
    private String remark;
    
    @Lob
    @Column(name = "date", length = 3000)
    private ArrayList<Date> date;
    private String panStatus;
    private String adharStatus;
    private String otherDocStatus;
    private String applicationFormStatus;
    private String approvedBy;
    private String uploadedBy;
    private String code;
    
    @Lob
    @Column(name = "timeStam", length = 3000)
    private ArrayList<String> timeStam;
    
    @Lob
    @Column(name = "pan", length = 3000)
    private List<byte[]> pan;
    @Lob
    @Column(name = "adhar", length = 3000)
    private List<byte[]> adhar;
    @Lob
    @Column(name = "otherDoc", length = 5000)
    private List<byte[]> otherDoc;
    @Lob
    @Column(name = "applicationForm", length = 3000)
    private List<byte[]> applicationForm;
}
