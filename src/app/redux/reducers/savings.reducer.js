import { userConstants } from '../_constants';

export function savings(state = {isAvailable:false}, action) {
  switch (action.type) {
    case userConstants.SAVINGS_REQUEST:
      return { savings: true };
    case userConstants.SAVINGS_SUCCESS:
      return {card_id: action.user, isAvailable:action.user? true:false};
    case userConstants.SAVINGS_CONTINUES:
      return {proceed: true};
    case userConstants.SAVINGS_FAILURE:
      return {};
    default:
      return state
  }
}