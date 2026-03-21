---
sidebar_position: 2
---

# Prerequisites

You have two topics you have to worry about: Dependencies and the cloud services.

## Dependencies

**You need two things when using the LobbyLink Plugin:**

1. The LobbyLink Plugin
2. The WebRTC Dependencies (Depending on where you want to deploy your game) 

### LobbyLink Addon

The Plugin will be availible on the Addon Store. In the meantime you have to download the addon from the git repository and add it to your `addons` Folder. You maybe have to enable the plugin here: `Project > Project Settings... > Plugins`. It should automatically register the scripts in the autoload section. You can check this by going to `Project > Project Settings... > Globals`. There should be these sctipts registered:

| Global Scripts                |
| ----------------------------- |
| LobbyLink                     |
| LobbyLink_WebRTCConnection    |
| LobbyLink_WebSocketConnection |
| LobbyLink_WebSocketMessage    |
| LobbyLink_ConfigHandler       |

For more infos on the installation Process read the [README](https://github.com/LobbyLink/lobbylink).

### WebRTC Dependencies

If you plan to export to a non-html environment (e.g. Windows, iOS, Android etc.) you need the [GDNative](https://github.com/godotengine/webrtc-native) Library from Godot. Its very easy to install and the installation process is explained in its README.

## Cloud Services

You need one to two/three services running somewhere on a server. They are all relatively lightweight and can run on a single server if it has a dockerised environment. For example all my services run on a single [Hetzner](https://hetzner.cloud/?ref=Ope1N5O54WyM)¹ Server for roughly 4€ (4.64$) a month. Of course this will scale with the playerbase and [TURN Server](../webrtc/what-is/turn) throughput. If you have problems you need to upgrade to a higher tier. 

¹ This is a Ref Link. If you register over it you get a 20€ Promo-Code. If you spend 10€ I will get a 10€ Promo-Code

**The services you need are the following:**

1. The [LobbyLink SignalingServer](https://github.com/LobbyLink/signalingserver). You have to use the LobbyLink one because the implemented protokoll powering the SignalingServer isn't standarised and unique to every implementation.
3. A [TURN Server](https://github.com/LobbyLink/turnserver). There are also some public TURN Servers available but they are either just for test purposes or you have to pay after a free tier. This will quickly get more expensive than hosting your own.
2. A [STUN Server](../webrtc/what-is/stun). You don't have to host one, because there are free and [public STUN Servers](https://gist.github.com/mondain/b0ec1cf5f60ae726202e) available. For example Google hosts one. But because the TURN Server I provide is based on [coturn](https://github.com/coturn/coturn), a STUN Server is automatically deployed with it. So you can just use your own.

I have docker images for everything and with them these deployments will be finished in minutes. How you deploy every service is explained in the README of each service.