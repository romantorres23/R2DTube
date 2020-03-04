class MediaPlayer {
    constructor(el){
        // const that = this;
        this.el = document.querySelector(el);
        this.allVids = this.el.querySelectorAll('li');
        this.currentVideo = this.el.querySelector('video');
        this.currentTitle = this.el.querySelector('.current_title');
        this.currentDescription = this.el.querySelector('.current_description');
        this.current = 0;
        
        //***Initial Video Settings*/
        this.allVids[this.current].classList.add("current");
        this.currentVideo.src = this.allVids[this.current].querySelector('img').dataset['url'];
        this.currentTitle.innerHTML = this.allVids[this.current].querySelector('h3').innerHTML;
        this.currentDescription.innerHTML = this.allVids[this.current].querySelector('p').innerHTML;

        ///***Autoplay */
        this.currentVideo.addEventListener("canplay", () => {
            this.currentVideo.play();
        });

        ///***Auto Play Next */
        this.currentVideo.addEventListener("ended", () => {
            this.nextVideo();
        });

        ///***Select Video from Playlist */
        for (let i = 0; i < this.allVids.length ; i++) {
            this.allVids[i].addEventListener("click", () =>{
                this.goto(i);
            });
        };
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
        this.currentVideo.src = this.allVids[this.current].querySelector('img').dataset['url'];
        this.currentTitle.innerHTML = this.allVids[this.current].querySelector('h3').innerHTML;
        this.currentDescription.innerHTML = this.allVids[this.current].querySelector('p').innerHTML;
    }

}

let mp = new MediaPlayer(".mediacontainer");