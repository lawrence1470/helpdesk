# Help Desk Support Project

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

### Summary

For this project, I conducted research into the tech stack I was going to use to efficiently build a dashboard. I am a big fan of TypeScript and Next.js, so I wanted to use a solution that allowed me to integrate the frontend and backend into one repository while maintaining type safety.
After researching, I discovered the T3 stack, a boilerplate full-stack project. For easy authentication, I used Clerk and also incorporated Shadui to create a clean UI. Lastly, i used resend API for emails.

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
