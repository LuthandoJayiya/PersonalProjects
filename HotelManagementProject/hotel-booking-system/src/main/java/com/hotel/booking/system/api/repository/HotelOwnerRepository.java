package com.hotel.booking.system.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.booking.system.api.model.HotelOwner;

public interface HotelOwnerRepository extends JpaRepository<HotelOwner, Long> {

}
