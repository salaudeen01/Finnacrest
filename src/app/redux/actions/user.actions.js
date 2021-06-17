import { userConstants } from "../_constants";
import { userService } from "../../services/user.service";
import { alertActions } from "../actions/alert.actions";
import {checkLastUrl} from "../../config/config"
import history  from "../../../history";

export const userActions = {
  login,
  logout,
  timeOut,
  register,
  recoverpass,
  verifypass,
  verifyemail,
  resetpassword,
  createRegularSavings,
  withdrawRegularSavings,
  verifyRegularWithdraw,
  addFundRegularSavings,
  editRegularSavings,

  createTargetSavings,
  withdrawTargetSavings,
  addFundTargetSavings,
  editTargetSavings,
  exitTargetSavings,
  activateTargetAutosave,
  deactivateTargetAutosave,

  createSaveToLoanSavings,
  withdrawSaveToLoanSavings,
  addFundSaveToLoanSavings,
  editSaveToLoanSavings,
  exitLoanSavings,

  // create loan group
  loanFormFee,
  createLoanGroup,
  createLoan,
  acceptLoan,
  declineLoan,
  cancelLoan,
  joinGroup,
  rejectGroup,
  exitGroup,
  addLoanRepayment,
  resendGroupNotification,
  resendLoanNotification,
  replaceMember,
  removeMember,

  businessRequest,
  rejectRequest,
  acceptRequest,
  business_repayments,
  // other transactions
  saveInvestment,
  getInvestments,
  getSingleInvestment,
  addMarketPlace,

  saveWallet,
  saveBank,
  updateBank,
  saveWithdrawal,

  // halal transactions
  saveHalaiInvestment,
  getHalaiNews,
  getSingleHalai,
  addHalaiInvestors,

  addProfile,
  updateProfile,
  updatePicture,
  deactivateAutoSave,
  deactivateAutoSaveLoan,
  removeCard,
  verifyWithdraw,
  confirmWithdraw,

  addRegistrationFee,

  // Shareholdings
  addFundShareholdings,
  updateUserCart,
  deleteFromCart,
  addToCart,
  orderRepayments,
  checkOut,
  userUploadRequested,
  updateRequest,
  make_down_payment,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));
    let email = localStorage.getItem('email')
    userService.login(username, password).then(
      (user) => {
        if(user.status == true){
          dispatch(success(user));
          checkLastUrl()
        }else{
          dispatch(alertActions.error(user.message));
          dispatch(failure(user.message))
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        if(error.toString() == "Invalid Email or Password"){
          dispatch(alertActions.error( "Invalid Email or Password"));
        }
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  history.push({
    pathname: "/signin"
  });
  return { type: userConstants.LOGOUT };
}

function timeOut() {
  userService.timeOut();
  history.push({
    pathname: "/signin"
  });
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/signin");
        dispatch(alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        if(error.toString() == "Internal Server Error"){
          dispatch(alertActions.error( user.email+" has already been used "));
        }else{
          dispatch(alertActions.error("Internet Error, Please check your internet and try again"));
        }
        
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

// Regular savings actions
function createRegularSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createRegularSavings(user).then(
      (user) => {
          dispatch(success());
          history.push("/savings-tab/regular");
        if(user.success){
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
       },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// Remove Card
function removeCard(id) {
  return (dispatch) => {
    dispatch(request(id));
    userService.removeCard(id).then(
      (user) => {
          dispatch(success());
          history.push("/settings");
        if(user.success){
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
       },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// verify withdraw
function verifyWithdraw(data) {
  return (dispatch) => {
    dispatch(request(data));
    userService.verifyWithdraw(data).then(
      (user) => {
        dispatch(success(user));
       if(user.success){
          dispatch(continues(true));
        }
        dispatch(alertActions.continues(user.message));
       },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
// confirm withdraw
function confirmWithdraw(data) {
  return (dispatch) => {
    dispatch(request(data));
    userService.confirmWithdraw(data).then(
      (user) => {
        dispatch(success(user));
        if(user.success){
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
        
       },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}
// verify withdraw
function verifyRegularWithdraw(data) {
  return (dispatch) => {
    dispatch(request(data));
    userService.verifyRegularWithdraw(data).then(
      (user) => {
        dispatch(success(user));
       if(user.success){
          dispatch(continues(true));
        }
        dispatch(alertActions.continues(user.message));
       },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
// confirm withdraw
function withdrawRegularSavings(data) {
  return (dispatch) => {
    dispatch(request(data));
    userService.withdrawRegularSavings(data).then(
      (user) => {
        dispatch(success(user));
        if(user.success){
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
        
       },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}
// function withdrawRegularSavings(user) {
//   return (dispatch) => {
//     dispatch(request(user));

//     userService.withdrawRegularSavings(user).then(
//       (user) => {
//           dispatch(success());
//         if(user.success){
//           history.push("/savings-tab/regular");
//           dispatch(alertActions.success(user.message));
//         }else{
//           dispatch(alertActions.error(user.message));
//         }
        
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

// }

function addFundRegularSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addFundRegularSavings(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/savings-tab/regular");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function editRegularSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.editRegularSavings(user).then(
      (user) => {
          dispatch(success());
        if(user.success){
          history.push("/savings-tab/regular");
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function deactivateAutoSaveLoan(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.deactivateAutoSaveLoan(user).then(
      (user) => {
          dispatch(success());
        if(user.success){
          history.push("/savings-tab/savetoloan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}
function deactivateAutoSave(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.deactivateAutoSave(user).then(
      (user) => {
          dispatch(success());
        if(user.message){
          history.push("/savings-tab/regular");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// Save to loan savings actions
function createSaveToLoanSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createSaveToLoanSavings(user).then(
      (user) => {
          dispatch(success());
        if(user.success){
          history.push("/savings-tab/savetoloan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function withdrawSaveToLoanSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.withdrawSaveToLoanSavings(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/savings-tab/savetoloan");
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function addFundSaveToLoanSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addFundSaveToLoanSavings(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/savings-tab/savetoloan");
          dispatch( alertActions.success( user.message));
        }else{
          dispatch( alertActions.error( user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function editSaveToLoanSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.editSaveToLoanSavings(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/savings-tab/savetoloan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function exitLoanSavings(loan_id) {
  return (dispatch) => {
    dispatch(request(loan_id));

    userService.exitLoanSavings(loan_id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/savings-tab/savetoloan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
        },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}
function loanFormFee(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.loanFormFee(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/loan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}
// create loan group action
function createLoanGroup(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createLoanGroup(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/loan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

// create loan action
function createLoan(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createLoan(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/loan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
        
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// accept loan
function acceptLoan(group_id, loan_id) {
  return (dispatch) => {
    dispatch(request(group_id));

    userService.acceptLoan(group_id, loan_id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/loan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        
      }
    );
  };

}

// decline loan
function declineLoan(group_id, loan_id) {
  return (dispatch) => {
    dispatch(request(group_id));

    userService.declineLoan(group_id, loan_id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/loan");
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function cancelLoan(loan_id) {
  return (dispatch) => {
    dispatch(request(loan_id));

    userService.cancelLoan(loan_id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/loan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
        },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// join loan group
function joinGroup(email, code) {
  return (dispatch) => {
    dispatch(request(email));

    userService.joinGroup(email, code).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/loan");
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        // 
      }
    );
  };

}

// reject loan group
function rejectGroup(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.rejectGroup(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/loan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
        
      }
    );
  };

}

// exit loan group
function exitGroup(id) {
  return (dispatch) => {
    dispatch(request());

    userService.exitGroup(id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/loan");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// add loan repayment
function addLoanRepayment(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addLoanRepayment(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
          history.push("/loan");
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// resend group notification 
function resendGroupNotification(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.resendGroupNotification(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// resend loan notification 
function resendLoanNotification(loan_group, user_id) {
  return (dispatch) => {
    userService.resendLoanNotification(loan_group, user_id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// replace group member 
function replaceMember(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.replaceMember(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// remove group member 
function removeMember(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.removeMember(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function businessRequest(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.businessRequest(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/business-fianance");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function acceptRequest(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.acceptRequest(id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/business-fianance");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
        },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function rejectRequest(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.rejectRequest(id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/business-fianance");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
        },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function business_repayments(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.business_repayments(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/business-fianance");
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}


// Target savings actions
function createTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.createTargetSavings(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
          history.push("/savings-tab/target");
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function withdrawTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.withdrawTargetSavings(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
          history.push("/savings-tab/target");
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function addFundTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addFundTargetSavings(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/savings-tab/target");
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function editTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.editTargetSavings(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
          history.push("/savings-tab/target");
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function exitTargetSavings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.exitTargetSavings(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
          history.push("/savings-tab/target");
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function activateTargetAutosave(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.activateTargetAutosave(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
          history.push("/savings-tab/target");
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function deactivateTargetAutosave(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.deactivateTargetAutosave(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
          history.push("/savings-tab/target");
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// Other transactions action method
function saveInvestment(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveInvestment(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
          history.push("/investment/halalfinancing");
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function getInvestments() {
  return (dispatch) => {
    dispatch(request());

    userService.getInvestments().then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function getSingleInvestment(id) {
  return (dispatch) => {
    dispatch(request());

    userService.getSingleInvestment(id).then(
      (user) => {
        dispatch(success());
        history.push("/");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function addMarketPlace(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addMarketPlace(user).then(
      (user) => {
        dispatch(success());
        history.push("/investment/market");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
        
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// halai investment

function saveHalaiInvestment(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveHalaiInvestment(user).then(
      (user) => {
        dispatch(success());
        history.push("/");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
        
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function getHalaiNews() {
  return (dispatch) => {
    dispatch(request());

    userService.getHalaiNews().then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function getSingleHalai(id) {
  return (dispatch) => {
    dispatch(request());

    userService.getSingleHalai(id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function addHalaiInvestors(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addHalaiInvestors(user).then(
      (user) => {
        dispatch(success());
        history.push("/investment/halal");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

// end halai investment

function saveWallet(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveWallet(user).then(
      (user) => {
        
        if(user.success){
          dispatch(success(user.card_id));
          localStorage.setItem("card_id", user.card_id)
          dispatch(alertActions.continues(user.message));          
          history.push("/wallet");
        }else{
          dispatch(alertActions.error(user.message));
        }
        let last_url = localStorage.getItem("lasturl")
        if(last_url == "/wallet" || last_url == "/settings" || last_url == "/dashboard"){
          // window.location.reload()
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function saveBank(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveBank(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function updateBank(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.updateBank(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function saveWithdrawal(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.saveWithdrawal(user).then(
      (user) => {
        dispatch(success());
        history.push("/wallet");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function addProfile(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addProfile(user).then(
      (user) => {
        dispatch(success());
        history.push("/profile");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function updateProfile(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.updateProfile(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function updatePicture(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.updatePicture(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}
function checkOut(order_id) {
  return (dispatch) => {
    dispatch(request(order_id));

    userService.checkOut(order_id).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/detail/cart");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}
function make_down_payment(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.make_down_payment(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/detail/cart");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}

function userUploadRequested(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.userUploadRequested(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/product_financing");
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}
//add to Cart

function addToCart(user, where) {
  return (dispatch) => {
    dispatch(request(user));
    userService.addToCart(user).then(
      (user) => {
        dispatch(success());
        // history.push("/details");
        dispatch(alertActions.success(user.message));
        if(where){
          history.push("/detail/cart");
          // window.location.reload();
          console.log(where)
        }else{
          history.push("/product_financing");
          // window.location.reload();
          console.log(user)
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function deleteFromCart(cart_id) {  
  return (dispatch) => {
    dispatch(request(cart_id));
    userService.deleteFromCart(cart_id).then(
      (user) => {
        dispatch(success());
        history.push("/detail/cart");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function updateUserCart(cart_id, quantity) {  
  return (dispatch) => {
    dispatch(request(cart_id));
    userService.updateUserCart(cart_id, quantity).then(
      (user) => {
        dispatch(success());
        // history.push("/detail/cart");
        dispatch(
          alertActions.error(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
};

function updateRequest(cart_id, quantity) {  
  return (dispatch) => {
    dispatch(request(cart_id));
    userService.updateRequest(cart_id, quantity).then(
      (user) => {
        dispatch(success());
        // history.push("/detail/cart");
        dispatch(
          alertActions.error(user.message)
        );
        // window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
};

function orderRepayments(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.orderRepayments(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          history.push("/products");
          dispatch(alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

}
// function addRegistrationFee(user) {
//   return (dispatch) => {
//     dispatch(request(user));

//     userService.addRegistrationFee(user).then(
//       (user) => {
//         dispatch(success());
//         if(user.success){
//           history.push("/product_financing");
//           dispatch( alertActions.success(user.message));
//         }else{
//           dispatch(alertActions.error(user.message));
//         }
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };
// }


function addRegistrationFee(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.addRegistrationFee(user).then(
      (user) => {
        dispatch(success());  
        if (user.success === false) {
          dispatch(alertActions.error(user.message));
        } else {
          userService.logout()
          history.push("/signin");
          dispatch(alertActions.success(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function addFundShareholdings(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.addFundShareholdings(user).then(
      (user) => {
        dispatch(success());
        if (user.success) {
          history.push("/shareholdings");
          dispatch(alertActions.success(user.message));
        } else {
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.SAVINGS_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.SAVINGS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SAVINGS_FAILURE, error };
  }
}

function recoverpass(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.recoverpass(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function verifypass(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.verifypass(user).then(
      (user) => {
        dispatch(success());
        history.push("/signin");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function verifyemail(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.verifyemail(user).then(
      (user) => {
        dispatch(success());
        history.push("/signin");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function resetpassword(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.resetpassword(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        if(user.success){
          dispatch( alertActions.success(user.message));
        }else{
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function request(user) {
  return { type: userConstants.SAVINGS_REQUEST, user };
}
function success(user) {
  return { type: userConstants.SAVINGS_SUCCESS, user };
}
function failure(error) {
  return { type: userConstants.SAVINGS_FAILURE, error };
}
function continues(user) {
  return { type: userConstants.SAVINGS_CONTINUES, user };
}
