import { Observable } from 'rxjs/Observable';
import { Component, enableProdMode, Injectable, OnInit } from '@angular/core';
import { Jsonp, URLSearchParams, RequestOptions, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config';

@Injectable()
export class RetrieveDataService {
  //NodeURL: any = this.config.nodepath1();

  // analyticconfig:any = this.config.analyticnode();
  // searchconfig:any = this.config.searchnode();
  menuandhomeconfig:any = this.config.menuandhomenode();
  // myaccountconfig:any = this.config.myaccountnode();
  adminconfig:any = this.config.adminnode();
  // reportconfig:any = this.config.reportnode();

  constructor(private http: Http, private config: ConfigService) { }

  

  /***********************************Reports start ********************************/
  // synonymNames(synonymInputs) {
  //   const nodeurl = this.reportconfig + "/nameOfSynonym";
  //   return this.http.post(nodeurl, synonymInputs).map(res => res.json());
  // }
  // getBasicInfoChart(reportId) {
  //   const nodeurl = this.reportconfig + "/BasicInfoChart";
  //   return this.http.post(nodeurl, reportId).map(res => res.json());
  // }
  // GetApplication(inputobj: any) {
  //   var endPoint = this.reportconfig + "/Application";
  //   return this.http.post(endPoint, inputobj).map(res => res.json());
  // }
  // getGeneralInfo(linkdata, reportId) {
  //   const nodeurl = this.NodeURL + "/basicGeneralInfo?EBM_ID=" + linkdata + "&reportId=" + reportId;
  //   return this.http.get(nodeurl).map(res => res.json());
  // }
  // getGeneralInfo(ReportType,ID) {
  //   const nodeurl = this.reportconfig + "/getBasicGeneralDetail?ReportType=" + ReportType + "&ID=" + ID;
  //   return this.http.get(nodeurl).map(res => res.json());
  // }
  // GetProfileViewTable(Type, Nature, text, biomarkerid) {
  //   const nodeurl = this.reportconfig + "/GetProfileViewTable?Type=" + Type + "&Nature=" + Nature + "&text=" + text + "&biomarkerid=" + biomarkerid;
  //   return this.http.get(nodeurl).map(res => res.json());
  // }
  // GetApplicationPopupTable(inputobj: any) {
  //   var endPoint = this.reportconfig + "/getApplicationPopupDetail";
  //   return this.http.post(endPoint, inputobj).map(res => res.json());
  // }
  // GetApplicationTable(inputobj: any) {
  //   var endPoint = this.NodeURL + "/ApplicationTable";
  //   return this.http.post(endPoint, inputobj).map(res => res.json());
  // }
  // GetApplicationTab(inputobj: any) {
  //   var endPoint = this.NodeURL + "/ApplicationTable";
  //   return this.http.post(endPoint, inputobj).map(res => res.json());
  // }
  // GetApplicationTable(ReportType,ID,referenceID,studyID) {
  //   var endPoint = this.reportconfig + "/getApplicationDetail?ReportType="+ReportType+"&ID="+ID+"&referenceID="+referenceID+"&studyID="+studyID+"";
  //   return this.http.get(endPoint).map(res => res.json());
  // }
  // clinicalPopulationPopup(inputobj: any) {
  //   const endpoint = this.reportconfig + "/getClinicalPopulationPopupDetail";
  //   return this.http.post(endpoint, inputobj).map(res => res.json());
  // }
  // clinicalPopulation(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + "/getClinicalPopulationDetail?ReportType="+ReportType+"&ID="+ID+"&referenceID="+referenceID+"&studyID="+studyID+"";
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // clinicalPopulation(inputobj: any) {
  //   //const endpoint = this.NodeURL + "/clinicalPopulation";
  //   return this.http.post(endpoint, inputobj).map(res => res.json());
  // }
  // drugORsafety(textSearched, report, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/drugORsafety?ebmId=" + textSearched + "&report=" + report + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // drugORsafety(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getDrugExperimentalOrSafetyToxicityDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // markerCorrelation(textSearched) {
  //   const endpoint = this.NodeURL + "/markerCorrelation?ebmId=" + textSearched;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // markerCorrelation(ID) {
  //   const endpoint = this.NodeURL + "/getMarkerCorrelationDetail?ID=" + ID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // preClinical(textSearched, report, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/preclinicalDetails?ebmId=" + textSearched + "&report=" + report + "&refId=" + referenceID + '&studyId=' + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // preClinical(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getPreClinicalDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // GetVariantPGx(textSearched, report, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/GetVariantPGx?ebmId=" + textSearched + "&report=" + report + "&refId=" + referenceID + '&studyId=' + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }

  // GetVariantPGx(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getVariantPGxDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // Get_DiseaseEnrichment(textSearched, report, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/Disease_Enrichment_Marker?ebmId=" + textSearched + "&report=" + report + "&refId=" + referenceID + '&studyId=' + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // Get_DiseaseEnrichment(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getDiseaseEnrichmentMarkerDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // GetKitsCDX(textSearched, report, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/GetKitCDX?ebmId=" + textSearched + "&report=" + report + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // GetKitsCDX(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getKitCDxDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // Get_DiseasePopulation(textSearched, report, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/Get_DiseasePopulation?ebmId=" + textSearched + "&report=" + report + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // Get_DiseasePopulation(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getDiseasePopulationDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
   // getClinicalAnalyticalData(model, reportId, referenceID, studyId) {
  //   var txtvalue = "References";
  //   var Landing = "Landing";
  //   const endpoint = this.NodeURL + '/ClinicalAnalyticalQualification?model=' + model + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // getClinicalAnalyticalData(ReportType,ID,referenceID,studyID) {
    //var txtvalue = "References";
    //var Landing = "Landing";
    // const endpoint = this.reportconfig + '/getClinicalAnalyticalQualificationDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
    // return this.http.get(endpoint).map(res => res.json());
  // }
  // getReferenceData(model, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + '/References?model=' + model + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // getReferenceData(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getReferencesDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }

  // getAssociatedDiseaseData(model, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + '/AssociatedDisease?model=' + model + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // getAssociatedDiseaseData(ReportType, ID, referenceID, studyID) {
  //   const endpoint = this.reportconfig + '/getAssociatedDiseaseDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // getAssociatedDrugData(model, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + '/AssociatedDrug?model=' + model + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // getAssociatedDrugData(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getAssociatedDrugDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
 
  // getBiomarkerQualificationlData(model, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + '/BiomarkerQualification?model=' + model + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // getBiomarkerQualificationlData(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getBiomarkerQualificationDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // servicecall(EBM_id, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/markerCorrelation?ebmId=" + EBM_id + "&report=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // servicecall(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getMarkerCorrelationDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
 
  // GetEBMIDDruglabel(data, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/Druglabel?EBMID=" + data + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // GetEBMIDDruglabel(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getDrugLabelDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
     // GetEBMIDexpt(data, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/Experimental?EBMID=" + data + "&reportId=" + reportId + "&refId=" + referenceID + '&studyId=' + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // GetEBMIDexpt(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getExperimentalDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // GetEBMIDdrugTherapy(data, reportId, referenceID, study_id) {
  //   const endpoint = this.NodeURL + "/drugTherapy?ebmId=" + data + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + study_id;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // GetEBMIDdrugTherapy(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getDrugTherapyDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // Servicerequest(EBM_id, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/clinicaldatajs?EBMID=" + EBM_id + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // Servicerequest(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getClinicalDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // GetClinicalGuidelines(data, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + "/clinicalGuidelines?Ebm_id=" + data + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // GetClinicalGuidelines(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getClinicalGuidelinesDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // getApprovedBiomarkerData(model, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + '/BIO_ApprovedBiomarker?model=' + model + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // getApprovedBiomarkerData(ReportType, ID, referenceID, studyID) {
  //   const endpoint = this.reportconfig + '/getBiomarkerQualificationDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // getAssociatedMarkerData(model, reportId, referenceID, studyId) {
  //   const endpoint = this.NodeURL + '/BIO_AssociatedMarker?model=' + model + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + studyId;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // getAssociatedMarkerData(ReportType,ID,referenceID,studyID) {
  //   const endpoint = this.reportconfig + '/getAssociatedBiomarkersAndDiseasesDetail?ReportType=' + ReportType + "&ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // studyPhenotype(ID, type, referenceID, studyID) {
  //   let endpoint;
  //   if (type == "studyPhenotype") {
  //     endpoint = this.reportconfig + "/getDiseasePhenotypeDetail?ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   }
  //   else if (type == "studyOutcome") {
  //     endpoint = this.reportconfig + "/getDiseasePhenotypeOutComeDetail?ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   }
  //   else if (type == "drugPhenotype") {
  //     endpoint = this.reportconfig + "/getDrugPhenotypeDetail?ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   }
  //   else if (type == "drugOutcome") {
  //     endpoint = this.reportconfig + "/getDrugPhenotypeOutComeDetail?ID=" + ID + "&referenceID=" + referenceID + "&studyID=" + studyID;
  //   }
    
  //   // else if (type == "phenotypeCorrelation" || type == "phenotype") {
  //   //   endpoint = this.NodeURL + "/phenotypeCorrelation?ebmId=" + textSearched + "&type=" + type + "&refId=" + referenceID + "&studyId=" + studyId;
  //   // }
  //   return this.http.get(endpoint).map(res => res.json());
  // }

  // /************************************************API end********************************************************* */

  // searchDiseaseName(data: any) {
  //   let url = this.reportconfig + "/GetDiseaseList?model=" + data;
  //   var ClientList = this.http.get(url).map(res => res.json());
  //   return ClientList;
  // }
  // searchDrugName(data1) {
  //   const endpoint = this.reportconfig + '/GetDrugList?model=' + data1 + '&criteria=contains';
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // searchEBM(inputobj: any) {
  //   let url = this.reportconfig + "/BiomarkerIndicationRep";
  //   //let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  //   return this.http.post(url, inputobj).map(res => res.json());
  // }
  // searchBIOName(inputobj: any) {
  //   let endpoint = this.reportconfig + "/BIO_GetBiomarkerList";
  //   let data$ = this.http.post(endpoint, inputobj).map(res => res.json());
  //   return data$;
  // }


  // GetREFdrug(input) {
  //   const endpoint = this.reportconfig + '/drugReport';
  //   return this.http.post(endpoint, input).map(res => res.json());
  // }
  // // GetREFexpt(dat, experimental_id) {
  // //   const endpoint = this.NodeURL + "/ExperimentalReport?EBMID=" + dat + '&experimental_id=' + experimental_id;
  // //   return this.http.get(endpoint).map(res => res.json());
  // // }
  // // GetEBMIDstudy(data, reportId, referenceID, study_id) {
  // //   const endpoint = this.NodeURL + "/StudyInfo?EBMID=" + data + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + study_id;
  // //   return this.http.get(endpoint).map(res => res.json());
  // // }
  // // GetREFstudy(ebm_id, studyId) {
  // //   const endpoint = this.NodeURL + "/StudyReport?EBMID=" + ebm_id + '&studyId=' + studyId;
  // //   return this.http.get(endpoint).map(res => res.json());
  // // }
  // experimentalDetailView(textSearched) {
  //   const endpoint = this.reportconfig + "/ExperimentalDetailsDetailedView?ebmId=" + textSearched;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // drugExp(textSearched) {
  //   const endpoint = this.reportconfig + "/drugExperimental?ebmId=" + textSearched;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // safetyTox(textSearched) {
  //   const endpoint = this.reportconfig + "/saftyToxDetailView?ebmId=" + textSearched;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // clinicalTrialDetailView(textSearched) {
  //   const endpoint = this.reportconfig + "/clinicalTrialDetailView?ebmId=" + textSearched;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // markerDetailView(textSearched, type) {
  //   const endpoint = this.reportconfig + "/PhenotypeandOutcomeDetailView?ebmId=" + textSearched + "&type=" + type;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // referenceDetailView(textSearched) {
  //   const endpoint = this.reportconfig + "/referenceDetailView?ebmId=" + textSearched;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // getVisualizeprofileview(model, reportId) {
  //   const endpoint = this.reportconfig + '/Visualize_Profile_View?model=' + model + "&reportId=" + reportId;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // getVisualizeprofileSpecimen(model, reportId) {
  //   const endpoint = this.reportconfig + '/Visualize_Profile_Specimen?model=' + model + "&reportId=" + reportId;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // getPhenotypicData(model, reportId, referenceID, study_id) {
  //   const endpoint = this.NodeURL + '/phenotypicEffect?model=' + model + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + study_id;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // getPhenotypicsubreportData(ebm_id, correlation_id) {
  //   const endpoint = this.NodeURL + '/PhenotypicSubreport?ebm_id=' + ebm_id + '&correlation_id=' + correlation_id;
  //   return this.http.post(endpoint, {}).map(res => res.json());
  // }
  // DetailedViewData(Obj: any) {
  //   var endPoint = this.reportconfig + "/DetailedSearch";
  //   let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  //   return this.http.post(endPoint, Obj).map(res => res.json());
  // }
 
  // studyPhenotypeDetailView(textSearched, type) {
  //   let endpoint;
  //   if (type == "studyPhenotype" || type == "drugPhenotype") {
  //     endpoint = this.reportconfig + "/PhenotypeandOutcomeDetailView?ebmId=" + textSearched + "&type=" + type;
  //   }
  //   else if (type == "studyOutcome" || type == "drugOutcome") {
  //     endpoint = this.reportconfig + "/PhenotypeandOutcomeDetailView?ebmId=" + textSearched + "&type=" + type;
  //   }
    // else if (type == "phenotypeCorrelation" || type == "phenotype") {
    //   endpoint = this.NodeURL + "/phenotypeCorrelation?ebmId=" + textSearched + "&type=" + type;
    // }
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // qualificationTrial(textSearched, type) {
  //   const endpoint = this.NodeURL + "/Qualification_trials?ebmId=" + textSearched + "&type=" + type;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  
  // getserviceDrugData(linkdata) {
  //   const nodeurl = this.NodeURL + "/DrugBasicInformation?drug_id=" + linkdata;
  //   return this.http.get(nodeurl).map(res => res.json());
  // }
  
  // GetEBMIDdrug(data, reportId, referenceID, study_id) {
  //   const endpoint = this.NodeURL + "/drug?EBMID=" + data + "&reportId=" + reportId + "&refId=" + referenceID + "&studyId=" + study_id;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // getserviceData(linkdata, reportId) {
  //   const nodeurl = this.NodeURL + "/basicinfojs?EBM_ID=" + linkdata + "&reportId=" + reportId;
  //   return this.http.get(nodeurl).map(res => res.json());
  // }

  /***********************************Reports end ********************************/
  getLandingPageData(model, textValue) {
    const endpoint = this.menuandhomeconfig + '/Landing?model=' + model + '&Value=' + textValue;
    return this.http.post(endpoint, {}).map(res => res.json());
  }
  // createAuthorizationHeader(headers: Headers) {
  //   headers.append('Authorization', 'restdemo.chemaxon.com');
  //   //'Basic ' + btoa('m.anbalagan12@gmail.com:password')); 
  //   headers.append('Access-control-allow-origin', '*');
  // }
  // setsearchhistory(datetime, name, UserID, SearchType, BasicQuery, QueryName, deltrue) {
  //   const endpoint = this.myaccountconfig + '/SearchHistory?' + "&datetime=" + datetime + "&name=" + name + "&UserID=" + UserID + "&SearchType=" + SearchType + "&BasicQuery=" + BasicQuery + "&QueryName=" + QueryName + "&deltrue=" + deltrue;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // retsearchhistory(UserID) {
  //   const endpoint = this.myaccountconfig + "/retrievesearchhistory?UserID=" + UserID;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // Advsearchhistory(datetime, name, UserID, SearchType, AdvQuery, Query, deltrue) {
  //   const endpoint = this.myaccountconfig + '/SearchHistory?' + "&datetime=" + datetime + "&name=" + name + "&UserID=" + UserID + "&SearchType=" + SearchType + "&AdvQuery=" + AdvQuery + "&Query=" + Query + "&deltrue=" + deltrue;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
   // getwatchlist(datetime, finaloutput, UserID, Type, Synonyms) {
  //   const endpoint = this.NodeURL + '/Watchlist?' + "&datetime=" + datetime + "&EBMID=" + finaloutput + "&UserID=" + UserID + "&Type=" + Type + "&Synonyms=" + Synonyms;
  //   let data$ = this.http.get(endpoint)
  //     .map(res => res.json());
  //   return data$;
  // }
  // retwatchlist(UserID, ebm, ret) {
  //   //const endpoint = this.NodeURL + '/Watchlist?UserID="+UserID+;
  //    const endpoint = this.myaccountconfig + "/retrieveWatchlist?UserID=" + UserID + "&ebm=" + ebm + "&ret=" + ret;
  //    let data$ = this.http.get(endpoint)
  //      .map(res => res.json());
  //    return data$;
  //  }
  //  sessionHandler(objData) {
  //   let endpoint = this.NodeURL + "/sessionManagement";
  //   let data = this.http.post(endpoint, objData, { withCredentials: true }).map(res => res.json());
  //   return data;
  // }

  // deletehistory(UserID, deletehistory) {
  //   const endpoint = this.myaccountconfig + "/deletesearchhistory?UserID=" + UserID + "&deletehistory=" + deletehistory;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // updatedata() {
  //   const endpoint = this.myaccountconfig + "/Retupdatesdata";
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }

  // exportEbmReportXSL(ebmId) {
  //   const endpoint = this.searchconfig + "/ebmReportExcel?ebmId=" + ebmId;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // exportEbmReportXML(ebmId) {
  //   const endpoint = this.searchconfig + "/ebmReportXML?ebmId=" + ebmId;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // getData(model, textValue) {
  //   let endpoint = this.searchconfig + '/BatchDemo?model=' + model + '&Value=' + textValue;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // Get_TreeView_Data(model) {
  //   let endpoint = this.searchconfig + "/treeview_retrievedata?model=" + model;
  //   let data = this.http.post(endpoint, {}).map(res => res.json());
  //   return data;
  // }
  // fromSearchResult(inputobj: any) {
  //   let endpoint = this.searchconfig + "/fromSearchResult";
  //   let data$ = this.http.post(endpoint, inputobj).map(res => res.json());
  //   return data$;
  // }
  // quickTextSearch(textSearched) {
  //   const endpoint = this.searchconfig + "/quickDataSearch?searched=" + textSearched;
  //   return this.http.get(endpoint).map(res => res.json());
  // }
  // quickSearchData(data) {
  //   const endpoint = this.searchconfig + '/quickSearch';
  //   let data$ = this.http.post(endpoint, data).map(res => res.json());
  //   return data$;
  // }
  // searchMasterdata(inputobj: any) {
  //   //var endPoint = this.NodeURL + "/BasicSearch_master";
  //   var endPoint = this.searchconfig + "/BasicSearch_master";
  //   //let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  //   //let options = new RequestOptions({ headers: headers });
  //   return this.http.post(endPoint, inputobj).map(res => res.json());
  // }
  // search(inputobj: any) {
  //   var endPoint = this.searchconfig + "/BasicSearch";
  //   //let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  //   return this.http.post(endPoint, inputobj).map(res => res.json());
  // }
  // applyfilter(inputobj: any): Observable<any[]> {
  //   let url = this.searchconfig + "/AppliedFilter"
  //   var ClientList = this.http.post(url, inputobj).map(res => res.json());
  //   return ClientList;
  // }
  // basicsearch(inputobj: any): Observable<any[]> {
  //   let url = this.searchconfig + "/PostBasicSearch"
  //   var ClientList = this.http.post(url, inputobj).map(res => res.json());
  //   return ClientList;
  // }
  

  // Get_variantAnaly_Data(inputobj: any) {
  //   let endpoint = this.analyticconfig + "/VariantAnaly_RetrieveData";//?chromestrt=" + chromestrt+ "&chromeend=" + chromeend+ "&Genome_type=" + Genome_type;
  //   let data = this.http.post(endpoint, inputobj).map(res => res.json());
  //   return data;
  // }
  // Get_VA_Chrom_View(inputobj: any) {
  //   let endpoint = this.analyticconfig + "/VariantAnalyisisChrome";//?chromestrt=" + chromestrt+ "&chromeend=" + chromeend+ "&Genome_type=" + Genome_type;
  //   let data = this.http.post(endpoint, inputobj).map(res => res.json());
  //   return data;
  // }
  // SaveTextForVA(inputobj: any) {
  //   let endpoint = this.analyticconfig + "/SaveTextVA";//?chromestrt=" + chromestrt+ "&chromeend=" + chromeend+ "&Genome_type=" + Genome_type;
  //   let data = this.http.post(endpoint, inputobj).map(res => res.json());
  //   return data;
  // }
 
 
  
  // GetMinMaxChrome() {
  //   const nodeurl = this.analyticconfig + "/GetMinMaxChrome";
  //   return this.http.get(nodeurl).map(res => res.json());
  // }
  // private datafilter(res: Response) {
  //   let body = res.json();
  //   return body || {};
  // }
 
  // variantbasicsearch(inputobj: any): Observable<any[]> {
  //   let url = this.analyticconfig + "/VariantPostBasicSearch"
  //   var ClientList = this.http.post(url, inputobj).map(res => res.json());
  //   return ClientList;
  // }
 
  // //to get configuration data for attribute selection in advance search page(2)
  // getSysConfigDataForAttrSelection(data: any) {
  //   let url = this.NodeURL + "/AdvanceSearchAttrSelection";
  //   return this.http.post(url, data).map(res => res.text());
  // }
  
 
 
  // vennDiagramData(DataSet1, DataSetDropDown1, ebmArray, type) {
  //  var obj={"DataSet1": DataSet1, "DataSetDropDown1": DataSetDropDown1,"ebmArray": JSON.stringify(ebmArray), "type": type};
  // const endpoint = this.analyticconfig + "/vennDiagram?DataSet1=" + DataSet1 + "&DataSetDropDown1=" + DataSetDropDown1 +
  //     "&ebmArray=" + JSON.stringify(ebmArray) + "&type=" + type;
  //     return this.http.post(this.analyticconfig + "/vennDiagram", obj).map(res => res.json());
  //   //return data$;
  // }
  // compAnalysisList(selected, entered) {
  //   const endpoint = this.analyticconfig + "/compAnalysisList?selected=" + selected + "&entered=" + entered;
  //   let data$ = this.http.get(endpoint).map(res => res.json());
  //   return data$;
  // }
  // //to get configuration data for attribute selection in advance search page(2)
  // getEbmRecordCountforSelectedCriteria(data: any) {
  //   let url = this.analyticconfig + "/heatmapanalytics";
  //   return this.http.post(url, data).map(res => res.json());
  // }
  
  // GetCombinedCount(inputobj: any) {
  //   var endPoint = this.analyticconfig + "/heatmapanalyticsCombine";
  //   return this.http.post(endPoint, inputobj).map(res => res.json());
  // }
  // GetDashboard(inputobj: any) {
  //   var endPoint = "";
  //   if (inputobj['path']) {
  //     endPoint = this.analyticconfig + "/" + inputobj['path'];
  //   }
  //   else {
  //     endPoint = this.analyticconfig + "/dashboardAll";
  //   }
  //   return this.http.post(endPoint, inputobj).map(res => res.json());
  // }
  // clusterHeatMapPython(inputObj) {
  //   const endpoint = this.analyticconfig + '/clusterheatmap';
  //   return this.http.post(endpoint, inputObj).map(data => {
  //     data;
  //     return data;
  //   });
  // }
  // saveHMTextFile(checkedInput: any) {
  //   var querystring = require('querystring');
  //   const endpoint = this.analyticconfig + "/Exporttext";//?checkedInput1=" + querystring.escape(JSON.stringify(checkedInput1)) + "&checkedInput2=" + querystring.escape(JSON.stringify(checkedInput2)) + "&fileName=" + fileName + "&exportdata=" + exportdata;
  //   let data$ = this.http.post(endpoint, checkedInput).map(res => res);
  //   return data$;
  // }
  // databaseStatistic(selected, dashboardView) {
  //   return this.http.get(this.analyticconfig + "/databaseStatistic?selected=" + JSON.stringify(selected) + "&view=" + dashboardView).map(res => res.json());
  // }
  // getdashboardIDs(reportId) {
  //   const nodeurl = this.analyticconfig + "/Dashboard_GetIDs";
  //   return this.http.post(nodeurl, reportId).map(res => res.json());
  // }
  // getTherapeuticSummary(reportId) {
  //   const nodeurl = this.analyticconfig + "/Dashboard_therapeuticSummary";
  //   return this.http.post(nodeurl, reportId).map(res => res.json());
  // }
  
 
  // // interventionDetails(textSearched) {
  // //   const endpoint = this.NodeURL + "/intervention?ebmId=" + textSearched;
  // //   return this.http.get(endpoint).map(res => res.json());
  // // }
  // elasticDataCreation(inputobj: any) {
  //   var endPoint = this.searchconfig + "/ElasticDataCreation";
  //   let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post(endPoint, inputobj).map(res => res.json());
  // }
 

  getExcelData(fileName, exportdata, tableJson) {
    const endpoint = this.adminconfig + "/Exportexcel";
    let obj = {
      "fileName": fileName,
      "exportdata": exportdata,
      "tableJson": tableJson
    };
    let data$ = this.http.post(endpoint, obj).map(res => res.json());
    return data$;
  }
 

  // molExport(smiles) {
  //   let header = {
  //     headers: new HttpHeaders().set('Authorization', 'Bearer ')
  //       .set('Content-Type', 'application/json')
  //   }

  //   let headers = new Headers();
  //   this.createAuthorizationHeader(headers);
  //   const endpoint = "https://restdemo.chemaxon.com/rest-v0/util/calculate/molExport";
  //   return this.http.post(endpoint, smiles, {
  //     headers: headers
  //   }).map(res => res.json());
  // }
}
