// Language switcher
const i18n = {
  currentLang: localStorage.getItem('language') || 'en',
  translations: {},

  async init() {
    await this.loadLanguage(this.currentLang);
    this.updateLanguageSelector();
    this.attachEventListeners();
  },

  async loadLanguage(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      this.translations = await response.json();
      this.currentLang = lang;
      localStorage.setItem('language', lang);
      this.updatePage();
      document.documentElement.lang = lang === 'zh-hant' || lang === 'zh-hans' ? 'zh' : lang;
    } catch (error) {
      console.error('Failed to load language:', error);
    }
  },

  updatePage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const keys = element.getAttribute('data-i18n').split('.');
      let value = this.translations;
      
      for (const key of keys) {
        value = value?.[key];
      }
      
      if (value) {
        element.textContent = value;
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const keys = element.getAttribute('data-i18n-placeholder').split('.');
      let value = this.translations;
      
      for (const key of keys) {
        value = value?.[key];
      }
      
      if (value) {
        element.placeholder = value;
      }
    });
  },

  updateLanguageSelector() {
    const selector = document.querySelector('.language-selector');
    if (!selector) return;

    const langNames = {
      'en': 'EN',
      'zh-hant': '繁',
      'zh-hans': '简'
    };

    selector.querySelector('.current-lang').textContent = langNames[this.currentLang];
  },

  attachEventListeners() {
    document.querySelectorAll('[data-lang]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = button.getAttribute('data-lang');
        this.loadLanguage(lang);
        
        // Close dropdown
        const dropdown = button.closest('.language-dropdown');
        if (dropdown) {
          dropdown.classList.remove('show');
        }
      });
    });

    // Toggle dropdown
    const selector = document.querySelector('.language-selector');
    if (selector) {
      selector.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = selector.querySelector('.language-dropdown');
        dropdown.classList.toggle('show');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        const dropdown = selector.querySelector('.language-dropdown');
        if (dropdown) {
          dropdown.classList.remove('show');
        }
      });
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  i18n.init();
});
