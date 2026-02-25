const socket = io();

socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
});

Swal.fire({
    title: 'Welcome to ColtraneDB!',
    text:'Example Text!',
    icon: 'success'
})