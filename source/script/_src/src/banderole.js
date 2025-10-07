import Base from './base'
import { fromEvent } from 'rxjs'
import { throttleTime, map } from 'rxjs/operators'

export default class Banderole extends Base {
  constructor (config) {
    super(config)
  }

  pushHeader() {
    super.pushHeader()
    if (this.theme.scheme !== 'banderole') return
    
    const $header = $('#header')
    fromEvent(window, 'wheel').pipe(
      throttleTime(500),
      map(({ deltaY }) => deltaY > 0)
    ).subscribe(v => $header.toggleClass('header-hide', v))
    
    this.scrollArr.push(sct => {
      $header.toggleClass('header-scroll', sct > 50)
    })
  }

  back2top() {
    const $backtop = $('#backtop')
    this.scrollArr.push((sct) => {
      if (sct > 110) {
        $backtop.addClass('clarity').removeClass('melt')
      } else {
        $backtop.addClass('melt').removeClass('clarity')
      }
      this.updateRound(sct)
    })
    super.back2top()
  }
}
