import Swal from 'sweetalert2';

const ErrorSweet = (icon, errCode, errText, errComment, foot) => {
    return Swal.fire({
        icon: icon,
        title: errCode==null?errText:`[${errCode}] ${errText}`,
        text: errComment,
        footer: foot
    })
};

export default ErrorSweet;