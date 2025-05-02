package com.hotel.booking.system.api.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hotel.booking.system.api.exception.ResourceNotFoundException;
import com.hotel.booking.system.api.model.HotelOwner;
import com.hotel.booking.system.api.repository.HotelOwnerRepository;
import com.hotel.booking.system.api.service.GenericService;

@Service
public class HotelOwnerServiceImpl implements GenericService<HotelOwner> {

	private HotelOwnerRepository HotelOwnerRepository;

	public HotelOwnerServiceImpl(HotelOwnerRepository HotelOwnerRepository) {
		super();
		this.HotelOwnerRepository = HotelOwnerRepository;
	}

	@Override
	public HotelOwner saveEntity(HotelOwner HotelOwner) {
		return HotelOwnerRepository.save(HotelOwner);
	}

	@Override
	public List<HotelOwner> getAllEntities() {
		return HotelOwnerRepository.findAll();
	}

	@Override
	public HotelOwner getEntityById(long id) {
		/*
		 * Optional<HotelOwner> HotelOwner = HotelOwnerRepository.findById(id);
		 * if(HotelOwner.isPresent()) { return HotelOwner.get(); } else { throw new
		 * ResourceNotFoundException("HotelOwner", "Id", HotelOwner); }
		 */

		return HotelOwnerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("HotelOwner", "Id", id));
	}

	@Override
	public HotelOwner updateEntity(HotelOwner hotelOwner, long id) {

		HotelOwner existingHotelOwner = HotelOwnerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("HotelOwner", "Id", id));

		existingHotelOwner.setFirstName(hotelOwner.getFirstName());
		existingHotelOwner.setLastName(hotelOwner.getLastName());
		existingHotelOwner.setEmail(hotelOwner.getEmail());
		existingHotelOwner.setPassword(hotelOwner.getPassword());
		existingHotelOwner.setOpeningBalance(hotelOwner.getOpeningBalance());
		existingHotelOwner.setCurrentBalance(hotelOwner.getCurrentBalance());

		HotelOwnerRepository.save(existingHotelOwner);

		return existingHotelOwner;
	}

	@Override
	public void deleteEntity(long id) {
		HotelOwnerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("HotelOwner", "Id", id));
		HotelOwnerRepository.deleteById(id);
	}
}
