# Motivation

This application is intended to make it easier for developers to integrate with email services such as Mailchimp, Aweber, etc.
The developer can login using <strong  style="color: #22c55e">Supabase</strong> Auth and add the API credentials of their newsletter service. 

<br>On the frontend of the application (regardless of the framework they are using) .. they will be able to call a supabase function with the ID of their newsletter service, email, and name to subscribe the end user easily without writing any backend code for it and while having full control of the UI.


# Getting Started
The package.json contains a script "db-generate" that can be used to generate the **"Database"** type that reflects the current 
<strong  style="color: #22c55e">Supabase</strong> database. 

In a typescript project you can use this "Database" to strongly type the <strong style="color: #22c55e">Supabase</strong> object.

---
<div style="padding: 20px; display:grid; grid-template-columns: 1fr 1fr; gap: 12px">
<img alt="login" src="public/login.png" width=400 />
<img alt="config image" src="public/config.png" height=270 />
<img alt="config list" src="public/config_list.png" width=400 />
<img alt="test integration" src="public/test_int.png" width=400 />
</div>
