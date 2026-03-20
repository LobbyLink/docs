---
sidebar_position: 2
---

# Is WebRTC for you?

One big thing you have to keep in mind when you are asking yourself if WebRTC is for you is Network Topology.

## Network Topology

WebRTC is supperior if you **don't** know the IP Adress of the Server you are connecting to. This is the case if you don't host game server instances on your own infrastructure but letting one of the players host the server instance on thir own PC. Especially if they dont have a static IP, are behind a firewall / NAT or in a local network where device-device communication is perhibbited. This is also possible with multiple peers. They can either be all connected to one peer or all be interconnected among themselves. 

```mermaid
---
config:
  layout: elk
---
flowchart TD
    D(Client D - Hosting Server instance)

    A(Client A) --> D
    B(Client B) --> D
    C(Client C) --> D
```

```mermaid
---
config:
  layout: elk
  elk:
    algorithm: layered
    direction: DOWN
    edgeRouting: ORTHOGONAL
    # Erzwingt eine kompaktere Anordnung
    spacing.nodeNode: 80
---
flowchart TD
    %% Die Anordnung in Reihen erzwingen
    subgraph Reihe1 [ ]
        direction LR
        A(Client A) --- B(Client B)
    end

    subgraph Reihe2 [ ]
        direction LR
        C(Client C) --- D(Client D)
    end

    %% Vertikale Verbindungen
    A <--> C
    B <--> D

    %% Diagonale Verbindungen
    A <--> D
    B <--> C
    
    %% Horizontale Pfeile (überschreibt die Platzhalter-Linien oben)
    A <--> B
    C <--> D

    %% Styling um die Hilfs-Boxen unsichtbar zu machen
    style Reihe1 fill:none,stroke:none
    style Reihe2 fill:none,stroke:none
```

:::danger[Be careful when using WebRTC for a typical Client-Server approach!]

If you are using a typical Client (Cloud)-Server connection WebRTC is probably not the right tool for you. It is probably possible to use it but a simple UDPServer is likely better for you. The strength of WebRTC is to connection two clients that are behind a NAT, that don't have a static public IP Address or that you don't know the public IP Address off. In a typical Client (Cloud)-Server connection you have a public accessible Server and know their IP Address.

```mermaid
flowchart TD
GS@{ label: Gameserver running in the Cloud with known IP Adress, shape: cloud }

GS <--> A(Client A)
GS <--> B(Client B)
GS <--> C(Client C)
```

:::