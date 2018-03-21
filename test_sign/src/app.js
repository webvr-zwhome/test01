navigator.getUserMedia({video:true,audio:true}, gotMedia, function(){});

function gotMedia(stream){
    var P = new SimplePeer({initiator:true,stream:stream})

    P.on('error', function (err) { console.log('error', err) })

    P.on('signal',function(data){
        console.log(data);
        console.log('signal',JSON.stringify(data))
        document.querySelector('#outgoing').textContent = JSON.stringify(data)
    })

    document.querySelector('form').addEventListener('submit',function(ev){
        ev.preventDefault()
        P.signal(JSON.parse(document.querySelector('#incoming').value))
    })

    P.on('connect',function(){
        console.log('CONNECTED')
    })

    P.on('stream',function(stream){
        var video = document.createElement('video')
        //video.src = window.URL.createObjectURL(stream)
        video.srcObject = stream;   
        document.body.appendChild(video)
        video.play()
    })
}