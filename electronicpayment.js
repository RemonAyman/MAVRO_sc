document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with the User ID
    emailjs.init("WJ8xnvOlYlwEWHdTd");

    const paymentForm = document.querySelector('#payment-form');

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.querySelector('#email').value; // Email of the buyer
        const cardNumber = document.querySelector('#card-number').value;
        const expiryDate = document.querySelector('#expiry-date').value;
        const cvv = document.querySelector('#cvv').value;
        const paymentMethod = document.querySelector('#payment-method').value;

        if (email && cardNumber && expiryDate && cvv) {
            const paymentAmount = 100; // Default payment amount

            // Data to send to the buyer
            const buyerData = {
                to_email: email,
                message: `Your payment of $${paymentAmount} has been successfully processed using ${paymentMethod.toUpperCase()}.`
            };

            // Send email to the buyer
            emailjs.send("service_kd7xwtt", "template_2xgrejh", buyerData)
                .then(() => {
                    alert("Payment successful. A confirmation email has been sent to your email.");
                })
                .catch(error => {
                    console.error("Failed to send email to the buyer:", error);
                    alert("Payment successful, but failed to send confirmation email.");
                });

            // Data to send to the admin
            const adminData = {
                to_email: "elkootfyoussef@gmail.com", // Admin email
                message: `A payment of $${paymentAmount} has been received from ${email}.`
            };

            // Send email to the admin
            emailjs.send("service_kd7xwtt", "template_2xgrejh", adminData)
                .then(() => {
                    console.log("Admin notified successfully.");
                })
                .catch(error => {
                    console.error("Failed to send email to the admin:", error);
                });

            // Redirect to the success page
            window.location.href = 'Success.html'; // Redirect after successful payment
        } else {
            alert('Please fill in all the required fields correctly.');
        }
    });
});
