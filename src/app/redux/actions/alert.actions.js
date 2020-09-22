import { alertConstants } from '../_constants';
import swal from 'sweetalert'

export const alertActions = {
    success,
    error,
    clear,
    continues
};

function continues(message) {
    swal({
        text: `${message}`,
        timer: 8000,
    })
    return { type: alertConstants.CONTINUES, message };
}

function success(message) {
    swal({
        text: `${message}`,
    }).then(()=>{
        window.location.reload()
    })
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    swal({
        text: `${message}`,
        timer: 8000,
    })
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}