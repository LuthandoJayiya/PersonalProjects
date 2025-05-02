package com.hotel.booking.system.api.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotel.booking.system.api.exception.ResourceNotFoundException;
import com.hotel.booking.system.api.model.Hotel;
import com.hotel.booking.system.api.repository.HotelRepository;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

	@Autowired
	private HotelRepository hotelRepository;

	public UploadController(HotelRepository hotelRepository) {
		this.hotelRepository = hotelRepository;
	}

	@PostMapping
	public ResponseEntity<String> upload(MultipartFile file) {

		// Check if the uploaded file is empty
		if (file.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded.");
		}

		// Example ID; can be parameterized if needed
		Long Id = 1L;
		Optional<Hotel> hotelOptional = hotelRepository.findById(Id);

		// Check if the hotel exists
		if (!hotelOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel not found.");
		}

		Hotel hotel = hotelOptional.get();
		String base64Image;

		try {
			// Directly read the file bytes without ByteArrayOutputStream
			byte[] photoData = file.getBytes();

			// Check if photoData has content
			if (photoData.length == 0) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to read the file data.");
			}

			// Encode the file to Base64
			String contentType = file.getContentType();
			base64Image = "data:" + contentType + ";base64," + java.util.Base64.getEncoder().encodeToString(photoData);

			// Save the Base64 string to the hotel's picture URL field
			hotel.setPictureURL(base64Image);
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing file: " + e.getMessage());
		}

		catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error processing file: " + e.getMessage());
		}

		// Save the hotel entity with the new picture URL
		hotelRepository.save(hotel);
		return ResponseEntity.ok("File uploaded successfully. Image URL: " + hotel.getPictureURL());
	}
}
