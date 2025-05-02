package com.hotel.booking.system.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.booking.system.api.model.Administrator;

public interface AdministratorRepository extends JpaRepository<Administrator, Long>{
}