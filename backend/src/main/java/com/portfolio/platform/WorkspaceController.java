package com.portfolio.platform;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(originPatterns = {"http://localhost:*", "http://127.0.0.1:*"})
public class WorkspaceController {
  private final WorkspaceService service;
  public WorkspaceController(WorkspaceService service) { this.service = service; }

  @GetMapping public List<WorkspaceItem> find(@RequestParam(required = false) String query) { return service.find(query); }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public WorkspaceItem create(@Valid @RequestBody WorkspaceItem item) { return service.create(item); }
  @PutMapping("/{id}") public WorkspaceItem update(@PathVariable long id, @Valid @RequestBody WorkspaceItem item) { return service.update(id, item); }
}
