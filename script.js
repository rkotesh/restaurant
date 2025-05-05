
// Menu data
const menuData = {
    starters: [
      {
        name: "Bruschetta",
        description: "Grilled bread rubbed with garlic and topped with olive oil, salt, tomato, and herbs.",
        price: "$9.95",
        tags: ["vegetarian"]
      },
      {
        name: "Arancini",
        description: "Stuffed rice balls coated with bread crumbs and deep fried.",
        price: "$11.95",
        tags: ["popular"]
      },
      {
        name: "Calamari Fritti",
        description: "Crispy fried squid served with lemon and marinara sauce.",
        price: "$13.95",
        tags: []
      },
      {
        name: "Antipasto Platter",
        description: "Selection of fine Italian cheeses and cured meats with olives and artichokes.",
        price: "$18.95",
        tags: ["sharing"]
      }
    ],
    mains: [
      {
        name: "Risotto ai Funghi",
        description: "Creamy arborio rice with wild mushrooms, white wine and parmesan.",
        price: "$22.95",
        tags: ["vegetarian"]
      },
      {
        name: "Bistecca alla Fiorentina",
        description: "Traditional Tuscan grilled T-bone steak with rosemary and garlic.",
        price: "$34.95",
        tags: ["chef's special"]
      },
      {
        name: "Ossobuco alla Milanese",
        description: "Braised veal shanks with vegetables, white wine, and broth.",
        price: "$29.95",
        tags: ["popular"]
      },
      {
        name: "Spaghetti alle Vongole",
        description: "Spaghetti with clams in white wine sauce with garlic and parsley.",
        price: "$24.95",
        tags: []
      }
    ],
    desserts: [
      {
        name: "Tiramisu",
        description: "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.",
        price: "$9.95",
        tags: ["popular"]
      },
      {
        name: "Panna Cotta",
        description: "Silky vanilla cream with seasonal berry compote.",
        price: "$8.95",
        tags: []
      },
      {
        name: "Cannoli",
        description: "Crisp pastry tubes filled with sweet ricotta cream and chocolate chips.",
        price: "$7.95",
        tags: []
      },
      {
        name: "Affogato",
        description: "Vanilla gelato 'drowned' with a shot of hot espresso.",
        price: "$6.95",
        tags: ["vegetarian"]
      }
    ],
    drinks: [
      {
        name: "Italian Wines",
        description: "Selection of premium red and white wines from Italy's finest vineyards.",
        price: "from $12.95",
        tags: []
      },
      {
        name: "Aperol Spritz",
        description: "Refreshing cocktail made with Aperol, prosecco, and soda water.",
        price: "$10.95",
        tags: ["popular"]
      },
      {
        name: "Negroni",
        description: "Classic cocktail made with gin, vermouth rosso, and Campari.",
        price: "$12.95",
        tags: []
      },
      {
        name: "Espresso",
        description: "Rich, full-bodied Italian coffee served in a small cup.",
        price: "$3.95",
        tags: []
      }
    ]
  };
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.add('active');
    });
    
    closeMenuBtn.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
    
    // Close mobile menu when clicking on a mobile nav link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });
    
    // Header background change on scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.remove('transparent');
        header.classList.add('scrolled');
      } else {
        header.classList.add('transparent');
        header.classList.remove('scrolled');
      }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        // Skip for links that don't point to an ID (like "#")
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Adjust for header height
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Menu tabs functionality
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelector('.menu-items');
    
    // Load default menu category (starters)
    loadMenuItems('starters');
    
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get category from data attribute
        const category = tab.getAttribute('data-category');
        
        // Load menu items for the selected category
        loadMenuItems(category);
      });
    });
    
    // Function to load menu items based on category
    function loadMenuItems(category) {
      // Clear current menu items
      menuItems.innerHTML = '';
      
      // Get menu items for the selected category
      const items = menuData[category];
      
      // Create HTML for each menu item
      items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        
        let tagsHTML = '';
        if (item.tags.length > 0) {
          tagsHTML = `
            <div class="menu-item-tags">
              ${item.tags.map(tag => `<span class="menu-tag">${tag}</span>`).join('')}
            </div>
          `;
        }
        
        menuItem.innerHTML = `
          <div class="menu-item-header">
            <h4 class="menu-item-name">${item.name}</h4>
            <p class="menu-item-price">${item.price}</p>
          </div>
          <p class="menu-item-description">${item.description}</p>
          ${tagsHTML}
        `;
        
        menuItems.appendChild(menuItem);
      });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form elements
        const nameInput = contactForm.querySelector('input[placeholder="Your Name"]');
        const emailInput = contactForm.querySelector('input[placeholder="Your Email"]');
        const subjectInput = contactForm.querySelector('input[placeholder="Subject"]');
        const messageInput = contactForm.querySelector('textarea');
        
        // Simple validation
        if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
          alert('Please fill in all fields');
          return;
        }
        
        // You would normally send the form data to a server here
        // For demo purposes, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
      });
    }
    
    // Set current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear().toString();
    }
  });