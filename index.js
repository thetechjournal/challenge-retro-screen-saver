const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = []
let hue = 0;

window.addEventListener('resize', function(){
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
})

class Particle {
   constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 15 + 1
      this.speedX = Math.random() * 3 - 1.5
      this.speedY = Math.random() * 3 - 1.5
      this.color = 'hsl(' + hue + ', 100%, 50%)';
   }

   update() {
      this.x += this.speedX
      this.y += this.speedY
      if(this.size > 0.2) this.size -= 0.1
   }
   draw() {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = 'white';
      ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill()
   }
}

//Loop through the particleArray & draw the particles
const handleParticles = () => {
   for(let i=0; i<particleArray.length; i++) {
      particleArray[i].update()
      particleArray[i].draw()
      
      for(let j=i; j<particleArray.length; j++) {
         //Using pythagorean theorem to measure the distance between 2 particles: 
         const dx = particleArray[i].x - particleArray[j].x
         const dy = particleArray[i].y - particleArray[j].y
         const distance = Math.sqrt(dx*dx + dy*dy);
         if(distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particleArray[i].color;
            ctx.lineWidth = 0.3;
            ctx.moveTo(particleArray[i].x, particleArray[i].y);
            ctx.lineTo(particleArray[j].x, particleArray[j].y);
            ctx.stroke();
         }
      }

      if(particleArray[i].size <= 0.3) {
         particleArray.splice(i, 1); //remove single particle with size less or equal to 0.3
         i--; //As we are removing an element from the array so we need to decrease index size by 1
      }
   }
}

const animate = () => {
   particleArray.push(new Particle());
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   handleParticles();
   hue+=5;
   requestAnimationFrame(animate);
}

animate();


