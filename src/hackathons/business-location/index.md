---
layout: layout.hbs
---

# Hackathon - Business Locations

You are approached by a business developer to get advice on where to build a
new store in Phoenix, AZ. There are currently six candidates. Use the Yelp
dataset and come up with your own scoring scheme to identify the best location
to recommend.

## Report

[Read the Report](report.html)

## Business Types
As a team, choose one of the following business types to work on:

- A new full-service daycare center
- A new full-service car wash
- A new 24-hours gym
- A new 24-hours diner
- A new swimming pool
- A new organic food store
- A new sushi buffet

## Scoring Method

For this hackathon, you will use a scoring method that is based on a series of
20 Yes/No questions that can be applied to each candidate location. The candidate
location that has the most number of Yes's is the most viable location.

Each Yes/No question generally should take on the form of

  _Does the location have X nearby?_

where X is a feature that you think would be useful for the business to be viable.

Two examples of such questions are:
1. Does the location have _at least one McDonald's within one mile_?
1. Does the location have _at least ten businesses with 100 or more reviews within one mile_?

## Coding

Implement scoring functions and visualize how these candidate locations are
scored. The skeleton code is provided for you in [report.html](report.html).

## Grading

Each person must implement at least two questions to receive credits for this
hackathon.

## Submissions

### Business Type

Our team chose to analyze candidate locations for a new 24-hour diner.

### Contributors

The team members who contributed to this hackathon are:

* [Caleb Hsu](https://github.com/calebhsu/)
* [Andrew Linenfelser](https://github.com/Linenfelser)
* [Zhili Yang](https://github.com/zhya215)
* [Andrey Shprengel](https://github.com/AndreyShprengel)
* [Andrew Berumen](https://github.com/anbe6083)

### 20 Questions

Our team came up with the following relevant questions:

1. Does the location have at least 3 restaurants nearby with more than 5 reviews within .5km? (Andrey)

  If so this is an area people go to dine out.

2. Does the location have no Mcdonald’s within 1km? (Andrey)

  If so then we have less cheap competition.

3. Does the location have a liquor store within 4km? (Andrey)

  If so people will get the drunken munchies.

4. Does the location have no grocery store within .5km ? (Andrey)

  Then people will be less likely to cook at home and more likely to eat out.

5. Is there a lack of Denny’s or IHOP within 5km of the location? (Andrew Berumen)

  Denny’s and IHOP are main competitors, so having a location away from them would be beneficial .

6. Is there a good amount of nightlife within 5km the location? (Good amount being 5 or more) (Andrew Berumen)

  Drunk people like food when they’re drunk.

7. Are there any restaurants with happy hour nearby? (Andrew Berumen)

  Happy drunk people like food when they’re happy and drunk during the day.

8. Is there a good amount of bad restaurants in a 5km radius? (bad being less than 3 stars and 5 reviews) (Andrew Berumen)

  We’re going to have the classiest, 5 star 24 hour diner around. Having bad businesses around is beneficial so they are more likely to go to our restaurant than others.

9. Does the location have any open Colleges & Universities within a 2km radius? (Caleb Hsu)

  Restaurants near colleges and universities typically get a lot of business throughout the day, especially later at night.

10. Does the location have any open Stadiums & Arenas within a 0.5m radius? (Caleb Hsu)

  Stadiums and arenas typically have large events later at night, so a 24-hour diner would benefit from the influx of traffic late at night.

11. Does the location have any open Hospitals within a 1km radius? (Caleb Hsu)

  Hospitals are open 24 hours and are staffed during both day and night. Not only would the diner benefit from hospital employees as customers, but also families of patients who do not want to travel far in search of food.

12. Does the location have over 10 open restaurants that are not good for groups nor kids within a 2km radius? (Caleb Hsu)

  If the diner is surrounded by restaurants that are neither good for groups nor for kids, then logically groups or people with kids will be drawn to the diner.

13. Does The Location Have Less Than 100 Competing Restaurants Nearby In 1000 Meters? (Zhili Yang)

  The less competing restaurants nearby are, the more chances people will go to my restaurant.

14. Does The Location Have At Least One Open Cinema Nearby In A 1 Km Radius? (Zhili Yang)

  Because people tend to get some food before or after watching movie.

15. Does The Location Have At Least One Open Hotel With The Rating Higher Than 4 And Gets More Than 10 Reviews Nearby In A 1 Km Radius? (Zhili Yang)

  Travellers tend to get food from somewhere nearby the hotels they live. And the hotels with higher comments should get more travellers.

16. Are There More Than 50 Open Restaurants Nearby Without Wifi Service Within 2 Km? (Zhili Yang)

  People tend to choose the restaurants with free wi-fi service, if there are a lot of restaurants without wi-fi nearby and our restaurant have wi-fi, this can be one of our advantages to attract customers.

17. Is there an airport within a 3 mile distance? (Andrew L)
  
  Being a few minute taxi ride away from an airport could bring in many customers with long layovers at the airport, or if people want to eat soon after they get off the plane. Airports also employ a lot of people, and these people need to eat

18. Is there at least one transportation service within 2 km? (Andrew L)

  In order for customers to eat at our diner, they need to get to the diner first. If they do not have a car transportation services are necessary, or since we are a 24 hour business, we want our diner to be accessible to the after bar crowd. 

19. Does the location have parking within a 0.2 mile distance? (Andrew L)

  Parking is a necessity for anyone that drives to our diner. If the walk from the car is too long, no customers will eat at our diner. 

20. Does the location have another 24 hour business within 1/10 mile distance? (Andrew L)

  If there are other 24 hour businesses in the area, it means that people come to this area for 24 hour services. We want to be inside of this area because a 24 hour diner off by itself may not do too well. 


### Conclusion

Our team collectively has implemented 20 scoring functions. Based on
the scores, our team recommends location 2 (from west to east),
because it receives 14 out of 20 possible scores.
