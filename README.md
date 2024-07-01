# Help Desk Support Project

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

### Summary

For this project, I conducted research into the tech stack I was going to use to efficiently build a dashboard. I am a big fan of TypeScript and Next.js, so I wanted to use a solution that allowed me to integrate the frontend and backend into one repository while maintaining type safety.
After researching, I discovered the T3 stack, a boilerplate full-stack project. For easy authentication, I used Clerk and also incorporated Shadui to create a clean UI. Lastly, i used resend API for emails.

### important

To access the admin workflow you need a username and password. The username is lawrence@thedinnertable.club and the password is 123abc. This is a demo account and should not be used for anything other than testing. Also when signing up with a new account please use a real email address as the emails will be sent when a user's ticket is closed.

### User Workflow:

1. First signup as a user. You can do this by clicking on the "Sign Up" button in the home page. An admin is a different workflow.
2. When signing up please use a real email address as the emails will be sent when a user's ticket is closed. I recommend using the google authentication method as it is the easiest. Dont worry i dont collect any data.
3. As a user, you can create a ticket by clicking on the "Create Ticket" button. in the home page.
4. Then you can view your ticket in the dashboard.

### Admin Workflow:
1. First login as an admin. You can do this by clicking on the "Admin Login" button in the home page. Use the passwords provided above.
2. As an admin, you can view all the tickets created by users in the dashboard.
3. You can resolve a ticket by clicking on the "Resolve" button. An email will be sent to the user notifying them that their ticket has been resolved.

### Features:
- Admins and users can view and manage a list of tickets in a table format.
- Admins can resolve tickets, and an email is sent to the original creator of the ticket to notify them that it was resolved.
- All buttons/inputs are disabled when a user/admin is submitting information or making a request to ensure clean data across the APIs.
- A toast message will display if an API call is successful or not.
- Login/signup for regular users.
- Different dashboard views for an admin vs user.
- Login for an Admin (I chose to have only a login for an admin because it didn't make sense to have an admin signup—in the real world, I think admins will be invited to an application. Clerk has this feature, but I didn't integrate it because of time constraints).
- Dark and light mode toggle.
- Mobile and desktop considerations when it came to styling.
- Validation on the frontend on the ticket form.
- caching of the tickets to reduce API calls.
- skeleton loaders to show loading state.
- role based user access.

### Things I would add:
- Allowing the admin to delete tickets.
- Admins should also be able to reopen tickets and reassign them.
- Better UI/UX.
- Allowing admins to join an organization through email.
- Code could use some cleaning up, and I didn’t really pay attention to my commits (in a work environment, I would not do this as commits are important for collaboration).
- Better error handling and writing of tests on the backend. Most of the error handling was on the frontend.
- Probably could do a lot more things, but hopefully, you like the project! Let me know if there is anything else you'd like me to add.

### Conclusion:
All in all, this was a very fun project because I got to try new technologies. Time-wise, I think this project took around 8 hours to complete.
