module has {

  abstract type CreatedAt {
    property created_at -> datetime {
      default := datetime_current();
      readonly := true;
    }
  }

  abstract link created_at {
    property created_at -> datetime {
      default := datetime_current();
      readonly := true;
    }
  }

}
