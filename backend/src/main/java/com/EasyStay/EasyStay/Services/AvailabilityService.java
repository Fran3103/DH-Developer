package com.EasyStay.EasyStay.Services;

import com.EasyStay.EasyStay.Dtos.BookingDTO;
import com.EasyStay.EasyStay.Repositories.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailabilityService {

    private final BookingRepository bookingRepository;

    public AvailabilityService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<BookingDTO> getBookedDatesForProduct(Long productoId) {
        return bookingRepository.findByProductoId(productoId)
                .stream()
                .map(b -> new BookingDTO(b.getStartDate(), b.getEndDate()))
                .toList();
    }

}
