---
sidebar_position: 3
---

# WebRTC Flow

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