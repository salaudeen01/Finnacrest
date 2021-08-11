import swal from 'sweetalert';
import history from '../../history';
const serverVars = {
  baseUrl: "http://142.93.152.229/sesis/api/",
  // baseUrl: "https://api.sesiscoop.com/api/",
  authUrl: "auth/login",
  regUrl: "auth/signup",
  resetPass: "profilesChangePassword?token=",
  verifypass:"auth/reset",
  verifyemail:"auth/signupVerifyEmail/",
  recoverpass:"auth/recovery",
  getPayStackId:"getApiKey",
  getAllDebitCards:"getCards",
    // regular savings
  fetchAllBalances: "total_balances_for_all_savings_packages",
  fetchAllTarget: "all_targets_in_one",
  fetchAllTargetAccount:"all_targets_plan_per_user",
  fetchAllSaveToLoan: "save_to_loan_all_api",
  showGuarantorTable:"show_non_group_loans_for_approval",
  saveRegularSavings: "saving/store",
  getRegularSavings: "saving",
  editRegularSavings: "saving/",
  addFundRegularSavings: "savingsFunds",
  withdrawRegularSavings: "savingsWithdrawal", 
  verifyRegularWithdraw:"verifySavingsWithdrawal",

  totalFundRegularSavings: "savingsBalance",
  getRegularSavingsDetails: "savingsTransactions",
  deactivateAutoSave:"deactivateAutoSave",
  // target savings   
  saveTargetSavings: "targets/store",
  getTargetSavings: "targets",
  getTargetTransaction:"targets/transactions/",
  exitTargetSavings:"targetsExit/",
  getTotalTargetFund:"targets/total_funds/",
  totalTargetFund:"all_targets_sum_per_user",
  editTargetSavings: "targets/",
  addFundTargetSavings: "targets/add_funds/",
  withdrawTargetSavings: "targets/add_withdrawal/",
  targetDetails:"targets/details/",
  activateTargetAutosave: "targetsActivateAutoSave/",
  deactivateTargetAutosave: "targetsDeactivateAutoSave/",
  // save to loan savings
  saveSaveToLoanSavings: "save_loan/store",
  getSaveToLoanSavings: "save_loan",
  editSaveToLoanSavings: "save_loan/modify/",
  addFundSaveToLoanSavings: "save_loan/add_funds",
  withdrawSaveToLoanSavings: "save_loan/add_withdrawal",
  totalFundSaveToLoanSavings: "all_funds",
  getSaveToLoanTransaction:"save_loan/transactions/",
  exitLoanSavings:"saveLoanExit/",
  deactivateAutoSaveLoan:"deactivateAutoSaveLoan",
  repayment_duration:"loan_repayment_duration?token=",
  finance_payment_duration:"business_finance_payment_duration?token=",

  //other transaction
  saveInvestment: "save_investment/store",
  getInvestments: "show_all_investment",
  getSingleInvestment: "single_investment/",
  addMarketPlace: "market_place/add_investment",
  //other transaction
  saveHalaiInvestment: "save_halai/store",
  // getHalaiNews: "show_all_halai",
  // getSingleHalai: "single_halai/",
  addHalaiInvestors: "halai/add_investment",
  getTotalMarketFund:"marketTotal",
  getTotalHalalFund:"halaiTotal",
  // addProfile: "profiles/store",
  showProfile:"show_profile",
  updatePicture:"profiles/updatePics",
  updateProfile:"profiles/update",


  // Loan  
  getLoanFee: "get_loan_fee",
  loanFormFee: "loan_form_fee",
  createLoanGroup:"loan/create_loan_group",
  createLoan:"loanAdd",
  joinGroup:"loan/join_group",
  rejectGroup:"loan/reject_group/",
  exitGroup:"loan/exit_group/",
  getLoanGroup:"loan/loan_group",
  getLoan:"loan/view_loan",
  getLoanDetails:"loanDetails/",
  getLoanActivities:"loanGroupDetailsActivities/",
  getLoanGroupMembers:"loanGroupMembers/",
  getLoanGroupActivities:"loanGroupApproval/",
  addLoanRepayment:"loanRepaymentsAdd/",
  loanRepaymentsDetails:"loanRepaymentsDetails/",
  businessRepaymentDetails:"business_repayment_details/",
  getLoanGroupName:"loanGroupName",
  declineLoan:"loanDeclined/",
  cancelLoan:"cancel_loan/",
  acceptLoan: "loanAccepted/",
  getLoanGroupApproval:"loanGroupApprovalDetails/",
  resendGroupNotification:"loan/resend_join_notification/",
  resendLoanNotification:"loanResendNotification/",
  getLoanGroupDetails:"loan/group_request_details/",
  replaceMember:"loanReplaceMembers/",
  removeMember:"loan/replace_member",
  loanBalance:"loanBalance/",
  completedLoan:"getCompletedLoans",
  showNonGroupLoan:"show_non_group_loans_members/",
  businessRequest:"business_request",
  business_view:"business_view_loan?token=",
  display_request:"display_request?token=",
  rejectRequest:"reject_request/",
  acceptRequest: "accepts_request/",
  business_repayments:"business_finance_repayments/",
  owner_savings_balance:"loan_owner_savings_balance?token=",

  // loanAccepted: "loanAccepted/",
  showTransaction: "transactions/details",
  saveWallet: "save_wallet/store",
  saveBank: "bank_account/add",
  getBank:'bank_account/details?token=',
  updateBank:"bank_accountUpdate",
  saveWithdrawal: "save_withdrawal/add",
  showWallet: "show_wallet",
  showWithdrawal: "show_withdrawal/",
  showWalletBalance: "show_wallet_balance",
  showMyMarketInvestment:"user_investments",
  showMyHalalInvestment:"user_halai",
  // getInvestmentCat:"show_category",
  // getHalaiCat:"show_halai_category",
  getInvestmentNews:"show_halai/",
  getMarketNews:"show_investment/",
  removeCard:"deleteCards/",
  verifyWithdrawalPassword:"verifyPasswordBeforeWithdrawal",
  confirmWithdraw:"paystackWithdrawalToBank",
  
  addToCart: "addToCart/", 
  userUploadRequested: "userUploadRequestedProducts",
  getAllProductInCart:"allProductsInUserCart?token=",  
  totalCartPerUser:"totalCartPerUser?token=", 
  deleteFromCart: "deleteFromCart/",
  userCartCount:"userCartCount?token=",
  getHalaiCat: "allFinanceCategories?token=", 
  getInvestmentCat: "show_category?token=",
  getHalaiNews: "allFinanceProducts?token=", 
  getSingleHalai: "singleProduct/",
  updateUserCart: "updateUserCart/",
  checkOut: "checkOut",
  fetchUserProducts:"fetchUserProducts?token=",
  searchProducts:"searchProducts/",
  make_down_payment:"make_down_payment",

  getOrderDetails:"fetchOrderDetails/",
  orderRepaymentsDetails:"orderRepaymentsDetails/",
  orderRepayments:"orderRepayments/",
  userRequest:"userRequest?token=", 
  updateRequest: "updateRequestQuantity/", 
  totalRequestPrice:"totalRequestPrice?token=",
  getAllUsersAutoComplete:"searchGuarantors/",
  getRegistrationFee: "get_registration_fee",
  addRegistrationFee: "registration_fee_payment?token=",

  payment_method: "payment_methods",
  // Shareholdings
  addFundShareholdings: "addShareHoldingsFunds?token=",
  getTransactionsShareholdings: "shareHoldingsTransactions",
  getTotalBalanceShareholdings: "shareHoldingsTotalBalance?token=",
  getAccountShareholdings: "share_holding",
  getAllProducts: "allFinanceProducts1",
  shareholdingMinFee:"get_minimum_fee",
};

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);

