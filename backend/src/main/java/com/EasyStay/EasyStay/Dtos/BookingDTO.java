package com.EasyStay.EasyStay.Dtos;

import java.time.LocalDate;

public class BookedRangeDTO {
    private LocalDate startDate;
    private LocalDate endDate;

    public BookingDTO(LocalDate startDate, LocalDate endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }
}
