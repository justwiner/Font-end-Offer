import React, {Component} from 'react'
import './index.scss'

class Section extends Component {
  static defaultProps = {
    type: true
  }
  render () {
    const { fontStyle, img, bgStyle, type, title, font, info, ads } = this.props
    return (
      <section className="home-content-section" style={bgStyle}>
        {
          type === true ? (
            <div>
              <div className="home-content-section-content home-content-section-content">
                <article>
                  <font style={fontStyle}>{title}</font>{font}
                </article>
                <p>{info}</p>
                <ul>
                  {
                    ads.map((item, index) => {
                      return (
                        <li key= {index}>{item}</li>
                      )
                    })
                  }
                </ul>
              </div>
              <img className="home-content-section-img  home-content-section-right" src={img} alt="宣传图"/>
            </div>
            ) : (
            <div>
              <img className="home-content-section-img  home-content-section-right" src={img} alt="宣传图"/>
              <div className="home-content-section-content home-content-section-content">
                <article>
                  <font style={fontStyle}>{title}</font>{font}
                </article>
                <p>{info}</p>
                <ul>
                  {
                    ads.map((item, index) => {
                      return (
                        <li key= {index}>{item}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            )
        }

        
      </section>
    )
  }
}

export default Section