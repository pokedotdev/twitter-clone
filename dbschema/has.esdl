module has {

  abstract type CreatedAt {
    required created_at: datetime {
      default := datetime_current();
      readonly := true;
    }
  }

  abstract link created_at {
    created_at: datetime {
      default := datetime_current();
      readonly := true;
    }
  }

}
