# Free Spirits
An application to share, create, and join travel plans with other free spirits.

### What is Free Spirits?
Free Spirits is an application that focuses on the spirit of travel. While some folks enjoy the experience of going with friends, the application was created with the intent to share experiences with likeminded others that may not yet know.

## Design Overview
Free Spirits is an application using Node and Express. Aside from express, it depends on two other large modules, mysql and handlebars.
### ORM and SQL Database
The data for this application is currently held in three databases:
- trips
- users
- relations
-- Because multiple users can connect to a single trip and users can join multiple trips, the one to many relationship is held in a separate database called relations. 
### Handlebars
Handlebars are used to construct the website. There are two master templates used; one for the front page, and another for all of the other pages on the website.

## Other Elements

### Handlebar International
Handlebar international is used to read and display times in local time. All of the information is saved via the database time, and therefore requires some modifications to display properly for an end-user.
### Bulma CSS
The application uses Bulma to drive its CSS styling. As a result of no javascript, the actual amount of animation on the application could be improved.
Some modifications were made to Bulma, inserting new colors driven by the application design guidelines created by one member on the team.
