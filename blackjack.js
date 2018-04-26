$(document).ready(function() {
    disable();
    welcome()
    begin()
    $('.foo').click(function () {
        var elem = event.target.id
        if (elem === 'deal-button'){
            deck = new Deck();
            $('#display').empty()
            $('#display').append("<h2>Let's Play Some Blackjack!</h2>")
            $('#player-hand').children().remove();
            $('#dealer-hand').children().remove();
            playerHand = []
            dealerHand = []
            deal();
            $('#score_d').hide()
            var input = this;
            input.disabled = true;
            $(this).css('background-color','gray');
            after();
        }else if (elem === 'hit-button'){
            hit();
        } if(elem === 'stand-button') {
            flipHoleCard();
            stand();
            displayPoints()
            $('#score_d').show()
        }else{
            refresh();
            displayPoints()
            over();
        }
        refresh();
        displayPoints();
        disable();
    });
    $('#ten').click(function() {bets.addBet(10);enable();});
    $('#fifty').click(function() {bets.addBet(50);enable()});
    $('#hundred').click(function() {bets.addBet(100);enable()});
});




function enable(){
    $('#deal-button').prop("disabled",false);
    $('#deal-button').css('background-color','dodgerblue');
}

function disable(){
    $('#deal-button').prop("disabled",true);
    $('#deal-button').css('background-color','gray');
}

var playerHand = [];
var dealerHand = [];
var bets = new Bets();


function winner(){
    if(total ===21 && total2 === 21 || total2 > 21){
        console.log('player wins')
        $('#display').empty()
        $('#display').append('<h2>PLAYER WINS!</h2>');
        bets.winner();
    } 
    else if(total > total2){
        console.log('player wins')
        $('#display').empty()
        $('#display').append('<h2>PLAYER WINS!</h2>');
        bets.winner();
    } else if (total2 > total) {
        console.log('dealer wins')
        $('#display').empty()
        $('#display').append('<h2>DEALER WINS!</h2>');
        bets.loser();
    } else {
        swal({
            title: "Draw!",
          });
    }
    $('#deal-button').prop("disabled",false);
    $('#deal-button').css('background-color','dodgerblue')
    displayPoints()
    begin()
}

function over(){
    if(total === 21){
        refresh()
        $('#deal-button').prop("disabled",false);
        $('#deal-button').css('background-color','dodgerblue')
        $('#display').empty()
        $('#display').append('<h2>BLACKJACK! PLAYER WINS!</h2>');
        begin()
        bets.winner();
    }
    else if(total > 21){
        console.log('Over 21, You lose!')
        refresh()
        $('#display').empty()
        $('#display').append('<h2>Player over 21! YOU LOSE!</h2>');
        console.log(playerHand);
        console.log(total)
        $('#deal-button').prop("disabled",false);
        $('#deal-button').css('background-color','dodgerblue')
        begin()
        bets.loser();
    }
    else if(total2 > 21){
        console.log('Dealer over 21, You Win!')
        refresh()
        $('#display').empty()
        $('#display').append('<h2>Dealer over 21! PLAYER WINS!</h2>');
        $('#deal-button').prop("disabled",false);
        $('#deal-button').css('background-color','dodgerblue')
        begin()
        bets.winner();
    }else {
        console.log('keep going')
        console.log(total)
    }
}


function ace_p(){
    var keyToFind = 'A';
    for(var i in playerHand){
        if(playerHand[i].name === keyToFind){
            if(total > 21){
                total -= 10
                console.log(total + ' player')
                return
            }
            else{
                console.log("no 'A' in playerHand")
            }
        }
    }
}

function ace_d(){
    var keyToFind = 'A';
    for(var i in dealerHand){
        if(dealerHand[i].name === keyToFind){
            if(total2 > 21){
                total2 -= 10
                console.log(total2 + ' dealer')
                return
            }
            else{
                console.log("no 'A' in dealerHand")
            }
        }
    }
}


function displayPoints(){
    console.log(playerHand)
    total = Object.values(playerHand).reduce((t, n) => parseInt(t) + parseInt(n.value), 0)
    ace_p()
    $('#score_p').append(total)
    total2 = Object.values(dealerHand).reduce((t, n) => parseInt(t) + parseInt(n.value), 0)
    ace_d()
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
    var suit = this.suit;
    return '<img class="cards" src="./img/' + name + '_of_' + suit + '.png">';
};


function flipHoleCard() {
    var name = dealerHand[0].name
    var suit = dealerHand[0].suit
    var actualCardSrc = './img/' + name + '_of_' + suit + '.png';
    $('#dealer-hand :first-child').attr('src', actualCardSrc);
}

function Deck(){
    this.names = {'A': 11,'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7':7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10};
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

// var deck = new Deck();
function deal() {
    // Deal 4 cards
    console.log(deck)
    deck.draw('player');
    deck.draw('dealer');
    $('#dealer-hand :first-child').attr('src', './img/joker.png');
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
    count = 0
    while (count < 4){
        if(total2 < 17){
            deck.draw('dealer')
            displayPoints()
            console.log(total2)
            winner()
        } else if(total2 >=17){
            displayPoints()
            winner()
        }
        count += 1
    }
}

function welcome(){
    swal({
        title: "Welcome!",
        text: "Play some Blackjack!",
        imageUrl: "./img/hangover2.gif"
      });
}

function Bets() {
    this.pot = 200;
    this.bet = 0;
    $('#bet').text('$' + 0);
    $('#pot').text('$' + this.pot);
}

Bets.prototype.updateAmounts = function () {
    $('#bet').text('$' + this.bet);
    $('#pot').text('$' + this.pot);
};

Bets.prototype.addBet = function(amount) {
    if (this.pot >= amount) {
        this.pot = this.pot - amount;
        this.bet = this.bet + amount;
        this.updateAmounts();
        // $('#deal-button').removeClass('disabled');
    } else {
        outOfChips();
    }
};

Bets.prototype.winner = function(){
    this.pot += this.bet * 2;
    this.bet = 0;
    this.updateAmounts();
}

Bets.prototype.loser = function(){
    this.bet = 0;
    this.updateAmounts();
}


function outOfChips() {
    swal({
        title: "You don't have enough poker chips!",
        text: "Sorry!",
      });
}
