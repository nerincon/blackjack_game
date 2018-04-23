$(document).ready(function() {
    // welcome()
    begin()
    $('.foo').click(function () {
        var elem = event.target.id
        if (elem === 'deal-button'){
            deck = new Deck()
            $('#display').empty()
            $('#display').append("<h3>Let's Play Some Blackjack!</h3>")
            $('#player-hand').children().remove();
            $('#dealer-hand').children().remove();
            deal();
            var input = this;
            input.disabled = true;
            $(this).css('background-color','gray');
            after();
        }else if (elem === 'hit-button'){
            hit();
        } else {
            stand();
            // winner();
        }
        refresh();
        displayPoints();
        over();
    });
});

var playerHand = []
var dealerHand = []



function winner(){
    if(total ===21 && total2 === 21 || total2 > 21){
        console.log('player wins')
        $('#display').empty()
        $('#display').append('<h3>PLAYER WINS!</h3>');
    } 
    else if(total > total2){
        console.log('player wins')
        $('#display').empty()
        $('#display').append('<h3>PLAYER WINS!</h3>');
    } else if (total2 > total) {
        console.log('dealer wins')
        $('#display').empty()
        $('#display').append('<h3>DEALER WINS!</h3>');
    } else {
        swal({
            title: "Draw!",
          });
    }
    // $('#player-hand').children().remove();
    // $('#dealer-hand').children().remove();
    $('#deal-button').prop("disabled",false);
    $('#deal-button').css('background-color','dodgerblue')
    playerHand = []
    dealerHand = []
    displayPoints()
    begin()
}

function over(){
    if(total === 21){
        refresh()
        $('#player-hand').children().remove();
        $('#dealer-hand').children().remove();
        $('#deal-button').prop("disabled",false);
        // $('#hit-button').prop("disabled",true);
        $('#deal-button').css('background-color','dodgerblue')
        playerHand = []
        dealerHand = []
        $('#display').empty()
        $('#display').append('<h3>BLACKJACK! PLAYER WINS!</h3>');
        begin()
    }
    else if(total > 21){
        console.log('Over 21, You lose!')
        refresh()
        $('#display').empty()
        $('#display').append('<h3>Player over 21! YOU LOSE!</h3>');
        console.log(playerHand);
        console.log(total)
        $('#deal-button').prop("disabled",false);
        // $('#hit-button').prop("disabled",true);
        $('#deal-button').css('background-color','dodgerblue')
        playerHand = []
        dealerHand = []
        begin()
    }
    else if(total2 > 21){
        console.log('Dealer over 21, You Win!')
        refresh()
        $('#display').empty()
        $('#display').append('<h3>Dealer over 21! PLAYER WINS!</h3>');
        $('#deal-button').prop("disabled",false);
        // $('#hit-button').prop("disabled",true);
        $('#deal-button').css('background-color','dodgerblue')
        playerHand = []
        dealerHand = []
        begin()
    }else {
        console.log('keep going')
        console.log(total)
    }
}


function displayPoints(){
    console.log(playerHand)
    total = Object.values(playerHand).reduce((t, n) => parseInt(t) + parseInt(n.value), 0)
    $('#score_p').append(total)
    total2 = Object.values(dealerHand).reduce((t, n) => parseInt(t) + parseInt(n.value), 0)
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
    var name = this.name;
    return '<img class="cards" src="./img/' + name + '_of_' + this.suit + '.png">';
};


function Deck(){
    this.names = {'A': 1,'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7':7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10};
    this.suits = ['hearts','diamonds','spades','clubs'];
    this.cards = [];

    for( var s = 0; s < this.suits.length; s++ ) {
        for (const [key, value] of Object.entries(this.names)) {
            this.cards.push( new Card( `${value}`, `${key}`, this.suits[s] ) );
        }
    }
    // console.log(this.cards);
}

Deck.prototype.draw = function(person) {
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

function begin(){
    $('#stand-button').prop("disabled",true);
    $('#stand-button').css('background-color','gray');
    $('#hit-button').prop("disabled",true);
    $('#hit-button').css('background-color','gray');
}

function after(){
    $('#stand-button').prop("disabled",false);
    $('#stand-button').css('background-color','dodgerblue')
    $('#hit-button').prop("disabled",false);
    $('#hit-button').css('background-color','dodgerblue')
}

function stand(){
    console.log(total2)
    if(total2 < 17){
        deck.draw('dealer')
        displayPoints()
        console.log(total2)
        winner()
    } else if(total2 >=17){
        displayPoints()
        winner()
    }
}

function welcome(){
    swal({
        title: "Welcome!",
        text: "Play some Blackjack!",
        // imageUrl: "img/chip.png"
      });
}

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