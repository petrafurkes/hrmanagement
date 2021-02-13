package com.hrmanagement.hrmanagement.service;

import com.hrmanagement.hrmanagement.model.CV;
import com.hrmanagement.hrmanagement.model.User;
import com.hrmanagement.hrmanagement.repository.CVRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

@Service
public class CVService {

    @Autowired
    private CVRepository cvRepository;

    private static final Logger logger = LoggerFactory.getLogger(CVService.class);

    public CV store(User user, MultipartFile file) throws IOException {

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        CV cvFile = new CV(fileName, file.getContentType(), file.getBytes());

        cvFile.setUser(user);

        cvRepository.save(cvFile);

        user.setCv(cvFile);

        return cvFile;
    }

    public CV getFile(String id) {
        return cvRepository.findById(id).get();
    }

    public Stream<CV> getAllFiles() {
        return cvRepository.findAll().stream();
    }

    public Stream<CV> getOneFile(String id) {
        return cvRepository.findById(id).stream();
    }
}
