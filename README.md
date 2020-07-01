# 🕸🔥 LocalDrop!

[`LocalDrop`](https://localdrop.me) is peer to peer LAN(Local Area Network) data sharing service.  


## [Table of Contents](#table-of-Contents)
- [Demo](#demo)
- [💡 Motivation](#motivation)
- [📚 How to use](#how-to-use)
  - [Sending data](#sending-data)
  - [Change color theme](#change-color-theme)
  - [Check system message](#check-system-message)
  - [Self Hosting](#self-hosting)
- [🚧 RoadMap](#roadmap)
- [💻 Compatibility](#compatibility)
- [🤖 Self QnA](#self-qna)


## Demo

link : https://localdrop.me

<img src="./assets/locldrop_demo.gif" >


### Mobile version
(You can scroll horizontally)  
<img src="./assets/localdrop_mobile.png" width="300">


-----------------------

## Motivation

💡 In home and office, sometimes I need to transfer data (text or file) from device1 to device2. It would be easy if sharing app (google drive, dropbox, etc) is installed in both devices. But most of time, it is not. So I decided to make my own sharing service. The reason make by myself is because it would be fun and I can customize whatever I want. Plus, I haven't used webRTC and webSocket before, it's good chance to practice those apis! That's why I made `LocalDrop`.

-------

## How to use 

📚 Each browser has its own `UUID`. If other peer joined then, it will be appeared in `PEERS:` tab. 

**Important!**: To use download feature, Turn off `Update on reload` in chrome devTools - Application - Service Workers section. To avoid memory issue for large file transfer, LocalDrop uses [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js). It ingeniously solves memory issue using iframe + service worker. Because it utilizes service worker heavily, we need to turn `Update on reload` option off.

### Sending data

<img src="./assets/localdrop_pc.png" width="800">

You can send text or any kind of data.  

#### Sending Text
📋 To send Text, you need to click `other peer` to send and type text. Then click `send` button  

#### Sending File
📁 To send File, click `cross` button then select files to transfer.
**Important!**: After you select files, it does not transfer immediately. It just give other peer to `download link`. When other peer request download, then transfer starts.

### Change color theme

<img src="./assets/localdrop_change_color_theme.gif" >


🎨 You can change color theme. Click `Change Color theme` button to change color! Default is `MaterialThemeOcean`. Why? I like this :D
Currently (13:32 Wed 01 Jul 2020) it support 13 color themes. Here is the list
- MaterialThemeOceanic
- MaterialThemePalenight
- MaterialThemeDarker
- MaterialThemeDeepOcean
- ThemeOneLight
- ThemeMonoKaiPro
- MaterialThemeLighter
- SolarizedLight
- ThemeDracula
- ThemeArcDark
- ThemeOneDark
- ThemeNightOwl
- ThemeLightOwl


### Check system message

When there is something to notify to user, I wrote system message. You can check system message by clicking toggle switch!


### Self Hosting

🛠️ To transfer offer and answer, there is signaling server outside of LAN. If you want to host signaling server by yourself. Follow these steps.

- clone this repository

#### client side

```
// in the repository,
$ cd client
$ npm run dev
```

#### signal server side
```
// in the repository,
$ cd signaling-server
$ npm run dev
```

#### Change url as you want!
Many urls are from `.env.development` file. Customize yourself

───────┬─────────────────────────────────────────────  
       │ File: .env.development  
───────┼─────────────────────────────────────────────  
   1   │ REACT_APP_NODE_ENV=development  
   2   │ REACT_APP_PUBLIC_URL=http://localhost:3000  
   3   │ REACT_APP_MITM_URL=http://localhost:8080  
   4   │ REACT_APP_WEB_SOCKET_URL=ws://localhost:4000  
   5   │ REACT_APP_VERSION_NUMBER=v0.1.0  
   6   │ BROWSER=none  
───────┴─────────────────────────────────────────────  

-------

### RoadMap

🚧  Current version is v0.1.0. There are lots of things to do. Here's TODO list

- [ ] Remove chunk header (It causes slow down download speed)
- [ ] Create dataChannel everytime download request (to support parallel download)
- [ ] Better UX for mobile view..
- [ ] Notify system message via toast or notification
- [ ] Display download progress for transfer side
- [ ] Handle peerConnection recreate
- [ ] Handle webSocket recreate
- [ ] Make docker image to support cross flatform self hosting
- [ ] Make Logo icons
- [ ] Handle ping/pong based on visibility change

------

### Compatibility

〰️ Because I use chromium, chrome and samsung browser, I tested those and it seems LocalDrop runs smoothly.

------

### Self QnA

🙋 This section is self QnA.  

#### Why Browser Compatibility is limited?

Because I made this to use by my self. I haven't tested on Opera and Firefox.  
One thing for sure is that Localdrop can not support ios Safari and Safari

#### 🚄 About download speed

##### RTCDataChannel

It really varies. Though, there is one thing to improve. Currently, LocalDrop sends chunk with `header` to classify where does chunk come from. Putting and parsing header has some overhead. If header is removed, then speed would be faster 2 times (I've tested).


##### BufferControl

Depends on your device (pc or mobile) and network environment, buffer control is needed. In chromium, buffer size is 16 Mb for now, 14:07 Wed 01 Jul 2020 (https://chromium.googlesource.com/external/webrtc/+/master/pc/data_channel.cc#384)  

So I set buffer as half of chromium limitation (8 Mb). And because of buffer, download speed may vary a bit.


#### 🍕 DataChannel Chunk size

RTCDataChannel.send has some limitation. Some people recommends to send around 16kiB at most. I referred these links
- [Understanding message size limits](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Using_data_channels#Understanding_message_size_limits)
- [WebRTC data channel: Optimum message size (#5)](http://viblast.com/blog/2015/2/5/webrtc-data-channel-message-size)


### 🐏 Memory Issue: Transfer Large file

When transfer large file, we need to care about memory in receiver side. If we just accumulate in memory, device would crash easily. I've tested and if you have enough swap space, then accumulated chunks are goes into swap area. It's okay for pc but not mobile.  

We can use filesystem API but it is deprecated. That's why I use [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) to avoid memory issue.



