# Rent Tracker Design File

This is the design file for rent tracker backend, which will be built using GraphQL.

1. User will contain username, password, email, first name, last name, and list of properties; also usertype
2. Property will contain address, city, state, zip code, and an owner; also a list of contract(s)
3. Contract will contain tenant name, tenant phone, tenant email, starting date, ending date, payment frequency, payment amount; should also link to a property; also contain a list of payments
4. Payment will be linking to a contract. Will contain amount due, amount paid, for the month of. 