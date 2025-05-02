package com.hotel.booking.system.api.service.impl;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotel.booking.system.api.exception.ResourceNotFoundException;
import com.hotel.booking.system.api.model.Hotel;
import com.hotel.booking.system.api.model.Room;
import com.hotel.booking.system.api.repository.HotelRepository;
import com.hotel.booking.system.api.repository.RoomRepository;
import com.hotel.booking.system.api.service.GenericService;

@Service
public class RoomServiceImpl implements GenericService<Room> {

	private RoomRepository RoomRepository;
	
	@Autowired
	private HotelRepository hotelRepository;

	public RoomServiceImpl(RoomRepository RoomRepository) {
		super();
		this.RoomRepository = RoomRepository;
	}

	@Override
	public Room saveEntity(Room Room) {
		return RoomRepository.save(Room);
	}

	@Override
	public List<Room> getAllEntities() {
		return RoomRepository.findAll();
	}

	@Override
	public Room getEntityById(long id) {
		/*
		 * Optional<Room> Room = RoomRepository.findById(id); if(Room.isPresent()) {
		 * return Room.get(); } else { throw new ResourceNotFoundException("Room", "Id",
		 * Room); }
		 */

		return RoomRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Room", "Id", id));
	}

	@Override
	public Room updateEntity(Room room, long id) {
		Room existingRoom = RoomRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Room", "Id", id));
		existingRoom.setRoomType(room.getRoomType());
		existingRoom.setPrice(room.getPrice());
		existingRoom.setOccupancy(room.getOccupancy());
		RoomRepository.save(existingRoom);

		return existingRoom;
	}

	@Override
	public void deleteEntity(long id) {
		RoomRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Room", "Id", id));
		RoomRepository.deleteById(id);
	}
	
	public Room getRoomWithLowestPrice(Long hotelId) {
		Hotel hotel = hotelRepository.findById(hotelId).orElseThrow(() -> new ResourceNotFoundException("Hotel", "Id", hotelId));
		Room room = RoomRepository.findByHotel(hotel).stream().min(Comparator.comparing(Room::getPrice)).orElseThrow(() -> new ResourceNotFoundException("Room", "HotelId", hotelId));
		
		return room;
	}
}
