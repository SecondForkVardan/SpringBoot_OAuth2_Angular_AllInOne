# SpringBoot_OAuth2_Angular_AllInOne

An example of security implementation between Angular(2/4/5) on frontend side and Spring Boot, using OAuth2.   
This demo was made using followint tutorials :   
http://www.baeldung.com/rest-api-spring-oauth2-angularjs    
http://www.baeldung.com/angular-4-upgrade-for-spring-security-oauth   
https://kobietydokodu.pl/projekt-bilet-3-konfigurujemy-spring-security-oraz-oauth/    

## How to run
1.  Set up Your db connection in \src\main\resources\ **application.yaml**    
2.  Do the same in **flyway** block in **build.bradle**    
3.  Run **flywayBaseline** and **fywayMigrate** tasks. Those will run sql script (src\main\resources\db\migration\V1__oauth.sql). 
If You don't want to use flyway, just run this script manually in Your db.    
4.  Run **nodeSetup** task. It will download needed node dependencies to frontend directory.    
5.  Run **copyAngularToStaticResources** task to build Angular files and copy them under src/main/static directory.    
6.  Run application and go to http://localhost:8081/    
7.  Application will automatically create seed data - an user with USER role. Just login with username: username and password: password
8. You should see You *Principal* user data.
