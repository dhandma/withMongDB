# withMongDB
```
#Mongo DB basics with express and ejs
```
1. Make sure you have mongodb installed locally.
2. makse ure mongoose shell or compass installed and can perform basic CRUD operations using it.

--------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------
Inside mongo_basics: 

1. Sample code to connect to mongo db -  index_with_mongoose_connections.js

2. Basic Sample code to insert one and insert many with Schema: index_withschema.js 

3. Basic example of find menthod in mongodb  -- index_find_example.js

4. delete data - index_delete.js

5. Schema Validation - index_withschema.js

6. schema validation with schemaTypes - index_schema_options.js -- Ref: https://mongoosejs.com/docs/schematypes.html

7. Updation in validation and custom error writing - index_update_validation_erros.js -- ref: https://mongoosejs.com/docs/validation.html

--------------------------------------------------
--------------------------------------------------
Inside MONGO3:
Created get post call using express, ejs and mongodb. 
1. views/index.ejs --  wil render the chat messages which will be available in mongodb . 
2. views/index.ejs --  will help to create new form for GET "/chats/new" and  POST "/chats/new" to push data to mongodb and redirect to "/chats"