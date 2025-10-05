// Smooth scroll behavior for navigation
document.addEventListener('DOMContentLoaded', function() {
  
  // Add scroll shadow to header
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Stagger fade-in animations for info items
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeInUp 0.6s ease-out ${entry.target.dataset.delay || 0}s both`;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe info items, feature cards, and security items
  document.querySelectorAll('.info-item, .feature-card, .security-item, .faq-item').forEach((item, index) => {
    item.dataset.delay = index * 0.1;
    item.style.opacity = '0';
    observer.observe(item);
  });
});
