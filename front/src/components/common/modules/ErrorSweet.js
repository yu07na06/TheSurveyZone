import Swal from 'sweetalert2';

const ErrorSweet = (icon, errCode, errText, errComment, etc) => {
    return Swal.fire({
        icon: icon,
        title: errCode==null?errText:`[${errCode}] ${errText}`,
        text: errComment,
        etc
    })
};

export default ErrorSweet;