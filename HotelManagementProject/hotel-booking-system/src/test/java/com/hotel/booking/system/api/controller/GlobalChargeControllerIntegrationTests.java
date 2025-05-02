package com.hotel.booking.system.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotel.booking.system.api.dto.GlobalChargesResponseDTO;
import com.hotel.booking.system.api.dto.post.GlobalChargesPostDTO;
import com.hotel.booking.system.api.service.impl.GlobalChargesServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class GlobalChargeControllerIntegrationTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GlobalChargesServiceImpl globalChargeService;

    @Autowired
    private ObjectMapper objectMapper;

    private GlobalChargesPostDTO globalChargePostDTO;
    private GlobalChargesResponseDTO globalChargeResponseDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        globalChargePostDTO = GlobalChargesPostDTO.builder().baseHotelCharge(new BigDecimal("150"))
                .build();

        globalChargeResponseDTO = GlobalChargesResponseDTO.builder().Id(1L)
                .baseHotelCharge(globalChargePostDTO.getBaseHotelCharge())
                .build();
    }

    @Test
    @WithMockUser(username = "testuser", roles = {"ADMIN"})
    void createGlobalCharge_ShouldReturnCreatedGlobalCharge() throws Exception {
        mockMvc.perform(post("/api/global-charge")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(globalChargePostDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.charge.chargeAmount").value(globalChargePostDTO.getBaseHotelCharge()))
                .andExpect(jsonPath("$.message").value("Global charge created successfully"));
    }

    @Test
    void getAllGlobalCharges_ShouldReturnListOfGlobalCharges() throws Exception {
        globalChargeService.createCharge(globalChargePostDTO);

        mockMvc.perform(get("/api/public/global-charges")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.charges", hasSize(1)))
                .andExpect(jsonPath("$.message").value("Global charges retrieved successfully"));
    }
}
