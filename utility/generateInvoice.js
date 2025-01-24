import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export const generateInvoice = async (OrderData) => {
    try {
        const order = OrderData.order[0];
        const details = OrderData.detail;
        const userAddress = OrderData.user_address;

        const htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f5f5f5;
                            color: #333;
                        }
                        .container {
                            padding: 20px;
                            background: white;
                            width: 80%;
                            margin: 20px auto;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            padding: 10px 0;
                            border-bottom: 2px solid #f0f0f0;
                        }
                        .header h1 {
                            font-size: 24px;
                            margin: 0;
                        }
                        .details {
                            margin: 20px 0;
                        }
                        .details p {
                            margin: 5px 0;
                        }
                        .order-table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 20px 0;
                        }
                        .order-table th, .order-table td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        .order-table th {
                            background: #f0f0f0;
                        }
                        .total {
                            text-align: right;
                            font-weight: bold;
                            font-size: 16px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Invoice</h1>
                            <p>Order ID: ${order.order_id}</p>
                            <p>Order Date: ${order.order_date}</p>
                            <p>Order Time: ${order.order_time}</p>
                        </div>
                        <div class="details">
                            <h3>Shipping Address</h3>
                            <p>${userAddress.fname} ${userAddress.lname}</p>
                            <p>${userAddress.address_line1}, ${userAddress.city}, ${userAddress.state} - ${userAddress.pincode}</p>
                            <p>Mobile: ${userAddress.mobile}</p>
                        </div>
                        <h3>Order Details</h3>
                        <table class="order-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${details
                                    .map(
                                        (item) => `
                                        <tr>
                                            <td>${item.pname}</td>
                                            <td>${item.qty}</td>
                                            <td>₹${item.price}</td>
                                            <td>₹${item.subtotal}</td>
                                        </tr>`
                                    )
                                    .join('')}
                            </tbody>
                        </table>
                        <p class="total">Subtotal: ₹${order.subtotal}</p>
                        <p class="total">Delivery Charge: ₹${order.delivery_charge}</p>
                        <p class="total">Grand Total: ₹${order.grand_total}</p>
                    </div>
                </body>
            </html>
        `;

        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        await shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Share Invoice' });

        Alert.alert('Success', `PDF generated at: ${uri}`);
    } catch (error) {
        Alert.alert('Error', 'Failed to generate PDF');
        console.error(error);
    }
};
