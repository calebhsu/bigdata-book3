---
layout: layout.hbs
---

# Hackathon - Twitter Events

You are tasked to watch the tweet stream to analyze what's being said about
Russia.

## Objective

Design and implement a set of event detection functions in [team.html](team.html).
Each function takes an array of tweet objects as the input argument and performs
some logic to decide whether certain interesting event has occurred. For instance.
the function below triggers an event on every five tweets observed.

```
function has_observed_five_tweets(tweets){
  if (tweets.length % 5 == 0) {
    emit_event('has observed ' + tweets.length + ' tweets')
  }
}
```

## Technology

* Real-time database ([https://www.firebase.com/](https://www.firebase.com/))
* Twitter streaming API

### Server
A server process is tracking the Twitter stream using the keyword _Russia_. Every
time it receives a new tweet, it writes the tweet to the following Firebase data
location:

  [https://big-data-hci-hackathon.firebaseio.com/russia.json](https://big-data-hci-hackathon.firebaseio.com/russia.json)

The server code is already done.

### Client

Meanwhile, each client in the browser (i.e., [team.html](team.html)) subscribes
to the _value_ event at the same Firebase data location, using the code below.
```
firebase
  .child('russia')
  .on('value', function(snapshot){
    // this function is invoked each time there's update on the value
    var tweet = snapshot.val()
    update(tweet)
})
```

Whenever there's a change to this value, the callback function is invoked.
Then, `update()` calls a series of event detection functions. If a specific
event is detected, the event is pushed to the firebase at the location

  [https://big-data-hci-hackathon.firebaseio.com/events/team0.json](https://big-data-hci-hackathon.firebaseio.com/events/team0.json)

The code that achieves this is:
```
firebase
  .child('events')
  .child(TEAM_ID)
  .push()
  .set(event)
```

## Your Task

Your task is to work on is [team.html](team.html).

First, change `TEAM_ID` to match your team's name so that your team can be
uniquely identified.

As warmup, implement the detector function

```
function has_observed_two_tweets_in_a_row_about_the_crash(){
  // TODO
}
```

Then, as a team, come up with your own events and write detector functions for them.

## All Teams

[all.html](all.html) is a client page that monitors the events submitted
by all teams. Use this page to look at whether your team's events are posted
correctly, and also what other teams are up to in real-time.

# Submission

## Contributors

The team members who contributed to this hackathon are:

- Caleb Hsu
- Zhili Yang
- Andrew Linenfelser
- Andrew Berumen

## Grading

Each person must implement at least ONE detector function. It must be meaningful.

## Events

Our team came up with the following interesting events:

1. Has observed 10 tweets about IS and Syria? (Caleb Hsu)

  It appears that IS and Syria frequently appear together in a tweet, probably due to the increasing activity of IS in that region. Russia has also been playing a role in the civil war in Syria, which is probably why those tweets are appearing in relation to Russia.

1. Has observed tweets about the World Cup ? (Zhili Yang)

  Russia seems to be hosting the World Cup for 2018, so it is interesting to see a number of tweets regarding the World Cup despite news of the plane crash.

1. Has observed tweets about the bombings? (Andrew Berumen)

  Russia has had a number of airstrikes in Syria, which is overriding news about the crash of the Russian airplane in Egypt.

1. Has observed tweets about a bomb? (Andrew Linenfelser)

  Among other news, there seems to be a lot going on as far as bombings go in relation to Russia due to its activity in Syria.