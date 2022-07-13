# helicareer-task

I decided to create a transaction page containing history of data subscriptions a user paid for his or her friends, you can search by receipients and filter by network, amount, transaction status and date.

for my mockdata and transaction type definition i used the following fields recipient,amount paid, transaction status, date, time and id

created a query for returning list of transactions with or without arguments given to it. 

the network 9mobile wasnt a supported data value in my type definitions  because it starts with a number so i had to use ETISALAT instead

most of the heavy lifting was done on the frontend, like the searching of transaction data and the grouping of transaction by dates of creation

