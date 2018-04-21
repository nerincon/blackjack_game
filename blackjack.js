function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  // Used like so
//   var arr = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
//   arr = shuffle(arr)[0];
//   console.log(arr);

function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

function deck(){
	this.names = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['hearts','diamonds','spades','clubs'];
	var cards = [];
    
    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push( new card( n+1, this.names[n], this.suits[s] ) );
        }
    }
    return cards;
}

arr = shuffle(deck());
// console.log(arr[0]);
// console.log(arr[0]['value']);
// console.log(arr[0]['name']);
// console.log(arr[0]['suit']);


$(document).ready(function () {
    $('#deal-button').click(function () {
        arr = shuffle(deck());
        var arr1 = arr[0]['name']
        console.log(arr1)
        var arr2 = arr[0]['suit']
        console.log(arr2)
        $('#dealer-hand').append('<img class="cards" src="./img/' + arr1 + '_of_' + arr2 + '.png">')
    });
});



