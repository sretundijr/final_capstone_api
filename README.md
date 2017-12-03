
[![DeepScan Grade](https://deepscan.io/api/projects/1288/branches/3453/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=1288&bid=3453)

This is the api serving [Technician Assist](https://www.technician-assist.com/)

The technician assist app is an automotive repair shop tool used to obtain info
about a customers vehicle issues.  Technician assist is in the MVP stages.  Please
see the landing page above for more info.

The client code can be found [here](https://github.com/sretundijr/final-capstone)

The api contains two models, advisor and customer.  The advisor shares a one to many 
relationship with the customer.  The advisor model, contains information about the 
advisor such as: name, email, shop name and an array of customer id's.  The customer
model contains the same basic info with the addition of the customers answers to the
questionnaire.  The questionnaire answer portion of the customer model also stores 
info about whether the customer has an active (not archived) questionnaire.  In addition too the answers being stored, the questions are also currently stored with the customer. At this time there are no options to modify the question set the customer will see.  In later versions, the advisor will have the capabilites to modify or customize the questions.  When this change occurs the model will most likely be modified to store a questionnaire verion id.  This feature was not part of the MVP scope.  Currently, the customer model also contains an array of advisor id's, but this is currently not used.  This was added to serve a possible search feature, but this was not within the scope of the MVP.

Technician assist utilizies an email communication between the advisor, customer, and 
technician.  I chose mailgun as the smtp provider and name cheap for the domain name.

Technician assist also uses Auth0 for user authentication and authorization.  The api
takes advantage of auth0's management api to obtain user info and stores this info
to mongoDb.

This project was a tremendous learning experience and gave me an oppurtunity to use
a few third party api's and solve unique issues.