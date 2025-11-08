package com.example.eventmangementproject.service;

import com.example.eventmangementproject.dao.entities.Tag;
import com.example.eventmangementproject.dao.repositories.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }

    @Override
    public Tag getTagByName(String name) {
        return tagRepository.findByTagNameIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Tag not found with name: " + name));
    }

    @Override
    public Tag createTag(Tag tag) {
        Optional<Tag> existingTag = tagRepository.findByTagNameIgnoreCase(tag.getTagName());
        if (existingTag.isPresent()) {
            throw new RuntimeException("Tag with name '" + tag.getTagName() + "' already exists!");
        }
        return tagRepository.save(tag);
    }

    @Override
    public Tag updateTag(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public boolean deleteTag(Long id) {
        if (!tagRepository.existsById(id)) {
            return false;
        }

        // Check if tag is being used by events
        Tag tag = tagRepository.findById(id).get();
        if (tag.getEvents() != null && !tag.getEvents().isEmpty()) {
            throw new RuntimeException("Cannot delete tag - it is being used by " + tag.getEvents().size() + " event(s)");
        }

        tagRepository.deleteById(id);
        return true;
    }
}
