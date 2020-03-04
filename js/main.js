class MediaPlayer {
    constructor(el){
        this.el = document.querySelector(el);
        ///***Fetching json */
        let videoContent = "js/vidcontent.json";
        

        fetch(videoContent)
            .then(response => response.json())
            .then(videoContentData => {
                this.data = videoContentData;
                ///***Inserts JSON info into html */
                this.buildMarkup();

                ///***Variables */
                this.allVids = this.el.querySelectorAll('li');
                this.currentVideo = this.el.querySelector('video');
                this.currentTitle = this.el.querySelector('.current_title');
                this.currentDescription = this.el.querySelector('.current_description');
                this.current = 0;

                
                let title = this.data.vidcontent[0].title;
                let description = this.data.vidcontent[0].description;
                ///***Initial video settings */
                this.allVids[this.current].classList.add("current");
                this.currentVideo.src = this.data.vidcontent[0].url;
                this.currentTitle.innerHTML = `Video Title: ${title}`;
                this.currentDescription.innerHTML = `<h4>Description:</h4><br>${description}`;

                ///***Call to functions for choosing vid from playlist and autoplay */
                this.setEventListener();
                this.autoPlay();
        })
            .catch(err => console.log(err));
    }

    buildMarkup() {
        let buffer = [];

        for (let i = 0; i < this.data.vidcontent.length; i++) {
            console.dir(this.data.vidcontent[i]);
            let image = this.data.vidcontent[i].image;
            let title = this.data.vidcontent[i].title;
            let description = this.data.vidcontent[i].description;
            buffer.push(    
            `<li>
                <img src="${image}"/>
                <div>
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </li>`)
        }
        this.el.querySelector('aside').innerHTML = '<ul>' + buffer.join('') + '</ul>';
    }

    setEventListener() {
        /***Select Video from Playlist */
        for (let i = 0; i < this.allVids.length ; i++) {
            this.allVids[i].addEventListener("click", () =>{
                this.goto(i);
                window.scrollTo(top);
            });
        };
    }

    autoPlay() {
        /***Auto Play Next */
        this.currentVideo.addEventListener("ended", () => {
            this.nextVideo();
        });
    }

    nextVideo() {
        var i = this.current + 1;

        ///***Loops back to one at the last slide */
        if (i < this.allVids.length) {
            this.goto(i); 
        } else { 
            this.goto(0);
        }
    }

    goto(i) {
        this.current = i;
        console.log(this.current);
        let currentEl = this.el.querySelector(".current");

        ///**Remove active classes */
        if (currentEl !== null) {
            currentEl.classList.remove("current");
        }
   
        ///***Make active classes */    
        this.allVids[this.current].classList.add("current");
        this.currentVideo.src = this.data.vidcontent[i].url;
        this.currentTitle.innerHTML = this.data.vidcontent[i].title;
        this.currentDescription.innerHTML = this.data.vidcontent[i].description;
        ///***Autoplay Video */
        this.currentVideo.addEventListener("canplay", () => {
            this.currentVideo.play();
        });
    }

}

let mp = new MediaPlayer(".mediacontainer");