import { fromEvent, from, zip } from 'rxjs'
import { map, switchMap, filter } from 'rxjs/operators'
import genSearch from './search'

class Base {
  constructor(config) {
    this.config = config
    this.theme = config.theme
    this.scrollArr = []
  }

  animate(selector, animation, callback) {
    const $el = $(selector)
    $el.addClass(animation)
      .one('webkitAnimationEnd AnimationEnd', function () {
        $el.removeClass(animation)
        callback && callback()
      })
  }

  init() {
    this.smoothScroll()
    this.setupPictures()
    this.showComments()
    Base.opScroll(this.scrollArr)
  }

  smoothScroll() {
    $('.toc-link').on('click', function (e) {
      e.preventDefault()
      const href = $.attr(this, 'href')
      
      // Handle URL-encoded hrefs (e.g., Chinese characters)
      try {
        // Remove the # and decode the ID
        const targetId = decodeURIComponent(href.substring(1))
        const target = document.getElementById(targetId)
        
        if (target) {
          $('html, body').animate({
            scrollTop: $(target).offset().top - 200
          })
        }
      } catch (err) {
        // Fallback to original behavior for simple hrefs
        try {
          const target = $(href)
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top - 200
            })
          }
        } catch (e) {
          console.warn('Failed to scroll to target:', href)
        }
      }
    })
  }

  setupPictures() {
    $('.post-content').each((_, postContent) => {
      $(postContent).find('img').each((_, img) => {
        const $img = $(img)
        const src = img.src
        const alt = img.alt || ''
        const className = img.className || ''
        
        $img.parent('p').css('text-align', 'center')
        
        if (this.theme.lazy) {
          $img.attr('data-src', src)
            .removeAttr('src')
            .addClass('lazyload')
        }
        
        $img.wrap(
          $('<a>')
            .attr({ href: src, 'data-title': alt, 'data-lightbox': 'group' })
            .addClass(className)
        )
      })
    })
  }

  showComments() {
    const $comments = $('#post-comments')
    const $switch = $('#com-switch')
    
    // Check if elements exist
    if (!$comments.length || !$switch.length) return
    
    // Remove old handler to prevent duplicates
    $switch.off('click.comments')
    $switch.on('click.comments', () => {
      const isHidden = $comments.css('display') === 'none'
      
      if (isHidden) {
        $comments.css('display', 'block').addClass('syuanpi fadeInDown')
        $switch.css('transform', 'rotate(180deg)')
      } else {
        $switch.addClass('syuanpi').css('transform', '')
        $comments.removeClass('fadeInDown')
        this.animate('#post-comments', 'fadeOutUp', () => {
          $comments.css('display', 'none')
        })
      }
    })
  }

  back2top() {
    const $toTop = $('.toTop')
    if (!$toTop.length) return
    
    $toTop.off('click.back2top')
    $toTop.on('click.back2top', () => {
      $('html, body').animate({ scrollTop: 0 })
    })
  }

  pushHeader() {
    const $header = $('#mobile-header')
    this.scrollArr.push(sct => {
      $header.toggleClass('header-scroll', sct > 5)
    })
  }

  updateRound(sct) {
    const scrollHeight = $(document).height() - $(window).height()
    const scrollPercent = Math.floor((sct / scrollHeight) * 100)
    $('#scrollpercent').html(scrollPercent)
  }

  showToc() {
    const $toclink = $('.toc-link')
    const $headerlink = $('.headerlink')
    
    this.scrollArr.push(sct => {
      const headerlinkTop = $headerlink.map((_, link) => $(link).offset().top).get()
      
      // Handle title link
      $('.title-link a').toggleClass('active', sct >= 0 && sct < 230)
      
      // Handle TOC links
      $toclink.each((i, link) => {
        const isLastOne = i + 1 === $toclink.length
        const currentTop = headerlinkTop[i]
        const nextTop = isLastOne ? Infinity : headerlinkTop[i + 1]
        const isActive = currentTop < sct + 210 && sct + 210 <= nextTop
        
        $(link).toggleClass('active', isActive)
      })
    })
  }

  titleStatus() {
    const title = document.title
    let timer
    
    document.addEventListener('visibilitychange', () => {
      const docHeight = $(document).height() - $(window).height()
      let sct = docHeight === 0 ? 100 : Math.floor($(window).scrollTop() / docHeight * 100)
      
      if (document.hidden) {
        clearTimeout(timer)
        document.title = `Read ${sct}% · ${title}`
      } else {
        document.title = `Welcome Back · ${title}`
        timer = setTimeout(() => {
          document.title = title
        }, 3000)
      }
    })
  }

  showReward() {
    if (!this.theme.reward) return
    
    const $wrapper = $('#reward-wrapper')
    const $btn = $('#reward-btn')
    
    // Check if elements exist
    if (!$wrapper.length || !$btn.length) return
    
    // Remove old handler to prevent duplicates
    $btn.off('click.reward')
    $btn.on('click.reward', () => {
      const isHidden = $wrapper.css('display') === 'none'
      
      if (isHidden) {
        $wrapper.css('display', 'flex')
        this.animate('#reward-btn', 'clarity')
      } else {
        this.animate('#reward-btn', 'melt', () => {
          $wrapper.hide()
        })
      }
    })
  }

  listenExit(elm, fn) {
    // Check if element exists
    if (!elm) return
    
    fromEvent(elm, 'keydown').pipe(
      filter(e => e.keyCode === 27)
    ).subscribe(() => fn())
  }

  depth(open, close) {
    const $body = $('body')
    const $inner = $('.container-inner')
    const isUnder = $body.hasClass('under')
    
    if (isUnder) {
      $body.removeClass('under')
      $inner.removeClass('under')
      close.call(this)
    } else {
      $body.addClass('under')
      $inner.addClass('under')
      open.call(this)
    }
  }

  tagcloud() {
    const $tag = $('#tags')
    const $tagcloud = $('#tagcloud')
    const $search = $('#search')
    
    const closeFrame = () => {
      $tagcloud.removeClass('shuttleIn')
      this.animate('#tagcloud', 'zoomOut', () => {
        $tagcloud.removeClass('syuanpi show')
      })
    }
    
    const switchShow = () => {
      this.depth(
        () => $tagcloud.addClass('syuanpi shuttleIn show'), 
        closeFrame
      )
    }
    
    this.listenExit($tag[0], switchShow)
    this.listenExit(document.getElementsByClassName('tagcloud-taglist'), switchShow)
    
    $tag.on('click', () => {
      if ($search.hasClass('show')) {
        $tagcloud.addClass('syuanpi shuttleIn show')
        $search.removeClass('shuttleIn')
        this.animate('#search', 'zoomOut', () => {
          $search.removeClass('syuanpi show')
        })
        return
      }
      switchShow()
    })
    
    $('#tagcloud').on('click', e => {
      e.stopPropagation()
      if (e.target.tagName === 'DIV') {
        this.depth(
          () => $tagcloud.addClass('syuanpi shuttleIn show'), 
          closeFrame
        )
      }
    })
    
    const tags$ = fromEvent(document.querySelectorAll('.tagcloud-tag button'), 'click').pipe(
      map(({ target }) => target)
    )
    const postlist$ = from(document.querySelectorAll('.tagcloud-postlist'))
    const cleanlist$ = postlist$.pipe(map(dom => dom.classList.remove('active')))
    const click$ = tags$.pipe(switchMap(() => cleanlist$))
    
    zip(click$, tags$).pipe(
      map(([_, dom]) => dom),
      switchMap(v => postlist$.pipe(
        filter(dom => dom.firstElementChild.innerHTML.trim() === v.innerHTML.trim())
      ))
    ).subscribe(v => v.classList.add('active'))
  }

  search() {
    if (!this.theme.search) return
    
    // Only load marked.js once
    if (!window.markedLoaded) {
      $('body').append(`<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>`)
      window.markedLoaded = true
    }
    
    const $searchbtn = $('#search-btn')
    const $result = $('#search-result')
    const $search = $('#search')
    const $tagcloud = $('#tagcloud')
    
    // Check if search element exists
    if (!$search.length) return
    
    const closeFrame = () => {
      $search.removeClass('shuttleIn')
      this.animate('#search', 'zoomOut', () => {
        $search.removeClass('syuanpi show')
      })
    }
    
    const switchShow = () => {
      this.depth(
        () => $search.addClass('syuanpi shuttleIn show'), 
        closeFrame
      )
    }
    
    const searchElement = document.getElementById('search')
    if (searchElement) {
      this.listenExit(searchElement, switchShow)
    }
    
    // Remove old event handlers to prevent duplicates
    $searchbtn.off('click.search')
    $searchbtn.on('click.search', () => {
      if ($tagcloud.hasClass('show')) {
        $search.addClass('syuanpi shuttleIn show')
        $tagcloud.removeClass('shuttleIn')
        this.animate('#tagcloud', 'zoomOut', () => {
          $tagcloud.removeClass('syuanpi show')
        })
        return
      }
      switchShow()
    })
    
    $('#search').off('click.search')
    $('#search').on('click.search', e => {
      e.stopPropagation()
      if (e.target.tagName === 'DIV') {
        this.depth(
          () => $search.addClass('syuanpi shuttleIn show'), 
          closeFrame
        )
      }
    })
    
    genSearch(`${this.config.baseUrl}search.xml`, 'search-input')
      .subscribe(vals => {
        const list = body => `<ul class="search-result-list syuanpi fadeInUpShort">${body}</ul>`
        const item = ({ url, title, content }) => `
          <li class="search-result-item">
            <a href="${url}"><h2>${title}</h2></a>
            <p>${content}</p>
          </li>
        `
        const output = vals.map(item)
        $result.html(list(output.join('')))
      })
  }

  headerMenu() {
    const $mobileMenu = $('.mobile-header-body')
    const $headerLine = $('.header-menu-line')
    const $mtag = $('#mobile-tags')
    const $tagcloud = $('#tagcloud')
    
    $mtag.on('click', () => {
      $mobileMenu.removeClass('show')
      $headerLine.removeClass('show')
      $tagcloud.addClass('syuanpi shuttleIn show')
    })
    
    $('#mobile-left').on('click', () => {
      this.depth(
        () => {
          $mobileMenu.addClass('show')
          $headerLine.addClass('show')
        }, 
        () => {
          $mobileMenu.removeClass('show')
          $headerLine.removeClass('show')
        }
      )
    })
  }

  navigation() {
    if (!this.theme.pjax) return
    
    const $container = $('.container-inner')
    const $header = $('.header')
    const $headerWrapper = $('.header-wrapper')
    const self = this // Capture this context
    
    // Check if Navigation API is supported
    if (window.navigation) {
      // Modern Navigation API implementation
      window.navigation.addEventListener('navigate', (event) => {
        // Only intercept same-origin navigations
        const url = new URL(event.destination.url)
        
        if (location.origin !== url.origin) return
        
        // Don't intercept if it's a download or form submission
        if (event.downloadRequest || event.formData) return
        
        // Don't intercept if it's not a traverse or push/replace navigation
        if (!event.canIntercept) return
        
        // Only intercept clicks on links within container-inner
        if (event.sourceElement && !$(event.sourceElement).closest('.container-inner').length) {
          return
        }
        
        event.intercept({
          async handler() {
            // Add exit animations
            $container.addClass('syuanpi fadeOutLeftShort')
            $headerWrapper.addClass('syuanpi fadeOutLeftShort')
            $header.addClass('melt')
            
            // Wait for animation to complete
            await new Promise(resolve => setTimeout(resolve, 300))
            
            // Fetch the new page
            const response = await fetch(url.pathname)
            const html = await response.text()
            
            // Parse the HTML
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')
            
            // Extract the container-inner content
            const newContent = doc.querySelector('.container-inner')
            
            if (newContent) {
              // Replace the content and copy classes from fetched HTML
              $container.html(newContent.innerHTML)
              $container.attr('class', newContent.className)
              
              // Remove exit animations and trigger enter animations
              $container.removeClass('fadeOutLeftShort').addClass('fadeInRightShort')
              $headerWrapper.removeClass('fadeOutLeftShort').addClass('fadeInRightShort')
              $header.removeClass('melt')
              
              // Re-initialize components that need setup on new content
              setTimeout(async () => {
                $container.removeClass('fadeInRightShort')
                $headerWrapper.removeClass('fadeInRightShort')
                
                // Clear old scroll handlers
                self.scrollArr = []
                
                // Re-run init methods for new content
                self.smoothScroll()
                self.setupPictures()
                self.showComments()
                self.showReward()
                self.showToc()
                self.pushHeader()
                
                // Re-initialize scroll handlers
                Base.opScroll(self.scrollArr)
                
                // Re-render Mermaid diagrams if available
                if (window.renderMermaids) {
                  await window.renderMermaids()
                }
                
                // Update page title
                document.title = doc.title
                
                // Scroll to top
                window.scrollTo(0, 0)
              }, 300)
            }
          }
        })
      })
    } else {
      // Fallback: Manual click interception with History API for older browsers
      console.info('Navigation API not supported, using History API fallback')
      
      // Intercept clicks on links within container-inner
      $(document).on('click', '.container-inner a', async (e) => {
        const $link = $(e.currentTarget)
        const href = $link.attr('href')
        
        // Skip external links, anchors, and special protocols
        if (!href || href.startsWith('#') || href.startsWith('javascript:') || 
            href.startsWith('mailto:') || $link.attr('target') === '_blank') {
          return
        }

        // If target is new tab, do not intercept
        if ($link.attr('target') === '_blank') return

        // If user Ctrl-clicks or middle-clicks, do not intercept
        if (e.ctrlKey || e.metaKey || e.which === 2) return
        
        try {
          const url = new URL(href, window.location.origin)
          
          // Only intercept same-origin links
          if (url.origin !== window.location.origin) return

          e.preventDefault()
          
          // Add exit animations
          $container.addClass('syuanpi fadeOutLeftShort')
          $headerWrapper.addClass('syuanpi fadeOutLeftShort')
          $header.addClass('melt')
          
          // Wait for animation to complete
          await new Promise(resolve => setTimeout(resolve, 300))
          
          // Fetch the new page
          const response = await fetch(url.href)
          const html = await response.text()
          
          // Parse the HTML
          const parser = new DOMParser()
          const doc = parser.parseFromString(html, 'text/html')
          
          // Extract the container-inner content
          const newContent = doc.querySelector('.container-inner')
          
          if (newContent) {
            // Replace the content and copy classes from fetched HTML
            $container.html(newContent.innerHTML)
            $container.attr('class', newContent.className)
            
            // Update browser history
            window.history.pushState({ path: url.href }, '', url.href)
            
            // Remove exit animations and trigger enter animations
            $container.removeClass('fadeOutLeftShort').addClass('fadeInRightShort')
            $headerWrapper.removeClass('fadeOutLeftShort').addClass('fadeInRightShort')
            $header.removeClass('melt')
            
            // Re-initialize components that need setup on new content
            setTimeout(async () => {
              $container.removeClass('fadeInRightShort')
              $headerWrapper.removeClass('fadeInRightShort')
              
              // Clear old scroll handlers
              self.scrollArr = []
              
              // Re-run init methods for new content
              self.smoothScroll()
              self.setupPictures()
              self.showComments()
              self.showReward()
              self.showToc()
              self.pushHeader()
              
              // Re-initialize scroll handlers
              Base.opScroll(self.scrollArr)
              
              // Re-render Mermaid diagrams if available
              if (window.renderMermaids) {
                await window.renderMermaids()
              }
              
              // Update page title
              document.title = doc.title
              
              // Scroll to top
              window.scrollTo(0, 0)
            }, 300)
          }
        } catch (err) {
          console.error('Navigation failed:', err)
          // Let the browser handle the navigation on error
          window.location.href = href
        }
      })
      
      // Handle back/forward buttons
      window.addEventListener('popstate', async (e) => {
        try {
          // Add exit animations
          $container.addClass('syuanpi fadeOutLeftShort')
          $headerWrapper.addClass('syuanpi fadeOutLeftShort')
          $header.addClass('melt')
          
          await new Promise(resolve => setTimeout(resolve, 300))
          
          // Fetch the page
          const response = await fetch(window.location.href)
          const html = await response.text()
          
          // Parse the HTML
          const parser = new DOMParser()
          const doc = parser.parseFromString(html, 'text/html')
          
          // Extract the container-inner content
          const newContent = doc.querySelector('.container-inner')
          
          if (newContent) {
            // Replace the content and copy classes from fetched HTML
            $container.html(newContent.innerHTML)
            $container.attr('class', newContent.className)
            
            // Remove exit animations
            $container.removeClass('fadeOutLeftShort').addClass('fadeInRightShort')
            $headerWrapper.removeClass('fadeOutLeftShort').addClass('fadeInRightShort')
            $header.removeClass('melt')
            
            setTimeout(async () => {
              $container.removeClass('fadeInRightShort')
              $headerWrapper.removeClass('fadeInRightShort')
              
              // Clear old scroll handlers
              self.scrollArr = []
              
              // Re-initialize
              self.smoothScroll()
              self.setupPictures()
              self.showComments()
              self.showReward()
              self.showToc()
              self.pushHeader()
              
              // Re-initialize scroll handlers
              Base.opScroll(self.scrollArr)
              
              // Re-render Mermaid diagrams if available
              if (window.renderMermaids) {
                await window.renderMermaids()
              }
              
              document.title = doc.title
              window.scrollTo(0, 0)
            }, 300)
          }
        } catch (err) {
          console.error('Popstate navigation failed:', err)
          window.location.reload()
        }
      })
    }
  }

  bootstarp() {
    this.showToc()
    this.back2top()
    this.titleStatus()
    this.init()
    this.pushHeader()
    this.tagcloud()
    this.search()
    this.showReward()
    this.headerMenu()
    this.navigation()
  }

  static opScroll(fns) {
    if (!fns.length) return
    
    fromEvent(window, 'scroll')
      .pipe(map(v => v.target.scrollingElement.scrollTop))
      .subscribe(scrollTop => fns.forEach(fn => fn(scrollTop)))
  }
}

export default Base
