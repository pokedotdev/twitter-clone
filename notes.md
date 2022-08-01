al create un tweet

- se desactiva el editor
- desaparece la seccion del boton
- aparece una linea de carga en el top

Globals
- liked tweet (bool)
- retweeted tweet (bool)

Policies

usar Policies para:
- filtrar tweets de personas muteadas o blockqueadas 
- 

TODO:
- [ ] Retweets
- [ ] Replies/Comments
- [ ] Mentions

```rust
		multi link retweets -> Tweet {
			constraint expression on (__subject__.tweet_type = TweetType.RETWEET);
		};

		property is_followed := (
		 	global current_user_id != .id 
		 	and global current_user in .followers
		);
		property is_followed := User in (global current_user).following
```