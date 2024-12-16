// DOM Elements
const movieSelect = document.getElementById('movie');
const adultsInput = document.getElementById('adults');
const childrenInput = document.getElementById('children');
const seniorsInput = document.getElementById('seniors');
const totalTickets = document.getElementById('total-tickets');
const totalPrice = document.getElementById('total-price');
const showtimeDisplay = document.getElementById('showtime');
const bookNowButton = document.getElementById('book-now');

// Update Booking Summary
function updateSummary() {
    const [price, showtime] = movieSelect.value.split('|');
    const adults = +adultsInput.value;
    const children = +childrenInput.value;
    const seniors = +seniorsInput.value;

    const totalTicketsCount = adults + children + seniors;
    const totalCost = (adults * price) + (children * (price * 0.5)) + (seniors * (price * 0.7)); // Discounted pricing

    // Update DOM
    showtimeDisplay.textContent = showtime;
    totalTickets.textContent = totalTicketsCount;
    totalPrice.textContent = totalCost.toFixed(2);
}

// Add Event Listeners
movieSelect.addEventListener('change', updateSummary);
adultsInput.addEventListener('input', updateSummary);
childrenInput.addEventListener('input', updateSummary);
seniorsInput.addEventListener('input', updateSummary);

// Handle Booking
bookNowButton.addEventListener('click', () => {
    const totalTicketsCount = +totalTickets.textContent;

    if (totalTicketsCount === 0) {
        alert('Please select at least one ticket before booking!');
        return;
    }

    alert(`Your booking is confirmed for ${totalTicketsCount} ticket(s) at ${showtimeDisplay.textContent}.`);
    // Reset Inputs
    adultsInput.value = 0;
    childrenInput.value = 0;
    seniorsInput.value = 0;
    updateSummary();
});

// Initialize Summary on Page Load
updateSummary();
