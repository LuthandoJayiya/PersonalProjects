package com.hotel.booking.system.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.booking.system.api.model.Hotel;
import com.hotel.booking.system.api.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
	List<Room> findByHotel(Hotel hotel);
}
