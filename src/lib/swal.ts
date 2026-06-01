import Swal from 'sweetalert2';

export async function showCreatedSuccess(title: string, text: string) {
  await Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonText: 'OK',
    confirmButtonColor: '#0f3460',
    background: '#ffffff',
    color: '#0f172a',
  });
}
