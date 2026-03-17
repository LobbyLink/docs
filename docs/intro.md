---
sidebar_position: 1
---

# Introduction

For the past few years, I’ve been on and off developing a multiplayer game concept in Godot and completely underestimated the complexity of "simply connecting two devices". During this journey, I discovered **WebRTC** (Web Real-Time Comunication). It is a protocol that is the unsung hero behind platforms like Microsoft Teams, Webex, and Discord. Despite its massive footprint, it remains relatively unknown to the general public and even to many developers.

While WebRTC is likely powering the voice and multiplayer features in some of your favorite games, high-quality resources on the subject are often dense, technical, and difficult to navigate. My goal is to change that. I am sharing my research and resources to demystify this protocol and explain how it enables seamless, peer-to-peer communication in the modern digital world. Especailly from a Godot Standpoint, tho this guide can be adapted to other game Engines and Languages.


## The Initial Approach (WebSockets)

In early 2021, my vision required one "Master" game instance and multiple clients running on different devices. Being less experienced at the time, I chose a text-based WebSocket protocol. The Drawbacks crystalized realtively fast. While I managed to create a working proof of concept, I quickly hit a wall of technical debt and networking limitations:

  - **Security Obstacles:** I had to manually open ports in the Windows Firewall and run the game with Administrator privileges. This is nothing a end users should do, even if he would be capable of doing it.
  - **Router Isolation:** Many routers block traffic between devices on the same local network, making the game work in one network and unplayable in the next.
  - **Network Silos:** All users were forced to be on the same local network, which isn't viable for a modern online game.
  - **Development Hell:** The text-based protocol became "chunky" and hard to maintain as the game grew. It was fun to play, but it wasn't a reliable foundation.

## Redefining the Requirements

When I revisited the project, I knew I needed a complete rewrite. I drafted a "wish list" for a networking solution that seemed almost too good to be true:

  - **High Performance:** Extremely low latency for real-time interaction.
  - **Universal Access:** Users must be able to connect from different networks.
  - **Zero Configuration:** No manual port forwarding or firewall "hacks" required by the user.
  - **Data Reliability:** The ability to choose between "fast/unreliable" (UDP) and "guaranteed/ordered" (TCP-style) data.
  - **Serverless:** None or as little servers as possible. I dont want to host game instances on my Server infrastructure. Small generall services are fine.

## Discovering WebRTC

After diving into documentation, I found WebRTC (Web Real-Time Communication). While primarily known for video/audio (Teams, Discord), it turned out to be exactly what I needed for my game and it was implemented with a high level API in Godot. WebRTC was the Solution mainly because of these points:

  - **Protocol Efficiency:** Unlike WebSockets (which use TCP), WebRTC primarily uses UDP, which is the gold standard for gaming due to its lower overhead and speed.
  - **NAT Traversal:** Through the use of STUN/TURN servers, WebRTC can punch through firewalls and NAT layers, allowing two peers to talk directly even if they are on different continents.
  - **Smart Data Channels:** It offers multiple data channels. I can send "unreliable/unordered" data for positions (speed is king) and "reliable/ordered" data for game events (accuracy is king) simultaneously.
  - **High-Level API:** Using Godot’s High-Level MultiplayerAPI, I could replace my messy text protocol with clean RPCs (Remote Procedure Calls).

## Overcoming the Learning Curve

I won't sugarcoat it: WebRTC is intimidating. Concepts like ICE Candidates, Offer/Answer handshakes, and Signaling Flows are complex. The resources available for Godot specifically are thin, which led to weeks of trial and error in my spare time. However, after pushing through the "learning haze," I finally established a rock-solid connection and im going to help you to archive the same.