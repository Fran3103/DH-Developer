package com.EasyStay.EasyStay.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.nio.file.Paths;

@Slf4j
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${app.upload.dir:imagesCategorias}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String absolute = Paths.get(uploadDir)
                .toAbsolutePath()
                .normalize()
                .toString() + File.separator;
        log.info("→ Sirviendo estáticos desde: file:" + absolute);
        registry
                .addResourceHandler("/imagesCategorias/**")
                .addResourceLocations("file:" + absolute);
    }
}
