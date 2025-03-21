package com.EasyStay.EasyStay.Services;

import com.EasyStay.EasyStay.Entities.ImagesArray;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface IImagesServices {

    String imageSave (MultipartFile file ) throws Exception;
    List<ImagesArray> allImages ();
}
