//Basic Interactivity Script
document.getElementById('contactForm').addEventListener('submit', function(e) 
{
  e.preventDefault();
  alert('Thank you! Your message has been sent.');
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// Toggle mobile navigation menu
document.getElementById('menuToggle').addEventListener('click', function() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('active');
});
// Close mobile navigation when a link is clicked     
document.querySelectorAll('#mobileNav a').forEach(link => {
  link.addEventListener('click', function() {
    const nav = document.getElementById('mobileNav');
    nav.classList.remove('active');
  });
});
// Change header style on scroll
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
// Initialize tooltips    
document.querySelectorAll('[data-tooltip]').forEach(el => {
  el.addEventListener('mouseover', function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerText = this.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    const rect = this.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
  });
  el.addEventListener('mouseout', function() {
    document.querySelector('.tooltip').remove();
  });
});
// Form validation
document.getElementById('contactForm').addEventListener('input', function() {  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const submitButton = document.getElementById('submitBtn');
  
  if (name && email && message) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}
);
// Image gallery lightbox effect  
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', function() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    const imgClone = this.cloneNode();
    lightbox.appendChild(imgClone);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', function() {
      document.body.removeChild(lightbox);
    });
  });
});
// Smooth scroll to top button
document.getElementById('scrollToTop').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
// Initialize carousel for testimonials 
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide'); 
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = (i === index) ? 'block' : 'none';
  });
}
document.getElementById('nextSlide').addEventListener('click', function() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});
document.getElementById('prevSlide').addEventListener('click', function() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});
showSlide(currentSlide); // Initial call to display the first slide
// Initialize date picker for booking form
document.querySelectorAll('.date-picker').forEach(input => {
  input.addEventListener('focus', function() {
    this.type = 'date';
  });
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.type = 'text'; // Revert to text if no date is selected
    }
  });
}
);
// Initialize accordion for FAQs
document.querySelectorAll('.accordion').forEach(accordion => {
  accordion.addEventListener('click', function() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});
// Initialize progress bar for skills section
document.querySelectorAll('.progress-bar').forEach(bar => {
  const value = bar.getAttribute('data-value');
  bar.style.width = value + '%';
  bar.querySelector('.progress-value').innerText = value + '%';
});
// Initialize tabs for portfolio section
document.querySelectorAll('.tab').forEach(tab => {

  tab.addEventListener('click', function() {
    const contentId = this.getAttribute('data-content');
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });
    document.getElementById(contentId).style.display = 'block';
    
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
    });
    this.classList.add('active');
  });
}
);
// Initialize modal for image gallery
document.querySelectorAll('.gallery img').forEach(img => {  
  img.addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    const modalImg = this.cloneNode();
    modalContent.appendChild(modalImg);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
  });
}
);
// Initialize dropdown menus
document.querySelectorAll('.dropdown').forEach(dropdown => {  
  dropdown.addEventListener('click', function() {
    this.classList.toggle('active');
    const menu = this.querySelector('.dropdown-menu');
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  });
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      dropdown.querySelector('.dropdown-menu').style.display = 'none';
    }
  });
}
);
// Initialize search functionality
document.getElementById('searchInput').addEventListener('input', function() { 
  const query = this.value.toLowerCase();
  const items = document.querySelectorAll('.search-item');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}
);
// Initialize lazy loading for images
document.querySelectorAll('img.lazy').forEach(img => {    
  img.src = img.dataset.src;
  img.onload = function() {
    img.classList.remove('lazy');
  };
}
);
// Initialize infinite scroll for blog section
let page = 1;
const loadMorePosts = () => {
  fetch(`/api/posts?page=${page}`)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('blogPosts');
      data.posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.excerpt}</p>`;
        container.appendChild(postElement);
      });
      if (data.hasMore) {
        page++;
      } else {
        document.getElementById('loadMore').style.display = 'none';
      }
    });
}
document.getElementById('loadMore').addEventListener('click', loadMorePosts);
// Initial load
loadMorePosts();
// Initialize form submission with AJAX
document.getElementById('ajaxForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  
  fetch('/api/submit', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Form submitted successfully!');
      this.reset();
    } else {
      alert('Error submitting form: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while submitting the form.');
  });
});
// Initialize real-time character counter for text areas
document.querySelectorAll('textarea').forEach(textarea => {
  const counter = document.createElement('div');
  counter.className = 'char-counter';
  textarea.parentNode.insertBefore(counter, textarea.nextSibling);
  
  textarea.addEventListener('input', function() {
    const remaining = this.getAttribute('maxlength') - this.value.length;
    counter.innerText = `${remaining} characters remaining`;
  });
  
  // Initialize with current count
  textarea.dispatchEvent(new Event('input'));
});
// Initialize custom select dropdowns
document.querySelectorAll('.custom-select').forEach(select => {
  const selected = document.createElement('div');
  selected.className = 'select-selected';
  selected.innerText = select.options[select.selectedIndex].text;
  select.parentNode.insertBefore(selected, select);
  
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'select-items select-hide';
  
  Array.from(select.options).forEach((option, index) => {
    if (index > 0) { // Skip the first option
      const optionDiv = document.createElement('div');
      optionDiv.innerText = option.text;
      optionDiv.addEventListener('click', function() {
        selected.innerText = this.innerText;
        select.selectedIndex = index;
        optionsContainer.querySelectorAll('.same-as-selected').forEach(el => {
          el.classList.remove('same-as-selected');
        });
        this.classList.add('same-as-selected');
      });
      optionsContainer.appendChild(optionDiv);
    }
  });
  
  select.parentNode.appendChild(optionsContainer);
  
  selected.addEventListener('click', function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
  
  document.addEventListener('click', closeAllSelect);
}
);
function closeAllSelect(elmnt) {
  const items = document.querySelectorAll('.select-items');
  const selected = document.querySelectorAll('.select-selected');
  
  items.forEach(item => {
    if (elmnt !== item.previousSibling) {
      item.classList.add('select-hide');
    }
  });
  
  selected.forEach(sel => {
    if (elmnt !== sel) {
      sel.classList.remove('select-arrow-active');
    }
  });
}
// Initialize countdown timer
const countdownEnd = new Date('2024-12-31T23:59:59Z').getTime();
const countdownElement = document.getElementById('countdown');
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownEnd - now;
  
  if (distance < 0) {
    countdownElement.innerText = 'Countdown ended!';
    clearInterval(countdownInterval);
    return;
  }
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
const countdownInterval = setInterval(updateCountdown, 1000);
// Initial call to set the countdown immediately
updateCountdown();
// Initialize parallax effect
document.querySelectorAll('.parallax').forEach(el => {
  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    el.style.backgroundPositionY = `${scrolled * 0.5}px`;
  });
});
// Initialize sticky footer
const footer = document.getElementById('footer');
window.addEventListener('scroll', function() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    footer.classList.add('sticky');
  } else {
    footer.classList.remove('sticky');
  }
});
// Initialize responsive tables
document.querySelectorAll('table').forEach(table => {
  const wrapper = document.createElement('div');
  wrapper.className = 'table-responsive';
  table.parentNode.insertBefore(wrapper, table);
  wrapper.appendChild(table);
  
  // Add a class to make the
  // table scrollable on small screens
  table.classList.add('responsive-table');
  table.addEventListener('click', function() {
    this.classList.toggle('expanded');
  });
  // Add a click event to toggle the table expansion
  table.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', function() {
      const rows = this.parentNode.parentNode.querySelectorAll('tr');
      rows.forEach(row => {
        row.classList.toggle('expanded');
      });
    });
  }
  );
});
// Initialize form reset functionality
document.querySelectorAll('form').forEach(form => {
  const resetButton = document.createElement('button');
  resetButton.type = 'reset';
  resetButton.innerText = 'Reset Form';
  resetButton.className = 'reset-btn';
  
  form.appendChild(resetButton);
  
  resetButton.addEventListener('click', function() {
    form.reset();
    alert('Form has been reset.');
  });
}
);
// Initialize custom scrollbar
document.querySelectorAll('.custom-scrollbar').forEach(el => {
  el.style.overflowY = 'scroll';
  el.style.scrollbarWidth = 'thin'; // For Firefox
  el.style.msOverflowStyle = 'none'; // For Internet Explorer and Edge
  
  // Custom scrollbar for WebKit browsers
  el.style.setProperty('--webkit-scrollbar-width', '8px');
  el.style.setProperty('--webkit-scrollbar-thumb-color', '#888');
  el.style.setProperty('--webkit-scrollbar-track-color', '#f1f1f1');
  
  el.addEventListener('scroll', function() {
    const thumb = document.createElement('div');
    thumb.className = 'custom-scroll-thumb';
    thumb.style.height = `${(el.clientHeight / el.scrollHeight) * 100}%`;
    thumb.style.top = `${(el.scrollTop / el.scrollHeight) * 100}%`;
    this.appendChild(thumb);
    
    setTimeout(() => {
      this.removeChild(thumb);
    }, 1000); // Remove thumb after a short delay
  });
});
// Initialize file upload preview
document.querySelectorAll('input[type="file"]').forEach(input => {
  input.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const preview = document.createElement('img');
        preview.src = e.target.result;
        preview.className = 'file-preview';
        
        // Remove existing preview if any
        const existingPreview = input.nextElementSibling;
        if (existingPreview && existingPreview.classList.contains('file-preview')) {
          existingPreview.remove();
        }
        
        input.parentNode.insertBefore(preview, input.nextSibling);
      };
      reader.readAsDataURL(file);
    }
  });
}
);
// Initialize color picker
document.querySelectorAll('.color-picker').forEach(picker => {
  picker.addEventListener('input', function() {
    const color = this.value;
    this.style.backgroundColor = color;
    const preview = document.getElementById('colorPreview');
    if (preview) {
      preview.style.backgroundColor = color;
    }
  });
  
  // Initialize with current value
  picker.dispatchEvent(new Event('input'));
});
// Initialize audio player
document.querySelectorAll('.audio-player').forEach(player => {
  const audio = player.querySelector('audio');
  const playButton = player.querySelector('.play-btn');
  const pauseButton = player.querySelector('.pause-btn');
  
  playButton.addEventListener('click', function() {
    audio.play();
    this.style.display = 'none';
    pauseButton.style.display = 'inline-block';
  });
  
  pauseButton.addEventListener('click', function() {
    audio.pause();
    this.style.display = 'none';
    playButton.style.display = 'inline-block';
  });
  
  audio.addEventListener('ended', function() {
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
  });
}
);
// Initialize video player
document.querySelectorAll('.video-player').forEach(player => {
  const video = player.querySelector('video');
  const playButton = player.querySelector('.play-btn');
  const pauseButton = player.querySelector('.pause-btn');
  
  playButton.addEventListener('click', function() {
    video.play();
    this.style.display = 'none';
    pauseButton.style.display = 'inline-block';
  });
  
  pauseButton.addEventListener('click', function() {
    video.pause();
    this.style.display = 'none';
    playButton.style.display = 'inline-block';
  });
  
  video.addEventListener('ended', function() {
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
  });
}
);
// Initialize lightbox for video
document.querySelectorAll('.video-lightbox').forEach(video => {
  video.addEventListener('click', function() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    const videoClone = this.cloneNode(true);
    lightbox.appendChild(videoClone);
    document.body.appendChild(lightbox);
    
    videoClone.play();
    
    lightbox.addEventListener('click', function() {
      videoClone.pause();
      document.body.removeChild(lightbox);
    });
  });
}
);
// Initialize notification system
document.getElementById('notifyBtn').addEventListener('click', function() {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = 'This is a notification message!';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500); // Wait for fade-out animation
  }, 3000); // Show for 3 seconds
}
);
// Initialize custom checkbox
document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
  const input = checkbox.querySelector('input[type="checkbox"]');
  const label = checkbox.querySelector('label');
  
  label.addEventListener('click', function() {
    input.checked = !input.checked;
    checkbox.classList.toggle('checked', input.checked);
  });
  
  // Initialize with current state
  if (input.checked) {
    checkbox.classList.add('checked');
  }
}
);
// Initialize custom radio buttons
document.querySelectorAll('.custom-radio').forEach(radio => {
  const input = radio.querySelector('input[type="radio"]');
  const label = radio.querySelector('label');
  
  label.addEventListener('click', function() {
    const name = input.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
      r.checked = false;
      r.parentNode.classList.remove('checked');
    });
    input.checked = true;
    radio.classList.add('checked');
  });
  
  // Initialize with current state
  if (input.checked) {
    radio.classList.add('checked');
  }
}
);
// Initialize custom range slider
document.querySelectorAll('.custom-range').forEach(slider => {
  const input = slider.querySelector('input[type="range"]');
  const output = slider.querySelector('.range-value');
  
  input.addEventListener('input', function() {
    output.innerText = this.value;
    slider.style.setProperty('--value', this.value);
  });
  
  // Initialize with current value
  input.dispatchEvent(new Event('input'));
}
);
// Initialize custom tooltip
document.querySelectorAll('.custom-tooltip').forEach(el => {
  el.addEventListener('mouseover', function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip-content';
    tooltip.innerText = this.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
    
    this._tooltip = tooltip; // Store reference for later removal
  });
  
  el.addEventListener('mouseout', function() {
    if (this._tooltip) {
      document.body.removeChild(this._tooltip);
      this._tooltip = null;
    }
  });
}
);
// Initialize custom modal
document.querySelectorAll('.custom-modal-trigger').forEach(trigger => {
  trigger.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.querySelector('.close').addEventListener('click', function() {
        modal.classList.remove('active');
      });
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
        }
      });
    }
  });
});
// Initialize custom dropdown
document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
  const selected = dropdown.querySelector('.dropdown-selected');
  const options = dropdown.querySelector('.dropdown-options');
  
  selected.addEventListener('click', function() {
    options.classList.toggle('active');
  });
  
  options.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', function() {
      selected.innerText = this.innerText;
      options.classList.remove('active');
    });
  });
  
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      options.classList.remove('active');
    }
  });
}
);
// Initialize custom pagination
document.querySelectorAll('.custom-pagination').forEach(pagination => {
  const pages = pagination.querySelectorAll('.page');
  
  pages.forEach((page, index) => {
    page.addEventListener('click', function() {
      pages.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      // Load content for the selected page
      loadPageContent(index + 1);
    });
  });
  
  function loadPageContent(pageNumber) {
    // Simulate loading content for the page
    console.log(`Loading content for page ${pageNumber}`);
  }
}
);
// Initialize custom accordion
document.querySelectorAll('.custom-accordion').forEach(accordion => {
  const headers = accordion.querySelectorAll('.accordion-header');
  
  headers.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      content.classList.toggle('active');
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}
);
// Initialize custom tabs
document.querySelectorAll('.custom-tabs').forEach(tabs => {
  const tabHeaders = tabs.querySelectorAll('.tab-header');
  
  tabHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const contentId = this.getAttribute('data-content');
      tabs.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
      });
      document.getElementById(contentId).style.display = 'block';
      
      tabHeaders.forEach(h => h.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Initialize first tab as active
  if (tabHeaders.length > 0) {
    tabHeaders[0].click();
  }
}
);
// Initialize custom file input
document.querySelectorAll('.custom-file-input').forEach(input => {
  const label = input.querySelector('label');
  const fileInput = input.querySelector('input[type="file"]');
  
  fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
      label.innerText = this.files[0].name;
    } else {
      label.innerText = 'Choose a file';
    }
  });
  
  label.addEventListener('click', function() {
    fileInput.click();
  });
}
);
// Initialize custom date picker
document.querySelectorAll('.custom-date-picker').forEach(picker => {
  const input = picker.querySelector('input[type="date"]');
  
  input.addEventListener('focus', function() {
    this.type = 'date';
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.type = 'text'; // Revert to text if no date is selected
    }
  });
  
  // Initialize with current value
  input.dispatchEvent(new Event('focus'));
}
);
// Initialize custom time picker
document.querySelectorAll('.custom-time-picker').forEach(picker => {
  const input = picker.querySelector('input[type="time"]');
  
  input.addEventListener('focus', function() {
    this.type = 'time';
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.type = 'text'; // Revert to text if no time is selected
    }
  });
  
  // Initialize with current value
  input.dispatchEvent(new Event('focus'));
}
);    
// Initialize custom number input
document.querySelectorAll('.custom-number-input').forEach(input => {    
  const decrementButton = input.querySelector('.decrement');
  const incrementButton = input.querySelector('.increment');
  const numberInput = input.querySelector('input[type="number"]');
  
  decrementButton.addEventListener('click', function() {
    numberInput.stepDown();
  });
  
  incrementButton.addEventListener('click', function() {
    numberInput.stepUp();
  });
  
  // Initialize with current value
  numberInput.dispatchEvent(new Event('input'));
}
);
// Initialize custom select dropdown with search  
document.querySelectorAll('.custom-select-search').forEach(select => {
  const selected = document.createElement('div');
  selected.className = 'select-selected';
  selected.innerText = select.options[select.selectedIndex].text;
  select.parentNode.insertBefore(selected, select);
  
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'select-items select-hide';
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search...';
  
  optionsContainer.appendChild(searchInput);
  
  Array.from(select.options).forEach((option, index) => {
    if (index > 0) { // Skip the first option
      const optionDiv = document.createElement('div');
      optionDiv.innerText = option.text;
      optionDiv.addEventListener('click', function() {
        selected.innerText = this.innerText;
        select.selectedIndex = index;
        optionsContainer.querySelectorAll('.same-as-selected').forEach(el => {
          el.classList.remove('same-as-selected');
        });
        this.classList.add('same-as-selected');
      });
      optionsContainer.appendChild(optionDiv);
    }
  });
  
  select.parentNode.appendChild(optionsContainer);
  
  selected.addEventListener('click', function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
  
  searchInput.addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    optionsContainer.querySelectorAll('div:not(:first-child)').forEach(option => {
      if (option.innerText.toLowerCase().includes(filter)) {
        option.style.display = '';
      } else {
        option.style.display = 'none';
      }
    });
  });
  
  document.addEventListener('click', closeAllSelect);
}
);
function closeAllSelect(elmnt) {
  const items = document.querySelectorAll('.select-items');
  const selected = document.querySelectorAll('.select-selected');
  
  items.forEach(item => {
    if (elmnt !== item.previousSibling) {
      item.classList.add('select-hide');
    }
  });
  
  selected.forEach(sel => {
    if (elmnt !== sel) {
      sel.classList.remove('select-arrow-active');
    }
  });
}
// Initialize custom loading spinner
document.querySelectorAll('.custom-spinner').forEach(spinner => {
  const spinnerElement = document.createElement('div');
  spinnerElement.className = 'spinner';
  
  spinner.appendChild(spinnerElement);
  
  // Simulate loading
  setTimeout(() => {
    spinner.removeChild(spinnerElement);
  }, 3000); // Remove spinner after 3 seconds
}
);
// Initialize custom progress indicator
document.querySelectorAll('.custom-progress').forEach(progress => {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const value = progress.getAttribute('data-value');
  
  progressBar.style.width = value + '%';
  progressBar.innerText = value + '%';
  
  progress.appendChild(progressBar);
  
  // Simulate progress update
  setTimeout(() => {
    const newValue = Math.min(parseInt(value) + 20, 100);
    progressBar.style.width = newValue + '%';
    progressBar.innerText = newValue + '%';
  }, 2000); // Update after 2 seconds
}
);
// Initialize custom notification badge
document.querySelectorAll('.custom-notification-badge').forEach(badge => {
  const count = parseInt(badge.getAttribute('data-count')) || 0;
  badge.innerText = count;
  
  // Simulate notification update
  setTimeout(() => {
    const newCount = count + 1;
    badge.setAttribute('data-count', newCount);
    badge.innerText = newCount;
  }, 5000); // Update after 5 seconds
}
);
// Initialize custom tooltip with delay
document.querySelectorAll('.custom-tooltip-delay').forEach(el => {
  el.addEventListener('mouseover', function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip-content';
    tooltip.innerText = this.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
    
    this._tooltip = tooltip; // Store reference for later removal
    
    // Remove tooltip after a delay
    setTimeout(() => {
      if (this._tooltip) {
        document.body.removeChild(this._tooltip);
        this._tooltip = null;
      }
    }, 3000); // Remove after 3 seconds
  });
  
  el.addEventListener('mouseout', function() {
    if (this._tooltip) {
      document.body.removeChild(this._tooltip);
      this._tooltip = null;
    }
  });
}
);
// Initialize custom dropdown with icons
document.querySelectorAll('.custom-dropdown-icons').forEach(dropdown => {
  const selected = dropdown.querySelector('.dropdown-selected');
  const options = dropdown.querySelector('.dropdown-options');
  
  selected.addEventListener('click', function() {
    options.classList.toggle('active');
  });
  
  options.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', function() {
      selected.innerText = this.innerText;
      selected.style.backgroundImage = `url(${this.getAttribute('data-icon')})`;
      options.classList.remove('active');
    });
  });
  
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      options.classList.remove('active');
    }
  });
}
);
// Initialize custom slider with tooltips
document.querySelectorAll('.custom-slider').forEach(slider => {
  const input = slider.querySelector('input[type="range"]');
  const tooltip = document.createElement('div');
  tooltip.className = 'slider-tooltip';
  slider.appendChild(tooltip);
  
  input.addEventListener('input', function() {
    tooltip.innerText = this.value;
    const percent = (this.value - this.min) / (this.max - this.min) * 100;
    tooltip.style.left = `${percent}%`;
    slider.style.setProperty('--value', this.value);
  });
  
  // Initialize with current value
  input.dispatchEvent(new Event('input'));
}
);
// Initialize custom date range picker
document.querySelectorAll('.custom-date-range-picker').forEach(picker => {
  const startInput = picker.querySelector('input[name="start"]');
  const endInput = picker.querySelector('input[name="end"]');
  
  startInput.addEventListener('focus', function() {
    this.type = 'date';
  });
  
  endInput.addEventListener('focus', function() {
    this.type = 'date';
  });
  
  startInput.addEventListener('blur', function() {
    if (!this.value) {
      this.type = 'text'; // Revert to text if no date is selected
    }
  });
  
  endInput.addEventListener('blur', function() {
    if (!this.value) {
      this.type = 'text'; // Revert to text if no date is selected
    }
  });
  
  // Initialize with current values
  startInput.dispatchEvent(new Event('focus'));
  endInput.dispatchEvent(new Event('focus'));
}
);
// Initialize custom file upload with drag and drop
document.querySelectorAll('.custom-file-upload').forEach(upload => {
  const input = upload.querySelector('input[type="file"]');
  const dropArea = upload.querySelector('.drop-area');
  
  dropArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('drag-over');
  });
  
  dropArea.addEventListener('dragleave', function() {
    this.classList.remove('drag-over');
  });
  
  dropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      input.files = files; // Assign dropped files to input
      const fileName = files[0].name;
      dropArea.innerText = `File: ${fileName}`;
    }
  });
  
  input.addEventListener('change', function() {
    if (this.files.length > 0) {
      const fileName = this.files[0].name;
      dropArea.innerText = `File: ${fileName}`;
    } else {
      dropArea.innerText = 'Drag & drop a file or click to select';
    }
  });
}
);
// Initialize custom lightbox for images
document.querySelectorAll('.custom-lightbox').forEach(image => {
  image.addEventListener('click', function() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    const imgClone = this.cloneNode();
    imgClone.style.maxWidth = '90%';
    imgClone.style.maxHeight = '90%';
    lightbox.appendChild(imgClone);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', function() {
      document.body.removeChild(lightbox);
    });
  }); 
});