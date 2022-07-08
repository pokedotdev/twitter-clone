module auth {
	type Account {
		property email -> str;
		property provider -> str;
		property provider_id -> str;
		constraint exclusive on ((.provider, .provider_id));
		required link user -> default::User {
			constraint exclusive;
			on target delete delete source;
		}
	}
}