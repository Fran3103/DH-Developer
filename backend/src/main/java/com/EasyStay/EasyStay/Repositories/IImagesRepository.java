package com.EasyStay.EasyStay.Repositories;

import com.EasyStay.EasyStay.Entities.ImagesArray;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IImagesRepository extends JpaRepository<ImagesArray, Long> {
}
