package com.EasyStay.EasyStay.Repositories;

import com.EasyStay.EasyStay.Entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByProductoId(Long productoId);
}
