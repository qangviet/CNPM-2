// import React, { useState } from "react";
// import "./Payment.css"; // Import the CSS file

// const Payment = ({ location }) => {
//     const [couponCode, setCouponCode] = useState("");
//     const [discount, setDiscount] = useState(0);
//     const [totalPrice, setTotalPrice] = useState(0); // Example total price
//     const [isPaymentComplete, setIsPaymentComplete] = useState(false);

//     const applyCoupon = () => {
//         // Replace 'YOUR_COUPON_CODE' with the actual coupon code you want to apply
//         const yourCouponCode = "ABC";

//         // Check if the entered coupon code matches the expected coupon code
//         if (couponCode === yourCouponCode) {
//             // Set the discount amount (for example, 10% discount)
//             const discountPercentage = 10; // Assuming a 10% discount

//             // Calculate the discount based on the total price
//             const discountAmount = (totalPrice * discountPercentage) / 100;

//             // Set the discount and calculate the new total price after applying the discount
//             setDiscount(discountAmount);
//             setTotalPrice(totalPrice - discountAmount);
//         } else {
//             // Handle invalid coupon code here (e.g., show an error message)
//             console.log("Invalid coupon code. Please try again.");
//             // You can display an error message to the user indicating that the coupon code is invalid
//         }
//     };

//     const handleCouponChange = (e) => {
//         setCouponCode(e.target.value);
//     };

//     const processPayment = () => {
//         // Logic to process payment
//         // This can include sending data to a payment gateway or performing other payment-related tasks
//         // For example:
//         // if (/* Payment is successful */) {
//         //   // Navigate the user to the final invoice or confirmation page
//         //   // Use react-router or other navigation methods
//         // }
//         console.log("Payment processed successfully!");
//         setIsPaymentComplete(true);
//         // For demonstration purposes, just log a message indicating successful payment
//     };

//     const renderInvoice = () => {
//         return (
//             <div className="invoice">
//                 <h3>Final Invoice</h3>
//                 <p>Total Price: ${totalPrice}</p>
//                 <p>Discount: ${discount}</p>
//                 {/* Display other invoice details */}
//             </div>
//         );
//     };

//     return (
//         <div className="payment-container">
//             <h2>Payment Page</h2>
//             {!isPaymentComplete && (
//                 <>
//                     <label htmlFor="couponCode">Coupon Code:</label>
//                     <input
//                         type="text"
//                         id="couponCode"
//                         value={couponCode}
//                         onChange={handleCouponChange}
//                     />
//                     <button onClick={applyCoupon}>Apply Coupon</button>
//                     <div className="price-info">
//                         <p>Total Price: ${totalPrice}</p>
//                         <p>Discount: ${discount}</p>
//                     </div>
//                     {/* Display other payment form fields, payment methods, etc. */}
//                     <button onClick={processPayment}>Process Payment</button>
//                 </>
//             )}
//             {isPaymentComplete && renderInvoice()}
//         </div>
//     );
// };

// export default Payment;
