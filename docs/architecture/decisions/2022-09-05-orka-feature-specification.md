## Orka feature specification <!-- omit in toc -->

Date: 2022-09-05
Author: 24seconds

Table of contents
- [Introduction](#introduction)
- [Specification](#specification)
  - [Main](#main)
  - [Home tab](#home-tab)
    - [Peer Activity page](#peer-activity-page)
      - [Hands up section](#hands-up-section)
    - [Comment page](#comment-page)
  - [Profile tab](#profile-tab)
  - [Notification tab](#notification-tab)


## Introduction

The Orka design is almost done. There are several features and it's good to clarify each feature's specification - what it is, how it works, expected behavior etc. This document introduces feature spec by pages.


## Specification

### Main

`Main page` is the first page which users see when they come to orka.  
There are three tabs - `Home`, `Profile` and `Notification` tab.  
When the user clicks a tab then it becomes active.

### Home tab
In the home tab, users can 
- upload their files or links via upload button
- see the `peer list`. Each peer shows profile image, name and recently uploaded files or links. 

`Upload button` should
- support drag and drop feature for uploading files
- support browse files feature for uploading files
- support input feature for uploading text
- provide progress of uploading files or links

When the user clicks `one peer` from the peer list, then the user can
- know which peer is selected
- see the new page - `Peer Activity page` is shown right to the Main page.

#### Peer Activity page
`Peer Activity page` is appeared when the user clicks a peer from the peer list in Main page.

Peer Activity page should
- provide close button
- provide peer's profile image and name 
- show the list of peer's uploaded files or links.
- provide filtering option - All, Files, Links
- provide sorting option - Newest

Each item of the list of peer's uploaded files or links contains those things.
- Files
    - file name
    - file size
    - uploaded at
    - the number of download: how much the file is downloaded from others
    - `comment button`: the button to navigate to `Comment page`
    - comment notification indicator: the indicator to alert users that the comment has arrived
    - `download button`
- Links
    - link text
    - uploaded at
    - the number of view: how much the link is clicked from others
    - `copy link button`
    - `go to button`: the button to open a new tab and navigate to the link

Users should know that the item has selected when they click.

##### Hands up section
There is a `Hands up` section in the `Peer Activity Page`.  
Items appeared in the Hands up section when the peer advertised them.  
Read [Profile tab](#profile-tab) section for more about `Hands up` feature.


#### Comment page
`Comment page` is appeared when the user clicks `files` item in `Peer Activity page`. It is appeared to the right of `Peer Activity page`.

Comment page should
- provide close button
- provide the message list - the previous chat history I mean
- provide input feature for sending text 

Each message contains those things
- peer's profile
- peer name
- timestamp when the message is created
- indicator for showing last unread messgae

In the input, when something is typed then the `send button` should be activated.



### Profile tab
In the profile tab, users can
- upload their files or links via upload button
- edit their name
- see the `My Activity` - the list of uploaded files or links by themselves.

In the `My Activity`, it should
- provide filtering option - All, Files, Links
- provide sorting option - Newest
- provide `hands up` feature
- provide delete method for each item

Each item of `My Activity` contains those things
- Files
    - file name
    - file size
    - uploaded at
    - `comment button`
    - `hands up button`: the button to advertise the item. When the user click this button then other peers would be notified.
    - the number of download
- Links
    - link text
    - uploaded at
    - the number of view


### Notification tab
In the notification tab, users can
- upload their files or links via upload button
- check notifications

`Notification` arrives when
- the peer downloaded files
- the peer leaved a comment

About comment notification, when the user clicks it then
- the selected notification becomes active
- `comment page` is shown right to the Main page


