# ... a Signaling Server?

A signaling server isn't something defined in the WebRTC standard. It's sole purpose is to get the ICE Candidate Data from one peer to another. You could also dictate the data to your counterpart and type it into a text field. But that would be very inefficient. We need something to create groups of Peers, maybe a "Master", and a way to relay messages between them. In other words a way to create and manage Lobbys and relay Messages between their participants.


## My Signaling Server

The Peers and the Signaling Server need to know the structure of the protocoll beforehand. Both must be implemented simuntaniously. I created multiple Message Types for the entire Relay Flow. 

```ts
export enum MessageType{
    Id,
    RoomCode,
    Join,
    Offer,
    Answer,
    Candidate,
    UserConnected,
    UserDisconnected,
    CheckIn
};
```

Every message can be salted with one or multiple of these payloads.

```ts
export interface MessagePayload {
    type: MessageType;
    from?: number;
    to?: number;
    room_code?: string;
    id?: number;
    webrtc_type?: string;
    sdp?: string;
    media?: string;
    index?: number;
    name?: string;
    successful?: boolean;
}
```

| Column 1      | Column 2      |
| ------------- | ------------- |
| Cell 1, Row 1 | Cell 2, Row 1 |
| Cell 1, Row 2 | Cell 1, Row 2 |

### Diagram
```mermaid
sequenceDiagram
    participant A as Alice (Server)
    participant S as SignalingServer
    participant B as Bob
    A->>S: Initialize WS connection
    S->>A: WS connection established
    A->>S: Request room code
    Note over S: Create Lobby with<br/>unique room code
    S->>A: Return room code
    Note over A: Save room code
    A-->>B: Give Room code to counterpart
    Note over B: Save room code
    B->>S: Initialize WS connection
    S->>B: WS connection established
    B->>S: Request ID
    Note over S: Create unique ID
    S->>B: Return ID
    Note over B: Save ID
    B->>S: Request join<br/>(Payload: RoomCode, ID(Sending Peer))
    Note over S: Check if room exists
    S->>B: Accept join
    Note over B: Offer creation
    B->>S: Send Offer to Master<br/>(Payload: RoomCode, ID(Sending Peer))
    S->>A: Relay Offer to Master
    Note over A: Answer creation
    A->>S: Send Answer to Client<br/>(Payload: RoomCode, ID(Receiving Peer))
    S->>B: Relay Answer to Client
    loop
        par
            Note over A: ICE canadidate creation
            A->>S: Send ICE candidate to Client<br/>(Payload: RoomCode, ID(Receiving Peer))
            S->>B: Relay ICE candidate to Client
        and 
            Note over B: ICE canadidate creation
            B->>S: Send ICE candidate to Master<br/>(Payload: RoomCode, ID(Sending Peer))
            S->>A: Relay ICE candidate to Master
        end
    end
    Note over A,B: WebRTC Connection Established
```