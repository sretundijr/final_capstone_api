
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
info about whether the customer has an active (not archived) questionnaire.  Currently,
the customer model also contains an array of advisor id's, but this is currently not
used.  This was added to serve a possible search feature, but this was not within the 
scope of the MVP.