//javascript

//server
import asyncio
import websockets

# 定義 WebSocket 伺服器的處理函數
async def echo(websocket, path):
    print("客戶端已連接")
    try:
        # 持續接收客戶端發送的訊息，並回應
        async for message in websocket:
            print(f"收到訊息: {message}")
            await websocket.send(f"伺服器回應: {message}")
    except websockets.exceptions.ConnectionClosed as e:
        print(f"客戶端連接已關閉: {e}")

# 啟動 WebSocket 伺服器，並設置監聽端口 8765
async def main():
    async with websockets.serve(echo, "localhost", 8765):
        print("WebSocket伺服器啟動，監聽 localhost:8765")
        await asyncio.Future()  # 保持伺服器運行

# 運行 WebSocket 伺服器
asyncio.run(main())


//client
import asyncio
import websockets

async def hello():
    uri = "ws://localhost:8765"  # 伺服器地址
    async with websockets.connect(uri) as websocket:
        print("已連接到伺服器")
        
        # 向伺服器發送訊息
        await websocket.send("Hello, Server!")
        print("訊息已發送")
        
        # 等待伺服器回應
        response = await websocket.recv()
        print(f"伺服器回應: {response}")

# 啟動客戶端
asyncio.run(hello())

/*

WebSocket 概念：

    握手（Handshake）: WebSocket 連接的開始是在 HTTP 協議上進行握手，之後協議會切換為 WebSocket 協議（ws:// 或 wss://）。
    雙向通信: 伺服器和客戶端可以隨時發送訊息。
    持久連接: 一旦建立連接，兩端可以持續進行通信，直到任一方主動關閉連接。

*/
