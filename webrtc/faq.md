---
sidebar_position: 99
---

# FAQ

[//]: # "This needs rework and some slight other wording."

<details>
    <summary>Do players need to configure port forwarding to connect to a peer?</summary>

    No. One of the primary advantages of using WebRTC is that it is designed to bypass NAT (Network Address Translation) hurdles automatically. Players do not need to manually open or forward ports on their routers. WebRTC uses a process called ICE (Interactive Connectivity Establishment) alongside STUN/TURN servers to find the best path to establish a direct connection between peers.
</details>

<details>
    <summary>Why does the firewall allow P2P traffic, and is data ever "received" in a traditional sense?</summary>

    Most consumer firewalls follow a "Stateful Inspection" rule: they block unsolicited inbound traffic but allow outbound traffic. In terms of the firewall's logic, data is never "received" from a stranger; it sees it as "the person I just called is talking back to me." 

    Because of the ICE process, both clients are synchronized. They both start sending data ("shouting") at each other simultaneously. When your game client sends a packet "out" to a peer, the router creates a temporary "hole" (an entry in its NAT table), expecting a response from that specific address. Since both routers see an outgoing attempt first, they both open the door for the "incoming" packets, meaning the traffic never counts as "unsolicited."
</details>

<details>
    <summary>What is the role of the dedicated cloud signaling server?</summary>

    Think of it as the "Post Office" or a "matchmaker." WebRTC doesn't have a built-in way for two computers to find each other on the internet. The signaling server allows clients to find each other and exchange necessary metadata (like SDP offers and ICE Candidates) to initialize the P2P connection. It doesn't touch the actual game data; it just handles the initial "handshake." Once the connection is established, the game data usually flows directly between players.
</details>

<details>
    <summary>What is a STUN server and do I need one?</summary>

    STUN (Session Traversal Utilities for NAT) is a simple server that tells your client: "Hey, here is your public IP address and the port you are using." Most WebRTC setups use public STUN servers (like Google’s stun:stun.l.google.com:19302) because they are lightweight and usually free. You need it so your client knows which address to send to the signaling server.
</details>

<details>
    <summary>Are there cases where a direct P2P connection fails, and what is a TURN server?</summary>

    Yes. In some strict corporate or highly restrictive "Symmetric NAT" environments, a direct P2P connection might be blocked. This is where a TURN (Traversal Using Relays around NAT) server acts as a last resort. 

    If a direct connection is impossible, the game traffic is relayed *through* the TURN server to ensure the players can still connect. Because relaying all game data consumes server bandwidth, you usually have to host your own TURN server (using software like Coturn) or use a paid provider. I provide a turnserver docker image that is already configured and rady to host on any server that can handle docker. 
</details>

<details>
    <summary>Wouldn't using UDP potentially introduce synchronization problems among multiple clients?</summary>

    An example: One of the clients doesn't receive an event that would have caused their character to take damage.

    This is where the data channels come into play. 3 get automatically created when opening your connection, but you can create as many as you want as long as you have at least one. In the basic scenario, you have one data channel for unreliable data (like user inputs), one for reliable data transmission (like taking damage), and one for ordered data transmission (like chat messages).

    By a smart use of these different data channels, you practically have no data loss of important data like health updates. 

    You shouldn't always use the reliable or ordered data transmission just because "no data will be lost". If you would use these for example for every user input, you would have massive latency impacts. 
</details>