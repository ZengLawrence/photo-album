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
npm start
```

4. Start React dev server.
```
cd client
npm start
```
Once started, your default browser will open automatically.  If not, copy and paste below URL to your browser.
```html
http://localhost:3000
```
