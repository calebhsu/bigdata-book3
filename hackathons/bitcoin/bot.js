//
// TODO: implement the logic to decide whether or not to make a trade
//

function decideWhetherOrNotToTrade(tweets){
	// buy when low
		// buy on good stuff
	// sell when high
		// sell on bad stuff

	// if Bitcoin is going up, then sell USD to gain more Bitcoin
	// else keep
	var game = _.includes(tweets, "game")		// bad
	var news = _.includes(tweets, "news")		// good
	var money = _.includes(tweets, "money")		// bad
	var fun = _.includes(tweets, "fun")			// good
	var good = _.includes(tweets, "good")		// meh
	var actor = _.includes(tweets, "actor")		// good
	var movies = _.includes(tweets, "movies")	// good
	var tech = _.includes(tweets, "tech")		// meh
	var music = _.includes(tweets, "music")		// bad
	var people = _.includes(tweets, "people")	// good
	var apple = _.includes(tweets, "apple")		// good
	var google = _.includes(tweets, "google")	// good

	var currency = bank.currency

	var bought = true

	if (news || fun || actor || movies || people || apple || google) {
		if (currency == "USD") {
			bought == true
		} else {
			bought == false
		}
	} 
	if (game || money || good || tech || music) {
		if (currency == "USD") {
			bought == false
		} else {
			bought = true
		}
	}

	return bought
}
