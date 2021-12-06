import Swal from 'sweetalert2';

const ErrorSweet = (errCode, errText, errComment) => {
    
    Swal.fire({
        icon:'error',
        title:`[${errCode}] ${errText}`,
        text: errComment
    })
};

export default ErrorSweet;