---
sidebar_position: 1
---

# WebRTC Ablauf

```mermaid
sequenceDiagram
    participant Alice
    participant STUN
    participant SignalingServer
    participant TURN
    participant Bob
    Bob->>Alice: Hi Alice
    Alice<<->>Bob: Peer to Peer Socket connection
```