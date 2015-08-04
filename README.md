# oauth-angular-client
OAuth Angular Client Proof of Concept which uses an indirect approach.

OAuth 2.0 is the next evolution of the OAuth protocol which was originally created in late 2006. 

OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices.

OAuth 2 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service.

It works by delegating user authentication to the service that hosts the user account, and authorizing third-party applications to access the user account.

OAuth defines four roles:
  * Resource Owner
  * Client
  * Resource Server
  * Authorization Server

The resource owner is the user who authorizes an application to access their account.

The client is the application that wants to access the user's account. Before it may do so, it must be authorized by the user, and the authorization must be validated by the API.

The resource server hosts the protected user accounts.

The authorization server verifies the identity of the user then issues access tokens to the application.

Before using OAuth with your application, you must register your application with the service. This is done through a registration form in the "developer" or "API" portion of the service's website, where you will provide the following information:

  * Application Name
  * Application Website
  * Redirect URI or Callback URL

Once your application is registered, the service will issue "client credentials" in the form of a client identifier and a client secret. 

The Client ID is a publicly exposed string that is used by the service API to identify the application, and is also used to build authorization URLs that are presented to users. 

The Client Secret is used to authenticate the identity of the application to the service API when the application requests to access a user's account, and must be kept private between the application and the API.

Obtaining Authorization

To request an access token, the client obtains authorization from the resource owner.  
The authorization is expressed in the form of an authorization grant, which the client uses to request the access token.

OAuth 2 defines four grant types, each of which is useful in different cases:

  * Authorization Code: used with server-side Applications
  
  * Implicit: used with Mobile Apps or Web Applications 
  
  * Resource Owner Password Credentials: used with trusted Applications, such as those owned by the service itself
  
  * Client Credentials: used with Applications API access

Authorization Code Grant

The authorization code grant type is used to obtain both access tokens and refresh tokens and is optimized for confidential clients.
It is the most commonly used because it is optimized for server-side applications, where source code is not publicly exposed, and Client Secret confidentiality can be maintained.

     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)

   Note: The lines illustrating steps (A), (B), and (C) are broken into
   two parts as they pass through the user-agent.
