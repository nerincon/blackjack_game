$(document).ready(function() {
    $('.foo').click(function () {
        var elem = event.target.id
        if (elem === 'deal-button'){
            deal();
            var input = this;
            input.disabled = true;
            $(this).css('background-color','gray');}
        else if (elem === 'hit-button'){
            hit();
        } else {
            stand();
            Winner();
        }
        refresh();
        displayPoints();
        Over();
    });
});

var playerHand = []
var dealerHand = []



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

function Winner(){
    if(total > total2){
        console.log('player wins')
    } else if (total2 > total) {
        console.log('dealer wins')
    }
}

function Over(){
    if(total > 21){
        console.log('Over 21, You lose!')
        refresh()
        $('#player-hand').empty()
        $('#dealer-hand').empty()
        $('#deal-button').prop("disabled",false);
        $('#hit-button').prop("disabled",true);
        $('#deal-button').css('background-color','dodgerblue')
        swal({
            title: "Over 21, You lose!",
            text: "Play Again?",
            // imageUrl: "img/chip.png"
          });

    }else {
        console.log('keep going')
        console.log(total)
    }
}


function displayPoints(){
    total = Object.values(playerHand).reduce((t, n) => t + n.value, 0)
    $('#score_p').append(total)
    total2 = Object.values(dealerHand).reduce((t, n) => t + n.value, 0)
    $('#score_d').append(total2)
}

function refresh(){
    $('#score_p').empty()
    $('#score_d').empty()
}

function Card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

Card.prototype.getImageUrl = function(){
    var type = this.value;

    if (this.value === 1)  {type = 'A';}
    if (this.value === 11) {type= 'J';}
    if (this.value === 12) {type = 'Q';}
    if (this.value === 13) {type = 'K';}

    return '<img class="cards" src="./img/' + type + '_of_' + this.suit + '.png">';
};


function Deck(){
	this.names = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['hearts','diamonds','spades','clubs'];
	this.cards = [];
    
    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            this.cards.push( new Card( n+1, this.names[n], this.suits[s] ) );
        }
    }
    // return cards;
}

Deck.prototype.draw = function(person) {
    console.log('test')
    var cardObject;
    var randomIndex = parseInt(Math.random() * (this.cards.length));
    cardObject = this.cards[randomIndex];
    console.log(cardObject)

    if (person === 'player') {
        playerHand.push(cardObject);
        cardToPlay = cardObject.getImageUrl();
        $('#player-hand').append(cardToPlay);
    } else {
        dealerHand.push(cardObject);
        cardToPlay = cardObject.getImageUrl();
        $('#dealer-hand').append(cardToPlay);
    }
      this.cards.splice(randomIndex, 1);
    //   console.log(this.cards)
  
    return cardObject
};

var deck = new Deck();
function deal() {

    // Deal 4 cards
    // var deck = new Deck();
    console.log(deck)
    deck.draw('player');
    deck.draw('dealer');
    deck.draw('player');
    deck.draw('dealer');
}

function hit() {
    deck.draw('player');
}

function stand(){
    $('#hit-button').prop("disabled",true);
    $('#hit-button').css('background-color','gray');
}

