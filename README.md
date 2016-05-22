# WHOISTHECUTEST.COM #


## Website ##

https://whoisthecutest.com/

## .htaccess ##

~~~apacheconf
# deny access to git-related files:
RedirectMatch 404 ^/.git/.*$
RedirectMatch 404 ^/README.md$
~~~