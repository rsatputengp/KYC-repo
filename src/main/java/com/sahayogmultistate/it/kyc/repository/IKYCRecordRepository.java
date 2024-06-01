/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayogmultistate.it.kyc.repository;

import com.sahayogmultistate.it.kyc.model.KYCRecord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author HP
 */
@Repository
public interface IKYCRecordRepository extends JpaRepository<KYCRecord, Long> {

    @Query("SELECT k FROM KYCRecord k WHERE k.adharNo = :adharNo AND k.accountType = :accountType")
    List<KYCRecord> findByAdharNoAndaccountType(@Param("adharNo") String adharNo, @Param("accountType") String accountType);

    @Query("SELECT k FROM KYCRecord k WHERE k.branchName = :branchName")
    List<KYCRecord> findAllByBranchName(@Param("branchName") String branchName);

    @Query("SELECT k FROM KYCRecord k WHERE k.adharNo = :adharNo")
    List<KYCRecord> findByAdharNo(@Param("adharNo") String adharNo);

}
