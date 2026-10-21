import { links, programs, stories } from '../content';
import DraggableCard from './DraggableCard';

function Label({ children, color }) { return <p className={`label label--${color}`}>{children}</p>; }
function Media({ file, className = '', alt = '' }) {
  return <div className={`media media--image media--custom ${className}`}><figure className="media__figure"><img className="media__image" src={`/media/debatecraft/${file}`} alt={alt} loading="lazy" decoding="async" /></figure></div>;
}

export function Hero() {
  return <section className="section section--hero-home hero-home hero-home--white" aria-labelledby="hero-title">
    <div className="hero-home__container">
      <div className="media media--image media--custom hero-home__thumbnail"><img className="media__image" src="/media/debatecraft/Image1.jpeg" alt="DebateCraft students and a coach practicing together online" width="1600" height="878" fetchPriority="high" /></div>
      <div className="hero-home__content"><h1 className="hero-home__heading heading" id="hero-title">Clear thinking. Confident voices. Debate without limits.</h1><a className="hero-home__link-button link-button button button--filled" href={links.programs}>Explore Our Programs</a></div>
    </div>
  </section>;
}

export function Impact() {
  return <section className="grant-database-home is-in-viewport" id="impact" aria-labelledby="impact-title">
    <div className="grant-database-home__container"><div className="grant-database-home__shape" />
      <div className="grant-database-home__content"><Label color="red">Our Impact</Label><h2 className="grant-database-home__heading heading" id="impact-title">400+ Students. 19 Countries. <em>A Shared Love of Debate.</em></h2><p className="grant-database-home__text">More than 450 hours of instruction. Students from 19 countries and territories. DebateCraft brings structured debate training, thoughtful feedback and competition experience to young people across the world.</p><a className="grant-database-home__link-button button" href={links.team}>Meet Our Team</a></div>
    </div>
    <div className="grant-database-home__gallery" aria-hidden="true"><ul className="grant-database-home__gallery-list">{['Image2.jpeg', 'Image4.png', 'Image1.jpeg', 'Image5.png'].map(file => <li className="grant-database-home__gallery-item" key={file}><figure><img src={`/media/debatecraft/${file}`} alt="" loading="lazy" /></figure></li>)}</ul></div>
  </section>;
}

export function Programs() {
  return <section className="section section--our-programs-home our-programs-home" id="method" aria-labelledby="programs-title">
    <div className="our-programs-home__container"><div className="our-programs-home__content"><div className="our-programs-home__box"><Label color="orange">What We Do</Label><h2 className="our-programs-home__heading heading" id="programs-title">The DebateCraft Method</h2></div><div className="our-programs-home__text"><p>Students practice clear reasoning, careful listening and persuasive communication. Our student-run initiative provides debate, public speaking and science ethics education free of charge.</p><p>From a first complete speech to competition preparation, our coaches build skills through live small-group instruction, guided practice and specific feedback. Schools can follow a structured training pathway with learning outcomes they can assess.</p></div></div>
      <div className="our-programs-home__cards programs-cards is-animated" id="programs"><h2 className="programs-cards__title heading">Our Programs</h2><ul className="programs-cards__list">{programs.map(program => <DraggableCard key={program.title}><div className="programs-card__container"><Media file={program.image} className="programs-card__thumbnail" alt={program.alt} /><div className="programs-card__content"><h3 className="programs-card__heading">{program.title}</h3><p className="programs-card__desc">{program.description}</p></div></div></DraggableCard>)}</ul></div>
    </div>
  </section>;
}

export function News() {
  return <section className="blog-home blog-posts" id="resources" aria-labelledby="news-title"><div className="blog-posts__container">
    <div className="blog-posts__content"><Label color="green">Beyond the Classroom</Label><h2 className="blog-posts__heading heading" id="news-title">Learn &amp; Explore</h2><p className="blog-posts__text">Explore perspectives from our team and free guides on case construction, rebuttal, judging and tournament preparation.</p></div>
    <ul className="blog-posts__posts blog-list">{stories.map(story => <li className="blog-post" key={story.href}><a className="blog-post__link" href={story.href}><Media file={story.image} className="blog-post__thumbnail" alt={story.alt} /><div className="blog-post__content"><ul className="blog-post__categories">{story.categories.map(category => <li className="blog-post__category" key={category}>{category}</li>)}</ul><p className="blog-post__title">{story.title}</p><p className="blog-post__info">{story.detail}</p></div></a></li>)}</ul>
    <a className="blog-posts__link-button link-button button" href={links.resources}>Explore Resources</a>
  </div></section>;
}
