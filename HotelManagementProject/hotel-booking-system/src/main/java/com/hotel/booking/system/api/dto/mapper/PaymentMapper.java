package com.hotel.booking.system.api.dto.mapper;

import java.time.LocalDateTime;

import com.hotel.booking.system.api.dto.PaymentResponseDTO;
import com.hotel.booking.system.api.dto.post.PaymentPostDTO;
import com.hotel.booking.system.api.model.Booking;
import com.hotel.booking.system.api.model.Payment;

public class PaymentMapper {
    // Convert entity to response DTO
    public static PaymentResponseDTO toDTO(Payment payment) {
        PaymentResponseDTO dto = new PaymentResponseDTO();
        dto.setId(payment.getId());
        dto.setBookingId(payment.getBooking().getId());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setTransactionFee(payment.getTransactionFee());
        dto.setUpdatedAt(payment.getUpdatedAt());
        return dto;
    }

    // Convert request DTO to entity
    public static Payment toEntity(PaymentPostDTO requestDTO, Booking booking) {
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setPaymentDate(requestDTO.getPaymentDate());
        payment.setTransactionFee(requestDTO.getTransactionFee());
        payment.setAmount(booking.getTotalPrice());
        payment.setPaymentMethod("Card");
        payment.setStatus("PAID");
        payment.setUpdatedAt(LocalDateTime.now());
        return payment;
    }
}
