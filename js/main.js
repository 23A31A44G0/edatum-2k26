document.addEventListener('DOMContentLoaded',function(){
  // nav toggle
  var toggle=document.querySelector('.nav-toggle');
  if(toggle){
    var nav=document.querySelector('.nav');
    toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click',function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // newsletter form (client-only stub)
  var form=document.getElementById('newsletter-form');
  if(form){form.addEventListener('submit',function(e){e.preventDefault();var em=form.email.value; if(!em){alert('Please enter an email');return} form.querySelector('button').disabled=true; setTimeout(function(){alert('Thanks — you are subscribed (demo).'); form.querySelector('button').disabled=false; form.reset()},600)});
  }

  // gallery lightbox
  var grid=document.getElementById('gallery-grid');
  var light=document.getElementById('lightbox');
  if(grid && light){
    var lightImg=light.querySelector('img');
    grid.addEventListener('click',function(ev){var t=ev.target;if(t.tagName==='IMG'){lightImg.src=t.src; light.classList.remove('hidden')}});
    light.querySelector('.close').addEventListener('click',function(){light.classList.add('hidden'); light.querySelector('img').src=''});
    light.addEventListener('click',function(ev){ if(ev.target===light) { light.classList.add('hidden'); light.querySelector('img').src=''} });
  }

  // 'Know More' toggle for event details
  document.querySelectorAll('.link.know-more').forEach(function(el){
    el.addEventListener('click', function(ev){
      ev.preventDefault();
      var card = el.closest('.event-card');
      if(!card) return;
      var open = card.classList.toggle('open');
      var details = card.querySelector('.event-details');
      if(details){
        details.setAttribute('aria-hidden', open ? 'false' : 'true');
      }
      // toggle link text
      el.textContent = open ? 'Show Less' : 'Know More';
    });
  });

  // Scroll reveal animation
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all elements with scroll-reveal class
  document.querySelectorAll('.scroll-reveal').forEach(function(el) {
    revealObserver.observe(el);
  });
});
