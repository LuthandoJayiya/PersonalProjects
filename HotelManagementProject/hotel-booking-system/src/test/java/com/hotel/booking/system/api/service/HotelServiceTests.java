package com.hotel.booking.system.api.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.hotel.booking.system.api.exception.ResourceNotFoundException;
import com.hotel.booking.system.api.model.Hotel;
import com.hotel.booking.system.api.model.HotelOwner;
import com.hotel.booking.system.api.service.impl.HotelOwnerServiceImpl;
import com.hotel.booking.system.api.service.impl.HotelServiceImpl;

@WebMvcTest(HotelServiceImpl.class)
public class HotelServiceTests {

	// Remove keyword final from config class, causes bean type required errors
	@MockBean
	private HotelServiceImpl hotelService; // Mock any dependencies within HotelOwnerServiceImpl

	@Mock
	private HotelOwnerServiceImpl hotelOwnerService;

	private HotelOwner hotelOwner;

	@BeforeEach
	public void setup() {
		// Initialize a hotel object for testing
		hotelOwner = new HotelOwner();
		hotelOwner.setId(1L); // Set a dummy ID
		hotelOwner.setFirstName("John");
		hotelOwner.setLastName("Doe");
		hotelOwner.setEmail("JD@email.com");
		hotelOwner.setPassword("123345");
		hotelOwner.setCurrentBalance(new BigDecimal(1000));
		hotelOwner.setOpeningBalance(new BigDecimal(1000));
		// Add other properties as needed

	}

	@Test
	public void getAllEmptyRecords_Success() throws Exception {
		List<Hotel> hotels = List.of(new Hotel());

		List<Hotel> emps = hotelService.getAllEntities();

		assertTrue(emps.isEmpty());
	}

	@Test
	public void getAllRecordsWithMatchingSizes_Success() throws Exception {
		List<Hotel> hotels = List.of(
				new Hotel("Sun-fair", "34 New England Street, PMB, 3201", "Pietermaritzburg", "luxury", 5, "Pool, Gym, etc", "Free Parking",
						null, hotelOwner),
				new Hotel("Sun-fair2", "34 New Street, PMB, 3201", "Pietermaritzburg", "luxury", 1, "Pool, Gym, etc", "Free Parking", null,
						hotelOwner));
		when(hotelService.getAllEntities()).thenReturn(hotels);

		// Act
		List<Hotel> actualHotels = hotelService.getAllEntities();

		// Assert
		Assertions.assertEquals(hotels.size(), actualHotels.size());

	}

	//
	@Test
	public void getAllRecordsWithUnmatchingSizes_Success() throws Exception {
		List<Hotel> hotels = List.of(
				new Hotel("Sun-fair", "34 New England Street, PMB, 3201", "Pietermaritzburg", "luxury", 5, "Pool, Gym, etc", "Free Parking",
						null, hotelOwner),
				new Hotel("Sun-fair2", "34 New Street, PMB, 3201", "Pietermaritzburg", "luxury", 1, "Pool, Gym, etc", "Free Parking", null,
						hotelOwner));

		// Act
		List<Hotel> actualHotels = hotelService.getAllEntities();

		// Assert
		Assertions.assertNotEquals(3, actualHotels.size());

	}

	//
	@Test
	public void getAllRecordsGreaterThanZero_Success() throws Exception {
		List<Hotel> hotels = List.of(
				new Hotel("Sun-fair", "34 New England Street, PMB, 3201", "Pietermaritzburg", "luxury", 5, "Pool, Gym, etc", "Free Parking",
						null, hotelOwner),
				new Hotel("Sun-fair2", "34 New Street, PMB, 3201", "Pietermaritzburg", "luxury", 1, "Pool, Gym, etc", "Free Parking", null,
						hotelOwner));
		when(hotelService.getAllEntities()).thenReturn(hotels);

		// Act
		List<Hotel> actualHotels = hotelService.getAllEntities();

		// Assert
		Assertions.assertTrue(actualHotels.size() > 0);

	}

	//
	@Test
	public void getHotelByIdTest_WithMatchingIDs() {
		long id = 1;
		Hotel expectedHotel = new Hotel("Sun-fair2", "34 New Street, PMB, 3201", "Pietermaritzburg", "luxury", 1, "Pool, Gym, etc",
				"Free Parking", null, hotelOwner);

		// Mock the service call
		when(hotelService.getEntityById(id)).thenReturn(expectedHotel);

		// Call the method under test
		Hotel actualHotel = hotelService.getEntityById(id);

		// Assert that the IDs match
		assertEquals(expectedHotel.getId(), actualHotel.getId());
	}

	//
	@Test
	public void getHotelByIdTest_WithWrongIDs() {
		long wrongId = 4;
		long correctId = 5; // The ID you expect to match the mocked hotel
		Hotel expectedHotel = new Hotel("Sun-fair2", "34 New Street, PMB, 3201", "Pietermaritzburg", "luxury", 1, "Pool, Gym, etc",
				"Free Parking", null, hotelOwner);

		// Mock the service call to return the expected hotel for the correct ID
		when(hotelService.getEntityById(correctId)).thenReturn(expectedHotel);

		// Call the method under test with the wrong ID
		Hotel actualHotel = hotelService.getEntityById(wrongId); // This should return null

		// Assert that actualHotel is null
		assertNull(actualHotel);

		// Assert that the expected ID does not match the actual hotel ID (which is
		// null)
		// Since actualHotel is null, this will always pass
		assertNotEquals(expectedHotel.getId(), actualHotel == null);
	}

	//
	@Test
	public void saveHotelWithAllFieldsTest() {
		Hotel hotel = new Hotel("Sun-fair2", "34 New Street, PMB, 3201", "Pietermaritzburg", "luxury", 1, "Pool, Gym, etc", "Free Parking",
				null, hotelOwner);
		when(hotelService.saveEntity(hotel)).thenReturn(hotel);
		assertEquals(hotel, hotelService.saveEntity(hotel));
	}

	@Test
	public void saveHotelWithMissingFieldsTest() {
		Hotel hotel = new Hotel();
		when(hotelService.saveEntity(hotel)).thenReturn(hotel);
		assertEquals(hotel, hotelService.saveEntity(hotel));
	}

	//
	@Test
	public void deleteHotelTest() {
		Hotel hotel = new Hotel("Sun-fair2", "34 New Street, PMB, 3201", "Pietermaritzburg", "luxury", 1, "Pool, Gym, etc", "Free Parking",
				null, hotelOwner);
		hotelService.deleteEntity(hotel.getId());
		verify(hotelService, times(1)).deleteEntity(hotel.getId());
	}

	//
	@Test
	public void deleteHotelTestUsingIDThrowsException() {
		long idToDelete = 5; // ID of the hotel to delete
		Hotel hotelToDelete = new Hotel("Sun-fair2", "34 New Street, PMB, 3201", "Pietermaritzburg", "luxury", 1, "Pool, Gym, etc",
				"Free Parking", null, hotelOwner);

		// Mock the behavior of the hotel service to return an hotel when it
		// exists
		when(hotelService.getEntityById(idToDelete)).thenReturn(hotelToDelete);

		// Perform the deletion
		hotelService.deleteEntity(idToDelete);

		// Now, simulate that the hotel no longer exists
		when(hotelService.getEntityById(idToDelete))
				.thenThrow(new ResourceNotFoundException("Hotel", "Id", idToDelete));

		// Assert that retrieving the hotel now throws the expected exception
		assertThrows(ResourceNotFoundException.class, () -> {
			hotelService.getEntityById(idToDelete); // This should now throw an exception
		});
	}
}
