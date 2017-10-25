$(document).ready(function () {
   // displayMessage("U74QP7MJ5:T757VR199");
    users();
    });

function users(){
    const req = new XMLHttpRequest();
req.onreadystatechange = function(event) {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            users = JSON.parse(this.responseText);
        } else {
            console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
        }
        var $table = $( "<menu class='list-friends'></menu>" );
        var arrayId = [];
        for ( var i = 0; i < users.length; i++ ) {
            var user = users[i];
            $id = user.Id;
            
            var $line = $( "<div class='info'></div>" );
            $line.append( $( "<div class='user' onclick='displayMessage(this.id)' ></div>" ).html( user.Pseudo ) );
            $line.append( $( "<div class='status on'></div>" ).html( user.EnvironnementName ) );
            
            $table.append( $line );
            
            arrayId.push($id);
            }
            $table.appendTo( ".left-menu" ); 
        
            var i=0;
                $('.user').each(function(){
                    var newID=arrayId[i];
                    $(this).attr('id',newID);
                    $(this).val(i);
                    i++;
                });
    }
};

req.open('GET', 'http://backbotepsi.azurewebsites.net/api/Users', true);
req.send(null);
};

function displayMessage(id){
    const req = new XMLHttpRequest();
    $('.chat').empty();

req.onreadystatechange = function(event) {
    // XMLHttpRequest.DONE === 4
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            messages = JSON.parse(this.responseText);
        } else {
            console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
        }
        var $table = $( "<ul class='messages'>" );

        for ( var i = 0; i < messages.length; i++ ) {
            var message = messages[i];
            $idUser = message.UserId
            if(id === $idUser){
                var $line = $( "<li class='i'></li>" );
                $line.append( $( "<div class='head'><span class='time'></span></div>" ).html( message.Date ) );
                $bot = message.BotMessage;
                if($bot == true){
                    $line.append( $( "<div class='messageBot'></div>" ).html( message.Content ) );
                }
                else{
                    $line.append( $( "<div class='messageHuman'></div>" ).html( message.Content ) );
                }

                $table.append( $line );
                $table.appendTo( ".chat" );
            }
        
            
        
        }
    }
};

req.open('GET', 'http://backbotepsi.azurewebsites.net/api/Messages', true);
req.send(null);
};



