package com.EasyStay.EasyStay.Dtos;

import com.EasyStay.EasyStay.Entities.ImagesArray;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Lob;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public  class ProductoSeed {
    public Long id;
    public String name;
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    public List<Long> categorias;
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    public List<Long> caracteristicas;
    public String location;
    public Double price ;
    public Integer rating;
    public String quality;
    public   String address;
    public String description;
    @JsonProperty("images")
    public List<ImagesArray> images;




}