export const payID = () => {
  // return "pk_test_c236c6a4facaed7a4cb7968769410ca980c10fdf";
  return "pk_live_9f94d021a79f4c888fe318dd975c2f074ca5606a";

};

export const getReference = () => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
  for( let i=0; i < 40; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

// export const setLastUrl = () =>{
//   var lasturl = window.location.href;
//   var pathname = new URL(lasturl).pathname;
//   console.log(pathname)
//   localStorage.setItem("lasturl", pathname);
// }
export const setLastUrl = () =>{
  var bank = localStorage.getItem("bank");
  var profile = localStorage.getItem("profile");
  if(bank == "false"){
    swal("Please Update your profile and bank account to continue")
    history.push({
      pathname: "/settings"
    });
  }
  var lasturl = window.location.href;
  var pathname = new URL(lasturl).pathname;
  localStorage.setItem("lasturl", pathname);
}

export const checkLastUrl=()=>{
  let pathname = localStorage.getItem("lasturl");
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(pathname)
  if (pathname == null || pathname == "") {
    history.push({
      pathname: "/dashboard"
    });
    } else{
      history.push({
        pathname: pathname
      });
    }
}
export const checkUserStatus = () =>{
  let user = JSON.parse(localStorage.getItem("user"));
  if(user && user.member_status){
    return true    
  }else{
    return false
  }  
}



export const checkToken = ()=>{
  let pathname = localStorage.getItem("lasturl");
  let token =  localStorage.getItem('token');
    if (token == null || token == "") {
      history.push({
        pathname: "/signin"
      });
      }else{
        history.push({
          pathname: pathname
        });
      }
}

export function getConfig(apiName) {
  let user = JSON.parse(localStorage.getItem("user"));
  let token = localStorage.getItem("token");
  if ((apiName != 'login') && user == null) {
    if(apiName != "signup"){
      if(apiName != "recoverpass"){
        if(apiName != "verifypass"){
          if(apiName != "getAllProducts"){
            if(apiName != "verifyemail"){
              history.push('/signin');
              return
            }
          } 
        }
      }
    }
  }
  switch (apiName) {
    case "login":
      return serverVars.baseUrl + serverVars.authUrl;
    case "recoverpass":
      return serverVars.baseUrl + serverVars.recoverpass;
    case "verifyemail":
      return serverVars.baseUrl + serverVars.verifyemail;
    case "verifypass":
      return serverVars.baseUrl + serverVars.verifypass;
    case "resetPass":
      return serverVars.baseUrl + serverVars.resetPass + user.token;
    case "signup":
      return serverVars.baseUrl + serverVars.regUrl;
    case "getPayStackId":
      return serverVars.baseUrl + serverVars.getPayStackId;
    case "getAllDebitCards":
      return serverVars.baseUrl + serverVars.getAllDebitCards;
    // regular savings api
    case "editRegularSavings":
      return serverVars.baseUrl + serverVars.editRegularSavings;
    case "addFundRegularSavings":
      return serverVars.baseUrl + serverVars.addFundRegularSavings;
    case "getRegularSavings":
      return serverVars.baseUrl + serverVars.getRegularSavings;
    case "payment_method":
      return serverVars.baseUrl + serverVars.payment_method;
    case "saveRegularSavings":
      return serverVars.baseUrl + serverVars.saveRegularSavings;
    case "fetchAllBalances":
      return serverVars.baseUrl + serverVars.fetchAllBalances;
    case "fetchAllTarget":
      return serverVars.baseUrl + serverVars.fetchAllTarget;
    case "showGuarantorTable":
      return serverVars.baseUrl + serverVars.showGuarantorTable;
    case "fetchAllSaveToLoan":
      return serverVars.baseUrl + serverVars.fetchAllSaveToLoan;
    case "fetchAllTargetAccount":
      return serverVars.baseUrl + serverVars.fetchAllTargetAccount;
    case "withdrawRegularSavings":
      return serverVars.baseUrl + serverVars.withdrawRegularSavings
    case "verifyRegularWithdraw":
      return serverVars.baseUrl + serverVars.verifyRegularWithdraw;
    case "totalFundRegularSavings":
      return serverVars.baseUrl + serverVars.totalFundRegularSavings
    case "getRegularSavingsDetails":
      return  serverVars.baseUrl + serverVars.getRegularSavingsDetails
    case "deactivateAutoSave":
      return  serverVars.baseUrl + serverVars.deactivateAutoSave
    // target savings api
    case "editTargetSavings":
      return serverVars.baseUrl + serverVars.editTargetSavings;
    case "getTargetTransaction":
      return serverVars.baseUrl + serverVars.getTargetTransaction;
    case "getTotalTargetFund":
      return serverVars.baseUrl + serverVars.getTotalTargetFund;
    case "totalTargetFund":
      return serverVars.baseUrl + serverVars.totalTargetFund;
    case "addFundTargetSavings":
      return serverVars.baseUrl + serverVars.addFundTargetSavings;
    case "getTargetSavings":
      return serverVars.baseUrl + serverVars.getTargetSavings;
    case "exitTargetSavings":
      return serverVars.baseUrl + serverVars.exitTargetSavings;
    case "saveTargetSavings":
      return serverVars.baseUrl + serverVars.saveTargetSavings;
    case "withdrawTargetSavings":
      return serverVars.baseUrl + serverVars.withdrawTargetSavings;
    case "targetDetails":
      return serverVars.baseUrl + serverVars.targetDetails;
    case "activateTargetAutosave":
      return serverVars.baseUrl + serverVars.activateTargetAutosave;
    case "deactivateTargetAutosave":
      return serverVars.baseUrl + serverVars.deactivateTargetAutosave;
    // save to loan savings api
    case "editSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.editSaveToLoanSavings;
    case "addFundSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.addFundSaveToLoanSavings
    case "totalFundSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.totalFundSaveToLoanSavings
    case "getSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.getSaveToLoanSavings;
    case "saveSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.saveSaveToLoanSavings;
    case "withdrawSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.withdrawSaveToLoanSavings
    case "getSaveToLoanTransaction":
      return serverVars.baseUrl + serverVars.getSaveToLoanTransaction
    case "exitLoanSavings":
      return serverVars.baseUrl + serverVars.exitLoanSavings
    case "deactivateAutoSaveLoan":
      return  serverVars.baseUrl + serverVars.deactivateAutoSaveLoan
    // Other transaction
    case "saveInvestment":
      return serverVars.baseUrl + serverVars.saveInvestment;
    case "getInvestments":
      return serverVars.baseUrl + serverVars.getInvestments;
    case "getSingleInvestment":
      return serverVars.baseUrl + serverVars.getSingleInvestment;
    case "addMarketPlace":
      return serverVars.baseUrl + serverVars.addMarketPlace;

    // Halal transaction
    case "saveHalaiInvestment":
      return serverVars.baseUrl + serverVars.saveHalaiInvestment;
    // case "getHalaiNews":
    //   return serverVars.baseUrl + serverVars.getHalaiNews;
    // case "getSingleHalai":
    //   return serverVars.baseUrl + serverVars.getSingleHalai;
    case "addHalaiInvestors":
      return serverVars.baseUrl + serverVars.addHalaiInvestors;
    case "getTotalMarketFund":
      return serverVars.baseUrl + serverVars.getTotalMarketFund;
    case "getTotalHalalFund":
      return serverVars.baseUrl + serverVars.getTotalHalalFund;
    
        
    case "loanFormFee":
      return serverVars.baseUrl + serverVars.loanFormFee
    case "getLoanFee":   
      return serverVars.baseUrl + serverVars.getLoanFee;
    case "createLoanGroup":
      return serverVars.baseUrl + serverVars.createLoanGroup;
    case "createLoan":
      return serverVars.baseUrl + serverVars.createLoan;
    case "joinGroup":
      return serverVars.baseUrl + serverVars.joinGroup;
    case "rejectGroup":
      return serverVars.baseUrl + serverVars.rejectGroup;
    case "exitGroup":
      return serverVars.baseUrl + serverVars.exitGroup;
    case "getLoanGroup":
      return serverVars.baseUrl + serverVars.getLoanGroup;
    case "getLoanGroupName":
      return serverVars.baseUrl + serverVars.getLoanGroupName;
    case "acceptLoan":
      return serverVars.baseUrl + serverVars.acceptLoan;
    case "declineLoan":
      return serverVars.baseUrl + serverVars.declineLoan;
    case "cancelLoan":
      return serverVars.baseUrl + serverVars.cancelLoan;
    case "getLoan":
      return serverVars.baseUrl + serverVars.getLoan;
    case "getLoanDetails":
      return serverVars.baseUrl + serverVars.getLoanDetails;
    case "getLoanGroupApproval":
      return serverVars.baseUrl + serverVars.getLoanGroupApproval;
    case "getLoanGroupActivities":
      return serverVars.baseUrl + serverVars.getLoanGroupActivities;
    case "getLoanActivities":
      return serverVars.baseUrl + serverVars.getLoanActivities;
    case "getLoanGroupMembers":
      return serverVars.baseUrl + serverVars.getLoanGroupMembers;
    case "addLoanRepayment":
      return serverVars.baseUrl + serverVars.addLoanRepayment;
    case "businessRepaymentDetails":
      return serverVars.baseUrl + serverVars.businessRepaymentDetails;
    case "loanRepaymentsDetails":
      return serverVars.baseUrl + serverVars.loanRepaymentsDetails;
    case "resendGroupNotification":
      return serverVars.baseUrl + serverVars.resendGroupNotification;
    case "resendLoanNotification":
      return serverVars.baseUrl + serverVars.resendLoanNotification;
    case "getLoanGroupDetails":
      return serverVars.baseUrl + serverVars.getLoanGroupDetails;
    case "replaceMember":
      return serverVars.baseUrl + serverVars.replaceMember;
    case "removeMember":
      return serverVars.baseUrl + serverVars.removeMember;
    case "loanBalance":
      return serverVars.baseUrl + serverVars.loanBalance;
    case "completedLoan":
      return serverVars.baseUrl + serverVars.completedLoan;   
    case "showNonGroupLoan":
      return serverVars.baseUrl + serverVars.showNonGroupLoan;
    case "owner_savings_balance":
      return serverVars.baseUrl + serverVars.owner_savings_balance;
    case "repayment_duration":
      return serverVars.baseUrl + serverVars.repayment_duration;
    case "finance_payment_duration":
      return serverVars.baseUrl + serverVars.finance_payment_duration;

    case "businessRequest":
      return serverVars.baseUrl + serverVars.businessRequest;
    case "business_view":
      return serverVars.baseUrl + serverVars.business_view; 
    case "display_request":
      return serverVars.baseUrl + serverVars.display_request; 
    case "acceptRequest":
      return serverVars.baseUrl + serverVars.acceptRequest;
    case "rejectRequest":
      return serverVars.baseUrl + serverVars.rejectRequest; 
    case "business_repayments":
      return serverVars.baseUrl + serverVars.business_repayments;      
    // case "loanAccepted":
    //   return serverVars.baseUrl + serverVars.loanAccepted; 

    case "addProfile":
      return serverVars.baseUrl + serverVars.addProfile;
    case "updateProfile":
      return serverVars.baseUrl + serverVars.updateProfile;
    case "updatePicture":
      return serverVars.baseUrl + serverVars.updatePicture;
    case "showTransaction":
      return serverVars.baseUrl + serverVars.showTransaction;
    case "showProfile":
      return serverVars.baseUrl + serverVars.showProfile;
    case "saveWallet":
      return serverVars.baseUrl + serverVars.saveWallet;
    case "saveBank":
      return serverVars.baseUrl + serverVars.saveBank;
    case "updateBank":
      return serverVars.baseUrl + serverVars.updateBank;
    case "getBank":
      return serverVars.baseUrl + serverVars.getBank + token;
    case "saveWithdrawal":
      return serverVars.baseUrl + serverVars.saveWithdrawal;
    case "showWallet":
      return serverVars.baseUrl + serverVars.showWallet ;
    case "showWithdrawal":
      return serverVars.baseUrl + serverVars.showWithdrawal;
    case "showWalletBalance":
      return serverVars.baseUrl + serverVars.showWalletBalance;
    case "showMyMarketInvestment":
      return serverVars.baseUrl + serverVars.showMyMarketInvestment;
    case "showMyHalalInvestment":
      return serverVars.baseUrl + serverVars.showMyHalalInvestment;
    // case "getInvestmentCat":
    //   return serverVars.baseUrl + serverVars.getInvestmentCat;
    // case "getHalaiCat":
    //   return serverVars.baseUrl + serverVars.getHalaiCat;
    case "getInvestmentNews":
      return serverVars.baseUrl + serverVars.getInvestmentNews;
    case "getMarketNews":
      return serverVars.baseUrl + serverVars.getMarketNews;
    case "removeCard":
      return serverVars.baseUrl + serverVars.removeCard;
    case "verifyWithdrawalPassword":
      return serverVars.baseUrl + serverVars.verifyWithdrawalPassword;
    case "confirmWithdraw":
      return serverVars.baseUrl + serverVars.confirmWithdraw;
      // ProductFinance   
    case "addToCart":
      return serverVars.baseUrl + serverVars.addToCart ;      
    case "getAllProductInCart":
      return serverVars.baseUrl + serverVars.getAllProductInCart;
    case "totalCartPerUser":
      return serverVars.baseUrl + serverVars.totalCartPerUser;      
    case "userCartCount":
      return serverVars.baseUrl + serverVars.userCartCount;      
    case "getInvestmentCat":
      return serverVars.baseUrl + serverVars.getInvestmentCat;
    case "getHalaiCat":
      return serverVars.baseUrl + serverVars.getHalaiCat;
    case "getHalaiNews":
      return serverVars.baseUrl + serverVars.getHalaiNews + user.token;     
    case "getSingleHalai":
      return serverVars.baseUrl + serverVars.getSingleHalai;           
    case "deleteFromCart":
      return serverVars.baseUrl + serverVars.deleteFromCart; 
    case "updateUserCart":
      return serverVars.baseUrl + serverVars.updateUserCart;
    case "checkOut":
      return serverVars.baseUrl + serverVars.checkOut;
    case "make_down_payment":
      return serverVars.baseUrl + serverVars.make_down_payment;
    case "fetchUserProducts":
      return serverVars.baseUrl + serverVars.fetchUserProducts; 
    case "getOrderDetails":
      return serverVars.baseUrl + serverVars.getOrderDetails; 
      case "orderRepaymentsDetails":
        return serverVars.baseUrl + serverVars.orderRepaymentsDetails;        
    case "searchProducts":
      return serverVars.baseUrl + serverVars.searchProducts;
          
    case "getAllUsersAutoComplete":
      return serverVars.baseUrl + serverVars.getAllUsersAutoComplete;

    case "orderRepayments":
      return serverVars.baseUrl + serverVars.orderRepayments;        
    case "userUploadRequested":
      return serverVars.baseUrl + serverVars.userUploadRequested;
    case "userRequest":
      return serverVars.baseUrl + serverVars.userRequest;    
    case "updateRequest":
      return serverVars.baseUrl + serverVars.updateRequest; 
    case "totalRequestPrice":   
      return serverVars.baseUrl + serverVars.totalRequestPrice;      
    case "getRegistrationFee":
      return serverVars.baseUrl + serverVars.getRegistrationFee; ; 
    case "addRegistrationFee":
      return serverVars.baseUrl + serverVars.addRegistrationFee + user.token;

        // Shareholdings api
    case "addFundShareholdings":
      return serverVars.baseUrl + serverVars.addFundShareholdings + user.token;
    case "getTransactionsShareholdings":
      return serverVars.baseUrl + serverVars.getTransactionsShareholdings;   
      case "getTotalBalanceShareholdings":
        return (
          serverVars.baseUrl +
          serverVars.getTotalBalanceShareholdings +
          user.token
        );
    case "getAccountShareholdings":
      return serverVars.baseUrl + serverVars.getAccountShareholdings;
    case "getAllProducts":
      return serverVars.baseUrl + serverVars.getAllProducts;
    case "shareholdingMinFee":
      return serverVars.baseUrl + serverVars.shareholdingMinFee;
    
    default:
      return null;
  }
}