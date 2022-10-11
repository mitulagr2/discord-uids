<div align="right">
  <img src="https://img.shields.io/badge/Completion-100%25-blue.svg" />
  <a href="#" alt="License"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" /></a>
</div>

<h1 align="center">discord-uids</h1>

Discord User-ID extractor is a Quick and Easy-to-use tool to extract user IDs from a chunk of text, such as the [GearBot](https://gearbot.rocks/) join logs.

### 🚀 [Click here to see the project in production](https://discord-uids.netlify.app/)

![wesite-screenshot](https://user-images.githubusercontent.com/69587385/194933057-e2a990ef-2e57-4bf3-b502-64f09a3b6e2c.png)

# Features

- Clean and Minimal UI using [Materialize](https://materializecss.com/).
- Cut UIDs keybind for all them keyboard enthusiasts (I gotchu).
- Time taken to extract UIDs metric (for all them performance enthusiasts, I gotchu-again).
- Moderation bot command autocomplete (configurable).
- Fully responsive across all screen sizes.

# How it works

**Problem**

1. Discord user-IDs can vary in length from ~17 to 19 characters long (Number of milliseconds elapsed since January 1, 2015 - [source](https://discord.com/developers/docs/reference#snowflakes)).
2. Usernames may range in length from 2 to 32 characters ([docs](https://discord.com/developers/docs/resources/user#usernames-and-nicknames)) and need not contain any alphabet. Usernames may contain round brackets.

This makes it hard to distinguish a potential bot username which imitates an UID from an actual UID.

**Solution**

Discord-UIDs relies on the fixed length of the user's tag and the hash preceding it, which being a special character is not allowed within usernames. This ensures no false-passes within the UID matching operation and ascertains that no user is wrongly banned. This method also provides for variable UID lengths of accounts created across all time periods.

**Code**

```js
for (let i = 0; i < input.length; i++)

    // Example snipet from GearBot join logs -
    // [20:40:11] :gearJoin: cOqCXO#0286 (882686403140542546) has joined, account created 1 hour, 39 minutes ago. 🆕

    if (input[i] === '(' && input[i - 6] === '#') {

        let idLength = 1;
        
        while( input[++i] !== ')') {
          output += input[i];
          ++idLength;
        }
        
        output += "\n";
    }
}
```

# Thank you very much!

Open to any suggestions on how to make this better! Feel free to fork the repo - Much appreciated!
