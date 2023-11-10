import Swal from 'sweetalert2';

export const errorMessage = (error: Error) => {
  return Swal.fire({
    title: 'Oops...',
    text: `Something went wrong! Error: ${error.message}`,
    icon: 'error'
  });
};
