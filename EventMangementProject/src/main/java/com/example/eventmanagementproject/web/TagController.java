package com.example.eventmanagementproject.web;


import com.example.eventmanagementproject.dao.entities.Tag;
import com.example.eventmanagementproject.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    @GetMapping("/all")
    public ResponseEntity<List<Tag>> getAllTags() {
        return ResponseEntity.ok(tagService.getAllTags());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id) {
        Tag tag = tagService.getTagById(id);
        return tag != null ? ResponseEntity.ok(tag) : ResponseEntity.notFound().build();
    }


    @GetMapping("/search")
    public ResponseEntity<Tag> getTagByName(@RequestParam String name) {
        Tag tag = tagService.getTagByName(name);
        return tag != null ? ResponseEntity.ok(tag) : ResponseEntity.notFound().build();
    }
    
    @PostMapping("/add")
    public ResponseEntity<Tag> addTag(@RequestBody Tag tag) {
        return ResponseEntity.ok(tagService.createTag(tag));
    }
    
    @PutMapping("/update")
    public ResponseEntity<Tag> updateTag(@RequestBody Tag tag) {
        return ResponseEntity.ok(tagService.updateTag(tag));
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteTag(@PathVariable Long id) {
        return ResponseEntity.ok(tagService.deleteTag(id));
    }
    
}
