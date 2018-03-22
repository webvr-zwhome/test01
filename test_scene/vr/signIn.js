// navigator.mediaDevices.getUserMedia({audio:true}, gotMedia, function(){});

navigator.mediaDevices.getUserMedia({audio: true})
                            .then(
                                function(stream){
                                    gotMedia(stream);
                                })
                            .catch(
                                function(err){
                                    console.log(err);
                                }
                            );
function gotMedia(stream){
    // let Pear = new SimplePeer({initiator:location.hash === "#host",stream:stream});
    let Pear = new SimplePeer({
        initiator:location.hash === "#host",
        reconnectTimer: 100,
        iceTransportPolicy: 'relay',
        trickle: false,
        stream: stream
    });
    
    let signalList = [];

    // if(Pear.WEBRTC_SUPPORT){
            
        Pear.on('error', function (err) { console.log('error', err) })

        Pear.on('signal',function(data){
            signalList.push(JSON.stringify(data));
            // console.log(data);
            console.log('signal',JSON.stringify(data));
            document.querySelector('#outgoing').textContent = signalList[0];
        })

        document.querySelector('form').addEventListener('submit',function(ev){
            ev.preventDefault();
            Pear.signal(JSON.parse(document.querySelector('#incoming').value));
            console.log('submit');
        })

        Pear.on('connect',function(){
            console.log('CONNECTED');
            document.querySelector(".front").hidden = true;
            //load react-vr
            // Initialize the React VR application
            ReactVR.init(
                // When you're ready to deploy your app, update this line to point to
                // your compiled index.bundle.js
                '../index.vr.bundle?platform=vr&dev=true',
                // Attach it to the body tag
                document.body
            );

        })

        Pear.on('stream',function(stream){
            var video = document.createElement('video');
            //video.src = window.URL.createObjectURL(stream)
            video.srcObject = stream;   
            document.body.appendChild(video);
            video.play();
        })
    // }else{
    //     alert("not support webrtc!!!")
    // }

}
