# basic.js — BSound (Sound Object)

In the basic.js library, the `BSound` class is used to manage and play audio and music files on the browser. It is an invisible (no interface) sound engine.

---

## Starting the Sound Engine

It is created by instantiating a simple `BSound` object and specifying the music file address.

```javascript
window.onload = function() {

    const backgroundMusic = new BSound();
    
    // Start loading the audio file (.wav or .mp3)
    backgroundMusic.load("assets/audio/loop_theme.mp3");

}
```

---

## Methods and Events

### Playback Methods
- `.play()` — Starts the loaded sound. If it is paused, it continues from where it left off.
- `.pause()` — Pauses the playing sound.
- `.stop()` — Completely stops the playing sound and moves the playback slider to `0` seconds (the beginning).

### Control Properties
- `.loop` (boolean) — Structure that sets the sound/music to restart from the beginning when it ends (Takes a value of `1` or `0`).
- `.playing` (boolean) — Reads whether the sound is currently actively playing (Returns `true/false`, read-only).
- `.paused` (boolean) — Checks whether the sound is paused.
- The background playback durations can be tracked via `time`, `timeLeft`, and `currentTime` properties.

### Load Event (.onLoad)
Just like graphic objects (Image/Icon), audio files may not be ready instantly due to their sizes. The condition where it is ready to play (be read) is captured with `.onLoad()`.

```javascript
const fxOkey = new BSound();
fxOkey.load("assets/audio/ok.wav");

// The moment when the sound file is loaded into memory by the browser and is ready to play
fxOkey.onLoad(function(loadedSound) {
    println("Sound file successfully prepared.");
});
```

---

## Examples

### Example 1: Looping Background Music and Button Control

```javascript
window.onload = function() {
    
    // Prepare the sound
    const gameMusic = new BSound();
    gameMusic.load("music.mp3");
    gameMusic.loop = 1; // Will play continuously from the beginning
    
    HGroup({ gap: 10, align: "center" });

        // Play Button
        Button({ text: "Play", color: "mediumseagreen" })
        .on("click", function() {
            gameMusic.play();
        });

        // Stop Button
        Button({ text: "Stop", color: "tomato" })
        .on("click", function() {
            gameMusic.stop(); // Silence completely and from the beginning
        });

    endGroup();

};
```

---

## Summary
- `BSound` → It is the structure that runs sound invisibly and independently from the screen.
- Once created and content is provided with the `.load()` function, it can be `.play()`ed many times via code.
- It is ideal for background music and can be used as `.loop = 1`.
