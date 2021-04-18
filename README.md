# photo-album
Browser based photo album software for everyday usage and runs on your own WIFI network.

## How to run it
1. Install packages
```bash
npm install
cd client
npm install
```

2. Update _photo_album.config.json_ to point to root folder where photos are.
```json
{
  "rootFolder": "/root/folder/for photos"
}
```

Note that each folder in the root folder is considered as an album and the software scans photo files in those sub folders.  Any folder within these sub folders is not scanned for photos.  Lastly software creates a sub folder _/.photo_album_ in the root folder to store metadata about the photos but does not modifies any photo files.

3. Start server.
```
npm run start
```

4. Start React dev server.
```
cd client
npm run start
```
Once started, your default browser will open automatically.  If not, copy and paste below URL to your browser.
```html
http://localhost:3000
```

## Running on Raspberry Pi
Below instructions are tested on Raspberry Pi 4 with Raspberry Pi OS 64-bit (Debian Buster).

When installing [sharp library](https://sharp.pixelplumbing.com), you may encounter _'fatal error: vips/vips8: No such file or directory'_.  That is because lib that comes with Debian Buster is an older version _'8.7.4-1+deb10u1'_ and sharp library needs a newer verison to build.

Run below command to uninstall Debian verison of _libvips_.  **Note: Make sure global version of _libvips_ is uninstalled.  Or it would result in **
```bash
sudo apt remove libvips42
```
Follow instructions on [sharp install page](https://sharp.pixelplumbing.com/install) to build a custom _libvips_.  Then install sharp using below command, which will complile using the custom _libvips_ library.
```bash
npm install sharp
```