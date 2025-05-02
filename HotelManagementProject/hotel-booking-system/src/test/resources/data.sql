-- data.sql

-- 1. Insert Administrators
INSERT INTO administrators (first_name, last_name, password, email) VALUES
('admin1', 'admin1', 'password1', 'admin1@example.com'),
('admin2', 'admin2', 'password2', 'admin2@example.com');

-- 2. Insert Owners
INSERT INTO owners (first_name, last_name, email, phone_number, address, opening_balance, current_balance, password) VALUES
('John', 'Doe', 'john.doe@example.com', '1234567890', '123 Main St', 5000, 5000, '1234'),
('Jane', 'Smith', 'jane.smith@example.com', '0987654321', '456 Elm St', 5000, 5000, '1234');

-- 3. Insert Hotels
INSERT INTO hotels (name, address, phone_number, owner_id, star_rating, facilities, description, amenities, pictureurl) VALUES
('Grand Hotel', '789 Oak St', '5551234567', 1, 5, 'gym', '5 star hotel', 'free parking', null),
('Sea View Resort', '321 Pine St', '5559876543', 2, 5, 'gym', '5 star hotel', 'free parking', null);

-- 4. Insert Rooms
INSERT INTO rooms (occupancy, room_type, price, hotel_id) VALUES
('Available', 'Single', 100.00, 1),
('Available', 'Double', 150.00, 1),
('Available', 'Suite', 250.00, 2),
('Available', 'Deluxe', 200.00, 2);

-- 5. Insert Customers
INSERT INTO customers (user_name, password, first_name, last_name, email, address, card_details) VALUES
('johndoe', 'password123', 'John', 'Doe', 'johndoe@example.com', '123 Main St', '4111111111111111'),
('janesmith', 'password456', 'Jane', 'Smith', 'janesmith@example.com', '456 Elm St', '4222222222222222');

-- 6. Insert Special Offers
INSERT INTO special_offers (discount_percentage, hotel_id) VALUES
(20.00, 1),
(15.00, 2);

-- 7. Insert Global Charges
INSERT INTO global_charges (base_hotel_charge, room_charge_per_month, transaction_fee_percentage) VALUES 
(100.00, 10.00, 5.00),
(200.00, 20.00, 5.00);

-- 8. Insert Bookings
INSERT INTO bookings (customer_id, room_id, check_in_date, check_out_date, total_price, status) VALUES
(1, 1, '2024-07-10', '2024-07-15', 500.00, 'CONFIRMED'),
(2, 3, '2024-12-20', '2024-12-25', 1000.00, 'CONFIRMED');

-- 9. Insert Reviews
INSERT INTO reviews (customer_id, hotel_id, rating, comment) VALUES
(1, 1, 5, 'Excellent service and comfortable rooms!'),
(2, 2, 4, 'Great location but rooms could be cleaner.');

-- 10. Insert Payments
INSERT INTO payments (booking_id, amount, payment_method, status, payment_date, transaction_fee) VALUES
(1, 500.00, 'Credit Card', 'PAID', '2024-07-15', 50.00),
(2, 1000.00, 'PayPal', 'PAID','2024-07-15', 100.00);
