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
 
 A - Client Identifier & Redirection URI
 
The client constructs the request URI by adding the following parameters to the query component of the authorization endpoint URI:

Example URI: https://accounts.google.com/o/oauth2/auth?

QueryString Parameters:

client_id: the application's client ID

redirect_uri: where the service redirects the user-agent after an authorization code is granted

response_type:code specifies that your application is requesting an authorization code grant

scope: specifies the level of access that the application is requesting

Example URI:
https://accounts.google.com/o/oauth2/auth?client_id=1046506418225-dgpu1935ji53o196us39t959oknt7s2h.apps.googleusercontent.com&redirect_uri=http://localhost:9000/&response_type=code&scope=read

A' - User Authorizes Application

When the user clicks the link, they must first log in to the service, to authenticate their identity. Then they will be prompted by the service to authorize or deny the application access to their account.

B - Authorization Response

If the resource owner grants the access request, the authorization server issues an authorization code and delivers it to the client by adding the following parameters to the query component of the redirection URI

code: The authorization code generated by the authorization server. The authorization code MUST expire shortly after it is issued to mitigate the risk of leaks.

state: (Optional) It is required if the "state" parameter was present in the client authorization request.  
The exact value received from the client.

Example URI:
http://localhost:9000/callback?code=SplxlOBeZQQYbYS6WxSbIA

C - Access Token Request

The client makes a request to the API token endpoint passing the authorization code along with authentication details, including the client secret. These are the passed parameters:

Example URL: https://accounts.google.com/o/oauth2/token?

QueryString Parameters:

grant_type: Value MUST be set to "authorization_code".

code: The authorization code received from the authorization server.

client_id: the application's client ID

redirect_uri: where the service redirects the user-agent after an authorization code is granted

Example URI: https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA&client_id=1046506418225-dgpu1935ji53o196us39t959oknt7s2h.apps.googleusercontent.com&redirect_uri=http://localhost:9000/

D - Access Token Response

If the access token request is valid and authorized, the authorization server issues an access token and optional refresh token.

An example successful response is:

{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "token_type":"example",
  "expires_in":3600,
  "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
  "example_parameter":"example_value"
}



 
   
   
