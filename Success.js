document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.querySelector('#back-to-home'); // تعديل مطابق للزر في HTML

    // Event listener for "Go to Homepage" button
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to home page
    });
});
