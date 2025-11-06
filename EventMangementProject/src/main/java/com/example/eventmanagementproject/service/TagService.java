package com.example.eventmanagementproject.service;
import com.example.eventmanagementproject.dao.entities.Tag;

import java.util.List;
import java.util.Optional;

public interface TagService {
    List<Tag> getAllTags();
    Optional<Tag> getTagById(Long id);
    Tag getTagByName(String tagName);
    Tag createTag(Tag tag);
    Tag updateTag(Tag tag);
    boolean deleteTag(Long id);



}
