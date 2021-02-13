package com.hrmanagement.hrmanagement.repository;

import com.hrmanagement.hrmanagement.model.BlogPost;
import com.hrmanagement.hrmanagement.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    Optional<BlogPost> findById(Long blogPostId);

    List<BlogPost> findAll();
}
