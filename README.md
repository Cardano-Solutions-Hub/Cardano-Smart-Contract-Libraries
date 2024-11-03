# Cardano-Smart-Contract-Libraries

## Overview
This repository provides a backend and frontend implementation for handling real-time code updates and snippets related to various smart contracts. It uses **Express** and **Socket.IO** for the backend, enabling WebSocket communication, and a **React-based frontend** for interacting with the service.

## How It Works
- The **backend** serves as a WebSocket server, allowing clients to connect and receive real-time updates for smart contract code.
- The **frontend** is a React application that connects to the WebSocket server and interacts with various smart contract events.

### WebSocket Events

1. **Connection**
   - **Event**: `connection`
   - **Description**: Triggered when a new client connects to the WebSocket server.
   - **Response**: Emits an initial event containing the code for the NFT contract.

2. **Code Update**
   - **Event**: `codeUpdate`
   - **Description**: Receives code update requests for specific smart contracts.
   - **Payload**:
     ```json
     {
       "contract": "CONTRACT_NAME", // e.g., "NFT", "Burn"
       "type": "onchain" | "offchain" // Type of the contract
       // Other parameters depend on the contract and the type
     }
     ```
   - **Response**: Emits a `codeUpdate` event with the updated code for the specified contract.

3. **Code Snippet**
   - **Event**: `codeSnippit`
   - **Description**: Requests code snippets for predefined smart contracts.
   - **Response**: Emits a `codeSnippit` event containing an array of contract snippets.
     ```json
     [
       {
         "contract": "NFT",
         "code": "CODE_SNIPPET" // Generated code snippet for the contract
       },
       {
         "contract": "Vesting",
         "code": "CODE_SNIPPET"
       }
       // Additional contracts...
     ]
     ```

4. **Error Handling**
   - **Event**: `error`
   - **Description**: Emitted when there is an error during processing.
   - **Response**:
     ```json
     {
       "message": "Error message" // Description of the error
     }
     ```

5. **Disconnection**
   - **Event**: `disconnect`
   - **Description**: Triggered when a client disconnects from the WebSocket server.

### Message for the `codeUpdate` Event
- **`contract`**: Specifies the currently selected contract (e.g., `NFT`, `Vesting`).
- **`type`**: Can be either `offchain` or `onchain`, and is required.
- **Other Parameters**: Depend on the contract type. For example, an onchain NFT contract may require parameters like `scriptName` and `tokenName`.

## Running the Backend
1. **Navigate to the Frontend Directory**:
   ```bash
   cd server
   ```
   
2. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   npm run start:dev
   ```

## Running the Frontend
1. **Navigate to the Frontend Directory**:
   ```bash
   cd client
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Update the Server IP**:
   - Before running the frontend, you need to update the IP address in the following files:
     - `ContractLibrary.jsx`
     - `Documentation.jsx`
   - Replace the placeholder IP with your server’s IP address.

4. **Start the Frontend**:
   ```bash
   npm run dev
   ```

The frontend will now be running and can interact with the backend WebSocket server.
