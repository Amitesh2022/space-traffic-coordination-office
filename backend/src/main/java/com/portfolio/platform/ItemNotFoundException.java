package com.portfolio.platform;

public class ItemNotFoundException extends RuntimeException {
  public ItemNotFoundException(long id) { super("No item exists with id " + id); }
}
