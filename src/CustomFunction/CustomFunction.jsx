import { Navigate } from 'react-router-dom';
import Swal from "sweetalert2";

export const Unauthorized = () => {
    Swal.fire({
        title: 'You Are Not Authorized....',
        text: 'Plese Login First.',
        icon: 'warning',
    }).then((result) => {
        if (result.isConfirmed) {
            Navigate('/Login')
        }
    });
};

export const workingprogress = () => {
    return Swal.fire({
        icon: 'success',
        title: "Working Progress",
        text: "Please Wait.. We will complete this Soon..Thank Your For Your Patient!",
        timer: 2000,
        showConfirmButton: true,
    })
}

