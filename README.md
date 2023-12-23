# DigitalWalletPayboxTask
This digital wallet project provides users with a convenient solution for managing and conducting financial transactions, offering a seamless experience for storing


# A little about the microservices
Gateway:
The Gateway microservice serves as the central coordinator, managing communication between all other microservices. 
It ensures that each microservice operates independently, maintaining a clear separation of functionality.

GroupAccount:
The GroupAccount microservice focuses on handling groups of shared money.
Each group is characterized by fields such as nameGroup, balance, users, and id.
This microservice plays a crucial role in managing and tracking shared finances within distinct groups.

User:
The User microservice is responsible for managing individual users.
Here, users can approve money transfer requests, create new requests, and more. Key user-related fields include name, email, phone, transactionHistoryId, groupAccount, and id.


Request Pending:
The Request Pending microservice is dedicated to handling money transfer requests.
It keeps track of essential details such as the sending user (userTransferId), receiving user (userReceivesId), transaction, transfer status, id. 


Transaction History:
The Transaction History microservice acts as a record keeper, storing the history of money transfers.
It maintains details such as the sending user (userTransferId), receiving user (userReceivesId), transaction, and a id.


### Development


This project consists of five microservices:
Gateway, Group Account, Request Pending, Transaction History, and User. 
To set up each service, navigate to its respective directory (e.g., gateway, groupAccount) in the command line,
and execute the following commands sequentially: npm install followed by npm start.
This will install dependencies and start each microservice, allowing for the smooth operation of the entire project.

add .env to the user folder: https://drive.google.com/file/d/1-kt6khNa3JivNLYwGKJc9USRM-zYNkQW/view?usp=sharing

