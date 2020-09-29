# ThumbDrive
For those that need a little extra memory (or help) remembering what they've already done. ThumbDrive is meant to be a personal aid for stroke victims in recovery.

## Limitations and Notes
- In the absence of an external cookie store (or an internal one with a server that never restarts), tokens are being used for authentication directly. This effectively means each login will only last for ~1 hour before a new login is required. 

- Event types are not currently dynamic, but are planned to be in the future; this means the API endpoints may see drastic changes to accomodate.

- The background images are currently packaged with the application; customizing them means replacing the images with new ones of the same name. A separate interface will be offered in the future to allow general users to alter their images.

## Todos
- Find a free external cookie store or stop being cheap.
