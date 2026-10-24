package com.portfolio.platform;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record WorkspaceItem(
    Long id,
    @NotBlank(message = "Title is required") String title,
    @NotBlank(message = "Owner is required") String owner,
    @Pattern(regexp = "Draft|Review|Approved", message = "Status must be Draft, Review or Approved") String status,
    @Pattern(regexp = "Low|Medium|High", message = "Priority must be Low, Medium or High") String priority) {}
